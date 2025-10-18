"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-[#2e2e2e]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-[#0d9488] to-[#0f766e] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 z-0 opac ity-10">
            <img
              src="/peaceful-spa-environment-candles-relaxation.jpg"
              alt="Spa environment"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Experience <span className="font-semibold">Relaxation Like Never Before</span>
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards wellness. Book your personalized massage session today and discover true relaxation.
            </p>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 bg-[#2ba2ba] text-white px-10 py-5 rounded-full font-semibold hover:bg-[#0f766e] hover:scale-105 transition-all shadow-lg text-lg"
            >
              Book Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
