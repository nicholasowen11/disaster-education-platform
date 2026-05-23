"use client"

import NextLink from "next/link"
import { Box, Container, Typography, Button, Stack } from "@mui/material"

export default function HeroSection() {
  return (
    <Box
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-image-2.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <Container maxWidth="lg" className="relative z-10" sx={{ color: "var(--background)" }}>
        <Stack spacing={{ xs: 3, md: 5 }} alignItems="flex-start">

          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.75rem" },
              lineHeight: 1.2,
            }}
          >
            Kenali Risiko Bencana <br /> di Sekitar Anda
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: { xs: "100%", md: 560 },
              fontSize: { xs: "0.95rem", md: "1rem" },
            }}
          >
            Tingkatkan kesiapsiagaan terhadap bencana melalui informasi
            yang mudah dipahami dan panduan mitigasi yang praktis.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              component={NextLink}
              href="/disaster-info"
              variant="contained"
              fullWidth={false}
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 1.8 },
                fontWeight: 700,
                fontSize: { xs: "0.9rem", md: "1rem" },
                backgroundColor: "var(--headline)",
                color: "var(--background)",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  color: "var(--accent)",
                  backgroundColor: "var(--background)",
                },
              }}
            >
              Pelajari Bencana
            </Button>

            <Button
              component={NextLink}
              href="/mitigation-guide"
              variant="outlined"
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 1.8 },
                fontWeight: 700,
                fontSize: { xs: "0.9rem", md: "1rem" },
                borderColor: "var(--background)",
                color: "var(--background)",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                },
              }}
            >
              Panduan Mitigasi
            </Button>
          </Stack>

        </Stack>
      </Container>
    </Box>
  )
}