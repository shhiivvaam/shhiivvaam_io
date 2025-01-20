"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface CustomToastProps {
    message: string
    type: "success" | "error"
}

export function CustomToast({ message, type }: CustomToastProps) {
    const icon = type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}
            >
                {icon}
                <span>{message}</span>
            </motion.div>
        </AnimatePresence>
    )
}

