// src/features/sales-pos/types/pos.types.ts

/**
 * Core Entities & DTOs for the Sales POS feature.
 * These interfaces mirror or extend backend DTOs where applicable.
 */

// --- Product & Catalog Types ---

export interface ModifierOption {
    id: string;
    name: string;
    priceAdjustment: number; // Can be positive (add) or negative (subtract)
}

export interface ProductModifier {
    id: string;
    name: string;
    type: 'SingleSelect' | 'MultiSelect'; // e.g., 'Size', 'Extras'
    options: ModifierOption[];
    isRequired: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    sku: string;
    barcode?: string;
    stockQuantity: number; // Renamed from stock to stockQuantity to match usage in ProductCard
    imageUrl?: string;
    categoryId: string;
    modifiers?: ProductModifier[]; // Optional product-specific modifiers
    isAvailable: boolean;
}

export interface Category {
    id: string;
    name: string;
    imageUrl?: string;
}

export type POSProduct = Product; // Alias for clarity, can be extended later if needed
export type POSCategory = Category; // Alias for clarity

// --- Order & Cart Types ---

export interface CartItemModifier {
    modifierId: string; // ID of the ProductModifier
    optionId: string; // ID of the selected ModifierOption
    modifierName: string; // Name of the modifier (e.g., "Size")
    optionName: string; // Name of the selected option (e.g., "Large")
    priceAdjustment: number; // Price impact of this specific option
    id: string; // Added to match usage in PaymentModal (modifiers.map(mod => mod.id))
    price: number; // Added to match usage in PaymentModal (mod.price)
}

export interface CartItem {
    product: POSProduct; // Changed to contain full product object to match usage in CartItemCard
    productId: string;
    productName: string;
    sku: string;
    imageUrl?: string;
    price: number; // Renamed from unitPrice to price to match calculateOrderTotals
    unitPrice: number; // Keeping unitPrice as well for compatibility
    quantity: number;
    modifiers: CartItemModifier[]; // Selected modifiers for this specific cart item
    specialInstructions?: string;
    notes?: string; // Added to match usage in PaymentModal
    subtotal: number; // Calculated: (unitPrice + sum(modifierPriceAdjustments)) * quantity
    totalPrice: number; // Added to match usage in CartItemCard
}

export type OrderType = 'Takeaway' | 'Dine-In' | 'Delivery';
export type OrderStatus = 'Pending' | 'Completed' | 'Cancelled' | 'Held' | 'KitchenPending' | 'KitchenConfirmed' | 'Refunded';

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number; // Price per item including modifier adjustments
    subtotal: number; // quantity * unitPrice
    modifiers: CartItemModifier[]; // Modifiers applied to this specific order item
    specialInstructions?: string;
    kitchenStatus?: 'Pending' | 'Sent' | 'Prepared' | 'Served';
}

export interface Payment {
    id: string;
    paymentMethodId: string;
    methodName: string;
    amount: number;
    transactionRef?: string; // e.g., card transaction ID
    createdAt: string;
}

export interface Discount {
    type: 'percentage' | 'fixed';
    value: number; // e.g., 10 for 10% or 5 for $5 fixed
    reason?: string;
    appliedByUserId?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    orderType: OrderType;
    subtotal: number; // Sum of all order item subtotals before tax/discount
    taxAmount: number;
    discountAmount: number; // Total discount applied
    total: number; // Final amount after tax and discount
    customerId?: string;
    customerName?: string;
    tableId?: string;
    tableName?: string;
    shiftId: string;
    orderItems: OrderItem[];
    payments: Payment[];
    discount?: Discount; // The specific discount applied
    createdAt: string;
    updatedAt: string;
}

export type POSOrder = Order; // Alias for clarity

// --- Shift & User Types ---

export type ShiftStatus = 'Open' | 'Closed';

export interface Shift {
    id: string;
    userId: string;
    userName: string;
    startTime: string; // ISO date string
    endTime?: string; // ISO date string
    startCash: number;
    endCash?: number;
    status: ShiftStatus;
    totalSales?: number;
    totalPayments?: { method: string; amount: number }[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string; // e.g., 'Cashier', 'Manager'
}

// --- Customer & Table Types ---

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
}

export type TableStatus = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning';

export interface Table {
    id: string;
    name: string;
    capacity: number;
    status: TableStatus;
    currentOrderId?: string; // If occupied
}

// --- Payment Method Types ---

export interface PaymentMethod {
    id: string;
    name: string;
    type: 'Cash' | 'Card' | 'MobilePay' | 'Other';
    isActive: boolean;
}

// --- Kitchen Ticket Types ---

export interface KitchenTicketItem {
    orderItemId: string;
    productId: string;
    productName: string;
    quantity: number;
    modifiers: CartItemModifier[];
    specialInstructions?: string;
    printerTag?: string; // e.g., "Bar", "Grill"
}

export type KitchenTicketStatus = 'Pending' | 'Sent' | 'Acknowledged' | 'Completed';

export interface KitchenTicket {
    id: string;
    orderId: string;
    items: KitchenTicketItem[];
    status: KitchenTicketStatus;
    createdAt: string;
    sentAt?: string;
    completedAt?: string;
}

// --- UI Feedback Types ---

export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

export interface FeedbackMessage {
    type: FeedbackType;
    message: string;
    duration?: number; // in milliseconds, default to 3000
}

// --- DTOs for API Requests ---

export interface CreateOrderItemDto {
    productId: string;
    quantity: number;
    unitPrice: number; // The effective unit price after modifiers
    modifiers?: { modifierId: string; price: number }[];
    specialInstructions?: string;
    notes?: string;
}

export interface CreateOrderDto {
    orderType: OrderType;
    customerId?: string;
    tableId?: string;
    orderItems: CreateOrderItemDto[];
    discount?: Discount;
    shiftId: string; // Required for order creation
    payment?: {
        methodId: string;
        amount: number;
    };
    totalAmount?: number;
}

export interface ProcessPaymentDto {
    orderId: string;
    paymentMethodId: string;
    amount: number;
    transactionRef?: string;
}

export interface UpdateShiftDto {
    endTime?: string;
    endCash?: number;
    status?: ShiftStatus;
}

export interface StartShiftDto {
    userId: string;
    startCash: number;
}

export interface SendToKitchenDto {
    orderId: string;
    items: KitchenTicketItem[];
}
