import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard } from "lucide-react"
import type { PaymentMethodInfo } from "@/types/payment"

interface PaymentPopupProps {
  isOpen: boolean
  paymentMethod: PaymentMethodInfo | null
  onClose: () => void
}

export default function PaymentPopup({ isOpen, paymentMethod, onClose }: PaymentPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && paymentMethod && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#6b7280] hover:text-[#2e2e2e] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4f1e8] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-[#0d9488]" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-[#2e2e2e] mb-2">{paymentMethod.name} Payment</h3>

              <p className="text-[#6b7280] mb-6">Send a message to Support to use this payment method.</p>

              <a
                href={paymentMethod.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#2ba2ba] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#0f766e] hover:scale-105 transition-all shadow-lg"
              >
                Contact Support
              </a>

              <button
                onClick={onClose}
                className="mt-4 text-[#6b7280] hover:text-[#2e2e2e] font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}