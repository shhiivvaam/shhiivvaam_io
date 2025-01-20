"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "@/components/task"
import type { TaskData } from "@/constants/types"

interface SortableTaskProps {
    task: TaskData
    onEdit: (id: string, updates: Partial<TaskData>) => void
    onDelete: (id: string) => void
}

export function SortableTask({ task, onEdit, onDelete }: SortableTaskProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Task task={task} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}

