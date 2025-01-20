"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { TaskData } from "@/constants/types"
import { format, differenceInDays } from "date-fns"

interface CompletedTasksProps {
    tasks: TaskData[]
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>
}

export function CompletedTasks({ tasks, setTasks }: CompletedTasksProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const now = new Date()
        const updatedTasks = tasks.filter((task) => {
            const completedDate = new Date(task.completedAt!)
            return differenceInDays(now, completedDate) <= 7
        })
        setTasks(updatedTasks)
    }, [tasks, setTasks])

    return (
        <div className="mt-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
                <span className="text-lg font-semibold">Completed Tasks</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
                        {tasks.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">No completed tasks in the last 7 days.</p>
                        ) : (
                            tasks.map((task) => (
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
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

