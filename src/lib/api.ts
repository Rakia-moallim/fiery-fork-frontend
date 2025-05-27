const API_BASE_URL = 'http://localhost:8080/api';

// API Configuration
export const api = {
  baseURL: API_BASE_URL,
  
  // Helper method to get auth headers
  getAuthHeaders: () => {
    const token = localStorage.getItem('restaurant_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  // Generic request method
  request: async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: api.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = await response.text();
          console.error('API Error Response:', errorData);
          
          // Try to parse as JSON for structured error messages
          try {
            const jsonError = JSON.parse(errorData);
            errorMessage = jsonError.error || jsonError.message || errorMessage;
          } catch {
            // If not JSON, use the text as error message
            errorMessage = errorData || errorMessage;
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // HTTP methods
  get: <T>(endpoint: string) => api.request<T>(endpoint),
  
  post: <T>(endpoint: string, data: any) => 
    api.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  put: <T>(endpoint: string, data: any) => 
    api.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  patch: <T>(endpoint: string, data?: any) => 
    api.request<T>(endpoint, {
      method: 'PATCH',
      ...(data && { body: JSON.stringify(data) }),
    }),
    
  delete: <T>(endpoint: string) => 
    api.request<T>(endpoint, {
      method: 'DELETE',
    }),
};

// API Types matching backend DTOs
export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: UserDto;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: 'GUEST' | 'CUSTOMER' | 'STAFF' | 'ADMIN';
  phoneNumber?: string;
  isActive: boolean;
  createdAt: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: 'BURGERS' | 'PIZZA' | 'SALADS' | 'APPETIZERS' | 'MAINS' | 'DESSERTS';
  isPopular: boolean;
  isAvailable: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
  specialInstructions?: string;
}

export interface OrderRequest {
  orderItems: OrderItemRequest[];
  specialInstructions?: string;
  orderType: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
  deliveryAddress?: string;
  phoneNumber?: string;
}

export interface Order {
  id: number;
  user: UserDto;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  specialInstructions?: string;
  orderType: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
  deliveryAddress?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  menuItem: MenuItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
}

export interface Reservation {
  id: number;
  user: UserDto;
  reservationDateTime: string;
  numberOfGuests: number;
  status: 'PENDING' | 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  specialRequests?: string;
  phoneNumber?: string;
  tableNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// API Services
export const authService = {
  login: (credentials: AuthRequest) => 
    api.post<AuthResponse>('/auth/login', credentials),
    
  register: (userData: RegisterRequest) => 
    api.post<AuthResponse>('/auth/register', userData),
    
  getCurrentUser: () => 
    api.get<UserDto>('/auth/me'),
    
  logout: () => 
    api.post<string>('/auth/logout', {}),
};

export const menuService = {
  getAllItems: () => 
    api.get<MenuItem[]>('/menu'),
    
  getItemsByCategory: (category: string) => 
    api.get<MenuItem[]>(`/menu/category/${category}`),
    
  getPopularItems: () => 
    api.get<MenuItem[]>('/menu/popular'),
    
  getItemById: (id: number) => 
    api.get<MenuItem>(`/menu/${id}`),
    
  searchItems: (name: string) => 
    api.get<MenuItem[]>(`/menu/search?name=${encodeURIComponent(name)}`),
    
  getCategories: () => 
    api.get<string[]>('/menu/categories'),
};

export const orderService = {
  createOrder: (orderData: OrderRequest) => 
    api.post<Order>('/orders', orderData),
    
  getMyOrders: () => 
    api.get<Order[]>('/orders/my-orders'),
    
  getOrderById: (id: number) => 
    api.get<Order>(`/orders/${id}`),
    
  cancelOrder: (id: number) => 
    api.patch<void>(`/orders/${id}/cancel`),
};

export const reservationService = {
  createReservation: (reservationData: Omit<Reservation, 'id' | 'user' | 'status' | 'createdAt' | 'updatedAt'>) => 
    api.post<Reservation>('/reservations', reservationData),
    
  getMyReservations: () => 
    api.get<Reservation[]>('/reservations/my-reservations'),
    
  getReservationById: (id: number) => 
    api.get<Reservation>(`/reservations/${id}`),
    
  updateReservation: (id: number, reservationData: Partial<Reservation>) => 
    api.put<Reservation>(`/reservations/${id}`, reservationData),
    
  cancelReservation: (id: number) => 
    api.patch<void>(`/reservations/${id}/cancel`),
}; 