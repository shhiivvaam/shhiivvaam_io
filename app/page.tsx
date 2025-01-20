"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Plus, LayoutGrid, LayoutList, Moon, Sun } from "lucide-react"
import { TaskList } from "./components/task-list"
import { Task } from "./components/task"
import { AddTaskDialog } from "./components/add-task-dialog"
import { useHotkeys } from "react-hotkeys-hook"
import type { TaskData } from "./types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { TaskStats } from "./components/task-stats"
import { QuadrantGuide } from "./components/quadrant-guide"
import { CommandMenu } from "./components/command-menu"
import { motion, AnimatePresence } from "framer-motion"

export default function TaskManager() {
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isGridView, setIsGridView] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { toast } = useToast()

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Handle keyboard shortcuts
  useHotkeys("space", () => setIsAddDialogOpen(true))
  useHotkeys("cmd+k", () => setIsAddDialogOpen(true))
  useHotkeys("v", () => setIsGridView((prev) => !prev))
  useHotkeys("d", () => setIsDarkMode((prev) => !prev))

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id)
        const newIndex = tasks.findIndex((task) => task.id === over.id)

        // Update task's quadrant if dropped in a different quadrant
        const updatedTasks = arrayMove(tasks, oldIndex, newIndex)
        const activeTask = updatedTasks[newIndex]
        const overTask = tasks[newIndex]

        if (activeTask.quadrant !== overTask.quadrant) {
          updatedTasks[newIndex] = { ...activeTask, quadrant: overTask.quadrant }
          toast({
            title: "Task moved",
            description: `Task moved to ${overTask.quadrant.replace("-", " ").toUpperCase()}`,
          })
        }

        return updatedTasks
      })
    }
    setActiveId(null)
  }

  const addTask = (task: TaskData) => {
    setTasks((prev) => [...prev, task])
    toast({
      title: "Task added",
      description: "Your new task has been created",
    })
  }

  const editTask = (id: string, updates: Partial<TaskData>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    })
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    toast({
      title: "Task deleted",
      description: "Your task has been deleted",
    })
  }

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95 text-foreground">
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                SuperTasks
              </h1>
              <span className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">2.0</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsGridView((prev) => !prev)} className="relative">
                {isGridView ? <LayoutGrid className="w-5 h-5" /> : <LayoutList className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode((prev) => !prev)}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <TaskStats tasks={tasks} />
          </div>

          <motion.div layout className={`grid gap-6 ${isGridView ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            <AnimatePresence mode="wait">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <h2 className="text-[#00ff00] font-semibold flex items-center gap-2">
                    DO FIRST
                    <span className="text-xs bg-[#00ff00]/10 text-[#00ff00] px-2 py-1 rounded-full">
                      {tasks.filter((t) => t.quadrant === "do-first").length}
                    </span>
                  </h2>
                  <TaskList
                    tasks={tasks.filter((task) => task.quadrant === "do-first")}
                    onEdit={editTask}
                    onDelete={deleteTask}
                  />
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <h2 className="text-[#008080] font-semibold flex items-center gap-2">
                    DO LATER
                    <span className="text-xs bg-[#008080]/10 text-[#008080] px-2 py-1 rounded-full">
                      {tasks.filter((t) => t.quadrant === "do-later").length}
                    </span>
                  </h2>
                  <TaskList
                    tasks={tasks.filter((task) => task.quadrant === "do-later")}
                    onEdit={editTask}
                    onDelete={deleteTask}
                  />
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <h2 className="text-[#ffd700] font-semibold flex items-center gap-2">
                    DELEGATE
                    <span className="text-xs bg-[#ffd700]/10 text-[#ffd700] px-2 py-1 rounded-full">
                      {tasks.filter((t) => t.quadrant === "delegate").length}
                    </span>
                  </h2>
                  <TaskList
                    tasks={tasks.filter((task) => task.quadrant === "delegate")}
                    onEdit={editTask}
                    onDelete={deleteTask}
                  />
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <h2 className="text-[#ff4500] font-semibold flex items-center gap-2">
                    ELIMINATE
                    <span className="text-xs bg-[#ff4500]/10 text-[#ff4500] px-2 py-1 rounded-full">
                      {tasks.filter((t) => t.quadrant === "eliminate").length}
                    </span>
                  </h2>
                  <TaskList
                    tasks={tasks.filter((task) => task.quadrant === "eliminate")}
                    onEdit={editTask}
                    onDelete={deleteTask}
                  />
                </motion.div>
              </div>
            </AnimatePresence>
          </motion.div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="fixed left-1/2 bottom-8 -translate-x-1/2 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </Button>

          <AddTaskDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={addTask} />

          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <DragOverlay>{activeTask ? <Task task={activeTask} /> : null}</DragOverlay>
          </DndContext>
        </main>

        <QuadrantGuide />
        <CommandMenu open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onCreateTask={addTask} />
      </div>
    </div>
  )
}