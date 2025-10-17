import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Alora - Professional Massage & Spa Booking",
  description:
    "Discover soothing treatments and personalized relaxation experiences. Book your perfect massage anytime, anywhere.",
  openGraph: {
    title: "Alora - Professional Massage & Spa Booking",
    description:
      "Discover soothing treatments and personalized relaxation experiences. Book your perfect massage anytime, anywhere.",
    url: "https://alora-spa.com",
    siteName: "Alora",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-ce1306aa5184d497d4968e47d0c7df59-ksFBlF1MehMWTYlkiPoQZYsSnkiOdl.webp",
        width: 1200,
        height: 630,
        alt: "Alora Spa & Massage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alora - Professional Massage & Spa Booking",
    description:
      "Discover soothing treatments and personalized relaxation experiences. Book your perfect massage anytime, anywhere.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-ce1306aa5184d497d4968e47d0c7df59-ksFBlF1MehMWTYlkiPoQZYsSnkiOdl.webp",
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Alora Spa & Massage",
              description: "Professional massage and spa services",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Wellness Street",
                addressLocality: "Your City",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "US",
              },
              telephone: "+1-555-123-4567",
              openingHours: "Mo-Su 09:00-21:00",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  )
}
