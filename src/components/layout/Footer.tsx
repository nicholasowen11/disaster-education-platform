import { Box, Container, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box
      className="border-t mt-auto"
      sx={{
        backgroundColor: "var(--footer)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 3,
            sm: 3,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "var(--background)",

            textAlign: "center",

            fontSize: {
              xs: "0.8rem",
              sm: "0.875rem",
            },

            lineHeight: 1.6,

            px: {
              xs: 2,
              sm: 0,
            },

            maxWidth: {
              xs: "20rem",
              sm: "100%",
            },
          }}
        >
          © 2026 SiagaKu — Disaster Education Platform Powered by BINUS
        </Typography>
      </Container>
    </Box>
  )
}