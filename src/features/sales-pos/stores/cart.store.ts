// src/features/sales-pos/stores/cart.store.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    CartItem,
    POSProduct,
    Customer,
    Table,
    OrderType,
    CartItemModifier,
    Discount,
} from '../types/pos.types';

interface CartState {
    items: CartItem[];
    customer: Customer | null;
    table: Table | null;
    orderType: OrderType;
    discount: Discount | null;
    subtotal: number;
    taxAmount: number;
    total: number;
    grandTotal: number; // Added to match usage
    taxRate: number;
}

interface CartActions {
    addToCart: (
        product: POSProduct,
        quantity?: number,
        modifiers?: CartItemModifier[],
        specialInstructions?: string,
    ) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    setCustomer: (customer: Customer | null) => void;
    setTable: (table: Table | null) => void;
    setOrderType: (type: OrderType) => void;
    applyDiscount: (discount: Discount | null) => void;
    clearCart: () => void;
    _calculateTotals: () => void;
}

const DEFAULT_TAX_RATE = 0.15; // 15% tax

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            items: [],
            customer: null,
            table: null,
            orderType: 'Takeaway',
            discount: null,
            subtotal: 0,
            taxAmount: 0,
            total: 0,
            grandTotal: 0,
            taxRate: DEFAULT_TAX_RATE,

            _calculateTotals: () => {
                const { items, discount, taxRate } = get();
                let currentSubtotal = 0;

                items.forEach((item) => {
                    currentSubtotal += item.totalPrice;
                });

                let discountAmount = 0;
                if (discount) {
                    if (discount.type === 'percentage') {
                        discountAmount = currentSubtotal * (discount.value / 100);
                    } else {
                        discountAmount = discount.value;
                    }
                }
                discountAmount = Math.max(0, discountAmount);

                const subtotalAfterDiscount = Math.max(0, currentSubtotal - discountAmount);
                const taxAmount = subtotalAfterDiscount * taxRate;
                const total = subtotalAfterDiscount + taxAmount;

                set({
                    subtotal: currentSubtotal,
                    taxAmount: taxAmount,
                    total: total,
                    grandTotal: total, // Sync total and grandTotal
                });
            },

            addToCart: (product, quantity = 1, modifiers = [], specialInstructions) => {
                set((state) => {
                    const modifierPrice = modifiers.reduce((sum, mod) => sum + mod.priceAdjustment, 0);
                    const unitPrice = product.price + modifierPrice;

                    const existingItemIndex = state.items.findIndex(
                        (item) => item.productId === product.id
                        // In a real app we'd compare modifiers here too
                    );

                    if (existingItemIndex > -1) {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += quantity;
                        updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].quantity * unitPrice;
                        return { items: updatedItems };
                    } else {
                        const newItem: CartItem = {
                            product,
                            productId: product.id,
                            productName: product.name,
                            sku: product.sku,
                            imageUrl: product.imageUrl,
                            price: product.price,
                            unitPrice: unitPrice,
                            quantity,
                            modifiers,
                            specialInstructions,
                            subtotal: unitPrice * quantity,
                            totalPrice: unitPrice * quantity,
                        };
                        return { items: [...state.items, newItem] };
                    }
                });
                get()._calculateTotals();
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.productId !== productId),
                }));
                get()._calculateTotals();
            },

            increaseQuantity: (productId) => {
                set((state) => {
                    const updatedItems = state.items.map(item => {
                        if (item.productId === productId) {
                            const newQuantity = item.quantity + 1;
                            return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice };
                        }
                        return item;
                    });
                    return { items: updatedItems };
                });
                get()._calculateTotals();
            },

            decreaseQuantity: (productId) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.productId === productId);
                    if (existingItem && existingItem.quantity > 1) {
                        const updatedItems = state.items.map(item => {
                            if (item.productId === productId) {
                                const newQuantity = item.quantity - 1;
                                return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice };
                            }
                            return item;
                        });
                        return { items: updatedItems };
                    } else {
                        return { items: state.items.filter(item => item.productId !== productId) };
                    }
                });
                get()._calculateTotals();
            },

            updateQuantity: (productId, newQuantity) => {
                if (newQuantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set((state) => {
                    const updatedItems = state.items.map(item => {
                        if (item.productId === productId) {
                            return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice };
                        }
                        return item;
                    });
                    return { items: updatedItems };
                });
                get()._calculateTotals();
            },

            setCustomer: (customer) => set({ customer }),
            setTable: (table) => set({ table }),
            setOrderType: (type) => set({ orderType: type }),
            applyDiscount: (discount) => {
                set({ discount });
                get()._calculateTotals();
            },
            clearCart: () => {
                set({
                    items: [],
                    customer: null,
                    table: null,
                    discount: null,
                    subtotal: 0,
                    taxAmount: 0,
                    total: 0,
                    grandTotal: 0,
                    orderType: 'Takeaway',
                });
            },
        }),
        {
            name: 'pos-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
