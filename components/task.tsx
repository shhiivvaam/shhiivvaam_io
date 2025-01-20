"use client"

import { useState, useRef, useEffect } from "react"
import { Pencil, Trash2, Clock, CheckSquare } from "lucide-react"
import type { TaskData } from "@/constants/types"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"

interface TaskProps {
    task: TaskData
    onEdit?: (id: string, updates: Partial<TaskData>) => void
    onDelete?: (id: string) => void
    onComplete?: (id: string) => void
}

export function Task({ task, onEdit, onDelete, onComplete }: TaskProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(task.content)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditing])

    const quadrantColors = {
        "do-first": "bg-green-500",
        "do-later": "bg-blue-500",
        delegate: "bg-yellow-500",
        eliminate: "bg-red-500",
    }

    const handleSave = () => {
        if (onEdit && editedContent.trim() !== "") {
            onEdit(task.id, { content: editedContent.trim() })
            setIsEditing(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSave()
        }
    }

    return (
        <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
        >
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.div className="flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <textarea
                                    ref={inputRef}
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    onBlur={handleSave}
                                    onKeyDown={handleKeyDown}
                                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 resize-none"
                                    rows={3}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex-1 space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <p className="text-sm text-gray-700 dark:text-gray-300">{task.content}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    <span>Created {format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {onEdit && onDelete && onComplete && (
                        <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.button
                                onClick={() => setIsEditing(true)}
                                className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Pencil className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                                onClick={() => onDelete(task.id)}
                                className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                                onClick={() => onComplete(task.id)}
                                className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <CheckSquare className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
            <div className={`absolute inset-x-0 bottom-0 h-1 rounded-b-lg ${quadrantColors[task.quadrant]}`} />
        </motion.div>
    )
}

