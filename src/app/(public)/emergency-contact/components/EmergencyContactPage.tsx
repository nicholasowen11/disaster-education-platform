"use client"

import { useEffect, useState, useMemo } from "react"

import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material"

import {
  IconMapPin,
  IconShield,
} from "@tabler/icons-react"

import ContactCard from "./ContactCard"
import ContactCardSkeleton from "./ContactCardSkeleton"
import EmptyStateCard from "./EmptyStateCard"

import { useGeolocation } from "@/hooks/useGeolocation"
import { findNearestProvince } from "@/utils/location"

import { getProvinces } from "@/services/provinceServices"
import {
  getNationalContacts,
  getLocalContacts,
} from "@/services/emergencyContactServices"

import { Province } from "@/types/province"
import { EmergencyContact } from "@/types/emergencyContact"

function SectionHeader({
  icon,
  title,
  subtitle,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  iconBg: string
  iconColor: string
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      className="mb-5"
    >
      <Box
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
        sx={{
          backgroundColor: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="h6"
          className="font-bold"
          sx={{ color: "var(--headline)" }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          className="text-gray-500"
        >
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function EmergencyContactPage() {

  const { location, status } = useGeolocation()

  const [provinces, setProvinces] = useState<Province[]>([])
  const [nationalContacts, setNationalContacts] = useState<EmergencyContact[]>([])
  const [localContacts, setLocalContacts] = useState<EmergencyContact[]>([])

  useEffect(() => {

    const fetchInitial = async () => {

      const [
        provincesData,
        nationalData,
      ] = await Promise.all([
        getProvinces(),
        getNationalContacts(),
      ])

      setProvinces(provincesData)
      setNationalContacts(nationalData)
    }

    fetchInitial()

  }, [])

  const {
    nearestProvince,
    hasCoverage,
  } = useMemo(() => {

    if (
      status === "LOADING" ||
      provinces.length === 0
    ) {
      return {
        nearestProvince: null,
        hasCoverage: true,
      }
    }

    if (status === "ERROR" || !location) {
      return {
        nearestProvince: null,
        hasCoverage: true,
      }
    }

    const province = findNearestProvince(
      location.latitude,
      location.longitude,
      provinces
    )

    if (!province) {
      return {
        nearestProvince: null,
        hasCoverage: false,
      }
    }

    return {
      nearestProvince: province,
      hasCoverage: true,
    }

  }, [location, status, provinces])

  useEffect(() => {

    if (!nearestProvince) return

    const fetchLocalContacts = async () => {

      const data = await getLocalContacts(nearestProvince.id)

      setLocalContacts(data)
    }

    fetchLocalContacts()

  }, [nearestProvince])

  const initialLoading =
    provinces.length === 0 ||
    nationalContacts.length === 0

  const localLoading =
    status === "LOADING" ||
    provinces.length === 0

  const isLocationError =
    status === "ERROR"

  return (
    <Container
      maxWidth="lg"
      className="py-12"
    >

      {/* HEADER */}
      <Box className="mb-12 text-center">

        <Typography
          variant="h4"
          className="font-bold"
          sx={{ color: "var(--headline)" }}
        >
          Kontak Darurat
        </Typography>

        <Typography
          variant="body1"
          className="mt-2 text-[var(--primary)]"
        >
          Hubungi layanan resmi BNPB dan BPBD
          untuk bantuan dan penanganan darurat.
        </Typography>

      </Box>

      <Grid container spacing={4}>

        {/* BNPB */}
        <Grid size={{ xs: 12, md: 6 }}>

          <SectionHeader
            icon={<IconShield size={20} />}
            title="BNPB"
            subtitle="Kontak nasional resmi"
            iconBg="rgba(192,133,82,0.12)"
            iconColor="var(--accent)"
          />

          <Stack spacing={2}>

            {initialLoading ? (
              <ContactCardSkeleton />
            ) : nationalContacts.length === 0 ? (

              <EmptyStateCard
                icon="🔍"
                title="Kontak BNPB Tidak Tersedia"
                description="Belum ada kontak BNPB yang tersedia."
              />

            ) : (

              nationalContacts.map((item) => (
                <ContactCard
                  key={item.id}
                  item={item}
                  accentColor="var(--accent)"
                  bgColor="rgba(192,133,82,0.12)"
                  subtitle="Kontak nasional resmi"
                />
              ))

            )}

          </Stack>

        </Grid>

        {/* BPBD */}
        <Grid size={{ xs: 12, md: 6 }}>

          <SectionHeader
            icon={<IconMapPin size={20} />}
            title="BPBD"
            subtitle="Kontak berdasarkan lokasi Anda"
            iconBg="rgba(140,90,60,0.12)"
            iconColor="var(--primary)"
          />

          <Stack spacing={2}>

            {localLoading ? (

              <ContactCardSkeleton />

            ) : isLocationError ? (

              <EmptyStateCard
                icon="📡"
                title="Izin Lokasi Diperlukan"
                description="Aktifkan izin lokasi di browser Anda untuk menampilkan kontak BPBD terdekat dan muat ulang halaman ini."
              />

            ) : !hasCoverage ? (

              <EmptyStateCard
                icon="🗺️"
                title="Di Luar Jangkauan Layanan"
                description="Saat ini layanan kontak BPBD belum tersedia dalam cakupan sistem."
              />

            ) : localContacts.length === 0 ? (

              <EmptyStateCard
                icon="🔍"
                title="Kontak BPBD Tidak Tersedia"
                description="Belum ada kontak BPBD untuk wilayah ini."
              />

            ) : (
              
              localContacts.map((item) => (
                <ContactCard
                  key={item.id}
                  item={item}
                  accentColor="var(--primary)"
                  bgColor="rgba(140,90,60,0.12)"
                  subtitle="Kontak BPBD daerah"
                />
              ))

            )}

          </Stack>

        </Grid>

      </Grid>

    </Container>
  )
}