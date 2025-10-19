import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { PaymentData } from "@/types/payment"

interface PaymentDetailsFormProps {
  paymentData: PaymentData
  errors: Record<string, string>
  cardBrand: string
  isSubmitting: boolean
  onCardholderNameChange: (value: string) => void
  onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCvvChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBillingZipChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function PaymentDetailsForm({
  paymentData,
  errors,
  cardBrand,
  isSubmitting,
  onCardholderNameChange,
  onCardNumberChange,
  onExpiryChange,
  onCvvChange,
  onBillingZipChange,
  onSubmit,
}: PaymentDetailsFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cardholderName" className="text-[#2e2e2e] font-semibold text-lg">
          Cardholder Name
        </Label>
        <Input
          id="cardholderName"
          type="text"
          placeholder="John Doe"
          value={paymentData.cardholderName}
          onChange={(e) => onCardholderNameChange(e.target.value)}
          className={`h-12 ${errors.cardholderName ? "border-red-500" : ""}`}
          disabled={isSubmitting}
        />
        {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
      </div>

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
            onChange={onCardNumberChange}
            className={`h-12 ${errors.cardNumber ? "border-red-500" : ""}`}
            disabled={isSubmitting}
          />
        </div>
        {cardBrand !== "unknown" && <p className="text-xs text-[#6b7280]">Detected: {cardBrand.toUpperCase()}</p>}
        {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
      </div>

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
            onChange={onExpiryChange}
            maxLength={5}
            className={`h-12 ${errors.expiry ? "border-red-500" : ""}`}
            disabled={isSubmitting}
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
            onChange={onCvvChange}
            maxLength={4}
            className={`h-12 ${errors.cvv ? "border-red-500" : ""}`}
            disabled={isSubmitting}
          />
          {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="billingZip" className="text-[#2e2e2e] font-semibold text-lg">
          Billing ZIP Code (Optional)
        </Label>
        <Input
          id="billingZip"
          type="text"
          placeholder="10001"
          value={paymentData.billingZip}
          onChange={(e) => onBillingZipChange(e.target.value)}
          className="h-12"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#2ba2ba] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#0f766e] hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : "Complete Payment"}
      </button>
    </form>
  )
}