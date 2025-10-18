import type { Metadata } from "next"
import { Suspense } from "react"
import BookingForm from "@/components/BookingForm"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Book Your Massage - AlHarmony",
  description: "Schedule your perfect massage session with AlHarmony. Choose your service, date, and time.",
}

function BookingContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Book Your Massage Session
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Select your preferred service, date, and time. We'll take care of the rest.
          </p>
        </div>

        <BookingForm />
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </main>
  )
}
