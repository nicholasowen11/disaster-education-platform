import { MitigationGuide } from "@/types/mitigationGuide";

export interface MitigationGuideDB {
    id: string
    disaster_id: string;
    phase: "before" | "during" | "after";
    step_order: number;
    title: string;
    description: string;
}

export function mapMitigationGuide(data: MitigationGuideDB): MitigationGuide {
    return {
        id: data.id,
        disasterId: data.disaster_id,
        phase: data.phase,
        stepOrder: data.step_order,
        title: data.title,
        description: data.description
    }
}