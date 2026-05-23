"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material"

import { Disaster } from "@/types/disaster"
import { Province } from "@/types/province"
import { RiskInput } from "@/types/disasterRisk"

const RISK_LEVELS: {
  value: "low" | "medium" | "high"
  label: string
  color: string
}[] = [
  { value: "low", label: "Rendah", color: "#22c55e" },
  { value: "medium", label: "Sedang", color: "#f59e0b" },
  { value: "high", label: "Tinggi", color: "#ef4444" },
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
  availableDisasters: Disaster[]
  provinces: Province[]
  selectedDisasterId: string
  setSelectedDisasterId: (id: string) => void
  risks: RiskInput[]
  setRisks: React.Dispatch<
    React.SetStateAction<RiskInput[]>
  >
}

export default function CreateDisasterRiskDialog({
  open,
  onClose,
  onSave,
  saving,
  availableDisasters,
  provinces,
  selectedDisasterId,
  setSelectedDisasterId,
  risks,
  setRisks,
}: Props) {

  const theme = useTheme()

  const fullScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  )

  const handleDisasterChange = (
    disasterId: string
  ) => {

    setSelectedDisasterId(
      disasterId
    )

    setRisks(
      provinces.map((p) => ({
        provinceId: p.id,
        riskLevel: "low",
      }))
    )
  }

  const handleRiskChange = (
    provinceId: string,
    riskLevel: "low" | "medium" | "high"
  ) => {

    setRisks((prev) =>
      prev.map((r) =>
        r.provinceId === provinceId
          ? {
              ...r,
              riskLevel,
            }
          : r
      )
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
        Tambah Risiko Bencana
      </DialogTitle>

      <DialogContent dividers>

        <Typography
          fontWeight={600}
          sx={{
            color: "var(--headline)",
            mb: 0.5,
          }}
        >
          Bencana
        </Typography>

        <FormControl
          fullWidth
          size="small"
          sx={{
            mb: 3,
            ...TEXTFIELD_SX,
          }}
        >

          <Select
            value={selectedDisasterId}
            onChange={(e) =>
              handleDisasterChange(
                e.target.value
              )
            }
          >

            {availableDisasters.map((d) => (
              <MenuItem
                key={d.id}
                value={d.id}
              >
                {d.name}
              </MenuItem>
            ))}

          </Select>

        </FormControl>

        {selectedDisasterId && (
          <>

            <Typography
              fontWeight={600}
              sx={{
                color: "var(--headline)",
                mb: 1,
              }}
            >
              Tingkat Risiko per Provinsi
            </Typography>

            <Box className="flex flex-col gap-2">

              {provinces.map((province) => {

                const risk = risks.find(
                  (r) =>
                    r.provinceId === province.id
                )

                const riskLevel =
                  risk?.riskLevel ?? "low"

                const color =
                  RISK_LEVELS.find(
                    (r) =>
                      r.value === riskLevel
                  )?.color ?? "#22c55e"

                return (
                  <Box
                    key={province.id}
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

                      justifyContent:
                        "space-between",

                      gap: 1.5,

                      px: 2,
                      py: 1.5,

                      border: `1px solid ${color}40`,

                      borderRadius: 2,

                      backgroundColor: `${color}08`,
                    }}
                  >

                    <Typography
                      variant="body2"
                      fontWeight={500}
                    >
                      {province.name}
                    </Typography>

                    <FormControl
                      size="small"
                      sx={{
                        minWidth: {
                          xs: "100%",
                          sm: 120,
                        },

                        ...TEXTFIELD_SX,
                      }}
                    >

                      <Select
                        value={riskLevel}
                        onChange={(e) =>
                          handleRiskChange(
                            province.id,
                            e.target
                              .value as
                              | "low"
                              | "medium"
                              | "high"
                          )
                        }
                        sx={{
                          color,
                        }}
                      >

                        {RISK_LEVELS.map((r) => (
                          <MenuItem
                            key={r.value}
                            value={r.value}
                            sx={{
                              color: r.color,
                            }}
                          >
                            {r.label}
                          </MenuItem>
                        ))}

                      </Select>

                    </FormControl>

                  </Box>
                )
              })}

            </Box>

          </>
        )}

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
            color: "var(--background)",
            backgroundColor: "var(--headline)",
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