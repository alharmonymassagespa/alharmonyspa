"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" ref={ref} className="py-20 bg-[#f9f7f4]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text- mb-16"
        >
          <div className="inline-block border border-[#0d9488] backdrop-blur-md shadow-md px-4 py-2 rounded-full mb-6">
            <p className="text-sm font-medium">✨ Services</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2e2e2e] mb-4">
            Discover Our <span className="font-semibold">Modern Massage Booking Experience</span>
          </h2>
          <p className="text-lg text-left text-[#6b7280] max-w-3xl leading-relaxed">
            Browse through our handpicked range of rejuvenating therapies crafted to bring you relaxation, balance, and renewed energy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Service Image with Overlay */}
              <div className="relative h-96">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-white/90 mb-3 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm">{service.duration}</span>
                    <span className="text-lg font-bold">${service.price}</span>
                  </div>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="block w-full bg-[#2ba2ba] text-white text-center py-3 rounded-full font-semibold hover:bg-[#0f766e] transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
