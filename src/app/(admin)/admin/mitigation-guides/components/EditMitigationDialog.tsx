"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material"

import { IconPlus, IconTrash } from "@tabler/icons-react"

import { PhaseSteps } from "./CreateMitigationDialog"

const PHASES: {
  value: "before" | "during" | "after"
  label: string
  color: string
}[] = [
  { value: "before", label: "Sebelum Bencana", color: "#f59e0b" },
  { value: "during", label: "Saat Bencana", color: "#ef4444" },
  { value: "after", label: "Setelah Bencana", color: "#22c55e" },
]

const TEXTFIELD_SX = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--accent)",
    },
  },

  "& label.Mui-focused": {
    color: "var(--accent)",
  },
}

type Props = {
  open: boolean
  onClose: () => void
  onSave: () => void
  saving: boolean
  disasterName: string
  phaseSteps: PhaseSteps
  setPhaseSteps: React.Dispatch<React.SetStateAction<PhaseSteps>>
}

export default function EditMitigationDialog({
  open,
  onClose,
  onSave,
  saving,
  disasterName,
  phaseSteps,
  setPhaseSteps,
}: Props) {

  const theme = useTheme()

  const fullScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  )

  const addStep = (
    phase: "before" | "during" | "after"
  ) => {
    setPhaseSteps((prev) => ({
      ...prev,

      [phase]: [
        ...prev[phase],
        {
          phase,
          stepOrder: prev[phase].length + 1,
          title: "",
          description: "",
        },
      ],
    }))
  }

  const removeStep = (
    phase: "before" | "during" | "after",
    index: number
  ) => {
    setPhaseSteps((prev) => {

      const updated = prev[phase]
        .filter((_, i) => i !== index)
        .map((s, i) => ({
          ...s,
          stepOrder: i + 1,
        }))

      return {
        ...prev,
        [phase]: updated,
      }
    })
  }

  const updateStep = (
    phase: "before" | "during" | "after",
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setPhaseSteps((prev) => {

      const updated = [...prev[phase]]

      updated[index] = {
        ...updated[index],
        [field]: value,
      }

      return {
        ...prev,
        [phase]: updated,
      }
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
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

      <DialogTitle
        sx={{
          color: "var(--headline)",
          fontWeight: 700,
        }}
      >
        Edit Panduan Mitigasi
      </DialogTitle>

      <DialogContent dividers>

        <Typography
          fontWeight={600}
          sx={{
            color: "var(--headline)",
            mb: 3,
          }}
        >
          Bencana: {disasterName}
        </Typography>

        {PHASES.map(({
          value: phase,
          label,
          color,
        }) => (

          <Box
            key={phase}
            sx={{ mb: 3 }}
          >

            <Box
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

                justifyContent: "space-between",

                gap: 1,

                mb: 2,
              }}
            >

              <Typography
                fontWeight={700}
                sx={{ color }}
              >
                {label}
              </Typography>

              <Button
                size="small"
                startIcon={
                  <IconPlus size={14} />
                }
                onClick={() =>
                  addStep(phase)
                }
                sx={{
                  color,
                  textTransform: "none",
                  fontSize: "0.78rem",
                }}
              >
                Tambah langkah
              </Button>

            </Box>

            {phaseSteps[phase].map((
              step,
              idx
            ) => (

              <Box
                key={idx}
                sx={{
                  border: `1px solid ${color}40`,
                  borderRadius: 2,
                  p: 2,
                  mb: 1.5,
                  backgroundColor: `${color}08`,
                }}
              >

                <Box className="flex items-center gap-2 mb-2">

                  <Chip
                    label={`Langkah ${step.stepOrder}`}
                    size="small"
                    sx={{
                      backgroundColor: `${color}20`,
                      color,
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  />

                  {phaseSteps[phase].length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() =>
                        removeStep(
                          phase,
                          idx
                        )
                      }
                      sx={{
                        color: "#ef4444",
                        ml: "auto",
                      }}
                    >
                      <IconTrash size={14} />
                    </IconButton>
                  )}

                </Box>

                <Typography sx={{ mb: 0.5 }}>
                  Judul
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(
                      phase,
                      idx,
                      "title",
                      e.target.value
                    )
                  }
                  sx={{
                    mb: 1,
                    ...TEXTFIELD_SX,
                  }}
                />

                <Typography sx={{ mb: 0.5 }}>
                  Deskripsi
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={step.description}
                  onChange={(e) =>
                    updateStep(
                      phase,
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                  sx={{
                    mb: 1,
                    ...TEXTFIELD_SX,
                  }}
                />

              </Box>
            ))}

            <Divider sx={{ mt: 1 }} />

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

        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            backgroundColor: "var(--headline)",
            color: "var(--background)",

            "&:hover": {
              backgroundColor: "var(--primary)",
            },
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
          {saving
            ? "Menyimpan..."
            : "Simpan"}
        </Button>

      </DialogActions>

    </Dialog>
  )
}