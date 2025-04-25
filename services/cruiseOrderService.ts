import { Dayjs } from 'dayjs';
import axios from 'axios';

// Cruise order interfaces
export interface CruiseOrderBasic {
  cruiseLine: string;
  shipName: string;
  reservationNumber?: string;
  itineraryName: string;
  sailingDate: string | Dayjs;
  nights: number;
  cabinCategory: string;
  roomNumber?: string;
  embarkationPort: string;
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
}

export interface FinancialItemInfo {
  item: string;
  amount: number;
  notes?: string;
}

export interface BonusItemInfo {
  bonusType: string;
  value?: number;
  description?: string;
}

export interface PaymentRecordInfo {
  paymentMethod: string;
  paymentDate: string | Dayjs;
  amount: number;
  reference?: string;
}

export interface CruiseOrderData extends CruiseOrderBasic {
  id?: string;
  passengers: PassengerInfo[];
  additionalPassengers?: PassengerInfo[];
  financialItems: FinancialItemInfo[];
  salesPrice: number;
  agencyCommission: number;
  commissionAmount?: number;
  bonusItems?: BonusItemInfo[];
  paymentRecords: PaymentRecordInfo[];
  additionalNotes?: string;
  customerId?: string;
}

// Cruise order with creator info
export interface CruiseOrderWithCreator extends CruiseOrderData {
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
}

// Pagination response interface
interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Cruise order list response interface
interface CruiseOrderListResponse {
  cruiseOrders: CruiseOrderWithCreator[];
  pagination: PaginationResponse;
}

// Format dates for API requests
const formatDates = (data: any) => {
  const formatDate = (date: string | Dayjs | undefined) => {
    if (!date) return undefined;
    return typeof date === 'string' ? date : date.toISOString();
  };

  // Format top-level dates
  const formattedData = {
    ...data,
    sailingDate: formatDate(data.sailingDate),
  };

  // Format dates in nested arrays
  if (data.passengers) {
    formattedData.passengers = data.passengers.map((passenger: any) => ({
      ...passenger,
      dateOfBirth: formatDate(passenger.dateOfBirth),
    }));
  }

  if (data.additionalPassengers) {
    formattedData.additionalPassengers = data.additionalPassengers.map((passenger: any) => ({
      ...passenger,
      dateOfBirth: formatDate(passenger.dateOfBirth),
    }));
  }

  if (data.paymentRecords) {
    formattedData.paymentRecords = data.paymentRecords.map((record: any) => ({
      ...record,
      paymentDate: formatDate(record.paymentDate),
    }));
  }

  return formattedData;
};

// Create a new cruise order
export async function createCruiseOrder(data: CruiseOrderData) {
  try {
    const formattedData = formatDates(data);
    const response = await axios.post('/api/orders/cruise', formattedData);
    return response.data;
  } catch (error: any) {
    console.error('创建游轮订单服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '创建游轮订单失败');
  }
}

// Get cruise orders with pagination
export async function getCruiseOrders(params: any = {}) {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = params;
    const response = await axios.get('/api/orders/cruise', {
      params: { page, limit, search, status }
    });
    return response.data;
  } catch (error: any) {
    console.error('获取游轮订单列表服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取游轮订单列表失败');
  }
}

// Get a single cruise order by ID
export async function getCruiseOrderById(id: string) {
  try {
    const response = await axios.get(`/api/orders/cruise/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('获取游轮订单详情服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取游轮订单详情失败');
  }
}

// Update a cruise order
export async function updateCruiseOrder(id: string, data: Partial<CruiseOrderData>) {
  try {
    const formattedData = formatDates(data);
    const response = await axios.put(`/api/orders/cruise/${id}`, formattedData);
    return response.data;
  } catch (error: any) {
    console.error('更新游轮订单服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '更新游轮订单失败');
  }
}

// Delete a cruise order
export async function deleteCruiseOrder(id: string) {
  try {
    const response = await axios.delete(`/api/orders/cruise/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('删除游轮订单服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '删除游轮订单失败');
  }
} 