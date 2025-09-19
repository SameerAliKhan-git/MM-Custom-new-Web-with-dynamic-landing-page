import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const presetAmounts = [
  { value: "1000", label: "₹1,000", description: "Provides school supplies for 5 children" },
  { value: "2500", label: "₹2,500", description: "Sponsors a child's education for 1 month" },
  { value: "5000", label: "₹5,000", description: "Covers healthcare for an elderly person" },
  { value: "10000", label: "₹10,000", description: "Funds vocational training for a youth" }
]

const causes = [
  { value: "general", label: "General Fund - Where needed most" },
  { value: "child-welfare", label: "Child Welfare & Education" },
  { value: "elderly-care", label: "Elderly Care" },
  { value: "disability-support", label: "Disability Support" },
  { value: "youth-skills", label: "Skilling Youth" },
  { value: "social-activities", label: "Social Activities" }
]

interface DonationSelectorProps {
  onAmountChange?: (amount: string) => void
  onCauseChange?: (cause: string) => void
  className?: string
}

export function DonationSelector({ onAmountChange, onCauseChange, className }: DonationSelectorProps) {
  const [selectedAmount, setSelectedAmount] = useState("2500")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCause, setSelectedCause] = useState("general")
  const [isCustom, setIsCustom] = useState(false)

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value)
    setIsCustom(false)
    setCustomAmount("")
    onAmountChange?.(value)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setIsCustom(true)
    setSelectedAmount("")
    onAmountChange?.(value)
  }

  const handleCauseChange = (value: string) => {
    setSelectedCause(value)
    onCauseChange?.(value)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Amount Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Choose Donation Amount</Label>
        <RadioGroup 
          value={isCustom ? "custom" : selectedAmount} 
          onValueChange={(value) => {
            if (value === "custom") {
              setIsCustom(true)
              setSelectedAmount("")
            } else {
              handleAmountChange(value)
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {presetAmounts.map((amount) => (
            <div key={amount.value}>
              <RadioGroupItem value={amount.value} id={amount.value} className="sr-only" />
              <Label
                htmlFor={amount.value}
                className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedAmount === amount.value && !isCustom
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <span className="font-semibold text-lg">{amount.label}</span>
                <span className="text-sm text-muted-foreground mt-1">{amount.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Custom Amount */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom Amount</Label>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="pl-8"
              min="100"
            />
          </div>
        </div>
      </div>

      {/* Cause Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Dedicate Your Donation</Label>
        <Select value={selectedCause} onValueChange={handleCauseChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a cause" />
          </SelectTrigger>
          <SelectContent>
            {causes.map((cause) => (
              <SelectItem key={cause.value} value={cause.value}>
                {cause.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Selection Summary */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Your Donation:</span>
          <span className="font-bold text-primary">
            ₹{isCustom ? customAmount : selectedAmount || "0"}
          </span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          For: {causes.find(c => c.value === selectedCause)?.label}
        </div>
      </div>
    </div>
  )
}