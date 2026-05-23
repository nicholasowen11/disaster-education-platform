"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabase"
import AdminSidebar from "@/components/layout/AdminNavbar"
import { Box, CircularProgress, Typography } from "@mui/material"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login")
      } else {
        setAuthorized(true)
      }

      setChecking(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.replace("/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  if (checking) {
    return (
      <Box
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        sx={{ backgroundColor: "var(--background)" }}
      >
        <CircularProgress sx={{ color: "var(--accent)" }} />

        <Typography
          variant="body2"
          sx={{ color: "var(--primary)" }}
        >
          Memeriksa sesi...
        </Typography>
      </Box>
    )
  }

  if (!authorized) return null

  return (
    <div className="h-screen overflow-hidden flex flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="min-w-0 overflow-y-auto overflow-x-hidden flex-1">
        {children}
      </main>
    </div>
  )
}