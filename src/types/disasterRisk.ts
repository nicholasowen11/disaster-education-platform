export interface DisasterRisk {
    id: string
    disasterId: string
    provinceId: string
    riskLevel: "low" | "medium" | "high"
}

export type RiskInput = {
  provinceId: string
  riskLevel: "low" | "medium" | "high"
}