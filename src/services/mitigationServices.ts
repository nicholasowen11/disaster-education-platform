import { supabase } from "@/lib/supabase/supabase"
import { mapMitigationGuide, MitigationGuideDB } from "@/utils/mappers/mitigationMapper"
import { MitigationGuide } from "@/types/mitigationGuide"

export const getMitigationGuides = async (): Promise<MitigationGuide[]> => {
  const { data, error } = await supabase
    .from("mitigation_guides")
    .select("*")
    .order("step_order")

  if (error) throw error
  return (data as MitigationGuideDB[]).map(mapMitigationGuide)
}

export const createMitigationGuides = async (
  disasterId: string,
  steps: MitigationGuide[]
): Promise<void> => {
  const rows = steps.map((s) => ({
    disaster_id: disasterId,
    phase: s.phase,
    step_order: s.stepOrder,
    title: s.title,
    description: s.description,
  }))
  const { error } = await supabase.from("mitigation_guides").insert(rows)
  if (error) throw error
}

export const updateMitigationGuides = async (
  disasterId: string,
  steps: MitigationGuide[]
): Promise<void> => {
  // Delete semua step lama lalu insert ulang
  const { error: deleteError } = await supabase
    .from("mitigation_guides")
    .delete()
    .eq("disaster_id", disasterId)

  if (deleteError) throw deleteError

  if (steps.length > 0) {
    await createMitigationGuides(disasterId, steps)
  }
}

export const deleteMitigationGuides = async (disasterId: string): Promise<void> => {
  const { error } = await supabase
    .from("mitigation_guides")
    .delete()
    .eq("disaster_id", disasterId)

  if (error) throw error
}
