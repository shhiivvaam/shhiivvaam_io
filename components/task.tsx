"use client"

import { useState } from "react"
import { Pencil, Trash2, Clock, Calendar } from "lucide-react"
import type { TaskData } from "@/constants/types"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { format } from "date-fns"

interface TaskProps {
    task: TaskData
    onEdit?: (id: string, updates: Partial<TaskData>) => void
    onDelete?: (id: string) => void
}

export function Task({ task, onEdit, onDelete }: TaskProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative bg-card hover:bg-accent rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <p className="text-sm">{task.content}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Created {format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                        </div>
                    </div>
                    {onEdit && onDelete && (
                        <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(task.id, { content: task.content })}
                                className="h-8 w-8"
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(task.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
            <div
                className="absolute inset-x-0 bottom-0 h-1 rounded-b-lg"
                style={{
                    background:
                        task.quadrant === "do-first"
                            ? "#00ff00"
                            : task.quadrant === "do-later"
                                ? "#008080"
                                : task.quadrant === "delegate"
                                    ? "#ffd700"
                                    : "#ff4500",
                }}
            />
        </motion.div>
    )
}

