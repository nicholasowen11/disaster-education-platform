"use client"

import { useEffect, useState, useMemo } from "react"
import { Box, Container, Typography } from "@mui/material"

import DisasterCard from "@/app/(public)/disaster-info/components/DisasterCard"
import RecommendationSection from "@/components/ui/RecommendationSection"
import SkeletonRecommendationCard from "@/components/ui/SkeletonRecommendationCard"
import DisasterDetailModal from "./DisasterDetailModal"

import { Disaster } from "@/types/disaster"
import { useGeolocation } from "@/hooks/useGeolocation"
import { getRecommendedDisasters } from "@/utils/recommendation"

import { getProvinces } from "@/services/provinceServices"
import { getDisasterRisks } from "@/services/disasterRiskServices"

import { Province } from "@/types/province"
import { DisasterRisk } from "@/types/disasterRisk"

import { findNearestProvince } from "@/utils/location"

type Props = {
  disasters: Disaster[]
}

export default function DisasterInfoPage({ disasters }: Props) {
  const { location, status } = useGeolocation()

  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [disasterRisks, setDisasterRisks] = useState<DisasterRisk[]>([])
  const [open, setOpen] = useState(false)

  const handleOpen = (disaster: Disaster) => {
    setSelectedDisaster(disaster)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const provincesData = await getProvinces()
      const risksData = await getDisasterRisks()
      setProvinces(provincesData)
      setDisasterRisks(risksData)
    }
    fetchData()
  }, [])

  const {
    recommended,
    provinceName,
    hasCoverage
  } = useMemo(() => {

    if (
      status === "LOADING" ||
      provinces.length === 0 ||
      disasterRisks.length === 0
    ) {
      return {
        recommended: [],
        provinceName: "",
        hasCoverage: true
      }
    }

    if (status === "ERROR" || !location) {
      return {
        recommended: [],
        provinceName: "",
        hasCoverage: true
      }
    }

    const nearestProvince = findNearestProvince(
      location.latitude,
      location.longitude,
      provinces
    )

    // Tidak ada provinsi yang cocok
    if (!nearestProvince) {
      return {
        recommended: [],
        provinceName: "",
        hasCoverage: false
      }
    }

    const data = getRecommendedDisasters(
      disasters,
      disasterRisks,
      nearestProvince.id
    ).slice(0, 3)

    return {
      recommended: data,
      provinceName: nearestProvince.name,
      hasCoverage: true
    }

  }, [location, status, provinces, disasterRisks, disasters])

  return (
    <Container maxWidth="lg" className="py-12">

      {/* HEADER */}
      <Box className="mb-12">
        <Typography variant="h4" className="font-bold text-center">
          Informasi Bencana
        </Typography>
        <Typography variant="body1" className="text-[var(--primary)] text-center">
          Pelajari berbagai jenis bencana alam yang berpotensi terjadi di
          wilayah Anda serta pahami risiko dan dampaknya.
        </Typography>
      </Box>

      {/* RECOMMENDATION */}
      <RecommendationSection
        status={status}
        hasCoverage={hasCoverage}
        provinceName={provinceName}
        hasData={recommended.length > 0}
        loadingFallback={<SkeletonRecommendationCard />}
      >
        {recommended.map(item => (
          <DisasterCard
            key={item.id}
            name={item.name}
            image={item.image}
            overview={item.overview}
            onclick={() => handleOpen(item)}
          />
        ))}
      </RecommendationSection>

      {/* ALL DISASTERS */}
      <Box>
        <Typography variant="h5" className="font-semibold">
          Semua Jenis Bencana
        </Typography>
        <Box
          className="flex flex-col items-center mt-4"
          sx={{
            gap: 2,
          }}
        >
          {disasters.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: "100%"
              }}
            >
              <DisasterCard
                key={item.id}
                name={item.name}
                image={item.image}
                overview={item.overview}
                onclick={() => handleOpen(item)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <DisasterDetailModal open={open} disaster={selectedDisaster} onClose={handleClose} />

    </Container>
  )
}