import { Dayjs } from 'dayjs';
import axios from 'axios';

// Package order interfaces
export interface PackageBasicInfo {
  packageName: string;
  packageType: string;
  bookingReference?: string;
  startDate: string | Dayjs;
  endDate: string | Dayjs;
  duration: number;
  destination: string;
  departureCity: string;
  currency: string;
  salesAgent: string;
  bookingStatus: string;
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string | Dayjs;
  gender: string;
  nationality: string;
  phone?: string;
  email?: string;
  isPrimary?: boolean;
  passportNumber?: string;
  passportExpiry?: string | Dayjs;
}

export interface FinancialItemInfo {
  item: string;
  amount: number;
  notes?: string;
}

export interface IncludedItemInfo {
  itemType: string;
  description: string;
  value?: number;
}

export interface PaymentRecordInfo {
  paymentMethod: string;
  paymentDate: string | Dayjs;
  amount: number;
  reference?: string;
}

export interface AccommodationInfo {
  hotelName: string;
  roomType: string;
  checkIn: string | Dayjs;
  checkOut: string | Dayjs;
  location: string;
  confirmationNumber?: string;
  includesBreakfast?: boolean;
  specialRequests?: string;
}

export interface TransportationInfo {
  type: string; // Flight, Train, Bus, etc.
  departureDate: string | Dayjs;
  departureTime?: string;
  departureLocation: string;
  arrivalDate: string | Dayjs;
  arrivalTime?: string;
  arrivalLocation: string;
  carrierName?: string;
  carrierNumber?: string;
  confirmationNumber?: string;
}

export interface ActivityInfo {
  name: string;
  date: string | Dayjs;
  time?: string;
  location: string;
  duration?: string;
  confirmationNumber?: string;
  description?: string;
}

export interface PackageOrderData extends PackageBasicInfo {
  id?: string;
  passengers: PassengerInfo[];
  financialItems: FinancialItemInfo[];
  totalPrice: number;
  agencyCommission: number;
  commissionAmount?: number;
  includedItems?: IncludedItemInfo[];
  paymentRecords: PaymentRecordInfo[];
  accommodations?: AccommodationInfo[];
  transportations?: TransportationInfo[];
  activities?: ActivityInfo[];
  additionalNotes?: string;
  customerId?: string;
  itineraryDetails?: string;
}

// Package order with creator info
export interface PackageOrderWithCreator extends PackageOrderData {
  createdBy: {
    id: string;
    name: string | null;
    email: string;
  };
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Pagination response interface
interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Package order list response interface
interface PackageOrderListResponse {
  packageOrders: PackageOrderWithCreator[];
  pagination: PaginationResponse;
}

// Format dates for API requests
const formatDates = (data: any): any => {
  if (!data) return data;
  
  // If it's a Dayjs object, convert to string
  if (data.format && typeof data.format === 'function') {
    return data.format('YYYY-MM-DD');
  }
  
  // If it's an array, process each item
  if (Array.isArray(data)) {
    return data.map(item => formatDates(item));
  }
  
  // If it's an object, process each property
  if (typeof data === 'object') {
    const formattedData: any = {};
    Object.keys(data).forEach(key => {
      formattedData[key] = formatDates(data[key]);
    });
    return formattedData;
  }
  
  // Otherwise return as is
  return data;
};

// Create a new package order
export async function createPackageOrder(data: PackageOrderData) {
  try {
    const formattedData = formatDates(data);
    console.log('Submitting package order data:', formattedData);
    
    const response = await axios.post('/api/orders/package', formattedData);
    return response.data;
  } catch (error: any) {
    console.error('Package order service error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to create package order');
  }
}

// Get package orders with pagination
export async function getPackageOrders(params: any = {}) {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = params;
    const response = await axios.get('/api/orders/package', {
      params: { page, limit, search, status }
    });
    return response.data;
  } catch (error: any) {
    console.error('Package order list service error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to get package order list');
  }
}

// Get a single package order by ID
export async function getPackageOrderById(id: string) {
  try {
    const response = await axios.get(`/api/orders/package/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Package order detail service error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to get package order details');
  }
}

// Update a package order
export async function updatePackageOrder(id: string, data: Partial<PackageOrderData>) {
  try {
    const formattedData = formatDates({ ...data, id });
    const response = await axios.put(`/api/orders/package/${id}`, formattedData);
    return response.data;
  } catch (error: any) {
    console.error('Package order update service error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to update package order');
  }
}

// Delete a package order
export async function deletePackageOrder(id: string) {
  try {
    const response = await axios.delete(`/api/orders/package/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Package order delete service error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to delete package order');
  }
} 