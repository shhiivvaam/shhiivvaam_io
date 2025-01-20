"use client"

import React, { useEffect, useState } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import type { TaskData } from "@/constants/types"

interface CommandMenuProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCreateTask: (task: TaskData) => void
}

export function CommandMenu({ open, onOpenChange, onCreateTask }: CommandMenuProps) {
    const [input, setInput] = useState("")

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange(true)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [onOpenChange])

    const handleSelect = (quadrant: TaskData["quadrant"]) => {
        if (input.trim()) {
            onCreateTask({
                id: crypto.randomUUID(),
                content: input.trim(),
                quadrant,
                createdAt: new Date().toISOString(),
            })
            setInput("")
            onOpenChange(false)
        }
    }

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            {/* <CommandInput defaultValue="Type a task and select a quadrant..." value={input} onValueChange={setInput} /> */}
            <CommandInput  value={input} onValueChange={setInput} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Add to quadrant">
                    <CommandItem onSelect={() => handleSelect("do-first")}>
                        <span className="text-[#00ff00]">Do First</span>
                    </CommandItem>
                    <CommandItem onSelect={() => handleSelect("do-later")}>
                        <span className="text-[#008080]">Do Later</span>
                    </CommandItem>
                    <CommandItem onSelect={() => handleSelect("delegate")}>
                        <span className="text-[#ffd700]">Delegate</span>
                    </CommandItem>
                    <CommandItem onSelect={() => handleSelect("eliminate")}>
                        <span className="text-[#ff4500]">Eliminate</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}