"use client"

import { useState, useEffect } from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Collapse,
} from "@mui/material"

import { IconMenu2, IconX } from "@tabler/icons-react"

const menu = [
  { label: "Beranda", link: "/" },
  { label: "Informasi Bencana", link: "/disaster-info" },
  { label: "Mitigasi", link: "/mitigation-guide" },
  { label: "Kontak Darurat", link: "/emergency-contact" },
]

export default function Navbar() {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    let lastScroll = window.scrollY

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll < lastScroll) {
        setShowNavbar(true)
      } else if (currentScroll > 80) {
        setShowNavbar(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "var(--navbar)",
        transition: "transform 0.3s ease",
        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <Container maxWidth="lg">

        {/* TOP NAVBAR */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
            minHeight: {
              xs: 64,
              sm: 70,
            },
          }}
        >

          {/* LOGO */}
          <Typography
            component={NextLink}
            href="/"
            variant="h6"
            sx={{
              color: "var(--background)",
              fontWeight: 700,
              textDecoration: "none",
              flexShrink: 0,
              fontSize: {
                xs: "1.1rem",
                sm: "1.25rem",
              },
            }}
          >
            SiagaKu
          </Typography>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
            }}
          >
            {menu.map(({ label, link }) => {
              const isActive = pathname === link

              return (
                <Button
                  key={label}
                  component={NextLink}
                  href={link}
                  sx={{
                    color: "var(--background)",
                    backgroundColor: isActive
                      ? "var(--accent)"
                      : "transparent",

                    borderRadius: 5,
                    px: 2,
                    textTransform: "none",
                    fontSize: "0.95rem",

                    "&:hover": {
                      color: isActive
                        ? "var(--background)"
                        : "var(--accent)",

                      backgroundColor: isActive
                        ? "var(--accent)"
                        : "var(--background)",
                    },
                  }}
                >
                  {label}
                </Button>
              )
            })}
          </Box>

          {/* MOBILE BUTTON */}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "var(--background)",
            }}
          >
            {open ? (
              <IconX size={26} />
            ) : (
              <IconMenu2 size={26} />
            )}
          </IconButton>

        </Toolbar>

        {/* MOBILE EXPAND MENU */}
        <Collapse in={open} timeout={300}>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              gap: 1,
              pb: 2,
            }}
          >
            {menu.map(({ label, link }) => {
              const isActive = pathname === link

              return (
                <Button
                  key={label}
                  component={NextLink}
                  href={link}
                  onClick={() => setOpen(false)}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "var(--background)",

                    backgroundColor: isActive
                      ? "var(--accent)"
                      : "transparent",

                    borderRadius: 3,
                    px: 2,
                    py: 1.2,
                    textTransform: "none",
                    fontSize: "0.95rem",

                    "&:hover": {
                      backgroundColor: isActive
                        ? "var(--accent)"
                        : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {label}
                </Button>
              )
            })}
          </Box>
        </Collapse>

      </Container>
    </AppBar>
  )
}