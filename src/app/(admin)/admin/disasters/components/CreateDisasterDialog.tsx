"use client"

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, IconButton, TextField, CircularProgress,
  useMediaQuery, useTheme
} from "@mui/material"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useState, useRef } from "react"
import { Disaster } from "@/types/disaster"

type FormState = Omit<Disaster, "id">

type Props = {
  open: boolean
  onClose: () => void
  onSave: (form: FormState, imageFile: File | null) => Promise<void>
  saving: boolean
}

const emptyForm = (): FormState => ({
  name: "",
  overview: "",
  description: "",
  image: "",
  causes: [""],
  impacts: [""],
})

const TEXTFIELD_SX = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": { borderColor: "var(--accent)" },
  },
  "& label.Mui-focused": { color: "var(--accent)" },
}

export default function CreateDisasterDialog({
  open, onClose, onSave, saving,
}: Props) {
  const [form, setForm] = useState<FormState>(emptyForm())
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleClose = () => {
    setForm(emptyForm())
    setImageFile(null)
    setImagePreview(null)
    onClose()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const updateArray = (field: "causes" | "impacts", index: number, value: string) => {
    setForm((prev) => {
      const updated = [...prev[field]]
      updated[index] = value
      return { ...prev, [field]: updated }
    })
  }

  const addItem = (field: "causes" | "impacts") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
  }

  const removeItem = (field: "causes" | "impacts", index: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
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
        Tambah Data Bencana
      </DialogTitle>

      <DialogContent dividers>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>Gambar</Typography>
        <Box
          onClick={() => fileRef.current?.click()}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },

            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            gap: 2,
            mb: 3,
            cursor: "pointer",

            border: "1.5px dashed var(--accent)",
            borderRadius: 2,

            p: {
              xs: 1.5,
              sm: 2,
            },

            backgroundColor: "var(--background)",

            "&:hover": {
              backgroundColor: "#f5ece3",
            },
          }}
        >
          {imagePreview ? (
            <Box component="img" src={imagePreview} alt="preview"
              sx={{
                width: {
                  xs: "100%",
                  sm: 120,
                },

                maxWidth: 220,

                height: {
                  xs: 160,
                  sm: 80,
                },

                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          ) : (
            <Box sx={{ width: 120, height: 80, backgroundColor: "#e5d5c5", borderRadius: 1,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="caption" color="text.secondary">Pilih gambar</Typography>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary">
            {imageFile ? imageFile.name : "Klik untuk upload gambar"}
          </Typography>
          <input ref={fileRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={handleImageChange} />
        </Box>

        <Typography fontWeight={600} sx={{ mb: 0.5 }}>Nama Bencana</Typography>
        <TextField fullWidth size="small" sx={{ mb: 2, ...TEXTFIELD_SX }}
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />

        <Typography fontWeight={600} sx={{ mb: 0.5 }}>Deskripsi Singkat</Typography>
        <TextField fullWidth size="small" sx={{ mb: 2, ...TEXTFIELD_SX }}
          value={form.overview}
          onChange={(e) => setForm((p) => ({ ...p, overview: e.target.value }))} />

        <Typography fontWeight={600} sx={{ mb: 0.5 }}>Deskripsi Panjang</Typography>
        <TextField fullWidth size="small" multiline rows={3} sx={{ mb: 2, ...TEXTFIELD_SX }}
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />

        <Box className="flex items-center justify-between mb-1">
          <Typography fontWeight={600}>Penyebab</Typography>
          <Button size="small" startIcon={<IconPlus size={14} />}
            onClick={() => addItem("causes")}
            sx={{ color: "var(--accent)", textTransform: "none", fontSize: "0.78rem" }}>
            Tambah
          </Button>
        </Box>
        {form.causes.map((c, i) => (
          <Box key={i} className="flex items-center gap-2 mb-1">
            <TextField fullWidth size="small" sx={{ ...TEXTFIELD_SX }} value={c}
              onChange={(e) => updateArray("causes", i, e.target.value)} />
            {form.causes.length > 1 && (
              <IconButton size="small" onClick={() => removeItem("causes", i)}
                sx={{ color: "#ef4444" }}>
                <IconTrash size={14} />
              </IconButton>
            )}
          </Box>
        ))}

        <Box className="flex items-center justify-between mt-2 mb-1">
          <Typography fontWeight={600}>Dampak</Typography>
          <Button size="small" startIcon={<IconPlus size={14} />}
            onClick={() => addItem("impacts")}
            sx={{ color: "var(--accent)", textTransform: "none", fontSize: "0.78rem" }}>
            Tambah
          </Button>
        </Box>
        {form.impacts.map((imp, i) => (
          <Box key={i} className="flex items-center gap-2 mb-1">
            <TextField fullWidth size="small" value={imp} sx={{ ...TEXTFIELD_SX }}
              onChange={(e) => updateArray("impacts", i, e.target.value)} />
            {form.impacts.length > 1 && (
              <IconButton size="small" onClick={() => removeItem("impacts", i)}
                sx={{ color: "#ef4444" }}>
                <IconTrash size={14} />
              </IconButton>
            )}
          </Box>
        ))}
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
        <Button onClick={handleClose}
          sx={{ textTransform: "none", color: "var(--background)", backgroundColor: "var(--headline)" }}>
          Batal
        </Button>
        <Button variant="contained" onClick={() => onSave(form, imageFile)} disabled={saving}
          startIcon={saving ? <CircularProgress size={14} /> : undefined}
          sx={{ backgroundColor: "var(--accent)", "&:hover": { backgroundColor: "var(--primary)" }, textTransform: "none" }}>
          {saving ? "Menyimpan..." : "Simpan"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}