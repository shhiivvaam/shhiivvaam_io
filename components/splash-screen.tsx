"use client"

import React from 'react';
import { motion } from "framer-motion";

interface MotionCircleProps {
    delay: number;
    size: string;
    duration: number;
    className: string;
    style?: React.CSSProperties;
}

const MotionCircle: React.FC<MotionCircleProps> = ({ delay, size, duration, className, style }) => (
    <motion.div
        className={`absolute rounded-full ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5]
        }}
        transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse"
        }}
        style={{
            width: size,
            height: size,
            ...style
        }}
    />
);

export function SplashScreen() {
    const containerVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const letterVariants = {
        initial: { y: 100, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        }
    };

    const letters = "SuperTasks".split("");

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
            <MotionCircle
                delay={0}
                size="300px"
                duration={3}
                className="bg-blue-900/10 blur-2xl"
                style={{ top: '10%', left: '20%' }}
            />
            <MotionCircle
                delay={1}
                size="400px"
                duration={3}
                className="bg-purple-900/10 blur-2xl"
                style={{ bottom: '10%', right: '20%' }}
            />

            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="relative z-10 text-center"
            >
                <div className="flex justify-center mb-8">
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={letterVariants}
                            className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-colors duration-300"
                            style={{ textShadow: '0 0 60px rgba(96, 165, 250, 0.3)' }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-2xl text-gray-400 font-light tracking-wider mb-12"
                >
                    Organize • Prioritize • Achieve
                </motion.p>

                <motion.div
                    className="relative w-16 h-16 mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="absolute inset-0 border-4 border-gray-700 rounded-full"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.1 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 border-t-4 border-blue-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SplashScreen;