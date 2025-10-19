"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

type PaymentMethodInfo = { name: string; link: string };

type ContactLink = {
  name: "WhatsApp" | "Email" | "SMS";
  href: string;
  iconSrc: string;
};

interface PaymentPopupProps {
  isOpen: boolean;
  paymentMethod: PaymentMethodInfo | null;
  onClose: () => void;
}

const buildContactLinks = (): ContactLink[] => {
  const s =
    (
      siteConfig as {
        social?: Record<string, string | undefined>;
        mail?: string;
        phone?: string;
      }
    ).social ?? {};

  const links: (ContactLink | null)[] = [
    s.whatsapp
      ? {
          name: "WhatsApp",
          href: s.whatsapp,
          iconSrc:
            "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg",
        }
      : null,
    s.mail
      ? {
          name: "Email",
          href: `mailto:${s.mail}`,
          iconSrc:
            "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg",
        }
      : null,
    s.phone
      ? {
          name: "SMS",
          href: `sms:${s.phone}`,
          iconSrc:
            "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/messenger.svg",
        }
      : null,
  ];
  return links.filter(Boolean) as ContactLink[];
};

export default function PaymentPopup({
  isOpen,
  paymentMethod,
  onClose,
}: PaymentPopupProps) {
  const contactLinks = buildContactLinks();

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
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-[#6b7280] hover:text-[#2e2e2e] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4f1e8] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-[#0d9488]" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-[#2e2e2e] mb-2">
                {paymentMethod.name} Payment
              </h3>

              <p className="text-[#6b7280] mb-6">
                Send a message to Support to use this payment method.
              </p>

              <div className="flex items-center justify-center gap-6">
                {contactLinks.length ? (
                  contactLinks.map((c) => (
                    <a
                      key={c.name}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Contact via ${c.name}`}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <img
                        src={c.iconSrc}
                        alt={c.name}
                        className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm text-[#2e2e2e]">{c.name}</span>
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-[#6b7280]">
                    No support links configured.
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 text-[#6b7280] hover:text-[#2e2e2e] font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
