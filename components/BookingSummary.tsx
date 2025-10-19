import React from "react";
import { motion } from "framer-motion";
import type { BookingData, Service } from "@/types/payment";

interface BookingSummaryProps {
  bookingData: BookingData;
  selectedService: Service;
}

export default function BookingSummary({
  bookingData,
  selectedService,
}: BookingSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-lg p-8 h-fit"
    >
      <h2 className="text-2xl font-semibold text-[#2e2e2e] mb-6">
        Booking Summary
      </h2>
      <div className="space-y-4 text-base">
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Service:</span>
          <span className="font-semibold text-[#2e2e2e]">
            {selectedService.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Duration:</span>
          <span className="font-semibold text-[#2e2e2e]">
            {selectedService.duration}
          </span>
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
          <span className="font-semibold text-[#2e2e2e]">
            {bookingData.time}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#6b7280]">Location:</span>
          <span className="font-semibold text-[#2e2e2e]">
            {bookingData.locationType === "incall" ? "Incall" : "Outcall"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#6b7280]">Name:</span>
          <span className="font-semibold text-[#2e2e2e]">
            {bookingData.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b7280]">Phone:</span>
          <span className="font-semibold text-[#2e2e2e]">
            {bookingData.phone}
          </span>
        </div>
        {bookingData.notes && (
          <div className="pt-3 border-t border-[#e5e7eb]">
            <span className="text-[#6b7280] block mb-2">Special Requests:</span>
            <span className="text-[#2e2e2e] text-sm">{bookingData.notes}</span>
          </div>
        )}
        <div className="flex justify-between pt-4 border-t border-[#e5e7eb] text-xl">
          <span className="font-bold text-[#2e2e2e]">Total:</span>
          <span className="font-bold text-[#0d9488]">
            ${selectedService.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
