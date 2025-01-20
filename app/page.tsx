"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  type DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Plus, LayoutGrid, LayoutList, Moon, Sun, CheckSquare } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { Task } from "@/components/task"
import { AddTaskModal } from "@/components/add-task-modal"
import { useHotkeys } from "react-hotkeys-hook"
import type { TaskData } from "@/constants/types"
import { TaskStats } from "@/components/task-stats"
import { QuadrantGuide } from "@/components/quadrant-guide"
import { motion, AnimatePresence } from "framer-motion"
import { CustomToast } from "@/components/custom-toast"
import { CompletedTasks } from "@/components/completed-tasks"
import { SplashScreen } from "@/components/splash-screen"

export default function TaskManager() {
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isGridView, setIsGridView] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  )

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    const savedCompletedTasks = localStorage.getItem("completedTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks))
    }

    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => setShowSplashScreen(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks))
  }, [completedTasks])

  useHotkeys("a", () => setIsAddModalOpen(true))
  useHotkeys("v", () => setIsGridView((prev) => !prev))
  useHotkeys("d", () => setIsDarkMode((prev) => !prev))

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString())
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id)
        const newQuadrant = over.id as TaskData["quadrant"]

        if (oldIndex !== -1) {
          const updatedTasks = [...tasks]
          const [movedTask] = updatedTasks.splice(oldIndex, 1)
          const updatedTask = { ...movedTask, quadrant: newQuadrant }
          updatedTasks.push(updatedTask)

          showToast(`Task moved to ${newQuadrant.replace("-", " ").toUpperCase()}`, "success")
          return updatedTasks
        }
        return tasks
      })
    }
    setActiveId(null)
  }

  const addTask = (task: TaskData) => {
    setTasks((prev) => [...prev, task])
    showToast("Task added successfully", "success")
  }

  const editTask = (id: string, updates: Partial<TaskData>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
    showToast("Task updated successfully", "success")
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    showToast("Task deleted", "success")
  }

  const completeTask = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      const completedTask = { ...task, completedAt: new Date().toISOString() }
      setCompletedTasks((prev) => [...prev, completedTask])
      setTasks((prev) => prev.filter((t) => t.id !== id))
      showToast("Task completed", "success")
    }
  }

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null

  return (
    <>
      {showSplashScreen ? (
        <SplashScreen />
      ) : (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
            <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    SuperTasks
                  </h1>
                  <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-xs font-medium text-blue-500 dark:text-blue-300">
                    2.0
                  </span>
                  {/* <h1 className="text-2xl font-bold bg-gradient-to-tl from-primary to-primary-100 bg-clip-text text-transparent">
                    SuperTasks
                  </h1>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">2.0</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsGridView((prev) => !prev)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isGridView ? <LayoutGrid className="w-5 h-5" /> : <LayoutList className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsDarkMode((prev) => !prev)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
              <div className="mb-8">
                <TaskStats tasks={tasks} />
              </div>

              <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <motion.div
                  layout
                  className={`grid gap-6 ${isGridView ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
                >
                  <AnimatePresence mode="wait">
                    {["do-first", "do-later", "delegate", "eliminate"].map((quadrant) => (
                      <motion.div
                        key={quadrant}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-2"
                      >
                        <h2
                          className={`font-semibold flex items-center gap-2 ${quadrant === "do-first"
                            ? "text-green-500"
                            : quadrant === "do-later"
                              ? "text-blue-500"
                              : quadrant === "delegate"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                        >
                          {quadrant.replace("-", " ").toUpperCase()}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${quadrant === "do-first"
                              ? "bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300"
                              : quadrant === "do-later"
                                ? "bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300"
                                : quadrant === "delegate"
                                  ? "bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300"
                              }`}
                          >
                            {tasks.filter((t) => t.quadrant === quadrant).length}
                          </span>
                        </h2>
                        <TaskList
                          tasks={tasks.filter((task) => task.quadrant === quadrant)}
                          quadrant={quadrant}
                          onEdit={editTask}
                          onDelete={deleteTask}
                          onComplete={completeTask}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <DragOverlay>
                  {activeTask ? (
                    <Task task={activeTask} onEdit={editTask} onDelete={deleteTask} onComplete={completeTask} />
                  ) : null}
                </DragOverlay>
              </DndContext>

              {completedTasks.length > 0 && (
                <div className="mt-8">
                  <CompletedTasks tasks={completedTasks} setTasks={setCompletedTasks} />
                </div>
              )}

              <motion.button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed right-20 mx-auto bottom-8 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5 mr-2 inline-block" />
                Add Task
              </motion.button>

              <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addTask} />
            </main>

            <QuadrantGuide />
            {toast && <CustomToast message={toast.message} type={toast.type} />}
          </div>
        </div>
      )}
    </>
  )
}