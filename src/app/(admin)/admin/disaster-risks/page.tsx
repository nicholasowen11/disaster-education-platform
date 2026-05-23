import DisasterRisksPage from "./components/DisasterRisksPage"
import { getDisasters } from "@/services/disasterServices"
import { getProvinces } from "@/services/provinceServices"
import { getDisasterRisks } from "@/services/disasterRiskServices"

export default async function Page() {
  const [disasters, provinces, disasterRisks] = await Promise.all([
    getDisasters(),
    getProvinces(),
    getDisasterRisks(),
  ])

  return (
    <DisasterRisksPage
      disasters={disasters}
      provinces={provinces}
      disasterRisks={disasterRisks}
    />
  )
}