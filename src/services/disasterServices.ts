import { supabase } from "@/lib/supabase/supabase"
import { Disaster } from "@/types/disaster"

export async function getDisasters(): Promise<Disaster[]> {
  const { data, error } = await supabase
    .from("disasters")
    .select("*")

  if (error) throw error
  return data as Disaster[]
}

export async function createDisaster(
  payload: Omit<Disaster, "id">
): Promise<void> {
  const { error } = await supabase.from("disasters").insert({
    name: payload.name,
    overview: payload.overview,
    description: payload.description,
    image: payload.image,
    causes: payload.causes,
    impacts: payload.impacts,
  })
  if (error) throw error
}

export async function updateDisaster(
  id: string,
  payload: Omit<Disaster, "id">
): Promise<void> {
  const { error } = await supabase
    .from("disasters")
    .update({
      name: payload.name,
      overview: payload.overview,
      description: payload.description,
      image: payload.image,
      causes: payload.causes,
      impacts: payload.impacts,
    })
    .eq("id", id)
  if (error) throw error
}

export async function deleteDisaster(id: string): Promise<void> {
  const { error } = await supabase
    .from("disasters")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function checkDuplicateName(
  name: string,
  excludeId?: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("disasters")
    .select("id")
    .ilike("name", name)

  if (error) throw error

  return (data ?? []).some((d) => d.id !== excludeId)
}

export async function uploadDisasterImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()
  const filename = `${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from("disaster-images")
    .upload(filename, file, { upsert: true })

  if (error) throw error

  const { data } = supabase.storage
    .from("disaster-images")
    .getPublicUrl(filename)

  return data.publicUrl
}