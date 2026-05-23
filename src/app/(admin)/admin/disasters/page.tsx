import DisastersPage from "./components/DisastersPage"
import { getDisasters } from "@/services/disasterServices"

export default async function Page() {
  const disasters = await getDisasters()
  
  return <DisastersPage disasters={disasters} />
}