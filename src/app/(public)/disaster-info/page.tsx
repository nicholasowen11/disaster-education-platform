import DisasterInfoPage from "./components/DisasterInfoPage"
import { getDisasters } from "@/services/disasterServices"

export default async function Page() {

  const disasters = await getDisasters()

  return <DisasterInfoPage disasters={disasters} />

}