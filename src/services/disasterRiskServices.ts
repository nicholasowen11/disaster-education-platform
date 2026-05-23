import { supabase } from "@/lib/supabase/supabase"
import { DisasterRisk, RiskInput } from "@/types/disasterRisk"
import { mapDisasterRisk, DisasterRiskDB } from "@/utils/mappers/disasterRiskMapper"

export async function getDisasterRisks(): Promise<DisasterRisk[]> {
  const { data, error } = await supabase
    .from("disaster_risks")
    .select("*")

  if (error) throw error
  return (data as DisasterRiskDB[]).map(mapDisasterRisk)
}

export async function createDisasterRisks(
  disasterId: string,
  risks: RiskInput[]
): Promise<void> {
  const rows = risks.map((r) => ({
    disaster_id: disasterId,
    province_id: r.provinceId,
    risk_level: r.riskLevel,
  }))
  const { error } = await supabase.from("disaster_risks").insert(rows)
  if (error) throw error
}

export async function updateDisasterRisks(
  disasterId: string,
  risks: RiskInput[]
): Promise<void> {
  const { error: deleteError } = await supabase
    .from("disaster_risks")
    .delete()
    .eq("disaster_id", disasterId)
  if (deleteError) throw deleteError

  await createDisasterRisks(disasterId, risks)
}

export async function deleteDisasterRisks(disasterId: string): Promise<void> {
  const { error } = await supabase
    .from("disaster_risks")
    .delete()
    .eq("disaster_id", disasterId)
  if (error) throw error
}