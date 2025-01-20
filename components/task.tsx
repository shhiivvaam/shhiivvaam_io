import { Pencil, Trash2 } from "lucide-react"
import type { TaskData } from "@/constants/types"

interface TaskProps {
    task: TaskData
    onEdit?: (id: string, updates: Partial<TaskData>) => void
    onDelete?: (id: string) => void
}

export function Task({ task, onEdit, onDelete }: TaskProps) {
    return (
        <div className="bg-white/5 p-4 rounded-lg group">
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm flex-1">{task.content}</p>
                {onEdit && onDelete && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(task.id, { content: task.content })}
                            className="text-white/60 hover:text-white"
                            aria-label="Edit task"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="text-white/60 hover:text-white"
                            aria-label="Delete task"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}