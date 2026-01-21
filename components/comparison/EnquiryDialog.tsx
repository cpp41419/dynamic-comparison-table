"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const preselectedQuestions = [
    "What are the course fees and payment options?",
    "What is the course duration and study mode?",
    "What are the entry requirements for this course?",
    "What kind of career support is provided after graduation?",
    "Can I get a detailed course outline or syllabus?",
]

interface EnquiryDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    provider: any
    course: {
        code: string
        qualification: string
    }
    onSubmit: (formData: any) => Promise<void>
}

export function EnquiryDialog({ isOpen, onOpenChange, provider, course, onSubmit }: EnquiryDialogProps) {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        customMessage: "",
    })
    const [selectedQuestions, setSelectedQuestions] = React.useState<string[]>([])

    const handleQuestionChange = (question: string, checked: boolean) => {
        if (checked) {
            if (selectedQuestions.length < 3) {
                setSelectedQuestions((prev) => [...prev, question])
            } else {
                alert("You can select a maximum of 3 questions.")
            }
        } else {
            setSelectedQuestions((prev) => prev.filter((q) => q !== question))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const messageContent =
            selectedQuestions.map((q) => `- ${q}`).join("\n") +
            (formData.customMessage ? `\n\nAdditional Message:\n${formData.customMessage}` : "")

        await onSubmit({
            ...formData,
            message: messageContent,
        })

        // Reset form after successful submission
        setFormData({ name: "", email: "", phone: "", customMessage: "" })
        setSelectedQuestions([])
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Enquiry for {provider?.name}</DialogTitle>
                    <DialogDescription>
                        Course: {course.code} - {course.qualification}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase text-primary/60">Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="focus-visible:ring-secondary border-primary/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase text-primary/60">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="focus-visible:ring-secondary border-primary/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase text-primary/60">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="focus-visible:ring-secondary border-primary/10"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label className="block text-xs font-bold uppercase text-primary/60">Select up to 3 questions:</Label>
                        <div className="space-y-2">
                            {preselectedQuestions.map((question) => (
                                <div key={question} className="flex items-start space-x-2 group">
                                    <Checkbox
                                        id={question}
                                        checked={selectedQuestions.includes(question)}
                                        onCheckedChange={(checked) => handleQuestionChange(question, checked as boolean)}
                                        className="mt-0.5 border-primary/20 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                                    />
                                    <label htmlFor={question} className="text-sm leading-tight cursor-pointer font-medium text-primary/80 group-hover:text-primary transition-colors">
                                        {question}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customMessage" className="text-xs font-bold uppercase text-primary/60">Additional Message</Label>
                        <Textarea
                            id="customMessage"
                            value={formData.customMessage}
                            onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                            placeholder="Any specific questions or requirements..."
                            rows={3}
                            className="focus-visible:ring-secondary border-primary/10 resize-none"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 text-sm uppercase tracking-wide shadow-lg shadow-secondary/20">
                        Submit Enquiry
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
