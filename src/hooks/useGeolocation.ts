"use client"

import { useEffect, useState } from "react"

type Coordinates = {
  latitude: number
  longitude: number
}

type GeolocationStatus = "LOADING" | "SUCCESS" | "ERROR"

export function useGeolocation() {

  const [location, setLocation] = useState<Coordinates>({ latitude: 0, longitude: 0 })
  const [status, setStatus] = useState<GeolocationStatus>(() => {
    if (typeof window === "undefined") return "LOADING"

    return navigator.geolocation ? "LOADING" : "ERROR"
  })

  useEffect(() => {

    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(

      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setStatus("SUCCESS")
      },

      (error) => {
        console.error("Location error:", error.code, error.message)

        if (error.code === 1)
          console.log("User denied location permission")

        if (error.code === 2)
          console.log("Location unavailable")

        if (error.code === 3)
          console.log("Location request timed out")

        setStatus("ERROR")
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }

    )

  }, [])

  return { location, status }
}