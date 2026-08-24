export interface ServicePackage {
  id: string;
  name: string;
  quantity: string | number;
  unit: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  deliveryTime: string;
  features: string[];
}

export interface ServiceReview {
  id: string;
  author: string;
  avatar?: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  iconName: string;
  shortDescription: string; // 300 words
  features: string[]; // 5-10 features
  packages: ServicePackage[];
  mainDescription: string; // 1000 words SEO content
  faqs: ServiceFaq[]; // 8-10 FAQs
  reviews: ServiceReview[];
  metaDescription: string;
  metaKeywords: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  serviceCount: number;
}

export interface CartItem {
  serviceId: string;
  serviceTitle: string;
  serviceSlug: string;
  packageId: string;
  packageName: string;
  quantityLabel: string;
  unitPrice: number;
  quantity: number;
  targetUrlOrDetails?: string;
  customNotes?: string;
}

export type Currency = 'USD' | 'GBP' | 'EUR' | 'USDT';

export interface CryptoPaymentOption {
  currency: string;
  network?: string;
  symbol: string;
  address: string;
  qrCodeUrl?: string;
  instruction: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  status: 'Pending' | 'Processing' | 'In Delivery' | 'Completed' | 'Refunded';
  items: CartItem[];
  totalAmount: number;
  currency: Currency;
  paymentMethod: string;
  paymentAddress: string;
  txHash?: string;
  customerEmail: string;
  customerTelegram?: string;
  customerWhatsapp?: string;
  targetDetails: string;
  notes?: string;
}
