"use client"

import { useState } from "react"
import { Box, Typography } from "@mui/material"

import AdminPageLayout from "../../components/AdminPageLayout"
import DataTable, { Column } from "../../components/DataTable"
import CreateDisasterDialog from "./CreateDisasterDialog"
import EditDisasterDialog from "./EditDisasterDialog"
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog"

import { Disaster } from "@/types/disaster"
import {
  getDisasters, createDisaster, updateDisaster,
  checkDuplicateName, uploadDisasterImage, deleteDisaster
} from "@/services/disasterServices"

type Props = { disasters: Disaster[] }
type FormState = Omit<Disaster, "id">

export default function DisastersPage({ disasters: initialDisasters }: Props) {
  const [disasters, setDisasters] = useState<Disaster[]>(initialDisasters)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  
  const [targetDisaster, setTargetDisaster] = useState<Disaster | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      setDisasters(await getDisasters())
    } catch { setError("Gagal memuat data.") }
    finally { setLoading(false) }
  }

  const columns: Column<Disaster>[] = [
    {
      key: "image", label: "Gambar", width: 80,
      render: (row) => (
        <Box component="img" src={row.image} alt={row.name}
          sx={{ width: 56, height: 40, objectFit: "cover", borderRadius: 1 }} />
      ),
    },
    { key: "name", label: "Nama Bencana", width: "25%" },
    { key: "overview", label: "Deskripsi Singkat" },
    { key: "description", label: "Deskripsi Panjang" },
    {
      key: "causes", label: "Penyebab",
      render: (row) => <Typography variant="body2">{row.causes?.length ?? 0} item</Typography>,
    },
    {
      key: "impacts", label: "Dampak",
      render: (row) => <Typography variant="body2">{row.impacts?.length ?? 0} item</Typography>,
    },
  ]

  const handleOpenEdit = (row: Disaster) => {
    setTargetDisaster(row)
    setEditOpen(true)
  }

  const handleOpenDelete = (row: Disaster) => {
    setTargetDisaster(row)
    setDeleteOpen(true)
  }

  const handleCreate = async (form: FormState, imageFile: File | null) => {
    if (!imageFile) { setError("Gambar wajib diupload."); return }
    if (!form.name.trim()) { setError("Nama bencana wajib diisi."); return }
    if (!form.overview.trim()) { setError("Deskripsi singkat wajib diisi."); return }
    if (!form.description.trim()) { setError("Deskripsi panjang wajib diisi."); return }
    if (form.causes.some(c => !c.trim())) { setError("Semua penyebab wajib diisi."); return }
    if (form.impacts.some(i => !i.trim())) { setError("Semua dampak wajib diisi."); return }

    const isDuplicate = await checkDuplicateName(form.name)
    if (isDuplicate) { setError("Nama bencana sudah terdaftar."); return }

    setSaving(true); setError(null)
    try {
      const imageUrl = await uploadDisasterImage(imageFile)
      await createDisaster({ ...form, image: imageUrl })
      setSuccess("Data bencana berhasil ditambahkan.")
      setCreateOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleUpdate = async (form: FormState, imageFile: File | null) => {
    if (!imageFile) { setError("Gambar wajib diupload."); return }
    if (!form.name.trim()) { setError("Nama bencana wajib diisi."); return }
    if (!form.overview.trim()) { setError("Deskripsi singkat wajib diisi."); return }
    if (!form.description.trim()) { setError("Deskripsi panjang wajib diisi."); return }
    if (form.causes.some(c => !c.trim())) { setError("Semua penyebab wajib diisi."); return }
    if (form.impacts.some(i => !i.trim())) { setError("Semua dampak wajib diisi."); return }
    if (!targetDisaster) return

    const isDuplicate = await checkDuplicateName(form.name, targetDisaster.id)
    if (isDuplicate) { setError("Nama bencana sudah terdaftar."); return }

    setSaving(true); setError(null)
    try {
      let imageUrl = form.image
      if (imageFile) imageUrl = await uploadDisasterImage(imageFile)
      await updateDisaster(targetDisaster.id, { ...form, image: imageUrl })
      setSuccess("Data bencana berhasil diperbarui.")
      setEditOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleConfirmDelete = async () => {
    if (!targetDisaster) return
    setSaving(true)
    try {
      await deleteDisaster(targetDisaster.id)
      setSuccess(`Bencana ${targetDisaster.name} berhasil dihapus.`)
      setDeleteOpen(false)
      await fetchData()
    } catch { setError("Gagal menghapus data.") }
    finally { setSaving(false) }
  }

  return (
    <AdminPageLayout
      title="Kelola Bencana"
      addLabel="Tambah Bencana"
      onAdd={() => setCreateOpen(true)}
      loading={loading}
      success={success}
      error={error}
      onCloseSuccess={() => setSuccess(null)}
      onCloseError={() => setError(null)}
    >
      <DataTable
        columns={columns}
        rows={disasters}
        loading={loading}
        getRowId={(row) => row.id}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        emptyMessage="Belum ada data bencana."
      />

      <CreateDisasterDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        saving={saving}
      />

      <EditDisasterDialog
        key={targetDisaster?.id ?? "edit"}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        saving={saving}
        disaster={targetDisaster}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        saving={saving}
        title="Hapus Bencana"
        description={"bencana " + (targetDisaster?.name ?? "")}
      />
    </AdminPageLayout>
  )
}