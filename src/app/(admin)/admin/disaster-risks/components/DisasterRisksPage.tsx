"use client"

import { useState } from "react"
import { Chip } from "@mui/material"

import AdminPageLayout from "../../components/AdminPageLayout"
import DataTable, { Column } from "../../components/DataTable"
import CreateDisasterRiskDialog from "./CreateDisasterRiskDialog"
import EditDisasterRiskDialog from "./EditDisasterRiskDialog"
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog"

import { Disaster } from "@/types/disaster"
import { Province } from "@/types/province"
import { DisasterRisk, RiskInput } from "@/types/disasterRisk"
import {
  getDisasterRisks,
  createDisasterRisks,
  updateDisasterRisks,
  deleteDisasterRisks
} from "@/services/disasterRiskServices"
import { getDisasters } from "@/services/disasterServices"
import { getProvinces } from "@/services/provinceServices"

type Props = {
  disasters: Disaster[]
  provinces: Province[]
  disasterRisks: DisasterRisk[]
}

type RiskRow = {
  disasterId: string
  disasterName: string
  highCount: number
  mediumCount: number
  lowCount: number
}

export default function DisasterRisksPage({
  disasters: initialDisasters,
  provinces: initialProvinces,
  disasterRisks: initialRisks,
}: Props) {
  const [disasters, setDisasters] = useState<Disaster[]>(initialDisasters)
  const [provinces, setProvinces] = useState<Province[]>(initialProvinces)
  const [risks, setRisks] = useState<DisasterRisk[]>(initialRisks)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [selectedDisasterId, setSelectedDisasterId] = useState("")
  const [riskInputs, setRiskInputs] = useState<RiskInput[]>([])
  const [targetRow, setTargetRow] = useState<RiskRow | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [d, p, r] = await Promise.all([
        getDisasters(),
        getProvinces(),
        getDisasterRisks(),
      ])
      setDisasters(d)
      setProvinces(p)
      setRisks(r)
    } catch {
      setError("Gagal memuat data.")
    } finally {
      setLoading(false)
    }
  }

  // Build rows — group by disaster
  const rows: RiskRow[] = disasters.map((d) => {
    const dRisks = risks.filter((r) => r.disasterId === d.id)
    return {
      disasterId: d.id,
      disasterName: d.name,
      highCount: dRisks.filter((r) => r.riskLevel === "high").length,
      mediumCount: dRisks.filter((r) => r.riskLevel === "medium").length,
      lowCount: dRisks.filter((r) => r.riskLevel === "low").length,
    }
  })

  const columns: Column<RiskRow>[] = [
    { key: "disasterName", label: "Bencana", width: "30%" },
    {
      key: "highCount", label: "Risiko Tinggi",
      render: (row) => (
        <Chip label={`${row.highCount} provinsi`} size="small"
          sx={{ backgroundColor: "#fee2e2", color: "#991b1b", fontSize: "0.75rem" }} />
      ),
    },
    {
      key: "mediumCount", label: "Risiko Sedang",
      render: (row) => (
        <Chip label={`${row.mediumCount} provinsi`} size="small"
          sx={{ backgroundColor: "#fef3c7", color: "#92400e", fontSize: "0.75rem" }} />
      ),
    },
    {
      key: "lowCount", label: "Risiko Rendah",
      render: (row) => (
        <Chip label={`${row.lowCount} provinsi`} size="small"
          sx={{ backgroundColor: "#dcfce7", color: "#166534", fontSize: "0.75rem" }} />
      ),
    },
  ]

  // Disasters yang belum punya risk data
  const availableDisasters = disasters.filter(
    (d) => !risks.some((r) => r.disasterId === d.id)
  )

  const handleOpenCreate = () => {
    setSelectedDisasterId("")
    setRiskInputs([])
    setError(null)
    setCreateOpen(true)
  }

  const handleOpenEdit = (row: RiskRow) => {
    setTargetRow(row)
    const existing = risks.filter((r) => r.disasterId === row.disasterId)
    // Pre-fill semua provinsi — kalau belum ada datanya, default "low"
    const filled: RiskInput[] = provinces.map((p) => {
      const found = existing.find((r) => r.provinceId === p.id)
      return { provinceId: p.id, riskLevel: found?.riskLevel ?? "low" }
    })
    setRiskInputs(filled)
    setError(null)
    setEditOpen(true)
  }

  const handleOpenDelete = (row: RiskRow) => {
    setTargetRow(row)
    setDeleteOpen(true)
  }

  const handleCreate = async () => {
    if (!selectedDisasterId) { setError("Pilih bencana terlebih dahulu."); return }
    if (riskInputs.length === 0) { setError("Data risiko belum diisi."); return }

    setSaving(true); setError(null)
    try {
      await createDisasterRisks(selectedDisasterId, riskInputs)
      setSuccess("Data risiko bencana berhasil ditambahkan.")
      setCreateOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleUpdate = async () => {
    if (riskInputs.length === 0) { setError("Data risiko belum diisi."); return }
    if (!targetRow) return
    setSaving(true); setError(null)
    try {
      await updateDisasterRisks(targetRow.disasterId, riskInputs)
      setSuccess("Data risiko bencana berhasil diperbarui.")
      setEditOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleConfirmDelete = async () => {
    if (!targetRow) return
    setSaving(true)
    try {
      await deleteDisasterRisks(targetRow.disasterId)
      setSuccess(`Data risiko ${targetRow.disasterName} berhasil dihapus.`)
      setDeleteOpen(false)
      await fetchData()
    } catch { setError("Gagal menghapus data.") }
    finally { setSaving(false) }
  }

  return (
    <AdminPageLayout
      title="Kelola Risiko Bencana"
      addLabel="Tambah Risiko"
      onAdd={handleOpenCreate}
      loading={loading}
      success={success}
      error={error}
      onCloseSuccess={() => setSuccess(null)}
      onCloseError={() => setError(null)}

      disableAdd={availableDisasters.length === 0}
      addDisabledText={
        availableDisasters.length === 0
          ? "Semua bencana sudah memiliki data risiko."
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
        emptyMessage="Belum ada data risiko bencana."
      />

      <CreateDisasterRiskDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        saving={saving}
        availableDisasters={availableDisasters}
        provinces={provinces}
        selectedDisasterId={selectedDisasterId}
        setSelectedDisasterId={setSelectedDisasterId}
        risks={riskInputs}
        setRisks={setRiskInputs}
      />

      <EditDisasterRiskDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        saving={saving}
        disasterName={targetRow?.disasterName ?? ""}
        provinces={provinces}
        risks={riskInputs}
        setRisks={setRiskInputs}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        saving={saving}
        title="Hapus Risiko Bencana"
        description={"risiko bencana " + (targetRow?.disasterName ?? "")}
      />
    </AdminPageLayout>
  )
}