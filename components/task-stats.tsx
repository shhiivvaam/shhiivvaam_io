"use client"

import type { TaskData } from "@/constants/types"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface TaskStatsProps {
    tasks: TaskData[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
    const totalTasks = tasks.length
    const doFirstTasks = tasks.filter((t) => t.quadrant === "do-first").length
    const doLaterTasks = tasks.filter((t) => t.quadrant === "do-later").length
    const delegateTasks = tasks.filter((t) => t.quadrant === "delegate").length
    const eliminateTasks = tasks.filter((t) => t.quadrant === "eliminate").length

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Do First</h3>
                            <span className="text-2xl font-bold text-[#00ff00]">{doFirstTasks}</span>
                        </div>
                        <Progress
                            value={(doFirstTasks / totalTasks) * 100 || 0}
                            className="bg-[#00ff00]/20"
                            // indicatorClassName="bg-[#00ff00]"
                        />
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Do Later</h3>
                            <span className="text-2xl font-bold text-[#008080]">{doLaterTasks}</span>
                        </div>
                        <Progress
                            value={(doLaterTasks / totalTasks) * 100 || 0}
                            className="bg-[#008080]/20"
                            // indicatorClassName="bg-[#008080]"
                        />
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Delegate</h3>
                            <span className="text-2xl font-bold text-[#ffd700]">{delegateTasks}</span>
                        </div>
                        <Progress
                            value={(delegateTasks / totalTasks) * 100 || 0}
                            className="bg-[#ffd700]/20"
                            // indicatorClassName="bg-[#ffd700]"
                        />
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Eliminate</h3>
                            <span className="text-2xl font-bold text-[#ff4500]">{eliminateTasks}</span>
                        </div>
                        <Progress
                            value={(eliminateTasks / totalTasks) * 100 || 0}
                            className="bg-[#ff4500]/20"
                            // indicatorClassName="bg-[#ff4500]"
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}