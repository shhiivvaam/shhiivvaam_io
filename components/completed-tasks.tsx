"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { TaskData } from "@/constants/types"
import { format, differenceInDays } from "date-fns"
import { CheckSquare, ChevronDown, ChevronUp } from "lucide-react"

interface CompletedTasksProps {
    tasks: TaskData[]
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>
}

export function CompletedTasks({ tasks, setTasks }: CompletedTasksProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const now = new Date()
        setTasks((currentTasks) =>
            currentTasks.filter((task) => {
                const completedDate = new Date(task.completedAt!)
                return differenceInDays(now, completedDate) <= 7
            }),
        )
    }, [setTasks])

    if (tasks.length === 0) {
        return null
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
            >
                <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-green-500" />
                    <span className="text-lg font-semibold">Completed Tasks</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({tasks.length})</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-2 overflow-hidden"
                    >
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3"
                            >
                                <p className="text-sm text-gray-700 dark:text-gray-300">{task.content}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Completed on {format(new Date(task.completedAt!), "MMM d, yyyy")}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}