import { supabase } from "@/lib/supabase/supabase"
import { EmergencyContact, EmergencyContactInput } from "@/types/emergencyContact"
import { mapEmergencyContact, EmergencyContactDB } from "@/utils/mappers/emergencyContactMapper"

export async function getEmergencyContacts(): Promise<EmergencyContact[]> {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .select("*")
    .order("name")
  if (error) throw error
  return (data as EmergencyContactDB[]).map(mapEmergencyContact)
}

export async function getNationalContacts(): Promise<EmergencyContact[]> {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .select("*")
    .eq("institution_type", "BNPB")
    .order("name")
  if (error) throw error
  return (data as EmergencyContactDB[]).map(mapEmergencyContact)
}

export async function getLocalContacts(provinceId: string): Promise<EmergencyContact[]> {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .select("*")
    .eq("institution_type", "BPBD")
    .eq("province_id", provinceId)
    .order("name")
  if (error) throw error
  return (data as EmergencyContactDB[]).map(mapEmergencyContact)
}

export async function createEmergencyContact(input: EmergencyContactInput): Promise<void> {
  const { error } = await supabase.from("emergency_contacts").insert({
    name: input.name,
    phone_number: input.phoneNumber,
    institution_type: input.institutionType,
    province_id: input.provinceId ?? null,
  })
  if (error) throw error
}

export async function updateEmergencyContact(id: string, input: EmergencyContactInput): Promise<void> {
  const { error } = await supabase
    .from("emergency_contacts")
    .update({
      name: input.name,
      phone_number: input.phoneNumber,
      institution_type: input.institutionType,
      province_id: input.provinceId ?? null,
    })
    .eq("id", id)
  if (error) throw error
}

export async function deleteEmergencyContact(id: string): Promise<void> {
  const { error } = await supabase
    .from("emergency_contacts")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function checkDuplicateContact(
  name: string,
  phoneNumber: string,
  excludeId?: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .select("id")
    .ilike("name", name)
    .eq("phone_number", phoneNumber)

  if (error) throw error
  return (data ?? []).some((d) => d.id !== excludeId)
}