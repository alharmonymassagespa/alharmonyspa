"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, User, Phone, MessageSquare } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timeSlots = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
]

export default function BookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get("service")

  const [formData, setFormData] = useState({
    service: preselectedService || "",
    date: "",
    time: "",
    name: "",
    phone: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.service) newErrors.service = "Please select a service"
    if (!formData.date) newErrors.date = "Please select a date"
    if (!formData.time) newErrors.time = "Please select a time"
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (formData.date) {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "Please select a future date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted, validating...")

    if (validateForm()) {
      console.log("Validation passed, storing data and navigating...")
      sessionStorage.setItem("bookingData", JSON.stringify(formData))
      router.push("/payment")
    } else {
      console.log("Validation failed:", errors)
    }
  }

  const selectedService = siteConfig.services.find((s) => s.id === formData.service)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-lg p-8 md:p-10"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Selection */}
        <div className="space-y-2">
          <Label htmlFor="service" className="flex items-center gap-2 text-[#2e2e2e] font-semibold text-lg">
            <Calendar size={20} />
            Select Service
          </Label>
          <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
            <SelectTrigger id="service" className={`w-full h-12 ${errors.service ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Choose a massage service" />
            </SelectTrigger>
            <SelectContent>
              {siteConfig.services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - {service.duration} (${service.price})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2 text-[#2e2e2e] font-semibold text-lg">
            <Calendar size={20} />
            Select Date
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full h-12 ${errors.date ? "border-red-500" : ""}`}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2 text-[#2e2e2e] font-semibold text-lg">
            <Clock size={20} />
            Select Time
          </Label>
          <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
            <SelectTrigger id="time" className={`w-full h-12 ${errors.time ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-[#2e2e2e] font-semibold text-lg">
            <User size={20} />
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full h-12 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-[#2e2e2e] font-semibold text-lg">
            <Phone size={20} />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full h-12 ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Notes (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="flex items-center gap-2 text-[#2e2e2e] font-semibold text-lg">
            <MessageSquare size={20} />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any special requests or health concerns we should know about?"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full min-h-24"
          />
        </div>

        {/* Booking Summary */}
        {selectedService && (
          <div className="bg-[#d4f1e8] rounded-2xl p-6 space-y-2">
            <h3 className="font-semibold text-[#2e2e2e] text-xl mb-3">Booking Summary</h3>
            <div className="text-[#2e2e2e] space-y-2">
              <p>
                <span className="font-medium">Service:</span> {selectedService.name}
              </p>
              <p>
                <span className="font-medium">Duration:</span> {selectedService.duration}
              </p>
              <p>
                <span className="font-medium">Price:</span> ${selectedService.price}
              </p>
              {formData.date && (
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(formData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {formData.time && (
                <p>
                  <span className="font-medium">Time:</span> {formData.time}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#0d9488] text-white py-5 rounded-full font-semibold text-lg hover:bg-[#0f766e] hover:scale-105 transition-all shadow-lg"
        >
          Proceed to Payment
        </button>
      </form>
    </motion.div>
  )
}
