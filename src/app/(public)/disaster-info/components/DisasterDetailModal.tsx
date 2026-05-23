"use client"

import Image from "next/image"
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button
} from "@mui/material"

import { IconX } from "@tabler/icons-react"

import { Disaster } from "@/types/disaster"

type Props = {
  open: boolean
  disaster: Disaster | null
  onClose: () => void
}

export default function DisasterDetailModal({
  open,
  disaster,
  onClose
}: Props) {

  if (!disaster) return null

  return (

    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          overflow: "hidden",
          backgroundColor: "var(--background)",
        }
      }}
    >

      <Box
        className="relative bg-(--background)"
        sx={{
          height: {
            xs: "90vh",
            sm: "85vh",
            md: "80vh",
          },
          overflowY: "auto",
        }}
      >

        {/* CLOSE BUTTON */}

        <IconButton
          onClick={onClose}
          className="!absolute z-10 group"
          sx={{
            top: {
              xs: 12,
              sm: 16,
            },
            right: {
              xs: 12,
              sm: 16,
            },

            color: "var(--headline)",
            backgroundColor: "var(--background)",

            width: {
              xs: 40,
              sm: 48,
            },

            height: {
              xs: 40,
              sm: 48,
            },

            "&:hover": {
              color: "var(--background)",
              backgroundColor: "var(--accent)"
            }
          }}
        >
          <IconX
            size={24}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </IconButton>

        {/* IMAGE HEADER */}

        <Box
          className="relative w-full"
          sx={{
            height: {
              xs: 220,
              sm: 280,
              md: 320,
            }
          }}
        >

          <Image
            src={disaster.image}
            alt={disaster.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          <Box className="absolute inset-0 bg-black/40" />

          <Box
            className="absolute text-white"
            sx={{
              bottom: {
                xs: 16,
                sm: 24,
              },
              left: {
                xs: 16,
                sm: 24,
              },
              right: {
                xs: 16,
                sm: 24,
              }
            }}
          >

            <Typography
              variant="h4"
              className="font-bold"
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                }
              }}
            >
              {disaster.name}
            </Typography>

          </Box>

        </Box>

        {/* CONTENT */}

        <Box
          sx={{
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },

            display: "flex",
            flexDirection: "column",

            gap: {
              xs: 4,
              sm: 5,
            }
          }}
        >

          {/* DESCRIPTION */}

          <Box>

            <Typography
              variant="h6"
              className="font-semibold mb-2"
              sx={{
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.25rem",
                }
              }}
            >
              Apa itu sebenarnya {disaster.name}?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                }
              }}
            >
              {disaster.description}
            </Typography>

          </Box>

          {/* CAUSES */}

          <Box>

            <Typography
              variant="h6"
              className="font-semibold mb-2"
            >
              Mengapa {disaster.name} bisa terjadi?
            </Typography>

            <Box className="flex flex-col gap-2">

              {disaster.causes.map((cause) => (
                <Typography
                  key={cause}
                  variant="body2"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                    }
                  }}
                >
                  • {cause}
                </Typography>
              ))}

            </Box>

          </Box>

          {/* IMPACTS */}

          <Box>

            <Typography
              variant="h6"
              className="font-semibold mb-2"
            >
              Apa dampak {disaster.name} terhadap kita?
            </Typography>

            <Box className="flex flex-col gap-2">

              {disaster.impacts.map((impact) => (
                <Typography
                  key={impact}
                  variant="body2"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                    }
                  }}
                >
                  • {impact}
                </Typography>
              ))}

            </Box>

          </Box>

          {/* CTA */}

          <Box>

            <Typography
              variant="h6"
              className="font-semibold mb-3"
            >
              Bagaimana Cara Mitigasinya?
            </Typography>

            <Button
              variant="contained"
              href="/mitigation-guide"
              fullWidth
              sx={{
                py: 1.5,

                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                },

                backgroundColor: "var(--accent)",

                "&:hover": {
                  backgroundColor: "var(--headline)"
                }
              }}
            >
              Pelajari Selengkapnya di Sini
            </Button>

          </Box>

        </Box>

      </Box>

    </Drawer>
  )
}