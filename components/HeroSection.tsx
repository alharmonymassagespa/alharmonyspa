"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#d4c4b0] pt-32 pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthvnext.bing.com%2Fth%2Fid%2FOIP.pXCAoEM5W_0TRSmEURjiMQHaE8%3Fcb%3D12%26pid%3DApi%26ucfimg%3D1&f=1&ipt=0604c2bf9000829a0542b7ff73fdb807aa705db50df95bf73c9a23fb86ae423d&ipo=images"
          alt="Relaxing spa massage"
          className="w-full h-full object-cover backdrop-brightness-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4c4b0]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="inline-block backdrop-blur-md shadow-md px-4 py-2 rounded-full mb-6">
            <p className="text-sm font-medium text-white">✨ Your Wellness, Our Priority</p>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Relax, <span className="font-light">& Book Your Perfect Massage</span> Anytime, Anywhere
          </h1>

          <p className="text-lg md:text-xl text-black mb-8 leading-relaxed font-light">
            Experience personalized wellness treatments designed to restore balance and tranquility to your body and mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="group bg-[#2ba2ba] backdrop-blur-md shadow-md text-white px-8 py-4 rounded-full font-semibold text-center hover:bg-[#0f766e] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Book Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="#services"
              className="bg -white backdrop-blur-md shadow-md text-white border-2 border-[#0d9488] px-8 py-4 rounded-full font-semibold text-center hover:bg-[#2ba2ba] hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
