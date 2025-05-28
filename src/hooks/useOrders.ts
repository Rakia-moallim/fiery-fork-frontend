import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService, OrderRequest, Order } from '@/lib/api';
import { toast } from 'sonner';

// Custom hook for fetching user's orders
export const useMyOrders = () => {
  return useQuery({
    queryKey: ['orders', 'my-orders'],
    queryFn: orderService.getMyOrders,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Custom hook for fetching a single order
export const useOrder = (orderId: number) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Custom hook for creating an order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: OrderRequest) => orderService.createOrder(orderData),
    onSuccess: (newOrder: Order) => {
      // Invalidate and refetch orders
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order placed successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to place order');
    },
  });
};

// Custom hook for canceling an order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      // Invalidate and refetch orders
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel order');
    },
  });
};

// Admin/Staff hooks
// Custom hook for fetching all orders (admin/staff)
export const useAllOrders = () => {
  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: orderService.getAllOrders,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Custom hook for fetching orders by status
export const useOrdersByStatus = (status: string) => {
  return useQuery({
    queryKey: ['orders', 'status', status],
    queryFn: () => orderService.getOrdersByStatus(status),
    enabled: !!status,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Custom hook for updating order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: string }) => 
      orderService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      // Invalidate and refetch all order queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update order status');
    },
  });
};

// Custom hook for getting total revenue
export const useTotalRevenue = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['orders', 'revenue', startDate, endDate],
    queryFn: () => orderService.getTotalRevenue(startDate, endDate),
    enabled: !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for getting order count by status
export const useOrderCountByStatus = (status: string) => {
  return useQuery({
    queryKey: ['orders', 'count', status],
    queryFn: () => orderService.getOrderCountByStatus(status),
    enabled: !!status,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}; 