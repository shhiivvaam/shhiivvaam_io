"use client"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableTask } from "@/components/sortable-task"
import type { TaskData } from "@/constants/types"

interface TaskListProps {
    tasks: TaskData[]
    onEdit: (id: string, updates: Partial<TaskData>) => void
    onDelete: (id: string) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
    return (
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <SortableTask key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
        </SortableContext>
    )
}

