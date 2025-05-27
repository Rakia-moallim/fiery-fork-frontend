
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { authService, UserDto } from '@/lib/api';

// Define User Types and Roles (matching backend)
export type UserRole = 'GUEST' | 'CUSTOMER' | 'STAFF' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  isActive: boolean;
  createdAt: string;
}

// Define the Auth Context types
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  isLoading: boolean;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('restaurant_token');
      
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('restaurant_token');
          localStorage.removeItem('restaurant_user');
        }
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      
      // Store token and user data
      localStorage.setItem('restaurant_token', response.token);
      localStorage.setItem('restaurant_user', JSON.stringify(response.user));
      setUser(response.user);
      
      toast.success(`Welcome back, ${response.user.name}!`);
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole = 'CUSTOMER') => {
    setIsLoading(true);
    
    try {
      const response = await authService.register({ 
        name, 
        email, 
        password, 
        role 
      });
      
      // Store token and user data
      localStorage.setItem('restaurant_token', response.token);
      localStorage.setItem('restaurant_user', JSON.stringify(response.user));
      setUser(response.user);
      
      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurant_token');
    localStorage.removeItem('restaurant_user');
    toast.info('You have been logged out');
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
