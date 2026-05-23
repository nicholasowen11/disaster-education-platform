import { Box, Skeleton } from "@mui/material"

export default function ContactCardSkeleton() {
  return (
    <Box
      className="
        h-[14.15rem]
        rounded-xl
        border
        bg-white
        p-6
        flex
        flex-col
      "
      sx={{
        borderColor: "rgba(140,90,60,0.12)",
      }}
    >

      {/* ICON */}
      <Skeleton
        variant="rounded"
        width={44}
        height={44}
        sx={{
          borderRadius: "16px",
        }}
      />

      {/* CONTENT */}
      <Box className="mt-3">
        <Skeleton
          width="65%"
          height={34}
        />

        <Skeleton
          width="45%"
          height={24}
        />
      </Box>

      {/* PUSH BUTTON TO BOTTOM */}
      <Box className="flex-1" />

      {/* BUTTON */}
      <Skeleton
        variant="rounded"
        width="100%"
        height={48}
        sx={{
          borderRadius: "12px",
        }}
      />

    </Box>
  )
}