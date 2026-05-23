"use client"

import { Card, Skeleton, Box } from "@mui/material"

export default function SkeletonMitigationCard() {
  return (
    <Card
      className="cursor-pointer overflow-hidden"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: {
          xs: "100%",
          md: "75rem",
        },
        mx: "auto",
      }}
    >
      {/* Background skeleton — absolute supaya tidak mendorong konten */}
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Konten di atas background skeleton */}
      <Box className="flex flex-col items-center" sx={{ position: "relative", zIndex: 1 }}>

        {/* TITLE area */}
        <Box
          className="flex items-center justify-center w-full"
          sx={{ py: 4, px: 3, minHeight: 100 }}
        >
          <Skeleton
            variant="text"
            width={120}
            height={32}
            animation="wave"
          />
        </Box>

        {/* TOGGLE BUTTON area */}
        <Box className="flex flex-col items-center pb-4 gap-1">
          <Skeleton
            variant="text"
            width={100}
            height={20}
            animation="wave"
          />
          <Skeleton
            variant="circular"
            width={16}
            height={16}
            animation="wave"
          />
        </Box>

      </Box>
    </Card>
  )
}