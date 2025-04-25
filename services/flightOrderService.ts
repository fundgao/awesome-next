import { Dayjs } from 'dayjs';
import axios from 'axios';

// FlightSegment接口
interface FlightSegment {
  segmentNumber?: number;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureDate: string | Dayjs;
  departureTime?: string;
  arrivalDate: string | Dayjs;
  arrivalTime?: string;
  cabinClass?: string;
  operatedBy?: string;
  duration?: string;
  aircraft?: string;
  fareBasis?: string;
  baggage?: string;
}

// Passenger接口
interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | Dayjs;
  gender?: string;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string | Dayjs | null;
  phone?: string;
  email?: string;
  frequentFlyerProgram?: string;
  frequentFlyerNumber?: string;
  isPrimary?: boolean;
}

// FinancialItem接口
interface FinancialItem {
  item: string;
  amount: number;
  notes?: string;
}

// AncillaryItem接口
interface AncillaryItem {
  serviceType: string;
  amount: number;
  description?: string;
}

// PaymentRecord接口
interface PaymentRecord {
  paymentMethod: string;
  paymentDate: string | Dayjs;
  amount: number;
  reference?: string;
}

// FinancialSummary接口
interface FinancialSummary {
  totalCost: number;
  totalAncillary: number;
  serviceFee: number;
  commissionAmount: number;
  netProfit: number;
  totalPaid: number;
  balanceDue: number;
  profitMargin: number;
  totalAmountDue: number;
}

// FlightOrder主接口
export interface FlightOrderData {
  id?: string;
  bookingReference: string;
  bookingType: string;
  gdsSystem?: string;
  bookingDate?: string | Dayjs;
  bookingStatus?: string;
  currency?: string;
  cabinClass?: string;
  fareType?: string;
  
  // 航班段
  flightSegments: FlightSegment[];
  
  // 乘客信息
  passengers: Passenger[];
  
  // 财务项目
  financialItems?: FinancialItem[];
  
  // 辅助服务
  ancillaryItems?: AncillaryItem[];
  
  // 支付记录
  paymentRecords?: PaymentRecord[];
  
  // 财务摘要
  financialSummary?: FinancialSummary;
  
  // 佣金信息
  commissionRate?: number;
  commissionType?: string;
  
  // 附加信息
  remarks?: string;
  seatSelection?: boolean;
  mealRequest?: boolean;
  frequentFlyer?: boolean;
  additionalNotes?: string;
  
  // 关联
  customerId?: string;
}

// 带创建者信息的FlightOrder
export interface FlightOrderWithCreator extends FlightOrderData {
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

// 分页响应接口
interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// FlightOrder列表响应接口
interface FlightOrderListResponse {
  flightOrders: FlightOrderWithCreator[];
  pagination: PaginationResponse;
}

// 格式化日期，用于API请求
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

// 创建新的航班订单
export async function createFlightOrder(data: FlightOrderData) {
  try {
    const formattedData = formatDates(data);
    console.log('提交的航班订单数据:', formattedData);
    
    const response = await axios.post('/api/orders/flight', formattedData);
    return response.data;
  } catch (error: any) {
    console.error('创建航班订单服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '创建航班订单失败');
  }
}

// 获取航班订单列表（支持分页和搜索）
export async function getFlightOrders(params: any = {}) {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = params;
    const response = await axios.get('/api/orders/flight', {
      params: { page, limit, search, status }
    });
    return response.data;
  } catch (error: any) {
    console.error('获取航班订单列表服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取航班订单列表失败');
  }
}

// 通过ID获取单个航班订单
export async function getFlightOrderById(id: string) {
  try {
    const response = await axios.get(`/api/orders/flight?id=${id}`);
    return response.data;
  } catch (error: any) {
    console.error('获取航班订单详情服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取航班订单详情失败');
  }
}

// 更新航班订单
export async function updateFlightOrder(id: string, data: Partial<FlightOrderData>) {
  try {
    const formattedData = formatDates({ ...data, id });
    const response = await axios.put('/api/orders/flight', formattedData);
    return response.data;
  } catch (error: any) {
    console.error('更新航班订单服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '更新航班订单失败');
  }
}

// 删除航班订单
export async function deleteFlightOrder(id: string) {
  try {
    const response = await axios.delete(`/api/orders/flight?id=${id}`);
    return response.data;
  } catch (error: any) {
    console.error('删除航班订单服务错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '删除航班订单失败');
  }
} 