// src/features/sales-pos/hooks/useCart.ts
import { useCartStore } from '../stores/cart.store';

export const useCart = () => {
    const store = useCartStore();
    return {
        items: store.items,
        customer: store.customer,
        table: store.table,
        orderType: store.orderType,
        discount: store.discount,
        subtotal: store.subtotal,
        tax: store.taxAmount,
        total: store.total,
        grandTotal: store.grandTotal,
        addItemToCart: store.addToCart,
        removeItemFromCart: store.removeFromCart,
        increaseQuantity: store.increaseQuantity,
        decreaseQuantity: store.decreaseQuantity,
        updateQuantity: store.updateQuantity,
        setCustomer: store.setCustomer,
        setTable: store.setTable,
        setOrderType: store.setOrderType,
        applyDiscount: store.applyDiscount,
        clearCart: store.clearCart,
        selectedCustomer: store.customer,
        selectedTable: store.table,
    };
};
