// ConfirmDeleteDialog.tsx

"use client"

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, CircularProgress, Alert, AlertTitle,
} from "@mui/material"

type Relations = {
  label: string
}[]

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  saving: boolean
  title: string
  description: string
  relations?: Relations
}

export default function ConfirmDeleteDialog({
  open, onClose, onConfirm, saving, title,
  description,
  relations,
}: Props) {

  const hasRelations = relations && relations.length > 0

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "var(--headline)", fontWeight: 700 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        {/* Warning relasi — hanya muncul kalau ada */}
        {hasRelations && (
          <Alert severity="warning">
            <AlertTitle>Provinsi ini terhubung dengan data lain</AlertTitle>
            <ul style={{ margin: "4px 0 0", paddingLeft: 16 }}>
              {relations.map((r, i) => (
                <li key={i}>{r.label}</li>
              ))}
            </ul>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Semua data tersebut akan ikut terhapus secara permanen.
            </Typography>
          </Alert>
        )}

        <Typography>
          Yakin ingin menghapus <strong>{description}</strong>?
          Data yang terhapus tidak dapat dikembalikan.
        </Typography>

      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none", backgroundColor: "var(--headline)", color: "var(--background)" }}>
          Tidak
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={14} /> : undefined}
          sx={{
            backgroundColor: "#ef4444",
            "&:hover": { backgroundColor: "#dc2626" },
            textTransform: "none",
          }}
        >
          {saving ? "Menghapus..." : "Ya, Hapus"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}