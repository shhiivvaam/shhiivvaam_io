export interface TaskData {
    id: string
    content: string
    quadrant: "do-first" | "do-later" | "delegate" | "eliminate"
    createdAt: string
}