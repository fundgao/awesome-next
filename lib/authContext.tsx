'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

// Define user type
export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

// Define error type
export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

// Define context type
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  // Clear error
  const clearError = () => setError(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check local storage for token
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Check session validity
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth status check failed:', error);
        // Don't set error status, as this is just an initial check
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    clearError();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.error || 'Login failed';
        setError({ message: errorMsg, status: response.status });
        message.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      setUser(data.user);
      message.success('Login successful');
      router.push('/dashboard');
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    clearError();
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      setUser(null);
      router.push('/login');
      message.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      setError({ message: error.message || 'Logout failed' });
      message.error('Logout failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    clearError();
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.error || 'Registration failed';
        setError({ message: errorMsg, status: response.status });
        message.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      message.success('Registration successful, please login');
      router.push('/login');
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 