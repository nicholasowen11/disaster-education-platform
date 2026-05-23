"use client"

import { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabase"
import { Box } from "@mui/material"

export default function AuthLayout({ children } : { children: ReactNode }) {
  const router = useRouter()
    
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/admin")
      }
    })
  }, [router])

  return (
    <Box className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Box className="relative z-10">
        {children}
      </Box>
    </Box>
  )
}