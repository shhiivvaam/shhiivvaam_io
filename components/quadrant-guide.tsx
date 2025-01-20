"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HelpCircle, Clock, Trash2, CheckSquare } from "lucide-react";

export function QuadrantGuide() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the guide has been shown before
        const hasSeenGuide = localStorage.getItem("hasSeenGuide");

        if (!hasSeenGuide) {
            setIsOpen(true); // Open the guide if not shown before
            localStorage.setItem("hasSeenGuide", "true"); // Mark as seen
        }
    }, []);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105"
                >
                    <HelpCircle className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-0">
                <div className="h-full overflow-y-auto px-6 pb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-500 dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <SheetHeader className="sticky top-0 pt-6 pb-4 bg-white dark:bg-gray-900 z-10">
                        <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Task Management Guide
                        </SheetTitle>
                        <SheetDescription className="text-base">
                            Master your tasks with our intuitive quadrant system and task management features
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-8 space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-2">Task Quadrants</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    {
                                        title: "Do First",
                                        color: "#00ff00",
                                        description: "Important and urgent tasks that require immediate attention",
                                        className: "border-l-4 border-[#00ff00]"
                                    },
                                    {
                                        title: "Do Later",
                                        color: "#008080",
                                        description: "Important but not urgent tasks that contribute to long-term goals",
                                        className: "border-l-4 border-[#008080]"
                                    },
                                    {
                                        title: "Delegate",
                                        color: "#ffd700",
                                        description: "Urgent but not important tasks that can be delegated to others",
                                        className: "border-l-4 border-[#ffd700]"
                                    },
                                    {
                                        title: "Eliminate",
                                        color: "#ff4500",
                                        description: "Neither urgent nor important tasks that should be eliminated",
                                        className: "border-l-4 border-[#ff4500]"
                                    }
                                ].map((quadrant) => (
                                    <div
                                        key={quadrant.title}
                                        className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 ${quadrant.className} hover:shadow-md transition-shadow duration-200`}
                                    >
                                        <h3 className="font-medium" style={{ color: quadrant.color }}>
                                            {quadrant.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {quadrant.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold border-b pb-2">Task Management Features</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    <Clock className="w-5 h-5 text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-blue-500">Update Tasks</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Modify task details, priorities, and deadlines anytime
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    <Trash2 className="w-5 h-5 text-red-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-red-500">Delete Tasks</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Remove tasks you no longer need to track
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    <CheckSquare className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-green-500">Completed Tasks</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Your completed tasks are automatically archived and stored for 7 days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default QuadrantGuide;