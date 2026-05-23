import ProvincesPage from "./components/ProvincesPage"
import { getProvinces } from "@/services/provinceServices"

export const dynamic = "force-dynamic"

export default async function Page() {
  const provinces = await getProvinces()
  
  return <ProvincesPage provinces={provinces} />
}