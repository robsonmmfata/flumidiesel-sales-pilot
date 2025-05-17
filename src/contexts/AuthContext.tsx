
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'manager' | 'salesperson';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  region?: string;
  cpfCnpj?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isManager: boolean;
  isSalesperson: boolean;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@flumidiesel.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@flumidiesel.com',
    role: 'manager',
    region: 'Norte',
  },
  {
    id: '3',
    name: 'Sales Person',
    email: 'vendedor@flumidiesel.com',
    role: 'salesperson',
    region: 'Sul',
    cpfCnpj: '123.456.789-00',
    phone: '(11) 98765-4321'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('flumidieselUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with mock data
      const foundUser = mockUsers.find(user => user.email === email);
      
      if (!foundUser) {
        throw new Error('Usuário não encontrado');
      }
      
      // In a real app, we would validate the password here

      // Store user in localStorage
      localStorage.setItem('flumidieselUser', JSON.stringify(foundUser));
      setUser(foundUser);
      
      // Redirect based on role
      if (foundUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (foundUser.role === 'manager') {
        navigate('/manager/dashboard');
      } else {
        navigate('/salesperson/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('flumidieselUser');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isSalesperson: user?.role === 'salesperson',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
