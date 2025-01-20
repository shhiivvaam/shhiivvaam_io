"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { TaskData } from "@/constants/types"

interface AddTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (task: TaskData) => void
}

export function AddTaskDialog({ open, onOpenChange, onAdd }: AddTaskDialogProps) {
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
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="content">Task description</Label>
                        <Input
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your task..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Quadrant</Label>
                        <RadioGroup value={quadrant} onValueChange={(value) => setQuadrant(value as TaskData["quadrant"])}>
                            <div className="grid grid-cols-2 gap-4">
                                <Label className="flex items-center space-x-2 cursor-pointer">
                                    <RadioGroupItem value="do-first" />
                                    <span>Do First</span>
                                </Label>
                                <Label className="flex items-center space-x-2 cursor-pointer">
                                    <RadioGroupItem value="do-later" />
                                    <span>Do Later</span>
                                </Label>
                                <Label className="flex items-center space-x-2 cursor-pointer">
                                    <RadioGroupItem value="delegate" />
                                    <span>Delegate</span>
                                </Label>
                                <Label className="flex items-center space-x-2 cursor-pointer">
                                    <RadioGroupItem value="eliminate" />
                                    <span>Eliminate</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Add Task</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

