"use client"

import { useState } from "react"
import { Chip } from "@mui/material"

import AdminPageLayout from "../../components/AdminPageLayout"
import DataTable, { Column } from "../../components/DataTable"
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog"
import CreateEmergencyContactDialog from "./CreateEmergencyContactDialog"
import EditEmergencyContactDialog from "./EditEmergencyContactDialog"

import { EmergencyContact, EmergencyContactInput } from "@/types/emergencyContact"
import { Province } from "@/types/province"
import {
  getEmergencyContacts,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  checkDuplicateContact
} from "@/services/emergencyContactServices"

type Props = {
  contacts: EmergencyContact[]
  provinces: Province[]
}

type ContactRow = EmergencyContact & {
  provinceName: string
}

const emptyForm = (): EmergencyContactInput => ({
  name: "",
  phoneNumber: "",
  institutionType: "BNPB",
  provinceId: null,
})

export default function EmergencyContactAdminPage({ contacts, provinces }: Props) {
  const [contactsState, setContacts] = useState<EmergencyContact[]>(contacts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [targetRow, setTargetRow] = useState<ContactRow | null>(null)
  const [form, setForm] = useState<EmergencyContactInput>(emptyForm())

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getEmergencyContacts()
      setContacts(data)
    } catch {
      setError("Gagal memuat data.")
    } finally {
      setLoading(false)
    }
  }

  const rows: ContactRow[] = contactsState.map((contact) => ({
    ...contact,
    provinceName: provinces.find((p) => p.id === contact.provinceId)?.name ?? "-",
  }))

  const columns: Column<ContactRow>[] = [
    { key: "name", label: "Institusi" },
    {
      key: "institutionType", label: "Tipe",
      render: (row) => (
        <Chip
          label={row.institutionType}
          size="small"
          sx={{
            backgroundColor: row.institutionType === "BNPB" ? "#dbeafe" : "#dcfce7",
            color: row.institutionType === "BNPB" ? "#1d4ed8" : "#166534",
            fontWeight: 600,
          }}
        />
      ),
    },
    { key: "provinceName", label: "Provinsi" },
    { key: "phoneNumber", label: "Nomor" },
  ]

  // ── Handlers ──
  const handleOpenCreate = () => {
    setForm(emptyForm())
    setError(null)
    setCreateOpen(true)
  }

  const handleOpenEdit = (row: ContactRow) => {
    setTargetRow(row)
    setForm({
      name: row.name,
      phoneNumber: row.phoneNumber,
      institutionType: row.institutionType,
      provinceId: row.provinceId,
    })
    setError(null)
    setEditOpen(true)
  }

  const handleOpenDelete = (row: ContactRow) => {
    setTargetRow(row)
    setDeleteOpen(true)
  }

  const handleCreate = async () => {
    if (!form.name.trim()) { setError("Nama institusi wajib diisi."); return }
    if (!form.phoneNumber.toString().trim()) { setError("Nomor telepon wajib diisi."); return }
    if (form.institutionType === "BPBD" && !form.provinceId) {
      setError("Provinsi wajib dipilih untuk BPBD."); return
    }

    const isDuplicate = await checkDuplicateContact(form.name, form.phoneNumber)
    if (isDuplicate) { setError("Kontak dengan nama dan nomor yang sama sudah terdaftar."); return }

    setSaving(true); setError(null)
    try {
      await createEmergencyContact(form)
      setSuccess(`Kontak ${form.name} berhasil ditambahkan.`)
      setCreateOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleUpdate = async () => {
    if (!form.name.trim()) { setError("Nama institusi wajib diisi."); return }
    if (!form.phoneNumber.toString().trim()) { setError("Nomor telepon wajib diisi."); return }
    if (form.institutionType === "BPBD" && !form.provinceId) { setError("Provinsi wajib dipilih untuk BPBD."); return }
    if (!targetRow) return

    const isDuplicate = await checkDuplicateContact(form.name, form.phoneNumber, targetRow?.id)
    if (isDuplicate) { setError("Kontak dengan nama dan nomor yang sama sudah terdaftar."); return }

    setSaving(true); setError(null)
    try {
      await updateEmergencyContact(targetRow.id, form)
      setSuccess(`Kontak ${form.name} berhasil diperbarui.`)
      setEditOpen(false)
      await fetchData()
    } catch { setError("Gagal menyimpan data.") }
    finally { setSaving(false) }
  }

  const handleConfirmDelete = async () => {
    if (!targetRow) return
    setSaving(true)
    try {
      await deleteEmergencyContact(targetRow.id)
      setSuccess(`Kontak ${targetRow.name} berhasil dihapus.`)
      setDeleteOpen(false)
      await fetchData()
    } catch { setError("Gagal menghapus data.") }
    finally { setSaving(false) }
  }

  return (
    <AdminPageLayout
      title="Kelola Kontak Darurat"
      addLabel="Tambah Kontak"
      onAdd={handleOpenCreate}
      loading={loading}
      success={success}
      error={error}
      onCloseSuccess={() => setSuccess(null)}
      onCloseError={() => setError(null)}
    >
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        getRowId={(row) => row.id}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        emptyMessage="Belum ada kontak darurat."
      />

      <CreateEmergencyContactDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        saving={saving}
        provinces={provinces}
        form={form}
        setForm={setForm}
      />

      <EditEmergencyContactDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
        saving={saving}
        provinces={provinces}
        form={form}
        setForm={setForm}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        saving={saving}
        title="Hapus Kontak Darurat"
        description={"kontak darurat " + (targetRow?.name ?? "")}
      />
    </AdminPageLayout>
  )
}