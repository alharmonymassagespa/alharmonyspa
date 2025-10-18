"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Home, Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export default function SuccessMessage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Trigger confetti animation
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
        >
          <CheckCircle2 className="text-green-600" size={56} />
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
        >
          Your Booking Has Been Received!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-8 leading-relaxed"
        >
          Thank you for choosing Alora. We'll confirm your appointment shortly via phone or email. Get ready to
          experience ultimate relaxation!
        </motion.p>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-accent-mint/30 rounded-2xl p-6 text-left">
            <Calendar className="text-primary mb-3" size={32} />
            <h3 className="font-semibold text-foreground mb-2">What's Next?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You'll receive a confirmation call or email within 24 hours with your appointment details.
            </p>
          </div>

          <div className="bg-accent-blue/30 rounded-2xl p-6 text-left">
            <CheckCircle2 className="text-primary mb-3" size={32} />
            <h3 className="font-semibold text-foreground mb-2">Preparation Tips</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Arrive 10 minutes early, stay hydrated, and wear comfortable clothing for your session.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-hover hover:scale-105 transition-all shadow-md"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground border-2 border-primary/20 px-8 py-4 rounded-xl font-semibold hover:bg-primary/10 transition-all"
          >
            <Calendar size={20} />
            Book Another Session
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
