import { Disaster } from "@/types/disaster";
import { DisasterRisk } from "@/types/disasterRisk";

export function getRecommendedDisasters(
  disasters: Disaster[],
  disasterRisks: DisasterRisk[],
  provinceId: string
) {

  const risks = disasterRisks.filter(
    r => r.provinceId === provinceId && r.riskLevel === "high"
  )

  const disasterIds = risks.map(r => r.disasterId)

  return disasters.filter(d => disasterIds.includes(d.id))
}