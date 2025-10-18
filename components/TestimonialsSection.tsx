"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { siteConfig } from "@/lib/siteConfig"
import { Star } from "lucide-react"

const cardColors = [
  "bg-[#d4f1e8]", // mint
  "bg-[#fde4d0]", // peach
  "bg-[#dbeafe]", // blue
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-[#e7e6e1]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block border border-[#0d9488] backdrop-blur-md shadow-md px-4 py-2 rounded-full mb-6">
            <p className="text-sm font-medium">✨ Testimonials</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2e2e2e] mb-4">
            Hear From Our <span className="font-semibold">Happy Clients and Therapists</span>
          </h2>
          <p className="text-lg text-[#6b7280] max-w-3xl leading-relaxed">
            Real experiences from people who have discovered the AlHarmony difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {siteConfig.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`${cardColors[index % cardColors.length]} p-8 rounded-3xl shadow-md hover:shadow-xl transition-all`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>
              <p className="text-[#2e2e2e] mb-6 leading-relaxed text-lg">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0d9488] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <p className="text-[#2e2e2e] font-semibold">{testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
