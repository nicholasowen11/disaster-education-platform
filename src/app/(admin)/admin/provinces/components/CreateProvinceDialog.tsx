"use client"

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, TextField, CircularProgress,
} from "@mui/material"
import { useState } from "react"
import { Province } from "@/types/province"

type FormState = Omit<Province, "id">

type Props = {
  open: boolean
  onClose: () => void
  onSave: (form: FormState) => Promise<void>
  saving: boolean
}

const emptyForm = (): FormState => ({
  name: "",
  latitude: 0,
  longitude: 0,
})

export default function CreateProvinceDialog({
  open, onClose, onSave, saving,
}: Props) {
    const [form, setForm] = useState<FormState>(emptyForm())

    const handleClose = () => {
        setForm(emptyForm())
        onClose()
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="xs" 
            fullWidth
            PaperProps={{
                sx: {
                borderRadius: {
                    xs: 0,
                    sm: 3,
                },

                m: {
                    xs: 0,
                    sm: 2,
                },

                width: {
                    xs: "100%",
                    sm: "calc(100% - 32px)",
                },

                overflowX: "hidden",
                },
            }}
        >
            <DialogTitle sx={{ color: "var(--headline)", fontWeight: 700 }}>
                Tambah Provinsi
            </DialogTitle>

            <DialogContent dividers>

                <Typography fontWeight={600} sx={{ mb: 0.5 }}>Nama Provinsi</Typography>
                <TextField
                    fullWidth 
                    size="small"
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "var(--accent)",
                        },
                        },
                        "& label.Mui-focused": {
                        color: "var(--accent)",
                        },
                    }}
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                />

                <Typography fontWeight={600} sx={{ mb: 0.5 }}>Latitude</Typography>
                <TextField
                    fullWidth 
                    size="small" 
                    type="number"
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "var(--accent)",
                        },
                        },
                        "& label.Mui-focused": {
                        color: "var(--accent)",
                        },
                    }}
                    value={form.latitude}
                    onChange={(e) => setForm(p => ({ ...p, latitude: parseFloat(e.target.value) || 0 }))}
                />

                <Typography fontWeight={600} sx={{ mb: 0.5 }}>Longitude</Typography>
                <TextField
                    fullWidth 
                    size="small" 
                    type="number"
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "var(--accent)",
                        },
                        },
                        "& label.Mui-focused": {
                        color: "var(--accent)",
                        },
                    }}
                    value={form.longitude}
                    onChange={(e) => setForm(p => ({ ...p, longitude: parseFloat(e.target.value) || 0 }))}
                />
            </DialogContent>

            <DialogActions
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                    },

                    py: 2,

                    flexDirection: {
                        xs: "column-reverse",
                        sm: "row",
                    },

                    gap: 1,

                    "& > button": {
                        width: {
                        xs: "100%",
                        sm: "auto",
                        },
                    },
                }}
            >
                <Button onClick={handleClose} sx={{ textTransform: "none", color: "var(--background)", backgroundColor: "var(--headline)" }}>Batal</Button>
                <Button
                    variant="contained"
                    onClick={() => onSave(form)}
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={14} /> : undefined}
                    sx={{
                        backgroundColor: "var(--accent)",
                        "&:hover": { backgroundColor: "var(--primary)" },
                        textTransform: "none",
                    }}
                >
                    {saving ? "Menyimpan..." : "Simpan"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}