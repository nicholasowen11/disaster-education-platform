"use client"

import { useState } from "react"
import { Chip } from "@mui/material"

import AdminPageLayout from "../../components/AdminPageLayout"
import DataTable, { Column } from "../../components/DataTable"
import CreateMitigationDialog, { PhaseSteps } from "./CreateMitigationDialog"
import EditMitigationDialog from "./EditMitigationDialog"
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog"

import { Disaster } from "@/types/disaster"
import { MitigationGuide } from "@/types/mitigationGuide"
import { getDisasters } from "@/services/disasterServices"
import {
  getMitigationGuides,
  createMitigationGuides,
  updateMitigationGuides,
  deleteMitigationGuides,
} from "@/services/mitigationServices"

type Props = {
  disasters: Disaster[]
  guides: MitigationGuide[]
}

type MitigationRow = {
  disasterId: string
  disasterName: string
  beforeCount: number
  duringCount: number
  afterCount: number
}

const emptyPhaseSteps = (): PhaseSteps => ({
  before: [{ id: "", disasterId: "", phase: "before", stepOrder: 1, title: "", description: "" }],
  during: [{ id: "", disasterId: "", phase: "during", stepOrder: 1, title: "", description: "" }],
  after:  [{ id: "", disasterId: "", phase: "after",  stepOrder: 1, title: "", description: "" }],
})

export default function MitigationAdminPage({ disasters, guides }: Props) {
  const [disastersState, setDisasters] = useState<Disaster[]>(disasters)
  const [guidesState, setGuides] = useState<MitigationGuide[]>(guides)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Dialog visibility
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  // Form state
  const [selectedDisasterId, setSelectedDisasterId] = useState("")
  const [phaseSteps, setPhaseSteps] = useState<PhaseSteps>(emptyPhaseSteps())
  const [targetRow, setTargetRow] = useState<MitigationRow | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [disastersData, guidesData] = await Promise.all([
        getDisasters(),
        getMitigationGuides(),
      ])
      setDisasters(disastersData)
      setGuides(guidesData)
    } catch {
      setError("Gagal memuat data.")
    } finally {
      setLoading(false)
    }
  }

  const rows: MitigationRow[] = disastersState.map((d) => {
    const dGuides = guidesState.filter((g) => g.disasterId === d.id)
    return {
      disasterId: d.id,
      disasterName: d.name,
      beforeCount: dGuides.filter((g) => g.phase === "before").length,
      duringCount: dGuides.filter((g) => g.phase === "during").length,
      afterCount:  dGuides.filter((g) => g.phase === "after").length,
    }
  })

  const columns: Column<MitigationRow>[] = [
    { key: "disasterName", label: "Bencana", width: "25%" },
    {
      key: "beforeCount", label: "Sebelum",
      render: (row) => (
        <Chip label={`${row.beforeCount} langkah`} size="small"
          sx={{ backgroundColor: "#fef3c7", color: "#92400e", fontSize: "0.75rem" }} />
      ),
    },
    {
      key: "duringCount", label: "Saat",
      render: (row) => (
        <Chip label={`${row.duringCount} langkah`} size="small"
          sx={{ backgroundColor: "#fee2e2", color: "#991b1b", fontSize: "0.75rem" }} />
      ),
    },
    {
      key: "afterCount", label: "Setelah",
      render: (row) => (
        <Chip label={`${row.afterCount} langkah`} size="small"
          sx={{ backgroundColor: "#dcfce7", color: "#166534", fontSize: "0.75rem" }} />
      ),
    },
  ]

  // ── Handlers ──
  const handleOpenCreate = () => {
    setSelectedDisasterId("")
    setPhaseSteps(emptyPhaseSteps())
    setError(null)
    setCreateOpen(true)
  }

  const handleOpenEdit = (row: MitigationRow) => {
    setTargetRow(row)
    setSelectedDisasterId(row.disasterId)
    const existing = guidesState.filter((g) => g.disasterId === row.disasterId)
    const toSteps = (phase: "before" | "during" | "after"): MitigationGuide[] => {
      const filtered = existing
        .filter((g) => g.phase === phase)
        .sort((a, b) => a.stepOrder - b.stepOrder)
      return filtered.length > 0
        ? filtered
        : [{ id: "", disasterId: row.disasterId, phase, stepOrder: 1, title: "", description: "" }]
    }
    setPhaseSteps({ before: toSteps("before"), during: toSteps("during"), after: toSteps("after") })
    setError(null)
    setEditOpen(true)
  }

  const handleOpenDelete = (row: MitigationRow) => {
    setTargetRow(row)
    setDeleteOpen(true)
  }

  const handleCreate = async () => {
    if (!selectedDisasterId) { setError("Pilih bencana terlebih dahulu."); return }
    const allSteps = [...phaseSteps.before, ...phaseSteps.during, ...phaseSteps.after]
    if (allSteps.some((s) => !s.title.trim() || !s.description.trim())) {
      setError("Semua langkah harus diisi judul dan deskripsinya."); return
    }
    setSaving(true); setError(null)
    try {
      await createMitigationGuides(selectedDisasterId, allSteps)
      setSuccess("Panduan mitigasi berhasil ditambahkan.")
      setCreateOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleUpdate = async () => {
    const allSteps = [...phaseSteps.before, ...phaseSteps.during, ...phaseSteps.after]
    if (allSteps.some((s) => !s.title.trim() || !s.description.trim())) {
      setError("Semua langkah harus diisi judul dan deskripsinya."); return
    }
    setSaving(true); setError(null)
    try {
      await updateMitigationGuides(selectedDisasterId, allSteps)
      setSuccess("Panduan mitigasi berhasil diperbarui.")
      setEditOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleConfirmDelete = async () => {
    if (!targetRow) return
    setSaving(true)
    try {
      await deleteMitigationGuides(targetRow.disasterId)
      setSuccess(`Panduan mitigasi ${targetRow.disasterName} berhasil dihapus.`)
      setDeleteOpen(false)
      await fetchData()
    } catch { setError("Gagal menghapus data.") }
    finally { setSaving(false) }
  }

  const availableDisasters = disastersState.filter(
    (d) => !guidesState.some((g) => g.disasterId === d.id)
  )

  return (
    <AdminPageLayout
      title="Kelola Panduan Mitigasi"
      addLabel="Tambah Panduan"
      onAdd={handleOpenCreate}
      loading={loading}
      success={success}
      error={error}
      onCloseSuccess={() => setSuccess(null)}
      onCloseError={() => setError(null)}
      disableAdd={availableDisasters.length === 0}
      addDisabledText={
        availableDisasters.length === 0
          ? "Semua bencana sudah memiliki panduan mitigasi."
          : undefined
      }
    >
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        getRowId={(row) => row.disasterId}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        emptyMessage="Belum ada panduan mitigasi."
      />

      <CreateMitigationDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        saving={saving}
        availableDisasters={availableDisasters}
        selectedDisasterId={selectedDisasterId}
        setSelectedDisasterId={setSelectedDisasterId}
        phaseSteps={phaseSteps}
        setPhaseSteps={setPhaseSteps}
      />

      <EditMitigationDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        saving={saving}
        disasterName={targetRow?.disasterName ?? ""}
        phaseSteps={phaseSteps}
        setPhaseSteps={setPhaseSteps}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        saving={saving}
        title="Hapus Panduan Mitigasi"
        description={"panduan mitigasi " + (targetRow?.disasterName ?? "")}
      />
    </AdminPageLayout>

      
  )
}