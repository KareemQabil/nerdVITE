// src/features/sales-pos/hooks/usePOSData.ts
import { useQuery } from '@tanstack/react-query';
import { posService } from '../services/pos.service';
import { POSCategory, POSProduct, Table, PaymentMethod } from '../types/pos.types';

export const POS_QUERY_KEYS = {
    products: 'posProducts',
    categories: 'posCategories',
    tables: 'posTables',
    paymentMethods: 'posPaymentMethods',
    shifts: 'posShifts',
};

export const usePOSData = () => {
    // We can bundle these or export individually. The prompt implies a single hook `usePOSData` that might return everything, 
    // but the `ProductGrid` uses `usePOSData().products`. So I will make it a composite hook or export sub-hooks.
    // The previous prompt showed `useProducts` separately. But `ProductGrid` imported `usePOSData` and destructured `{ products }`.
    // I will stick to returning everything from `usePOSData` for simplicity as implied by usage, but also export individual hooks.

    const { data: products, isLoading: isProductsLoading, error: productsError } = useProducts();
    const { data: categories, isLoading: isCategoriesLoading } = useCategories();
    const { data: tables, isLoading: isTablesLoading } = useTables();
    const { data: paymentMethods, isLoading: isPaymentMethodsLoading } = usePaymentMethods();

    return {
        products,
        categories,
        tables,
        paymentMethods,
        isLoading: isProductsLoading || isCategoriesLoading || isTablesLoading || isPaymentMethodsLoading,
        isError: !!productsError, // Simplify error handling for now
        error: productsError
    };
};

export const useProducts = (categoryId?: string, searchTerm?: string) => {
    return useQuery<POSProduct[], Error>({
        queryKey: [POS_QUERY_KEYS.products, { categoryId, searchTerm }],
        queryFn: () => posService.getProducts(categoryId, searchTerm),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCategories = () => {
    return useQuery<POSCategory[], Error>({
        queryKey: [POS_QUERY_KEYS.categories],
        queryFn: posService.getCategories,
        staleTime: 1000 * 60 * 60,
    });
};

export const useTables = () => {
    return useQuery<Table[], Error>({
        queryKey: [POS_QUERY_KEYS.tables],
        queryFn: posService.getTables,
        staleTime: 1000 * 30,
    });
};

export const usePaymentMethods = () => {
    return useQuery<PaymentMethod[], Error>({
        queryKey: [POS_QUERY_KEYS.paymentMethods],
        queryFn: posService.getPaymentMethods,
        staleTime: 1000 * 60 * 60 * 24,
    });
};
