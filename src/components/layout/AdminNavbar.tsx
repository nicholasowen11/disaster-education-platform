  "use client"

  import { useState } from "react"
  import NextLink from "next/link"
  import { usePathname, useRouter } from "next/navigation"

  import {
    Box, Typography, List, ListItemButton, ListItemIcon,
    ListItemText, Divider, Button, AppBar, Toolbar,
    IconButton, Collapse, useMediaQuery, useTheme,
  } from "@mui/material"

  import {
    IconDashboard, IconCloudStorm, IconShieldHalf,
    IconPhone, IconMapPin, IconAlertTriangle,
    IconLogout, IconMenu2, IconX,
  } from "@tabler/icons-react"

  import { supabase } from "@/lib/supabase/supabase"

  const menu = [
    { label: "Beranda", link: "/admin", icon: <IconDashboard size={20} /> },
    { label: "Informasi Bencana", link: "/admin/disasters", icon: <IconCloudStorm size={20} /> },
    { label: "Panduan Mitigasi", link: "/admin/mitigation-guides", icon: <IconShieldHalf size={20} /> },
    { label: "Risiko Bencana", link: "/admin/disaster-risks", icon: <IconAlertTriangle size={20} /> },
    { label: "Kontak Darurat", link: "/admin/emergency-contacts", icon: <IconPhone size={20} /> },
    { label: "Provinsi", link: "/admin/provinces", icon: <IconMapPin size={20} /> },
  ]

  export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
      await supabase.auth.signOut()
      router.push("/login")
    }

    const isActive = (link: string) =>
      pathname === link || (link !== "/admin" && pathname.startsWith(link))

    // ── MOBILE TOP NAVBAR ──
    if (!isDesktop) {
      return (
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "var(--navbar)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Top bar */}
          <Toolbar
            disableGutters
            sx={{
              minHeight: "64px !important",
              px: 2,

              width: "100%",
              maxWidth: "100%",
              minWidth: 0,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: "var(--background)",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              SiagaKu
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                flexShrink: 0,
              }}
            >
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: "var(--background)",
                }}
              >
                <IconLogout size={20} />
              </IconButton>

              <IconButton
                onClick={() => setOpen(!open)}
                sx={{ 
                  color: "var(--background)",
                  "&:hover": {
                    backgroundColor: "var(--accent)"
                  }
                }}
                aria-label={open ? "Tutup menu" : "Buka menu"}
              >
                <Box
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </Box>
              </IconButton>
            </Box>
          </Toolbar>

          {/* Expand menu */}
          <Collapse in={open} timeout={300}>
            <Box sx={{ display: "block" }}>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 0.5 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, px: 1.5, pb: 2, pt: 1 }}>
                {menu.map(({ label, link, icon }) => (
                  <Button
                    key={label}
                    component={NextLink}
                    href={link}
                    onClick={() => setOpen(false)}
                    fullWidth
                    startIcon={icon}
                    sx={{
                      justifyContent: "flex-start",
                      color: "var(--background)",
                      backgroundColor: isActive(link) ? "var(--accent)" : "transparent",
                      borderRadius: 2,
                      px: 2,
                      py: 1.2,
                      textTransform: "none",
                      fontSize: "0.9rem",
                      fontWeight: isActive(link) ? 700 : 400,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: isActive(link)
                          ? "var(--accent)"
                          : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Collapse>
        </AppBar>
      )
    }

    // ── DESKTOP SIDEBAR ──
    return (
      <Box
        sx={{
          width: 240,
          minHeight: "100vh",
          backgroundColor: "var(--navbar)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 3, py: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "var(--background)" }}>
            SiagaKu
          </Typography>
          <Typography variant="caption" sx={{ color: "var(--background)", opacity: 0.6 }}>
            Admin Panel
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <List sx={{ px: 1.5, py: 1.5, flexGrow: 1 }}>
          {menu.map(({ label, link, icon }) => (
            <ListItemButton
              key={label}
              component={NextLink}
              href={link}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: isActive(link) ? "var(--accent)" : "transparent",
                "&:hover": {
                  backgroundColor: isActive(link)
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "var(--background)", minWidth: 36, opacity: isActive(link) ? 1 : 0.7 }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{
                  primary: {
                    fontSize: "0.875rem",
                    fontWeight: isActive(link) ? 700 : 400,
                    color: "var(--background)",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ px: 1.5, py: 1.5 }}>
          <Button
            fullWidth
            startIcon={<IconLogout size={20} />}
            onClick={handleLogout}
            sx={{
              justifyContent: "flex-start",
              px: 2, py: 1,
              borderRadius: 2,
              color: "var(--background)",
              opacity: 0.7,
              textTransform: "none",
              fontSize: "0.875rem",
              "&:hover": { opacity: 1, backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    )
  }