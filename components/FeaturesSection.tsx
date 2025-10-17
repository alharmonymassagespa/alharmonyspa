"use client"

import { motion, useInView } from "framer-motion"
import { Calendar, Users, CreditCard, Award, Clock, Shield } from "lucide-react"
import { useRef } from "react"

const features = [
  {
    icon: Calendar,
    title: "Effortless Booking System",
    description: "Book your perfect massage in just a few clicks, anytime, anywhere.",
  },
  {
    icon: Users,
    title: "Choose Your Ideal Therapist",
    description: "Select from our team of certified massage therapy professionals.",
  },
  {
    icon: CreditCard,
    title: "Secure & Convenient Payments",
    description: "Multiple payment options with enterprise-grade security.",
  },
  {
    icon: Clock,
    title: "Real-Time Appointment Management",
    description: "View, modify, or cancel appointments with instant confirmation.",
  },
  {
    icon: Shield,
    title: "Trusted & Professional Therapists",
    description: "All therapists are licensed, certified, and background-checked.",
  },
  {
    icon: Award,
    title: "Customizable Service Options",
    description: "Tailor your massage experience to your specific needs.",
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" ref={ref} className="py-20 bg-[#d4f1e8]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block border border-[#0d9488] backdrop-blur-md shadow-md px-4 py-2 rounded-full mb-6">
            <p className="text-sm font-medium">✨ Features</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2e2e2e] mb-4">
            Explore Our <span className="font-semibold">Innovative Massage Booking Features</span>
          </h2>
          <p className="text-lg text-[#6b7280] max-w-3xl leading-relaxed">
            Discover seamless booking with features designed for your ultimate convenience and comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="text-[#0d9488]" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#2e2e2e] mb-3">{feature.title}</h3>
              <p className="text-[#6b7280] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
