import { Province } from "@/types/province"

export function findNearestProvince(
  latitude: number,
  longitude: number,
  provinces: Province[]
): Province | null {
  let nearest: Province | null = null
  let minDistance = Infinity

  provinces.forEach((province) => {
    const distance = Math.sqrt(
      Math.pow(latitude - province.latitude, 2) +
      Math.pow(longitude - province.longitude, 2)
    )

    if (distance < minDistance) {
      minDistance = distance
      nearest = province
    }
  })

  // threshold maksimal
  // semakin kecil = semakin strict
  const MAX_DISTANCE = 0.3

  if (minDistance > MAX_DISTANCE) {
    return null
  }

  return nearest
}