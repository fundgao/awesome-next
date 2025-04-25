import axios from 'axios';
import { message } from 'antd';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatar?: string;
  permissions?: string[];
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API configuration
const API_CONFIG = {
  // API base URL (prefer environment variable)
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  // Storage keys
  STORAGE_KEYS: {
    TOKEN: 'auth_token',
    USER: 'auth_user',
    REMEMBER_ME: 'auth_remember_me'
  },
  
  // Request timeout (milliseconds)
  TIMEOUT: 10000,
  
  // Authentication header
  AUTH_HEADER: 'Authorization',
  TOKEN_TYPE: 'Bearer'
};

// Local storage utility
const storage = {
  // Determine which storage to use based on rememberMe option
  getStorage(rememberMe = false): Storage {
    return rememberMe ? localStorage : sessionStorage;
  },
  
  // Save data to storage
  set(key: string, value: any, rememberMe = false): void {
    const store = this.getStorage(rememberMe);
    store.setItem(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  },
  
  // Retrieve data from storage
  get(key: string): any {
    // First, look in localStorage
    let value = localStorage.getItem(key);
    
    // If not found, look in sessionStorage
    if (value === null) {
      value = sessionStorage.getItem(key);
    }
    
    if (!value) return null;
    
    // Try to parse JSON
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  
  // Remove data from storage
  remove(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
};

// API error handling
const handleApiError = (error: any) => {
  const errorMessage = 
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'An unknown error occurred';
  
  message.error(errorMessage);
  return Promise.reject({ message: errorMessage, status: error.response?.status });
};

// HTTP client configuration
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers[API_CONFIG.AUTH_HEADER] = `${API_CONFIG.TOKEN_TYPE} ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Logout automatically if 401 Unauthorized
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Get stored token
export const getToken = (): string | null => {
  return storage.get(API_CONFIG.STORAGE_KEYS.TOKEN);
};

// Check if authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Authentication Services
const authService = {
  // Login
  async login(email: string, password: string, rememberMe = false): Promise<AuthResponse<UserProfile>> {
    try {
      // In a real app, this would be an API call to authenticate the user
      // For now, we'll simulate authentication with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email === 'admin@example.com' && password === 'password') {
            const mockUser = { 
              id: '1', 
              email, 
              name: 'Admin User',
              role: 'admin' 
            };
            const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
            
            storage.set(API_CONFIG.STORAGE_KEYS.TOKEN, mockToken, rememberMe);
            storage.set(API_CONFIG.STORAGE_KEYS.USER, mockUser, rememberMe);
            storage.set(API_CONFIG.STORAGE_KEYS.REMEMBER_ME, rememberMe, true);
            
            resolve({ 
              success: true, 
              message: 'Login successful', 
              data: mockUser
            });
          } else {
            resolve({ 
              success: false, 
              message: 'Invalid credentials', 
              error: 'INVALID_CREDENTIALS' 
            });
          }
        }, 800); // Simulated delay
      });
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Logout
  async logout(): Promise<void> {
    try {
      // In a real app, this would include API calls to invalidate sessions
      storage.remove(API_CONFIG.STORAGE_KEYS.TOKEN);
      storage.remove(API_CONFIG.STORAGE_KEYS.USER);
      
      return Promise.resolve();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // In a real app, this would be an API call to register a new user
      // For now, we'll simulate a successful registration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            message: 'Registration successful, please log in' 
          });
        }, 800);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Get current user profile
  async getUserProfile(): Promise<UserProfile> {
    try {
      // In a real app, this would make an API call to get the user profile
      // For now, we'll simulate a successful response
      const user = storage.get(API_CONFIG.STORAGE_KEYS.USER);
      
      return user || Promise.reject({ message: 'Not logged in' });
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Update user profile
  async updateUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      // In a real app, this would make an API call to update the user profile
      // For now, we'll simulate an update
      const currentUser = storage.get(API_CONFIG.STORAGE_KEYS.USER);
      const updatedUser = { ...currentUser, ...userData };
      
      // Update stored user data
      const rememberMe = storage.get(API_CONFIG.STORAGE_KEYS.REMEMBER_ME);
      storage.set(API_CONFIG.STORAGE_KEYS.USER, updatedUser, rememberMe);
      
      return updatedUser;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Forgot password
  async forgotPassword(request: ResetPasswordRequest): Promise<AuthResponse> {
    try {
      // In a real app, this would be an API call to send a password reset email
      // For now, we'll simulate a successful response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            message: 'Password reset link sent to your email' 
          });
        }, 800);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      // In a real app, this would be an API call to reset the user's password
      // For now, we'll simulate a successful response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            message: 'Password reset successful, please use new password to log in' 
          });
        }, 800);
      });
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Change password
  async changePassword(request: ChangePasswordRequest): Promise<AuthResponse> {
    try {
      // In a real app, this would be an API call to change the user's password
      // For now, we'll simulate a successful response
      return new Promise((resolve) => {
        setTimeout(() => {
          if (request.currentPassword === 'password') {
            resolve({ 
              success: true, 
              message: 'Password changed successfully' 
            });
          } else {
            resolve({ 
              success: false, 
              message: 'Current password is incorrect', 
              error: 'INVALID_CURRENT_PASSWORD' 
            });
          }
        }, 800);
      });
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// 导出兼容旧代码的 login 函数
export const login = authService.login;

export default authService; 