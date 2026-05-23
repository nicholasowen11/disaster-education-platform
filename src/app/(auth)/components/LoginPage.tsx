"use client"

import { useState } from "react"

import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"

import {
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react"

import { supabase } from "@/lib/supabase/supabase"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleLogin = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {

      setErrorMessage("Credential tidak valid.")
      setOpenSnackbar(true)

      return
    }

    window.location.href = "/admin"
  }

  return (
    <>
      <Box
        className="mx-auto rounded-lg max-w-400 bg-(--headline) shadow p-10"
      >

        {/* TITLE */}
        <Box className="mb-6">

          <Typography
            className="text-center"
            variant="h5"
            sx={{
              color: "var(--background)"
            }}
          >
            Admin Login
          </Typography>

        </Box>

        {/* EMAIL */}
        <Typography
          variant="h5"
          sx={{
            color: "var(--background)"
          }}
        >
          Email
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{
            input: {
              color: "var(--background)",
            },

            "& .MuiOutlinedInput-root": {

              "& fieldset": {
                borderColor: "var(--background)",
              },

              "&:hover fieldset": {
                borderColor: "var(--background)",
              },

              "&.Mui-focused fieldset": {
                borderColor: "var(--background)",
              },
            },
          }}
        />

        {/* PASSWORD */}
        <Typography
          variant="h5"
          sx={{
            color: "var(--background)"
          }}
        >
          Password
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          variant="outlined"

          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">

                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      color: "var(--background)"
                    }}
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </IconButton>

                </InputAdornment>
              )
            }
          }}

          sx={{
            input: {
              color: "var(--background)",
            },

            "& .MuiOutlinedInput-root": {

              "& fieldset": {
                borderColor: "var(--background)",
              },

              "&:hover fieldset": {
                borderColor: "var(--background)",
              },

              "&.Mui-focused fieldset": {
                borderColor: "var(--background)",
              },
            },
          }}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 2,

            color: "var(--background)",
            backgroundColor: "var(--accent)",

            "&:hover": {
              color: "var(--accent)",
              backgroundColor: "var(--background)"
            }
          }}
        >
          Login
        </Button>

      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >

        <Alert
          severity="error"
          variant="filled"
          color="error"
          onClose={() => setOpenSnackbar(false)}
          sx={{
            width: "100%",
            color: "var(--background)",

            "& .MuiAlert-icon": {
              color: "var(--background)"
            }
          }}
        >
          {errorMessage}
        </Alert>

      </Snackbar>
    </>
  )
}