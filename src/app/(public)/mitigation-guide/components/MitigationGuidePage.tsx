"use client";

import { useState, useEffect, useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";

import MitigationGuideCard from "./MitigationGuideCard";
import RecommendationSection from "@/components/ui/RecommendationSection";
import SkeletonRecommendationCard from "@/components/ui/SkeletonRecommendationCard";

import type { Disaster } from "@/types/disaster";
import type { MitigationGuide } from "@/types/mitigationGuide";
import type { Province } from "@/types/province";
import type { DisasterRisk } from "@/types/disasterRisk";

import { useGeolocation } from "@/hooks/useGeolocation";
import { getProvinces } from "@/services/provinceServices";
import { getDisasterRisks } from "@/services/disasterRiskServices";
import { findNearestProvince } from "@/utils/location";
import { getRecommendedDisasters } from "@/utils/recommendation";

type Props = {
  disasters: Disaster[];
  mitigationGuides: MitigationGuide[];
};

export default function MitigationGuidePage({
    disasters,
    mitigationGuides
}: Props) {

    const { location, status } = useGeolocation()

    const [openCardId, setOpenCardId] = useState<number | string | null>(null);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [disasterRisks, setDisasterRisks] = useState<DisasterRisk[]>([]);
    const [openRecommendedCardId, setOpenRecommendedCardId] = useState<number | string | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            
            const provincesData = await getProvinces();
            const risksData = await getDisasterRisks();

            setProvinces(provincesData);
            setDisasterRisks(risksData);
        }

        fetchData();
    }, []);

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

            <Box className="mb-12">

                <Typography variant="h4" className="font-bold text-center">
                    Panduan Mitigasi
                </Typography>

                <Typography variant="body1" className="text-[var(--primary)] text-center">
                    Temukan langkah-langkah mitigasi yang dapat membantu Anda
                    mempersiapkan diri sebelum, saat, dan setelah bencana terjadi.
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
                {recommended.map(disaster => {
                    const mitigations = mitigationGuides.filter(m => m.disasterId === disaster.id)
                    return (
                        <MitigationGuideCard
                            key={disaster.id}
                            id={disaster.id}
                            disasterName={disaster.name}
                            mitigations={mitigations}
                            openCardId={openRecommendedCardId}
                            setOpenCardId={setOpenRecommendedCardId}
                        />
                    )
                })}
            </RecommendationSection>


            {/* ALL DISASTERS */}

            <Box>

                <Typography variant="h5" className="font-semibold">
                    Semua Panduan Mitigasi
                </Typography>

                <Box
                    className="flex flex-col items-center mt-4"
                    sx={{
                        gap: 2,
                    }}
                >

                    {disasters.map((disaster) => {

                        const mitigations = mitigationGuides.filter(
                            m => m.disasterId === disaster.id
                        )

                        return (

                            <Box
                                key={disaster.id}
                                sx={{
                                    width: "100%",
                                }}
                            >

                                <MitigationGuideCard
                                    id={disaster.id}
                                    disasterName={disaster.name}
                                    mitigations={mitigations}
                                    openCardId={openCardId}
                                    setOpenCardId={setOpenCardId}
                                />

                            </Box>

                        )

                    })}

                </Box>

            </Box>

    </Container>
  );
}