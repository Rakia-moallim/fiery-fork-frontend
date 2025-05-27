import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationService, Reservation } from '@/lib/api';
import { toast } from 'sonner';

// Custom hook for fetching user's reservations
export const useMyReservations = () => {
  return useQuery({
    queryKey: ['reservations', 'my-reservations'],
    queryFn: reservationService.getMyReservations,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Custom hook for fetching a single reservation
export const useReservation = (reservationId: number) => {
  return useQuery({
    queryKey: ['reservation', reservationId],
    queryFn: () => reservationService.getReservationById(reservationId),
    enabled: !!reservationId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Custom hook for creating a reservation
export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationData: Omit<Reservation, 'id' | 'user' | 'status' | 'createdAt' | 'updatedAt'>) => 
      reservationService.createReservation(reservationData),
    onSuccess: (newReservation: Reservation) => {
      // Invalidate and refetch reservations
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create reservation');
    },
  });
};

// Custom hook for updating a reservation
export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Reservation> }) => 
      reservationService.updateReservation(id, data),
    onSuccess: () => {
      // Invalidate and refetch reservations
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update reservation');
    },
  });
};

// Custom hook for canceling a reservation
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => reservationService.cancelReservation(reservationId),
    onSuccess: () => {
      // Invalidate and refetch reservations
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel reservation');
    },
  });
}; 