
import { User, UserRole } from '@/contexts/AuthContext';

// Customer Visit
export interface Visit {
  id: string;
  date: string; // ISO date string
  clientName: string;
  address: string;
  city: string;
  contactName: string;
  contactInfo: string;
  arrivalTime: string;
  departureTime: string;
  subject: string;
  interestLevel: 'low' | 'medium' | 'high';
  productsPresented: string[];
  salesPersonId: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Customer Prospect
export interface Prospect {
  id: string;
  clientName: string;
  clientType: 'company' | 'fleet' | 'autonomous' | 'other';
  contactName: string;
  contactInfo: string;
  interestLevel: 'low' | 'medium' | 'high';
  requestedQuote: boolean;
  requestedFollowUp: boolean;
  notes: string;
  salesPersonId: string;
  createdAt: string; // ISO date string
}

// Sale Record
export interface Sale {
  id: string;
  clientName: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalValue: number;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'transfer' | 'invoice';
  deliveryDate: string; // ISO date string
  orderNumber: string;
  salesPersonId: string;
  createdAt: string; // ISO date string
}

// Scheduled Visit
export interface ScheduledVisit {
  id: string;
  clientName: string;
  contactName: string;
  contactInfo: string;
  address: string;
  city: string;
  date: string; // ISO date string
  time: string;
  purpose: string;
  salesPersonId: string;
  createdAt: string; // ISO date string
  completed: boolean;
}

// Inventory Item
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  minimumStock: number;
  unit: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Promotion
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number; // Percentage
  applicableProducts: string[]; // Product IDs
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdBy: string; // User ID
  createdAt: string; // ISO date string
}

// Notification
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'alert' | 'achievement' | 'promotion';
  read: boolean;
  userId: string;
  createdAt: string; // ISO date string
}
