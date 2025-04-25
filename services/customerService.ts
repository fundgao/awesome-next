import { Dayjs } from 'dayjs';

// Customer model interfaces based on the form structure
export interface CustomerBasicInfo {
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth: string | Dayjs;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string | Dayjs;
  customerPhoto?: any;
}

export interface CustomerContactInfo {
  email: string;
  phone: string;
  alternativePhone?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  zipPostalCode?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
}

export interface CustomerTravelPreferences {
  preferredLanguage?: string;
  dietaryRestrictions?: string[];
  seatPreference?: string;
  roomPreference?: string;
  specialNeeds?: string;
}

export interface CustomerAdditionalInfo {
  membershipLevel?: string;
  salesRepresentative?: string;
  joinDate?: string | Dayjs;
  referredBy?: string;
  notes?: string;
  newsletter?: boolean;
}

export interface CustomerData extends 
  CustomerBasicInfo, 
  CustomerContactInfo, 
  CustomerTravelPreferences, 
  CustomerAdditionalInfo {
  id?: string;
  status?: 'active' | 'inactive';
  customerId?: string;
}

// Customer response type with creator info
export interface CustomerWithCreator extends CustomerData {
  createdBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

// Pagination response interface
interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Customer list response interface
interface CustomerListResponse {
  customers: CustomerWithCreator[];
  pagination: PaginationResponse;
}

// Get customers with pagination
export async function getCustomers(
  page = 1,
  limit = 10,
  search = '',
  status?: string
): Promise<CustomerListResponse> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      queryParams.append('search', search);
    }

    if (status) {
      queryParams.append('status', status);
    }

    const response = await fetch(`/api/customers?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch customers');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

// Get a single customer by ID
export async function getCustomerById(id: string): Promise<{ customer: CustomerWithCreator }> {
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch customer');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
}

// Create a new customer
export async function createCustomer(
  data: CustomerData
): Promise<{ customer: CustomerWithCreator; message: string }> {
  try {
    // 打印原始日期值以便调试
    console.log('原始日期值:', {
      dateOfBirth: data.dateOfBirth,
      passportExpiry: data.passportExpiry,
      joinDate: data.joinDate,
      dateOfBirthType: data.dateOfBirth ? typeof data.dateOfBirth : 'undefined',
      isDayjsDateOfBirth: data.dateOfBirth && typeof data.dateOfBirth === 'object' && 'toISOString' in data.dateOfBirth
    });
    
    // Format dates to ISO strings if they are Dayjs objects
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? 
        (typeof data.dateOfBirth === 'string' ? data.dateOfBirth : data.dateOfBirth.toISOString()) : undefined,
      passportExpiry: data.passportExpiry ? 
        (typeof data.passportExpiry === 'string' ? data.passportExpiry : data.passportExpiry.toISOString()) : undefined,
      joinDate: data.joinDate ? 
        (typeof data.joinDate === 'string' ? data.joinDate : data.joinDate.toISOString()) : undefined,
    };
    
    // 打印格式化后的日期值以验证转换
    console.log('格式化后的日期值:', {
      dateOfBirth: formattedData.dateOfBirth,
      passportExpiry: formattedData.passportExpiry,
      joinDate: formattedData.joinDate
    });

    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create customer');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

// Update a customer
export async function updateCustomer(
  id: string,
  data: Partial<CustomerData>
): Promise<{ customer: CustomerWithCreator; message: string }> {
  try {
    // Format dates to ISO strings if they are Dayjs objects
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? 
        (typeof data.dateOfBirth === 'string' ? data.dateOfBirth : data.dateOfBirth.toISOString()) : undefined,
      passportExpiry: data.passportExpiry ? 
        (typeof data.passportExpiry === 'string' ? data.passportExpiry : data.passportExpiry.toISOString()) : undefined,
      joinDate: data.joinDate ? 
        (typeof data.joinDate === 'string' ? data.joinDate : data.joinDate.toISOString()) : undefined,
    };

    const response = await fetch(`/api/customers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update customer');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
}

// Delete a customer
export async function deleteCustomer(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete customer');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
} 