"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Chip } from "@mui/material"

type Props = {
  status: "LOADING" | "SUCCESS" | "ERROR"
  hasCoverage: boolean
  provinceName: string
  hasData: boolean
  loadingFallback: React.ReactNode
  children: React.ReactNode
}

export default function RecommendationSection({
  status,
  hasCoverage,
  provinceName,
  hasData,
  loadingFallback,
  children,
}: Props) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const init = async () => {
      await setMounted(true)
    }
    init()
  }, [])

  const isLoading = !mounted || status === "LOADING"
  const isError = status === "ERROR"

  return (
    <Box className="mb-12">

      {/* HEADER */}
      <Box
        className="flex items-center justify-between flex-wrap gap-2 mb-4"
      >
        <Typography
          variant="h5"
          className="font-semibold"
          sx={{
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
            },
            textAlign: {
              xs: "center",
              sm: "left",
            },
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          📍 Rekomendasi Berdasarkan Lokasi Anda
        </Typography>

        {mounted && !isLoading && !isError && hasCoverage && provinceName && (
          <Chip
            label={provinceName}
            size="small"
            sx={{
              backgroundColor: "var(--accent)",
              color: "var(--background)",
              fontWeight: 600,
              fontSize: "0.75rem",
              mx: {
                xs: "auto",
                sm: 0,
              },
            }}
          />
        )}
      </Box>

      {/* LOADING */}
      {isLoading && (
        <Box
          className="flex flex-wrap justify-center mt-2"
          sx={{
            gap: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          {loadingFallback}
        </Box>
      )}

      {/* EMPTY STATES */}
      {mounted && !isLoading && (isError || !hasCoverage || !hasData) && (
        <Box
          className="flex flex-wrap justify-center mt-2 rounded-sm"
          sx={{
            gap: {
              xs: 2,
              sm: 3,
            },
            backgroundColor: "var(--card)",
            border: "1.5px dashed var(--accent)"
          }}
        >
          <Box
            className="
              relative
              overflow-hidden
              rounded-sm
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
            sx={{
              width: "100%",
              maxWidth: {
                xs: "100%",
                md: "75rem",
              },
              minHeight: 160,
            }}
          >

            {/* Overlay */}
            <Box
              className="absolute inset-0"
              sx={{
                backgroundColor: "white",
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                fontSize="1.5rem"
                lineHeight={1}
              >
                {isError ? "📡" : !hasCoverage ? "🗺️" : "🔍"}
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
                {isError && "Izin Lokasi Diperlukan"}
                {!isError && !hasCoverage && "Di Luar Jangkauan Layanan"}
                {!isError && hasCoverage && !hasData && "Tidak Ada Risiko Tinggi"}
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
                {isError &&
                  "Aktifkan izin lokasi di browser Anda untuk mendapatkan rekomendasi berdasarkan wilayah terdekat dan muat ulang halaman ini."}

                {!isError && !hasCoverage &&
                  "Saat ini layanan rekomendasi belum tersedia dalam cakupan sistem."}

                {!isError && hasCoverage && !hasData &&
                  `Tidak ditemukan risiko tinggi untuk wilayah ${provinceName}. Tetap waspada dan pelajari semua panduan di bawah.`}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* SUCCESS */}
      {mounted && !isLoading && !isError && hasCoverage && hasData && (
        <Box
          className="flex flex-wrap justify-center mt-2"
          sx={{
            gap: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          {children}
        </Box>
      )}

    </Box>
  )
}