"use client"

import { Box, Typography } from "@mui/material"

export default function EmptyStateCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <Box
      className="rounded-lg"
      sx={{
        backgroundColor: "var(--card)",
        border: "1.5px dashed var(--accent)",
      }}
    >
      <Box
        className="
          relative
          overflow-hidden
          rounded-lg
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
        sx={{
          width: "100%",
          minHeight: "13.9rem",
        }}
      >
        <Box
          className="absolute inset-0"
          sx={{
            backgroundColor: "white",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 3,
          }}
        >
          <Typography
            fontSize="1.5rem"
            lineHeight={1}
          >
            {icon}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "var(--headline)",
              fontWeight: 600,
              mt: 1.5,
              textAlign: "center",
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--primary)",
              maxWidth: 700,
              mt: 1.5,
              textAlign: "center",
              fontSize: {
                xs: "0.85rem",
                sm: "0.95rem",
              },
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}