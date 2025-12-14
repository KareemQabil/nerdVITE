// src/features/sales-pos/hooks/useShift.ts
import { useQuery } from '@tanstack/react-query';
import { posService } from '../services/pos.service';

export const useShift = () => {
    // Hardcoded user ID for now, in real app this comes from auth context
    const userId = '1';

    const { data: shift, isLoading, isError, error } = useQuery({
        queryKey: ['activeShift', userId],
        queryFn: () => posService.getShift(userId),
        retry: false,
    });

    return {
        shift: shift || { id: 'mock-shift-id', userId, status: 'Open', startCash: 100 }, // Mock fallback
        isLoading,
        isError,
        error,
    };
};
