export interface BookingData {
  service: string
  date: string
  time: string
  name: string
  phone: string
  notes?: string
}

export interface Service {
  id: string
  name: string
  duration: string
  price: number
  description: string
}

export interface PaymentData {
  cardholderName: string
  cardNumber: string
  expiry: string
  cvv: string
  billingZip: string
}

export interface PaymentMethodInfo {
  name: string
  link: string
}