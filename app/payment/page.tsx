import type { Metadata } from "next"
import PaymentForm from "@/components/PaymentForm"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Secure Payment - AlHarmony",
  description: "Complete your booking with secure payment options.",
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Secure Your Booking</h1>
            <p className="text-muted-foreground leading-relaxed">
              Review your booking details and complete payment to confirm your session.
            </p>
          </div>

          <PaymentForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
