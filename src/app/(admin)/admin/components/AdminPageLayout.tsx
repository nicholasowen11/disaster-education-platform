"use client"

import { Box, Button, Typography, Snackbar, Alert } from "@mui/material"
import { IconPlus } from "@tabler/icons-react"

type Props = {
  title: string
  addLabel: string
  onAdd: () => void
  loading?: boolean
  success: string | null
  error: string | null
  onCloseSuccess: () => void
  onCloseError: () => void
  suppressError?: boolean

  disableAdd?: boolean
  addDisabledText?: string

  children: React.ReactNode
}

export default function AdminPageLayout({
  title,
  addLabel,
  onAdd,
  loading = false,
  success,
  error,
  onCloseSuccess,
  onCloseError,
  suppressError = false,
  disableAdd = false,
  addDisabledText,
  children,
}: Props) {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
        },
        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{
            color: "var(--headline)",
            fontSize: {
              xs: "1.35rem",
              sm: "1.6rem",
              md: "1.8rem",
            },
          }}
        >
          {title}
        </Typography>
        <Box className="flex flex-col items-end gap-1">
          <Button
            variant="contained"
            startIcon={<IconPlus size={16} />}
            onClick={onAdd}
            disabled={loading || disableAdd}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minHeight: 44,
              backgroundColor: "var(--accent)",
              "&:hover": { backgroundColor: "var(--primary)" },
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {addLabel}
          </Button>

          {disableAdd && addDisabledText && (
            <Typography
              variant="caption"
              sx={{
                color: "var(--primary)"
              }}
            >
              {addDisabledText}
            </Typography>
          )}
        </Box>
      </Box>

      {/* FEEDBACK */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={onCloseSuccess}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={onCloseSuccess}
        >
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error && !suppressError}
        autoHideDuration={4000}
        onClose={onCloseError}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={onCloseError}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* CONTENT */}
      {children}

    </Box>
  )
}