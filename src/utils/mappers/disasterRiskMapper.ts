import { DisasterRisk } from "@/types/disasterRisk"

export interface DisasterRiskDB {
  id: string
  disaster_id: string
  province_id: string
  risk_level: "low" | "medium" | "high"
}

export function mapDisasterRisk(data: DisasterRiskDB): DisasterRisk {
  return {
    id: data.id,
    disasterId: data.disaster_id,
    provinceId: data.province_id,
    riskLevel: data.risk_level
  }
}