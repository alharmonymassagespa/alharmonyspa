import Link from "next/link"
import { Mail, Facebook, MessageCircle, UserRoundSearch, PhoneOutgoing } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-footer py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/alharmony-logo.png" alt="AlHarmony Logo" className="h-8 w-auto" />
              {/* <span className="text-xl font-bold">AlHarmony Massage & Spa</span> */}
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              Experience professional massage and spa services designed to rejuvenate your body and mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-gray-600 hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link href="/#services" className="text-gray-600 hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link href="/book" className="text-gray-600 hover:text-primary transition-colors text-sm">
                Book Appointment
              </Link>
              <Link href="/#testimonials" className="text-gray-600 hover:text-primary transition-colors text-sm">
                Testimonials
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://wa.me/17864691529"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:bg-white/80 cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://facebook.com/share/168qzu82YK"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:bg-white/80 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:Makiah.Rana022@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:bg-white/80 cursor-pointer"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.snapchat.com/add/handlememass"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:bg-white/80 cursor-pointer"
                aria-label="Snapchat"
              >
                <UserRoundSearch size={20} />
              </a>
              <a
                href="tel:+17864691529"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:bg-white/80 cursor-pointer"
                aria-label="Twitter"
              >
                <PhoneOutgoing size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-400 text-sm">© {currentYear} AlHarmony Massage & Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
