'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Program {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  status: string;
}

interface User {
  id: string;
  _id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'student';
  programId?: Program;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/api/auth/me');
        const userData = response.data.data.user;
        
        const userWithId = {
          ...userData,
          _id: userData._id || userData.id,
        };
        
        setUser(userWithId);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    const response = await api.post('/api/auth/login', { email, password });
    const { user: userData, token } = response.data.data;
    
    console.log('🔍 DEBUG - Usuario del login:', userData);
    
    const userWithId = {
      ...userData,
      _id: userData._id || userData.id,
    };
    
    localStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/; max-age=86400`;
    setUser(userWithId);
    return userWithId;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/api/auth/me');
      const userData = response.data.data.user;
      
      const userWithId = {
        ...userData,
        _id: userData._id || userData.id,
      };
      
      setUser(userWithId);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}