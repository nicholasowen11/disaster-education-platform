import MitigationGuidePage from "./components/MitigationGuidePage"
import { getDisasters } from "@/services/disasterServices"
import { getMitigationGuides } from "@/services/mitigationServices"

export const dynamic = "force-dynamic"

export default async function Page() {

  const disasters = await getDisasters()
  const mitigationGuides = await getMitigationGuides()

  return (
    <MitigationGuidePage
      disasters={disasters}
      mitigationGuides={mitigationGuides}
    />
  )
}