import { supabase } from "@/lib/supabase/supabase"
import { Province } from "@/types/province"

export async function getProvinces(): Promise<Province[]> {
  const { data, error } = await supabase
    .from("provinces")
    .select("*")
    .order("name")

  if (error) throw error
  return data as Province[]
}

export async function createProvince(
  payload: Omit<Province, "id">
): Promise<void> {
  const { error } = await supabase.from("provinces").insert({
    name: payload.name,
    latitude: payload.latitude,
    longitude: payload.longitude,
  })
  if (error) throw error
}

export async function updateProvince(
  id: string,
  payload: Omit<Province, "id">
): Promise<void> {
  const { error } = await supabase
    .from("provinces")
    .update({
      name: payload.name,
      latitude: payload.latitude,
      longitude: payload.longitude,
    })
    .eq("id", id)
  if (error) throw error
}

export async function deleteProvince(id: string): Promise<void> {
  const { error } = await supabase
    .from("provinces")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function checkDuplicateProvinceName(
  name: string,
  excludeId?: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("provinces")
    .select("id")
    .ilike("name", name)

  if (error) throw error
  return (data ?? []).some((p) => p.id !== excludeId)
}

export async function getProvinceRelations(id: string): Promise<{
  riskCount: number
  contactCount: number
}> {
  const [{ count: riskCount }, { count: contactCount }] = await Promise.all([
    supabase
      .from("disaster_risks")
      .select("*", { count: "exact", head: true })
      .eq("province_id", id),
    supabase
      .from("emergency_contacts")
      .select("*", { count: "exact", head: true })
      .eq("province_id", id),
  ])

  return {
    riskCount: riskCount ?? 0,
    contactCount: contactCount ?? 0,
  }
}