"use client"

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
} from "@mui/material"

import {
  IconCloudStorm,
  IconBuildingBank,
  IconMountain,
  IconShield,
} from "@tabler/icons-react"

const references = [
  {
    title: "BMKG",
    description:
      "Informasi gempa bumi, cuaca ekstrem, dan tsunami.",
    icon: <IconCloudStorm size={36} />,
  },
  {
    title: "BNPB",
    description:
      "Panduan mitigasi dan penanggulangan bencana nasional.",
    icon: <IconBuildingBank size={36} />,
  },
  {
    title: "PVMBG",
    description:
      "Informasi aktivitas gunung api dan bencana geologi.",
    icon: <IconMountain size={36} />,
  },
  {
    title: "BPBD",
    description:
      "Informasi kesiapsiagaan dan layanan kebencanaan daerah.",
    icon: <IconShield size={36} />,
  },
]

export default function ReferenceSourceSection() {

  return (
    <Box
      component="section"
      className="
        min-h-screen
        flex
        items-center
        bg-[var(--background)]
      "
      sx={{
        py: {
          xs: 8,
          sm: 10,
          md: 0,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 10 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-[2fr_3fr]
            items-start
          "
        >

          {/* LEFT SIDE */}
          <Box>

            <Box className="mb-4">
              <Typography
                variant="h4"
                className="
                  font-semibold
                  underline
                  underline-offset-4
                  text-[var(--headline)]
                  mb-6
                "
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "3rem",
                  },
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                Sumber Informasi Resmi
              </Typography>
            </Box>

            <Typography
              variant="h6"
              className="leading-relaxed"
              sx={{
                color: "var(--primary)",
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.25rem",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              Informasi dan panduan dalam platform ini
              disusun berdasarkan referensi dari lembaga
              resmi terkait kebencanaan di Indonesia.
            </Typography>

          </Box>

          {/* RIGHT SIDE */}
          <Box>

            {/* CARDS */}
            <Grid
              container
              spacing={{
                xs: 2,
                sm: 3,
              }}
            >

              {references.map((item) => (
                <Grid
                  key={item.title}
                  size={{ xs: 12, sm: 6 }}
                >
                  <Card
                    className="
                      h-full
                      rounded-3xl
                      p-6
                      transition-all
                      duration-300
                    "
                    sx={{
                      backgroundColor: "var(--card)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow:
                          "0 10px 24px rgba(0,0,0,0.08)",
                      },
                    }}
                  >

                    <Box className="flex flex-col">

                      {/* ICON */}
                      <Box
                        className="mb-5"
                        sx={{
                          color: "var(--accent)",
                          display: "flex",
                          justifyContent: {
                            xs: "center",
                            md: "flex-start",
                          },
                        }}
                      >
                        {item.icon}
                      </Box>

                      {/* TITLE */}
                      <Typography
                        variant="h6"
                        className="font-semibold mb-3"
                        sx={{
                          color: "var(--headline)",
                          textAlign: {
                            xs: "center",
                            md: "left",
                          },
                          fontSize: {
                            xs: "1.05rem",
                            md: "1.25rem",
                          },
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* DESCRIPTION */}
                      <Typography
                        variant="body2"
                        className="leading-relaxed"
                        sx={{
                          color: "var(--primary)",
                          textAlign: {
                            xs: "center",
                            md: "left",
                          },
                          fontSize: {
                            xs: "0.9rem",
                            md: "0.95rem",
                          },
                        }}
                      >
                        {item.description}
                      </Typography>

                    </Box>

                  </Card>
                </Grid>
              ))}

            </Grid>

            {/* DISCLAIMER */}
            <Box className="mt-4">
              <Typography
                variant="body2"
                className="leading-relaxed"
                sx={{
                  color: "var(--primary)",
                  fontWeight: 600,
                  opacity: 0.7,
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                  fontSize: {
                    xs: "0.8rem",
                    md: "0.875rem",
                  },
                }}
              >
                Platform ini tidak berafiliasi secara resmi
                dengan lembaga terkait. Informasi digunakan
                sebagai referensi edukasi masyarakat.
              </Typography>
            </Box>

          </Box>

        </Stack>

      </Container>
    </Box>
  )
}