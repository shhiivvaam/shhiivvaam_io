"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HelpCircle } from "lucide-react"

export function QuadrantGuide() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl">
                    <HelpCircle className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Task Quadrants Guide</SheetTitle>
                    <SheetDescription>Learn how to effectively organize your tasks using the four quadrants</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-medium text-[#00ff00]">Do First</h3>
                        <p className="text-sm text-muted-foreground">Important and urgent tasks that require immediate attention</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-[#008080]">Do Later</h3>
                        <p className="text-sm text-muted-foreground">
                            Important but not urgent tasks that contribute to long-term goals
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-[#ffd700]">Delegate</h3>
                        <p className="text-sm text-muted-foreground">
                            Urgent but not important tasks that can be delegated to others
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-[#ff4500]">Eliminate</h3>
                        <p className="text-sm text-muted-foreground">
                            Neither urgent nor important tasks that should be eliminated
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

