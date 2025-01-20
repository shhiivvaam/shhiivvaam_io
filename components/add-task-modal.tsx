"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { TaskData } from "@/constants/types"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"

interface AddTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (task: TaskData) => void
}

export function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
    const [content, setContent] = useState("")
    const [quadrant, setQuadrant] = useState<TaskData["quadrant"]>("do-first")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        onAdd({
            id: crypto.randomUUID(),
            content: content.trim(),
            quadrant,
            createdAt: new Date().toISOString(),
        })

        setContent("")
        setQuadrant("do-first")
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Task</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Task description
                                </Label>
                                <Input
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter your task.."
                                    className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quadrant</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(["do-first", "do-later", "delegate", "eliminate"] as const).map((q) => (
                                        <button
                                            key={q}
                                            type="button"
                                            onClick={() => setQuadrant(q)}
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${quadrant === q
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                } hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors`}
                                        >
                                            {q.replace("-", " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full px-4 py-2 text-white font-medium rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Add Task
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

