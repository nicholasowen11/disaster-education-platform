"use client"

import { useState } from "react"
import { Typography } from "@mui/material"

import AdminPageLayout from "../../components/AdminPageLayout"
import DataTable, { Column } from "../../components/DataTable"
import CreateProvinceDialog from "./CreateProvinceDialog"
import EditProvinceDialog from "./EditProvinceDialog"
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog"

import { Province } from "@/types/province"
import {
  getProvinces,
  createProvince,
  updateProvince,
  checkDuplicateProvinceName,
  deleteProvince,
  getProvinceRelations,
} from "@/services/provinceServices"

type Props = {
  provinces: Province[]
}

type FormState = Omit<Province, "id">

export default function ProvincesPage({ provinces: initialProvinces }: Props) {
  const [provinces, setProvinces] = useState<Province[]>(initialProvinces)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [targetProvince, setTargetProvince] = useState<Province | null>(null)
  const [relations, setRelations] = useState<{ label: string }[]>([])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getProvinces()
      setProvinces(data)
    } catch {
      setError("Gagal memuat data.")
    } finally {
      setLoading(false)
    }
  }

  const columns: Column<Province>[] = [
    { key: "name", label: "Nama Provinsi" },
    {
      key: "latitude", label: "Latitude",
      render: (row) => <Typography variant="body2">{row.latitude}</Typography>,
    },
    {
      key: "longitude", label: "Longitude",
      render: (row) => <Typography variant="body2">{row.longitude}</Typography>,
    },
  ]

  const handleOpenEdit = (row: Province) => {
    setTargetProvince(row)
    setError(null)
    setEditOpen(true)
  }

  const handleOpenDelete = async (row: Province) => {
    setTargetProvince(row)

    const { riskCount, contactCount } = await getProvinceRelations(row.id)

    const rel = []
    if (riskCount > 0) rel.push({ label: `${riskCount} data risiko bencana` })
    if (contactCount > 0) rel.push({ label: `${contactCount} kontak darurat` })
    setRelations(rel)

    setDeleteOpen(true)
  }

  const handleCreate = async (form: FormState) => {
    if (!form.name.trim()) { setError("Nama provinsi wajib diisi."); return }
    if (isNaN(form.latitude) || form.latitude === 0) { setError("Latitude wajib diisi."); return }
    if (isNaN(form.longitude) || form.longitude === 0) { setError("Longitude wajib diisi."); return }

    const isDuplicate = await checkDuplicateProvinceName(form.name)
    if (isDuplicate) { setError("Nama provinsi sudah terdaftar."); return }

    setSaving(true); setError(null)
    try {
      await createProvince(form)
      setSuccess(`Provinsi ${form.name} berhasil ditambahkan.`)
      setCreateOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleUpdate = async (form: FormState) => {
    if (!form.name.trim()) { setError("Nama provinsi wajib diisi."); return }
    if (isNaN(form.latitude) || form.latitude === 0) { setError("Latitude wajib diisi."); return }
    if (isNaN(form.longitude) || form.longitude === 0) { setError("Longitude wajib diisi."); return }
    if (!targetProvince) return

    const isDuplicate = await checkDuplicateProvinceName(form.name, targetProvince.id)
    if (isDuplicate) { setError("Nama provinsi sudah terdaftar."); return }

    setSaving(true); setError(null)
    try {
      await updateProvince(targetProvince.id, form)
      setSuccess(`Provinsi ${form.name} berhasil diperbarui.`)
      setEditOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!targetProvince) return
    setSaving(true); setError(null)
    try {
      await deleteProvince(targetProvince.id)
      setSuccess(`Provinsi ${targetProvince.name} berhasil dihapus.`)
      setDeleteOpen(false)
      await fetchData()
    } catch { setError("Gagal menghapus data.") }
    finally { setSaving(false) }
  }

  return (
    <AdminPageLayout
      title="Kelola Provinsi"
      addLabel="Tambah Provinsi"
      onAdd={() => { setError(null); setCreateOpen(true) }}
      loading={loading}
      success={success}
      error={error}
      onCloseSuccess={() => setSuccess(null)}
      onCloseError={() => setError(null)}
    >
      <DataTable
        columns={columns}
        rows={provinces}
        loading={loading}
        getRowId={(row) => row.id}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        emptyMessage="Belum ada data provinsi."
      />

      <CreateProvinceDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        saving={saving}
      />

      <EditProvinceDialog
        key={targetProvince?.id ?? "edit"}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        saving={saving}
        province={targetProvince}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        saving={saving}
        title="Hapus Provinsi"
        description={"provinsi " + (targetProvince?.name ?? "")}
        relations={relations} 
      />
    </AdminPageLayout>
  )
}