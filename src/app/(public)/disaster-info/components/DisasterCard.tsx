"use client"

import Image from "next/image"
import { Card, CardActionArea, Typography, Box } from "@mui/material"
import { IconCaretDownFilled } from "@tabler/icons-react"

type DisasterCardProps = {
  name: string
  image: string
  overview: string
  onclick?: () => void
}

export default function DisasterCard({
  name,
  image,
  overview,
  onclick
}: DisasterCardProps) {

  return (
    <Card
      className="cursor-pointer overflow-hidden"
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          md: "75rem",
        },
        mx: "auto",
      }}
    >
      <CardActionArea
        onClick={() => onclick?.()}
        className="group relative h-full"
        sx={{ minHeight: 160 }}
      >

        {/* Background image */}
        <Image
          src={image}
          alt={name}
          fill
          sizes="300px"
          priority
          className="object-cover blur-xs"
        />

        {/* Overlay */}
        <Box className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

        {/* Content */}
        <Box className="absolute inset-0 flex flex-col">

          {/* Title + shortDescription — tengah */}
          <Box
            className="flex flex-col items-center justify-center w-full flex-1"
            sx={{ px: 3, pt: 4 }}
          >
            <Typography
              variant="h6"
              className="font-semibold text-center"
              sx={{ color: "var(--background)" }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2"
              sx={{ color: "var(--background)" }}
            >
              {overview}
            </Typography>
          </Box>

          {/* Bottom toggle */}
          <Box className="flex flex-col items-center pb-4 gap-1">
            <Typography
              variant="caption"
              sx={{
                color: "var(--background)",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Lihat detailnya
            </Typography>
            <Box
              sx={{
                color: "var(--background)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconCaretDownFilled size={16} />
            </Box>
          </Box>

        </Box>

      </CardActionArea>
    </Card>
  )
} 