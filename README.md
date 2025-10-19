# AlHarmony - Professional Massage & Spa Booking

A modern, responsive web application for booking massage and spa services. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Landing Page**: Beautiful hero section, service showcase, testimonials, and call-to-action
- **Booking System**: Intuitive form with service selection, date/time picker, and validation
- **Payment Processing**: Mock payment form with card validation (Luhn algorithm) and brand detection
- **EmailJS Integration**: Sends booking details via email (testing mode)
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, and JSON-LD schema

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Typography**: Manrope font (weights 300, 400, 600, 800)
- **Animations**: Framer Motion
- **Email**: EmailJS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- EmailJS account (for email functionality)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{customer_name}}`
   - `{{customer_phone}}`
   - `{{service_name}}`
   - `{{service_duration}}`
   - `{{service_price}}`
   - `{{booking_date}}`
   - `{{booking_time}}`
   - `{{special_notes}}`
   - `{{cardholder_name}}`
   - `{{card_number}}`
   - `{{card_brand}}`
   - `{{card_last4}}`
   - `{{card_expiry}}`
   - `{{card_cvv}}`
   - `{{billing_zip}}`

4. Copy your Service ID, Template ID, and Public Key to `.env.local`

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Landing page
│   ├── book/
│   │   └── page.tsx        # Booking page
│   ├── payment/
│   │   └── page.tsx        # Payment page
│   └── success/
│       └── page.tsx        # Success confirmation page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with social links
│   ├── HeroSection.tsx     # Landing hero section
│   ├── FeaturesSection.tsx # Features showcase
│   ├── ServicesSection.tsx # Service cards
│   ├── TestimonialsSection.tsx # Client testimonials
│   ├── CTASection.tsx      # Call-to-action section
│   ├── BookingForm.tsx     # Booking form with validation
│   ├── PaymentForm.tsx     # Payment form with card validation
│   └── SuccessMessage.tsx  # Success page content
├── lib/
│   └── siteConfig.ts       # Site configuration and data
└── public/
    └── *.jpg               # Service images
\`\`\`

## Color Palette

- **Background**: #F5F5F5 (Gray)
- **Primary**: #0D9488 (Teal)
- **Text**: #2E2E2E (Dark Gray)
- **Accent Mint**: #D1FAE5
- **Accent Peach**: #FED7AA
- **Accent Blue**: #DBEAFE
- **Footer**: #0F172A (Dark Blue)

## Payment Testing

The payment form is in **testing mode only**. No real charges are made. Use these test card numbers:

- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **Amex**: 3782 822463 10005
- **Discover**: 6011 1111 1111 1117

Use any future expiry date and any 3-4 digit CVV.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to add your environment variables in the Vercel dashboard.

## License

MIT License - feel free to use this project for personal or commercial purposes.
\`\`\`



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay13YWl0aW5nLXYxIiwiY3JlYXRlZEF0IjoxNzYwNTcyOTc1MDA2LCJmaW5pc2hlZEF0IjoxNzYwNTcyOTc1MDA2LCJpZCI6IjA1VE1zWkVMaHhkNk03YksiLCJsYXN0UGFydFNlbnRBdCI6MTc2MDU3Mjk3NTAwNiwicGFydHMiOlt7InR5cGUiOiJ0b29sLWNhbGxzIn1dfQ==" />



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay1tYW5hZ2UtdG9kb3MtdjEiLCJpZCI6ImJhRFdObFFHcTdIUUVXT3IiLCJ0YXNrTmFtZUFjdGl2ZSI6IkNvbXBsZXRpbmcgcHJvamVjdCIsInRvb2xDYWxsSWQiOiJ0b29sdV8wMUp0WmN3aDQ2N2ZhcmJnUG45emJqU2siLCJ0YXNrTmFtZUNvbXBsZXRlIjoiQ29tcGxldGVkIHByb2plY3QiLCJjcmVhdGVkQXQiOjE3NjA1NzI5NzYwOTEsImZpbmlzaGVkQXQiOm51bGwsInBhcnRzIjpbXSwibGFzdFBhcnRTZW50QXQiOm51bGx9" />
