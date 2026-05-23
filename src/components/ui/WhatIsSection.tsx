"use client"

import { Box, Container, Typography, Stack } from "@mui/material"

export default function WhatIsSection() {
  return (
    <Box
      className="min-h-screen flex items-center"
      sx={{ backgroundColor: "var(--background)" }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 0 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 10 }}
          alignItems="flex-start"
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "var(--headline)",
              textDecoration: "underline",
              textUnderlineOffset: 6,
              flexShrink: 0,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              minWidth: { md: 220 },
              pt: { md: 0.5 },
            }}
          >
            Apa itu SiagaKu?
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "var(--primary)",
              lineHeight: 1.7,
              textAlign: { xs: "left", md: "justify" },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            SiagaKu adalah platform edukasi kebencanaan berbasis web yang
            membantu masyarakat memahami potensi risiko bencana di wilayahnya
            serta mempelajari langkah mitigasi yang tepat untuk meningkatkan
            kesiapsiagaan menghadapi bencana.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}