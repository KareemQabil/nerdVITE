// src/features/sales-pos/utils/pos.utils.ts
import { CartItem } from '../types/pos.types';

/**
 * Formats a number as Saudi Riyal (SAR) currency.
 * @param amount The number to format.
 * @returns A string representing the formatted currency.
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

interface OrderTotals {
    subtotal: number;
    tax: number;
    discount: number;
    grandTotal: number;
}

interface CalculateOrderTotalsOptions {
    taxRate?: number; // e.g., 0.15 for 15% VAT
    orderDiscountPercentage?: number; // e.g., 0.10 for 10% discount
    orderDiscountAmount?: number; // e.g., 50 for 50 SAR discount
}

/**
 * Calculates the subtotal, tax, discount, and grand total for a list of cart items.
 *
 * @param items An array of CartItem objects.
 * @param options Configuration for tax and discounts.
 * @returns An object containing the calculated totals.
 */
export const calculateOrderTotals = (
    items: CartItem[],
    options?: CalculateOrderTotalsOptions
): OrderTotals => {
    const { taxRate = 0.15, orderDiscountPercentage = 0, orderDiscountAmount = 0 } = options || {};

    let subtotal = 0;
    for (const item of items) {
        // Correctly accessing price from CartItem based on previous type definition
        // item.unitPrice includes modifiers in our store logic, but let's re-verify safe usage
        const itemTotal = item.totalPrice;
        subtotal += itemTotal;
    }

    let discountAmount = 0;
    if (orderDiscountPercentage > 0) {
        discountAmount = subtotal * orderDiscountPercentage;
    } else if (orderDiscountAmount > 0) {
        discountAmount = orderDiscountAmount;
    }

    discountAmount = Math.min(discountAmount, subtotal);

    const subtotalAfterDiscount = subtotal - discountAmount;
    const tax = subtotalAfterDiscount * taxRate;
    const grandTotal = subtotalAfterDiscount + tax;

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        discount: parseFloat(discountAmount.toFixed(2)),
        grandTotal: parseFloat(grandTotal.toFixed(2)),
    };
};
