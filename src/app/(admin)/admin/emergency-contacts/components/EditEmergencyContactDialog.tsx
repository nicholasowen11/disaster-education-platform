"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material"

import {
  EmergencyContactInput,
  InstitutionType,
} from "@/types/emergencyContact"

import { Province } from "@/types/province"

const TEXTFIELD_SX = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--accent)",
    },
  },
}

type Props = {
  open: boolean
  onClose: () => void
  onSave: () => void
  saving: boolean
  provinces: Province[]
  form: EmergencyContactInput
  setForm: React.Dispatch<React.SetStateAction<EmergencyContactInput>>
}

export default function EditEmergencyContactDialog({
  open,
  onClose,
  onSave,
  saving,
  provinces,
  form,
  setForm,
}: Props) {

  const handleTypeChange = (type: InstitutionType) => {
    setForm((prev) => ({
      ...prev,
      institutionType: type,
      provinceId: type === "BNPB" ? null : "",
    }))
  }

  return (
    <Dialog 
      open={open}
      onClose={onClose} 
      maxWidth="sm" 
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

      <DialogTitle
        sx={{ color: "var(--headline)", fontWeight: 700 }}
      >
        Edit Kontak Darurat
      </DialogTitle>

      <DialogContent dividers>

        <Box className="flex flex-col gap-3">

          {/* Institution Type */}
          <Box>
            <Typography
              fontWeight={600}
              sx={{ color: "var(--headline)", mb: 0.5 }}
            >
              Tipe Institusi
            </Typography>

            <FormControl fullWidth size="small" sx={TEXTFIELD_SX}>
              <Select
                value={form.institutionType}
                onChange={(e) =>
                  handleTypeChange(e.target.value as InstitutionType)
                }
              >
                <MenuItem value="BNPB">BNPB</MenuItem>
                <MenuItem value="BPBD">BPBD</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Name */}
          <Box>
            <Typography
              fontWeight={600}
              sx={{ color: "var(--headline)", mb: 0.5 }}
            >
              Nama Institusi
            </Typography>

            <TextField
              fullWidth
              size="small"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              sx={TEXTFIELD_SX}
            />
          </Box>

          {/* Phone Number */}
          <Box>
            <Typography
              fontWeight={600}
              sx={{ color: "var(--headline)", mb: 0.5 }}
            >
              Nomor Telepon
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="number"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              sx={TEXTFIELD_SX}
            />
          </Box>

          {/* Province */}
          {form.institutionType === "BPBD" && (
            <Box>
              <Typography
                fontWeight={600}
                sx={{ color: "var(--headline)", mb: 0.5 }}
              >
                Provinsi
              </Typography>

              <FormControl fullWidth size="small" sx={TEXTFIELD_SX}>
                <Select
                  value={form.provinceId ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      provinceId: e.target.value,
                    }))
                  }
                >
                  {provinces.map((province) => (
                    <MenuItem
                      key={province.id}
                      value={province.id}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

        </Box>

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

        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            backgroundColor: "var(--headline)",
            color: "var(--background)",
          }}
        >
          Batal
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={saving}
          startIcon={
            saving
              ? <CircularProgress size={14} />
              : undefined
          }
          sx={{
            backgroundColor: "var(--accent)",
            "&:hover": {
              backgroundColor: "var(--primary)",
            },
            textTransform: "none",
          }}
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </Button>

      </DialogActions>

    </Dialog>
  )
}