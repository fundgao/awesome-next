import axios from 'axios';

// 获取订单统计数据
export async function getOrderStats(currency: string = 'USD') {
  try {
    const response = await axios.get('/api/dashboard/stats', {
      params: { currency }
    });
    return response.data;
  } catch (error: any) {
    console.error('获取订单统计数据错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取订单统计失败');
  }
}

// 获取订单趋势数据
export async function getOrderTrends(timeframe: string = 'Monthly') {
  try {
    const response = await axios.get('/api/dashboard/trends', {
      params: { timeframe }
    });
    return response.data;
  } catch (error: any) {
    console.error('获取订单趋势数据错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取订单趋势失败');
  }
}

// 获取分布分析数据
export async function getDistributionAnalysis(timeframe: string = 'Monthly') {
  try {
    const response = await axios.get('/api/dashboard/distribution', {
      params: { timeframe }
    });
    return response.data;
  } catch (error: any) {
    console.error('获取分布分析数据错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取分布分析失败');
  }
}

// 获取所有订单列表
export async function getAllOrders(params: {
  page?: number;
  limit?: number;
  search?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  orderNumber?: string;
  orderType?: string;
  orderDateStart?: string;
  orderDateEnd?: string;
  departureDateStart?: string;
  departureDateEnd?: string;
  orderStatus?: string;
  salesAgent?: string;
  currency?: string;
} = {}) {
  try {
    const response = await axios.get('/api/dashboard/orders', { params });
    return response.data;
  } catch (error: any) {
    console.error('获取订单列表错误:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || '获取订单列表失败');
  }
} 