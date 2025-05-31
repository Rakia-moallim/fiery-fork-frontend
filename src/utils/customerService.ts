// Customer Service - Working with Users table where role='customer'
// This demonstrates how to query and manage customers using the existing User table

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'staff' | 'customer';
  phone?: string;
  address?: string;
  dateJoined: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'blocked';
  // Customer-specific fields (could be in user profile or separate customer_profile table)
  customerLevel?: 'regular' | 'premium' | 'vip';
  totalOrders?: number;
  totalSpent?: number;
  averageOrderValue?: number;
  notes?: string;
}

// Mock API functions - these would be replaced with actual API calls
export const customerService = {
  
  // Get all customers (users with role='customer')
  async getCustomers(): Promise<User[]> {
    // In real implementation: GET /api/users?role=customer
    // SQL: SELECT * FROM users WHERE role = 'customer'
    const response = await fetch('/api/users?role=customer');
    return response.json();
  },

  // Create a new customer (create user with role='customer')
  async createCustomer(customerData: Partial<User>): Promise<User> {
    // In real implementation: POST /api/users
    // SQL: INSERT INTO users (username, email, full_name, role, ...) VALUES (...)
    const newUser = {
      ...customerData,
      role: 'customer' as const,
      dateJoined: new Date().toISOString(),
      status: 'active' as const,
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0
    };
    
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    return response.json();
  },

  // Update customer (update user where role='customer')
  async updateCustomer(id: number, customerData: Partial<User>): Promise<User> {
    // In real implementation: PUT /api/users/{id}
    // SQL: UPDATE users SET ... WHERE id = ? AND role = 'customer'
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });
    return response.json();
  },

  // Delete customer (delete user where role='customer')
  async deleteCustomer(id: number): Promise<void> {
    // In real implementation: DELETE /api/users/{id}
    // SQL: DELETE FROM users WHERE id = ? AND role = 'customer'
    await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });
  },

  // Get customer by ID (get user by id where role='customer')
  async getCustomerById(id: number): Promise<User | null> {
    // In real implementation: GET /api/users/{id}?role=customer
    // SQL: SELECT * FROM users WHERE id = ? AND role = 'customer'
    const response = await fetch(`/api/users/${id}?role=customer`);
    if (!response.ok) return null;
    return response.json();
  },

  // Search customers
  async searchCustomers(query: string): Promise<User[]> {
    // In real implementation: GET /api/users/search?role=customer&q={query}
    // SQL: SELECT * FROM users WHERE role = 'customer' AND 
    //      (full_name ILIKE '%{query}%' OR email ILIKE '%{query}%' OR username ILIKE '%{query}%')
    const response = await fetch(`/api/users/search?role=customer&q=${encodeURIComponent(query)}`);
    return response.json();
  },

  // Get customer statistics
  async getCustomerStats(): Promise<{
    totalCustomers: number;
    activeCustomers: number;
    totalRevenue: number;
    averageOrderValue: number;
  }> {
    // In real implementation: GET /api/customers/stats
    // This would join users with orders table to calculate stats
    // SQL: SELECT 
    //        COUNT(*) as total_customers,
    //        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_customers,
    //        SUM(total_spent) as total_revenue,
    //        AVG(average_order_value) as avg_order_value
    //      FROM users WHERE role = 'customer'
    const response = await fetch('/api/customers/stats');
    return response.json();
  },

  // Update customer level (premium, vip, etc.)
  async updateCustomerLevel(id: number, level: 'regular' | 'premium' | 'vip'): Promise<User> {
    // In real implementation: PATCH /api/users/{id}/level
    // SQL: UPDATE users SET customer_level = ? WHERE id = ? AND role = 'customer'
    const response = await fetch(`/api/users/${id}/level`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerLevel: level })
    });
    return response.json();
  },

  // Get customer order history
  async getCustomerOrders(customerId: number) {
    // In real implementation: GET /api/customers/{id}/orders
    // SQL: SELECT * FROM orders WHERE customer_id = ? (where customer_id references users.id)
    const response = await fetch(`/api/customers/${customerId}/orders`);
    return response.json();
  }
};

// Database Schema Recommendation:
/*
Users Table:
- id (Primary Key)
- username (Unique)
- email (Unique) 
- password_hash
- full_name
- role (ENUM: 'admin', 'staff', 'customer')
- phone
- address
- date_joined
- last_login
- status (ENUM: 'active', 'inactive', 'blocked')

Customer Profile Table (Optional - for customer-specific data):
- user_id (Foreign Key to users.id)
- customer_level (ENUM: 'regular', 'premium', 'vip')
- total_orders
- total_spent
- average_order_value
- notes
- created_at
- updated_at

Orders Table:
- id (Primary Key)
- customer_id (Foreign Key to users.id where role='customer')
- staff_id (Foreign Key to users.id where role='staff' or 'admin')
- order_date
- status
- total_amount
- ...other order fields

This approach:
1. Uses the existing user authentication system
2. Customers can log in with their accounts
3. Role-based access control works seamlessly
4. No duplicate user data
5. Consistent with the admin/staff user management
*/

export default customerService; 