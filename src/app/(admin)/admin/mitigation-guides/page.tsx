import MitigationAdminPage from "./components/MitigationGuidesPage";
import { getDisasters } from "@/services/disasterServices"
import { getMitigationGuides } from "@/services/mitigationServices"

export const dynamic = "force-dynamic"

export default async function Page() {
    const [disasters, guides] = await Promise.all([
        getDisasters(),
        getMitigationGuides(),
    ])

    return <MitigationAdminPage disasters={disasters} guides={guides} />;
}