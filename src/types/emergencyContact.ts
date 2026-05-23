export type InstitutionType = "BNPB" | "BPBD"

export interface EmergencyContact {
  id: string
  name: string
  phoneNumber: string
  institutionType: InstitutionType
  provinceId: string | null
}

export interface EmergencyContactInput {
  name: string
  phoneNumber: string
  institutionType: InstitutionType
  provinceId: string | null
}