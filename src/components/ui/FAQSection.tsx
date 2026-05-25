"use client"

import { useState } from "react"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  Stack,
} from "@mui/material"

import { IconChevronDown } from "@tabler/icons-react"

const faqs = [
  {
    question: "Apa itu edukasi kebencanaan dan mengapa itu penting?",
    answer:
      "Edukasi kebencanaan adalah proses pembelajaran yang bertujuan untuk meningkatkan kesadaran dan kesiapsiagaan masyarakat terhadap potensi risiko bencana. Edukasi kebencanaan memiliki peran penting dalam membantu masyarakat memahami risiko bencana, langkah mitigasi, serta mengurangi dampak dan korban jiwa saat bencana terjadi.",
  },
  {
    question: "Bagaimana saya mendapatkan informasi yang relevan berdasarkan lokasi?",
    answer:
      "SiagaKu menggunakan lokasi Anda untuk menampilkan informasi potensi risiko bencana, panduan mitigasi, dan kontak darurat yang relevan dengan wilayah tersebut. Dengan pendekatan ini, Anda dapat memperoleh informasi yang lebih relevan dengan kondisi daerah.",
  },
  {
    question: "Mengapa saya harus mengaktifkan lokasi?",
    answer:
      "Akses lokasi digunakan untuk menentukan wilayah provinsi Anda agar sistem dapat menampilkan rekomendasi konten edukasi kebencanaan yang relevan sesuai karakteristik risiko bencana di wilayah tersebut.",
  },
  {
    question: "Jenis bencana apa saja yang tersedia di aplikasi SiagaKu?",
    answer:
      "Saat ini SiagaKu difokuskan pada tiga jenis bencana alam, yaitu gempa bumi, banjir, dan gunung meletus sebagai bagian dari ruang lingkup penelitian dan pengembangan platform.",
  },
  {
    question: "Wilayah mana saja yang didukung oleh SiagaKu?",
    answer:
      "Pada tahap pengembangan saat ini, SiagaKu difokuskan pada wilayah provinsi di Pulau Jawa sebagai fase awal implementasi platform edukasi kebencanaan berbasis lokasi.",
  },
  {
    question: "Bagaimana cara saya menggunakan aplikasi SiagaKu?",
    answer:
      "Anda cukup membuka website SiagaKu dan memberikan izin akses lokasi. Setelah itu, platform akan menampilkan informasi risiko bencana, panduan mitigasi, dan kontak darurat yang sesuai dengan wilayah Anda.",
  },
  {
    question: "Apakah informasi di aplikasi SiagaKu berasal dari sumber resmi?",
    answer:
      "Ya. Informasi dalam SiagaKu disusun berdasarkan referensi dari lembaga resmi terkait kebencanaan di Indonesia seperti BMKG, BNPB, PVMBG, dan BPBD.",
  },
  {
    question: "Apakah saya dapat menggunakan aplikasi SiagaKu di perangkat mobile?",
    answer:
      "Ya. SiagaKu dirancang dengan tampilan responsif sehingga dapat digunakan dengan baik melalui desktop maupun perangkat mobile.",
  },
]

export default function FAQSection() {

  const [expanded, setExpanded] = useState<number | false>(0)

  const handleChange =
    (panel: number) =>
    (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <Box
      component="section"
      className="
        min-h-screen
        flex
        items-center
        bg-[var(--background)]
        items-start
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
          spacing={{ xs: 4, md: 8 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-[2fr_3fr]
            gap-8
          "
        >

          {/* LEFT SIDE */}
          <Typography
            variant="h4"
            className="
              font-semibold
              underline
              underline-offset-4
              text-[var(--headline)]
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
            Pertanyaan yang Sering Diajukan
          </Typography>

          {/* RIGHT SIDE */}
          <Box
            className="
              overflow-y-auto
              pr-2
            "
            sx={{
              maxHeight: {
                xs: "none",
                md: "80vh",
              },

              "&::-webkit-scrollbar": {
                width: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(140,90,60,0.25)",
                borderRadius: "999px",
              },

              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >

            {faqs.map((item, index) => {

              const isOpen = expanded === index

              return (
                <Accordion
                  key={item.question}
                  expanded={isOpen}
                  onChange={handleChange(index)}
                  elevation={0}
                  disableGutters
                  square
                  sx={{
                    backgroundColor: "transparent",
                    borderBottom:
                      "1px solid rgba(75,46,43,0.12)",

                    "&::before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        className="
                          rounded-full
                          flex
                          items-center
                          justify-center
                          transition-all
                          duration-300
                        "
                        sx={{
                          width: {
                            xs: 38,
                            md: 44,
                          },
                          height: {
                            xs: 38,
                            md: 44,
                          },
                          backgroundColor: isOpen ? "var(--accent)" : "var(--headline)",
                          color: "var(--background)",
                          flexShrink: 0,
                        }}
                      >
                        <IconChevronDown size={20} />
                      </Box>
                    }
                    sx={{
                      px: 0,
                      py: {
                        xs: 2,
                        md: 3,
                      },

                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                      },

                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                      {
                        transform: "rotate(180deg)",
                      },
                    }}
                  >

                    <Box
                      className="
                        flex
                        items-start
                        gap-6
                      "
                      sx={{
                        pr: {
                          xs: 1,
                          md: 2,
                        },
                      }}
                    >

                      {/* NUMBER */}
                      <Typography
                        variant="h4"
                        sx={{
                          color: "rgba(75,46,43,0.28)",
                          fontWeight: 300,
                          minWidth: {
                            xs: "28px",
                            md: "40px",
                          },
                          fontSize: {
                            xs: "1.4rem",
                            md: "2rem",
                          },
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Typography>

                      {/* QUESTION */}
                      <Typography
                        variant="h6"
                        className="leading-relaxed"
                        sx={{
                          color: "var(--headline)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "1rem",
                            md: "1.25rem",
                          },
                        }}
                      >
                        {item.question}
                      </Typography>

                    </Box>

                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      px: 0,
                      pb: 4,
                    }}
                  >

                    <Box
                      sx={{
                        pl: {
                          xs: "40px",
                          md: "64px",
                        },
                        pr: {
                          xs: 1,
                          md: 8,
                        },
                      }}
                    >

                      <Typography
                        variant="body1"
                        className="leading-relaxed"
                        sx={{
                          color: "var(--primary)",
                          fontSize: {
                            xs: "0.95rem",
                            md: "1rem",
                          },
                        }}
                      >
                        {item.answer}
                      </Typography>

                    </Box>

                  </AccordionDetails>

                </Accordion>
              )
            })}

          </Box>

        </Stack>

      </Container>
    </Box>
  )
}