"use client"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableTask } from "./sortable-task"
import type { TaskData } from "@/constants/types"
import { motion, AnimatePresence } from "framer-motion"

interface TaskListProps {
    tasks: TaskData[]
    onEdit: (id: string, updates: Partial<TaskData>) => void
    onDelete: (id: string) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
    return (
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <motion.div layout className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            layout
                        >
                            <SortableTask task={task} onEdit={onEdit} onDelete={onDelete} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </SortableContext>
    )
}

