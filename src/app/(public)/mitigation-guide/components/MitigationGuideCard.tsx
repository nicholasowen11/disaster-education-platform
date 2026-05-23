"use client"

import { Card, Typography, Box } from "@mui/material"
import { IconCaretDownFilled } from "@tabler/icons-react"
import { MitigationGuide } from "@/types/mitigationGuide"

type MitigationCardProps = {
  id: number | string
  disasterName: string
  mitigations: MitigationGuide[]
  openCardId: number | string | null
  setOpenCardId: (id: number | string | null) => void
}

export default function MitigationCard({
  id,
  disasterName,
  mitigations,
  openCardId,
  setOpenCardId,
}: MitigationCardProps) {

  const open = openCardId === id

  const before = mitigations.filter(m => m.phase === "before")
  const during = mitigations.filter(m => m.phase === "during")
  const after = mitigations.filter(m => m.phase === "after")

  const handleToggle = () => {
    setOpenCardId(open ? null : id)
  }

  return (
    <Card
      onClick={handleToggle}
      className="cursor-pointer overflow-hidden"
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          md: "75rem",
        },
        mx: "auto",
        backgroundColor: open ? "var(--card)" : "var(--accent)",
        transition: "background-color 0.5s ease",
        boxShadow: open ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
        "&:hover": {
          backgroundColor: open ? "var(--card)" : "var(--headline)"
        }
      }}
    >
      <Box className="flex flex-col">

        {/* TITLE — selalu di tengah */}
        <Box
          className="flex items-center justify-center w-full"
          sx={{
            py: 4,
            px: 3,
            minHeight: 100,
          }}
        >
          <Typography
            variant="h6"
            className="font-semibold text-center"
            sx={{
              color: open ? "var(--headline)" : "var(--background)",
              transition: "color 0.5s ease",
            }}
          >
            {disasterName}
          </Typography>
        </Box>

        {/* EXPANDED CONTENT */}
        <Box
          sx={{
            width: "100%",

            maxHeight: open
              ? {
                  xs: 350,
                  sm: 420,
                  md: 1000,
                }
              : 0,

            opacity: open ? 1 : 0,

            overflow: "hidden",

            transition: "max-height 0.6s ease, opacity 0.4s ease",
          }}
          className="flex justify-center"
        >
          <Box
            sx={{
              width: "100%",

              px: {
                xs: 2,
                sm: 3,
              },

              pb: {
                xs: 2,
                sm: 3,
              },

              transform: open
                ? "translateY(0)"
                : "translateY(-12px)",

              transition: "transform 0.5s ease",

              overflowY: {
                xs: "auto",
                sm: "auto",
                md: "visible",
              },

              pr: {
                xs: 1,
                sm: 1,
                md: 0,
              },

              /* custom scrollbar */
              "&::-webkit-scrollbar": {
                width: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "999px",
              },
            }}

            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >

            {/* BEFORE */}
            {before.length > 0 && (
              <Box className="w-full">
                <Typography
                  className="font-semibold mb-1"
                  sx={{ color: "#f59e0b" }}
                >
                  🟡 Sebelum Bencana
                </Typography>
                {before.map(item => (
                  <Typography
                    key={item.id}
                    variant="body2"
                    sx={{ color: "var(--headline)" }}
                  >
                    <strong>{item.title}</strong>. {item.description}
                  </Typography>
                ))}
              </Box>
            )}

            {/* DURING */}
            {during.length > 0 && (
              <Box className="w-full md:border-l md:border-gray-300 md:pl-4">
                <Typography
                  className="font-semibold mb-1"
                  sx={{ color: "#ef4444" }}
                >
                  🔴 Saat Bencana
                </Typography>
                {during.map(item => (
                  <Typography
                    key={item.id}
                    variant="body2"
                    sx={{ color: "var(--headline)" }}
                  >
                    <strong>{item.title}</strong>. {item.description}
                  </Typography>
                ))}
              </Box>
            )}

            {/* AFTER */}
            {after.length > 0 && (
              <Box className="w-full md:border-l md:border-gray-300 md:pl-4">
                <Typography
                  className="font-semibold mb-1"
                  sx={{ color: "#22c55e" }}
                >
                  🟢 Setelah Bencana
                </Typography>
                {after.map(item => (
                  <Typography
                    key={item.id}
                    variant="body2"
                    sx={{ color: "var(--headline)" }}
                  >
                    <strong>{item.title}</strong>. {item.description}
                  </Typography>
                ))}
              </Box>
            )}

          </Box>
        </Box>

        {/* TOGGLE BUTTON */}
        <Box
          className="flex flex-col items-center pb-4 gap-1 group"
          sx={{ 
            cursor: "pointer"
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: open ? "var(--headline)" : "var(--background)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              transition: "color 0.5s ease",
            }}
          >
            {open ? "Tutup" : "Lihat detailnya"}
          </Typography>

          <Box
            sx={{
              color: open ? "var(--headline)" : "var(--background)",
              transition: "color 0.5s ease, transform 0.4s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconCaretDownFilled size={16} />
          </Box>
        </Box>

      </Box>
    </Card>
  )
}