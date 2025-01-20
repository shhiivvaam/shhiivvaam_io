"use client"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { SortableTask } from "./sortable-task"
import type { TaskData } from "@/constants/types"
import { motion, AnimatePresence } from "framer-motion"

interface TaskListProps {
    tasks: TaskData[]
    quadrant: string
    onEdit: (id: string, updates: Partial<TaskData>) => void
    onDelete: (id: string) => void
    onComplete: (id: string) => void
}

export function TaskList({ tasks, quadrant, onEdit, onDelete, onComplete }: TaskListProps) {
    const { setNodeRef } = useDroppable({
        id: quadrant,
    })

    return (
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <motion.div ref={setNodeRef} layout className="space-y-2 min-h-[100px]">
                <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            layout
                        >
                            <SortableTask task={task} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </SortableContext>
    )
}