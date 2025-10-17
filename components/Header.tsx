"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // ✅ Handle scroll and backdrop
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home")
      const heroBottom = hero ? hero.offsetHeight : 0
      setScrolled(window.scrollY > heroBottom * 0.1)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ Observe sections to set active link based on viewport
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" } // triggers when section is centered
    )

    sections.forEach((sec) => observer.observe(sec))
    return () => sections.forEach((sec) => observer.unobserve(sec))
  }, [])

  const isActive = (id: string) => {
    if (id === "home" && pathname === "/" && !activeSection) return true
    return activeSection === id
  }

  const navLinks = [
    { id: "home", href: "/", label: "Home" },
    { id: "features", href: "#features", label: "Features" },
    { id: "services", href: "#services", label: "Services" },
    { id: "testimonials", href: "#testimonials", label: "Testimonials" },
  ]
  
  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 mb-20 ${
        scrolled ? "backdrop-blur-md shadow-md" : "bg-transparent backdrop-blur-0 shadow-none"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 py-5 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2ba2ba] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className={`text-2xl font-semibold  ${
           scrolled ? "text-[#2e2e2e]" : "text-white"
          }`}>
            Alora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden md:flex items-center gap-8 px-6 py-2 rounded-full transition-all ${
            scrolled ? "bg-transparent" : "backdrop-blur-sm bg-white/10"
          }`}
        >
          {navLinks.map((link) => {
            const isLinkActive = isActive(link.id);

            // Determine text + background styles
            let linkClasses = "font-medium text-lg px-4 py-2 rounded-full transition-all duration-300 ";

            if (isLinkActive) {
              // Case 1: Active link
              linkClasses += "bg-white text-black shadow-sm";
            } else if (scrolled) {
              // Case 2: Not active, but page has scrolled
              linkClasses += "text-black hover:bg-white hover:text-[#0d9488]";
            } else {
              // Case 3: Not active, and still at top (hero section)
              linkClasses += "text-white hover:bg-white hover:text-[#0d9488]";
            }

            return (
              <a key={link.id} href={link.href} className={linkClasses}>
                {link.label}
              </a>
            );
          })}

        </div>

        {/* Book Now Button */}
        <Link
          href="/book"
          className={`hidden md:block px-8 py-3 rounded-full font-semibold transition-all shadow-md ${
            pathname === "/book"
              ? "bg-white text-black"
              : "bg-[#2ba2ba] text-white hover:bg-[#0f766e] hover:scale-105"
          }`}
        >
          Book Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#2e2e2e]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden transition-all duration-300">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-3 text-center rounded-full transition-colors ${
                    isActive(link.id)
                      ? "bg-[#0d9488] text-white"
                      : "text-[#2e2e2e] hover:bg-[#0d9488] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <Link
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium py-3 text-center rounded-full transition-colors ${
                  pathname === "/book"
                    ? "bg-[#0d9488] text-white"
                    : "text-[#2e2e2e] hover:bg-[#0d9488] hover:text-white"
                }`}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
