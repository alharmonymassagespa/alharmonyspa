"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CreditCard, Lock, AlertCircle } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import emailjs from "@emailjs/browser"

// Card brand detection
const detectCardBrand = (number: string): string => {
  const cleaned = number.replace(/\s/g, "")
  if (/^4/.test(cleaned)) return "visa"
  if (/^5[1-5]/.test(cleaned)) return "mastercard"
  if (/^3[47]/.test(cleaned)) return "amex"
  if (/^6(?:011|5)/.test(cleaned)) return "discover"
  return "unknown"
}

// Luhn algorithm for card validation
const luhnCheck = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, "")
  if (!/^\d+$/.test(cleaned)) return false

  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleaned[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Format card number with spaces
const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "")
  const match = cleaned.match(/.{1,4}/g)
  return match ? match.join(" ") : cleaned
}

// Format expiry date
const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
  }
  return cleaned
}

export default function PaymentForm() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [paymentData, setPaymentData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingZip: "",
  })

  const [cardBrand, setCardBrand] = useState("unknown")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Retrieve booking data from sessionStorage
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setBookingData(data)
      const service = siteConfig.services.find((s) => s.id === data.service)
      setSelectedService(service)
    } else {
      // Redirect to booking page if no data
      router.push("/book")
    }
  }, [router])

  useEffect(() => {
    const brand = detectCardBrand(paymentData.cardNumber)
    setCardBrand(brand)
  }, [paymentData.cardNumber])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
    }

    const cleanedCard = paymentData.cardNumber.replace(/\s/g, "")
    if (!cleanedCard) {
      newErrors.cardNumber = "Card number is required"
    } else if (cleanedCard.length < 13 || cleanedCard.length > 19) {
      newErrors.cardNumber = "Invalid card number length"
    } else if (!luhnCheck(cleanedCard)) {
      newErrors.cardNumber = "Invalid card number (failed Luhn check)"
    }

    if (!paymentData.expiry) {
      newErrors.expiry = "Expiry date is required"
    } else {
      const [month, year] = paymentData.expiry.split("/")
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100
      const currentMonth = currentDate.getMonth() + 1

      if (!month || !year || Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
        newErrors.expiry = "Invalid expiry date"
      } else if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
      ) {
        newErrors.expiry = "Card has expired"
      }
    }

    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required"
    } else if (paymentData.cvv.length < 3 || paymentData.cvv.length > 4) {
      newErrors.cvv = "Invalid CVV"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "")
    if (/^\d*$/.test(value) && value.length <= 19) {
      setPaymentData({ ...paymentData, cardNumber: formatCardNumber(value) })
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPaymentData({ ...paymentData, expiry: formatExpiry(value) })
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPaymentData({ ...paymentData, cvv: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const cleanedCard = paymentData.cardNumber.replace(/\s/g, "")
      const last4 = cleanedCard.slice(-4)

      // Prepare email data
      const emailData = {
        customer_name: bookingData.name,
        customer_phone: bookingData.phone,
        service_name: selectedService.name,
        service_duration: selectedService.duration,
        service_price: selectedService.price,
        booking_date: new Date(bookingData.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        booking_time: bookingData.time,
        special_notes: bookingData.notes || "None",
        cardholder_name: paymentData.cardholderName,
        card_last4: last4,
        card_brand: cardBrand.toUpperCase(),
        card_expiry: paymentData.expiry,
        billing_zip: paymentData.billingZip || "Not provided",
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      sessionStorage.removeItem("bookingData")
      router.push("/success")
    } catch (error) {
      console.error("Error sending email:", error)
      setErrors({ submit: "Failed to process booking. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!bookingData || !selectedService) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading booking details...</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Booking Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-lg p-8 h-fit"
      >
        <h2 className="text-2xl font-semibold text-[#2e2e2e] mb-6">Booking Summary</h2>
        <div className="space-y-4 text-base">
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Service:</span>
            <span className="font-semibold text-[#2e2e2e]">{selectedService.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Duration:</span>
            <span className="font-semibold text-[#2e2e2e]">{selectedService.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Date:</span>
            <span className="font-semibold text-[#2e2e2e]">
              {new Date(bookingData.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Time:</span>
            <span className="font-semibold text-[#2e2e2e]">{bookingData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Name:</span>
            <span className="font-semibold text-[#2e2e2e]">{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Phone:</span>
            <span className="font-semibold text-[#2e2e2e]">{bookingData.phone}</span>
          </div>
          {bookingData.notes && (
            <div className="pt-3 border-t border-[#e5e7eb]">
              <span className="text-[#6b7280] block mb-2">Special Requests:</span>
              <span className="text-[#2e2e2e] text-sm">{bookingData.notes}</span>
            </div>
          )}
          <div className="flex justify-between pt-4 border-t border-[#e5e7eb] text-xl">
            <span className="font-bold text-[#2e2e2e]">Total:</span>
            <span className="font-bold text-[#0d9488]">${selectedService.price}</span>
          </div>
        </div>

        {/* Alternate Payment Options */}
        <div className="mt-8 pt-6 border-t border-[#e5e7eb]">
          <h3 className="text-lg font-semibold text-[#2e2e2e] mb-4">Alternate Payment Options</h3>
          <div className="space-y-3">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#d4f1e8] rounded-2xl hover:bg-[#a7e0cf] transition-colors"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-base font-medium text-[#2e2e2e]">Pay with Chime</span>
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#dbeafe] rounded-2xl hover:bg-[#bfdbfe] transition-colors"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                ₿
              </div>
              <span className="text-base font-medium text-[#2e2e2e]">Pay with Crypto</span>
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#fde4d0] rounded-2xl hover:bg-[#fed7aa] transition-colors"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="text-base font-medium text-[#2e2e2e]">Pay with PayPal</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Payment Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-lg p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-[#0d9488]" size={24} />
          <h2 className="text-2xl font-semibold text-[#2e2e2e]">Payment Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="text-[#2e2e2e] font-semibold text-lg">
              Cardholder Name
            </Label>
            <Input
              id="cardholderName"
              type="text"
              placeholder="John Doe"
              value={paymentData.cardholderName}
              onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
              className={`h-12 ${errors.cardholderName ? "border-red-500" : ""}`}
            />
            {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-[#2e2e2e] font-semibold text-lg">
              Card Number
            </Label>
            <div className="relative">
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                className={`h-12 ${errors.cardNumber ? "border-red-500" : ""}`}
              />
              {cardBrand !== "unknown" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CreditCard className="text-[#0d9488]" size={24} />
                </div>
              )}
            </div>
            {cardBrand !== "unknown" && <p className="text-xs text-[#6b7280]">Detected: {cardBrand.toUpperCase()}</p>}
            {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-[#2e2e2e] font-semibold text-lg">
                Expiry (MM/YY)
              </Label>
              <Input
                id="expiry"
                type="text"
                placeholder="12/25"
                value={paymentData.expiry}
                onChange={handleExpiryChange}
                maxLength={5}
                className={`h-12 ${errors.expiry ? "border-red-500" : ""}`}
              />
              {errors.expiry && <p className="text-sm text-red-500">{errors.expiry}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-[#2e2e2e] font-semibold text-lg">
                CVV
              </Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={paymentData.cvv}
                onChange={handleCvvChange}
                className={`h-12 ${errors.cvv ? "border-red-500" : ""}`}
              />
              {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
            </div>
          </div>

          {/* Billing ZIP */}
          <div className="space-y-2">
            <Label htmlFor="billingZip" className="text-[#2e2e2e] font-semibold text-lg">
              Billing ZIP Code (Optional)
            </Label>
            <Input
              id="billingZip"
              type="text"
              placeholder="12345"
              value={paymentData.billingZip}
              onChange={(e) => setPaymentData({ ...paymentData, billingZip: e.target.value })}
              className="h-12"
            />
          </div>

          {errors.submit && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2ba2ba] text-white py-5 rounded-full font-semibold text-lg hover:bg-[#0f766e] hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Processing..." : `Pay $${selectedService.price}`}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
