import EmergencyContactAdminPage from "./components/EmergencyContactsPage";
import { getProvinces } from "@/services/provinceServices";
import { getEmergencyContacts } from "@/services/emergencyContactServices"

export default async function Page() {
    const [provinces, contacts] = await Promise.all([
        getProvinces(),
        getEmergencyContacts(),
    ])

    return <EmergencyContactAdminPage provinces={provinces} contacts={contacts} />;
}