// src/features/sales-pos/hooks/useOrderActions.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { posService } from '../services/pos.service';
import {
    CreateOrderDto,
    POSOrder,
    SendToKitchenDto,
    ProcessPaymentDto
} from '../types/pos.types';
import { useFeedback } from './useFeedback';
import { POS_QUERY_KEYS } from './usePOSData';

export const useOrderActions = () => {
    const queryClient = useQueryClient();
    const { showFeedback } = useFeedback();

    const createOrderMutation = useMutation<POSOrder, Error, CreateOrderDto>({
        mutationFn: (orderData) => posService.createOrder(orderData),
        onSuccess: (data) => {
            showFeedback('success', `Order #${data.orderNumber} created successfully!`);
            queryClient.invalidateQueries({ queryKey: [POS_QUERY_KEYS.tables] });
        },
        onError: (error) => {
            showFeedback('error', `Failed to create order: ${error.message}`);
        },
    });

    const processPaymentMutation = useMutation<any, Error, ProcessPaymentDto>({
        mutationFn: (paymentData) => posService.processPayment(paymentData),
        onSuccess: () => {
            // showFeedback('success', `Payment processed for order ${variables.orderId}.`);
            // Handled in component or strictly here? Modal logic seemed to handle success. keeping it here too.
            queryClient.invalidateQueries({ queryKey: [POS_QUERY_KEYS.tables] });
        },
        onError: () => {
            // showFeedback('error', `Payment failed: ${error.message}`);
        },
    });

    const sendToKitchenMutation = useMutation<any, Error, SendToKitchenDto>({
        mutationFn: (data) => posService.sendToKitchen(data),
        onSuccess: () => {
            showFeedback('success', 'Order sent to kitchen successfully!');
        },
        onError: (error) => {
            showFeedback('error', `Failed to send to kitchen: ${error.message}`);
        },
    });

    return {
        createOrderMutation,
        processPaymentMutation,
        sendToKitchenMutation,
        isLoading: createOrderMutation.isPending || processPaymentMutation.isPending || sendToKitchenMutation.isPending
    };
};
