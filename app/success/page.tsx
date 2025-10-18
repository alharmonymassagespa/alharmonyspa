import type { Metadata } from "next"
import SuccessMessage from "@/components/SuccessMessage"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Booking Confirmed - Alora",
  description: "Your massage booking has been confirmed. We look forward to seeing you!",
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <SuccessMessage />
      <Footer />
    </main>
  )
}
