"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"
import emailjs from "@emailjs/browser"
import BookingSummary from "./BookingSummary"
import AlternatePaymentOptions from "./AlternatePaymentOptions"
import PaymentDetailsForm from "./PaymentDetailsForm"
import PaymentPopup from "./PaymentPopup"
import type { BookingData, Service, PaymentData, PaymentMethodInfo } from "@/types/payment"

const detectCardBrand = (number: string): string => {
  const cleaned = number.replace(/\s/g, "")
  if (/^4/.test(cleaned)) return "visa"
  if (/^5[1-5]/.test(cleaned)) return "mastercard"
  if (/^3[47]/.test(cleaned)) return "amex"
  if (/^6(?:011|5)/.test(cleaned)) return "discover"
  return "unknown"
}

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

const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "")
  const match = cleaned.match(/.{1,4}/g)
  return match ? match.join(" ") : cleaned
}

const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
  }
  return cleaned
}

export default function PaymentForm() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodInfo | null>(null)

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingZip: "",
  })

  const [cardBrand, setCardBrand] = useState("unknown")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      const data = JSON.parse(storedData) as BookingData
      setBookingData(data)
      const service = siteConfig.services.find((s) => s.id === data.service)
      if (service) {
        setSelectedService(service)
      }
    } else {
      router.push("/book")
    }
  }, [router])

  useEffect(() => {
    const brand = detectCardBrand(paymentData.cardNumber)
    setCardBrand(brand)
  }, [paymentData.cardNumber])

  const validateForm = (): boolean => {
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
      newErrors.cardNumber = "Invalid card number"
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
      const emailParams = {
        to_email: siteConfig.email,
        from_name: bookingData?.name,
        service: selectedService?.name,
        date: bookingData?.date,
        time: bookingData?.time,
        phone: bookingData?.phone,
        amount: selectedService?.price,
        cardholder: paymentData.cardholderName,
        card_last4: paymentData.cardNumber.slice(-4),
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      sessionStorage.removeItem("bookingData")
      router.push("/success")
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAlternatePayment = (paymentName: string, link: string) => {
    setSelectedPayment({ name: paymentName, link })
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    setSelectedPayment(null)
  }

  if (!bookingData || !selectedService) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading booking details...</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <BookingSummary bookingData={bookingData} selectedService={selectedService} />
          <AlternatePaymentOptions onPaymentSelect={handleAlternatePayment} />
        </div>

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

          <PaymentDetailsForm
            paymentData={paymentData}
            errors={errors}
            cardBrand={cardBrand}
            isSubmitting={isSubmitting}
            onCardholderNameChange={(value) => setPaymentData({ ...paymentData, cardholderName: value })}
            onCardNumberChange={handleCardNumberChange}
            onExpiryChange={handleExpiryChange}
            onCvvChange={handleCvvChange}
            onBillingZipChange={(value) => setPaymentData({ ...paymentData, billingZip: value })}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>

      <PaymentPopup isOpen={showPopup} paymentMethod={selectedPayment} onClose={closePopup} />
    </>
  )
}