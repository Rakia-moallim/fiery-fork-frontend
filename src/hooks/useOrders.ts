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