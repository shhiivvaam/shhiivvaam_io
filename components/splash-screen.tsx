"use client"

import { motion } from "framer-motion"

export function SplashScreen() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.h1
                    className="text-4xl font-bold text-white mb-4"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                    SuperTasks
                </motion.h1>
                <motion.div
                    className="w-16 h-16 border-t-4 border-white rounded-full animate-spin mx-auto"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
            </motion.div>
        </div>
    )
}

