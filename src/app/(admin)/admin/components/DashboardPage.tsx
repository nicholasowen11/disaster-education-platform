"use client"

import { useEffect, useState } from "react"

import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material"

import {
  IconAlertTriangle,
  IconBook2,
  IconPhone,
  IconMapPin,
  IconBuildingCommunity,
} from "@tabler/icons-react"

import { getDisasters } from "@/services/disasterServices"
import { getMitigationGuides } from "@/services/mitigationServices"
import { getEmergencyContacts } from "@/services/emergencyContactServices"
import { getDisasterRisks } from "@/services/disasterRiskServices"
import { getProvinces } from "@/services/provinceServices"

type DashboardStats = {
  disasters: number
  mitigations: number
  contacts: number
  provinces: number
  risks: number
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState<DashboardStats>({
    disasters: 0,
    mitigations: 0,
    contacts: 0,
    provinces: 0,
    risks: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)

    try {
      const [
        disasters,
        mitigations,
        contacts,
        risks,
        provinces,
      ] = await Promise.all([
        getDisasters(),
        getMitigationGuides(),
        getEmergencyContacts(),
        getDisasterRisks(),
        getProvinces(),
      ])

      setStats({
        disasters: disasters.length,
        mitigations: mitigations.length,
        contacts: contacts.length,
        provinces: provinces.length,
        risks: risks.length,
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: "Total Bencana",
      value: stats.disasters,
      description: "Data bencana tersedia",
      icon: IconAlertTriangle,
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      title: "Panduan Mitigasi",
      value: stats.mitigations,
      description: "Langkah mitigasi tersimpan",
      icon: IconBook2,
      color: "#3b82f6",
      bg: "#dbeafe",
    },
    {
      title: "Kontak Darurat",
      value: stats.contacts,
      description: "Kontak BNPB & BPBD",
      icon: IconPhone,
      color: "#22c55e",
      bg: "#dcfce7",
    },
    {
      title: "Provinsi",
      value: stats.provinces,
      description: "Provinsi terdaftar",
      icon: IconBuildingCommunity,
      color: "#8b5cf6",
      bg: "#ede9fe",
    },
    {
      title: "Risiko Wilayah",
      value: stats.risks,
      description: "Data risiko provinsi",
      icon: IconMapPin,
      color: "#ef4444",
      bg: "#fee2e2",
    },
  ]

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >

      {/* HERO */}
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },

          mb: {
            xs: 2,
            md: 3,
          },

          borderRadius: {
            xs: 3,
            md: 4,
          },

          background:
            "linear-gradient(135deg, var(--navbar) 0%, var(--headline) 100%)",

          color: "var(--background)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={1}
          sx={{
            fontSize: {
              xs: "1.35rem",
              sm: "1.7rem",
              md: "2rem",
            },

            lineHeight: 1.2,
          }}
        >
          Dashboard Admin
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.9,

            maxWidth: {
              xs: "100%",
              md: 680,
            },

            lineHeight: 1.7,

            fontSize: {
              xs: "0.9rem",
              sm: "0.95rem",
            },
          }}
        >
          Kelola data bencana, panduan mitigasi, risiko wilayah,
          kontak darurat, dan data provinsi dari satu dashboard terpusat.
        </Typography>
      </Paper>

      {/* STATS */}
      <Grid
        container
        spacing={{
          xs: 2,
          md: 3,
        }}
      >
        {cards.map((item) => {
          const Icon = item.icon

          return (
            <Grid
              key={item.title}
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: {
                    xs: 2,
                    sm: 2.2,
                    md: 2.5,
                  },

                  borderRadius: {
                    xs: 2.5,
                    md: 3,
                  },

                  border: "1px solid var(--color-border, #e5e7eb)",

                  backgroundColor: "var(--card)",

                  transition: "all 0.25s ease",

                  height: "100%",

                  "&:hover": {
                    transform: {
                      xs: "none",
                      md: "translateY(-2px)",
                    },

                    borderColor: item.color,
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  mb={1.5}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",

                        mb: 0.4,

                        fontSize: {
                          xs: "0.78rem",
                          sm: "0.8rem",
                        },

                        lineHeight: 1.4,
                      }}
                    >
                      {item.title}
                    </Typography>

                    {loading ? (
                      <CircularProgress size={22} sx={{ color: "var(--accent)" }} />
                    ) : (
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          color: "var(--headline)",

                          fontSize: {
                            xs: "1.5rem",
                            sm: "1.75rem",
                          },

                          wordBreak: "break-word",
                        }}
                      >
                        {item.value}
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      width: {
                        xs: 42,
                        sm: 46,
                      },

                      height: {
                        xs: 42,
                        sm: 46,
                      },

                      borderRadius: {
                        xs: 2,
                        sm: 2.5,
                      },

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      backgroundColor: item.bg,
                      color: item.color,

                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={
                        typeof window !== "undefined" && window.innerWidth < 600
                          ? 20
                          : 22
                      }
                    />
                  </Box>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",

                    lineHeight: 1.6,

                    fontSize: {
                      xs: "0.78rem",
                      sm: "0.82rem",
                    },
                  }}
                >
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

    </Box>
  )
}