import { EmergencyContact } from "@/types/emergencyContact"

export interface EmergencyContactDB {
  id: string
  name: string
  phone_number: string
  institution_type: "BNPB" | "BPBD"
  province_id: string
}

export function mapEmergencyContact(data: EmergencyContactDB): EmergencyContact {
    return {
        id: data.id,
        name: data.name,
        phoneNumber: data.phone_number,
        institutionType: data.institution_type,
        provinceId: data.province_id || null
    }
}

export function mapDisaster(data: EmergencyContactDB): EmergencyContact {
  return {
    id: data.id,
    name: data.name,
    phoneNumber: data.phone_number,
    institutionType: data.institution_type,
    provinceId: data.province_id || null
  }
}