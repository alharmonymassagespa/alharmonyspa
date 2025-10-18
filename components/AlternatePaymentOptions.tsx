import React from "react"
import { siteConfig } from "@/lib/siteConfig"

interface AlternatePaymentOptionsProps {
  onPaymentSelect: (paymentName: string, link: string) => void
}

export default function AlternatePaymentOptions({ onPaymentSelect }: AlternatePaymentOptionsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-[#e5e7eb]">
      <h3 className="text-lg font-semibold text-[#2e2e2e] mb-4">Alternate Payment Options</h3>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onPaymentSelect("Chime", siteConfig.social.whatsapp)}
          className="flex items-center gap-3 p-4 bg-[#d4f1e8] rounded-2xl hover:bg-[#a7e0cf] transition-colors w-full"
        >
          <img
            src="/chime.png"
            alt="Chime"
            className="w-12 h-12 object-contain"
          />
          <span className="text-base font-medium text-[#2e2e2e]">Pay with Chime</span>
        </button>

        <button
          type="button"
          onClick={() => onPaymentSelect("Crypto", siteConfig.social.twitter)}
          className="flex items-center gap-3 p-4 bg-[#dbeafe] rounded-2xl hover:bg-[#bfdbfe] transition-colors w-full"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
            alt="Bitcoin"
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col items-start">
            <span className="text-base font-medium text-[#2e2e2e]">Pay with Crypto</span>
            <span className="text-xs text-[#6b7280] break-all max-w-full">
              Btc: bc1qwepf83p8mgqpv3vw609ghgd3f5hnwcvtkpdazv
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onPaymentSelect("PayPal", siteConfig.social.linkedin)}
          className="flex items-center gap-3 p-4 bg-[#fde4d0] rounded-2xl hover:bg-[#fed7aa] transition-colors w-full"
        >
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal"
            className="w-12 h-12 object-contain"
          />
          <span className="text-base font-medium text-[#2e2e2e]">Pay with PayPal</span>
        </button>

        <button
          type="button"
          onClick={() => onPaymentSelect("Venmo", siteConfig.social.whatsapp)}
          className="flex items-center gap-3 p-4 bg-[#e0f2fe] rounded-2xl hover:bg-[#bae6fd] transition-colors w-full"
        >
          <img
            src="venmo.png"
            alt="Venmo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-base font-medium text-[#2e2e2e]">Pay with Venmo</span>
        </button>

        <button
          type="button"
          onClick={() => onPaymentSelect("Zelle", siteConfig.social.whatsapp)}
          className="flex items-center gap-3 p-4 bg-[#f3e8ff] rounded-2xl hover:bg-[#e9d5ff] transition-colors w-full"
        >
          <img
            src="zelle.png"
            alt="Zelle"
            className="w-12 h-12 object-contain"
          />
          <span className="text-base font-medium text-[#2e2e2e]">Pay with Zelle</span>
        </button>
      </div>
    </div>
  )
}