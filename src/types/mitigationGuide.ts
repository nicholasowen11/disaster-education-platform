export interface MitigationGuide {
    id: string
    disasterId: string
    phase: "before" | "during" | "after"
    stepOrder: number
    title: string
    description: string
}