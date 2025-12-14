// src/features/sales-pos/services/pos.service.ts

import { api } from '@/lib/axios';
import {
    POSProduct,
    POSCategory,
    Table,
    PaymentMethod,
    POSOrder,
    Shift,
    CreateOrderDto,
    ProcessPaymentDto,
    StartShiftDto,
    UpdateShiftDto,
    KitchenTicket,
    SendToKitchenDto,
    Discount
} from '../types/pos.types';

export const posService = {
    /**
     * Catalog Module Routes
     */
    getProducts: async (categoryId?: string, searchTerm?: string): Promise<POSProduct[]> => {
        const response = await api.get('/products', {
            params: { categoryId, searchTerm },
        });

        // Handle potentially different response structures (interceptor vs raw)
        const rawData = (response as any).data || response;
        const items = rawData.items || rawData;

        if (!Array.isArray(items)) {
            console.warn("⚠️ getProducts expected Array but got:", items);
            return [];
        }

        return items.map((item: any) => ({
            id: String(item.id),
            name: item.names?.ar || item.names?.en || item.name || 'منتج مجهول',
            price: Number(item.pricing?.sale || item.price || 0),
            sku: item.sku,
            description: item.names?.en || '',
            categoryId: String(item.category?.id || ''),
            stockQuantity: 100, // Assuming 100 as backend doesn't send stock in list yet
            imageUrl: item.image_url || undefined,
            isAvailable: item.is_active,
            modifiers: item.modifier_groups?.map((g: any) => ({
                id: String(g.id),
                name: g.name,
                type: 'SingleSelect', // Defaulting as specific type info involves more mapping
                options: [],
                isRequired: false
            })) || []
        }));
    },

    getCategories: async (): Promise<POSCategory[]> => {
        const response = await api.get<POSCategory[]>('/categories');
        return response as unknown as POSCategory[];
    },

    /**
     * Operations Module Routes
     */
    getTables: async (): Promise<Table[]> => {
        const response = await api.get<Table[]>('/operations/restaurant/tables');
        return response as unknown as Table[];
    },

    sendToKitchen: async (sendData: SendToKitchenDto): Promise<KitchenTicket> => {
        const response = await api.post<KitchenTicket>('/operations/restaurant/kitchen-tickets', sendData);
        return response as unknown as KitchenTicket;
    },

    /**
     * Finance Module Routes
     */
    getPaymentMethods: async (): Promise<PaymentMethod[]> => {
        const response = await api.get<PaymentMethod[]>('/finance/payment-methods');
        return response as unknown as PaymentMethod[];
    },

    processPayment: async (paymentData: ProcessPaymentDto): Promise<any> => {
        const response = await api.post<any>('/transactions', paymentData);
        return response;
    },

    /**
     * Sales Module Routes
     */
    createOrder: async (orderData: CreateOrderDto): Promise<POSOrder> => {
        const response = await api.post<POSOrder>('/orders', orderData);
        return response as unknown as POSOrder;
    },

    // --- SHIFT LOGIC ---

    getShift: async (userId: string): Promise<Shift | null> => {
        const realId = userId === 'current-user-id' ? '1' : userId;
        const response = await api.get<Shift | null>(`/shifts/user/${realId}/active`);
        return response as unknown as Shift | null;
    },

    startShift: async (shiftData: StartShiftDto): Promise<Shift> => {
        const response = await api.post<Shift>('/shifts/start', shiftData);
        return response as unknown as Shift;
    },

    endShift: async (shiftId: string, updateData: UpdateShiftDto): Promise<Shift> => {
        const response = await api.patch<Shift>(`/shifts/${shiftId}/end`, updateData);
        return response as unknown as Shift;
    },

    applyDiscount: async (orderId: string, data: { discount: Discount }): Promise<POSOrder> => {
        const response = await api.post<POSOrder>(`/orders/${orderId}/discount`, data);
        return response as unknown as POSOrder;
    },

    voidOrder: async (orderId: string): Promise<void> => {
        await api.delete(`/orders/${orderId}`);
    },

    updateOrder: async (orderId: string, data: any): Promise<POSOrder> => {
        const response = await api.patch<POSOrder>(`/orders/${orderId}`, data);
        return response as unknown as POSOrder;
    }
};
