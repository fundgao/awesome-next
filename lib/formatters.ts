// 格式化日期
export function formatDate(date: Date | string | null | undefined): string | null {
  if (!date) return null;
  
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(d instanceof Date ? d : new Date());
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
}

// 格式化货币
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// 计算返回日期
export function calculateReturnDate(sailingDate: Date | string, nights: number): Date {
  const date = typeof sailingDate === 'string' ? new Date(sailingDate) : new Date(sailingDate);
  date.setDate(date.getDate() + nights);
  return date;
} 