// src/features/sales-pos/stores/pos-ui.store.ts
import { create } from 'zustand';
import { FeedbackMessage } from '../types/pos.types';

interface POSUIState {
    // Cart Panel
    isCartOpen: boolean;

    // Modals
    isPaymentModalOpen: boolean;
    isReceiptPreviewModalOpen: boolean;
    isTableSelectorModalOpen: boolean;
    isDiscountModalOpen: boolean;
    isHoldOrdersModalOpen: boolean;
    isCustomerSelectorModalOpen: boolean;
    isBarcodeScannerModalOpen: boolean;
    isProductModifiersModalOpen: boolean;
    isReturnsModalOpen: boolean;
    isKitchenSendModalOpen: boolean;

    // Product Grid Filters
    activeCategoryId: string | null;
    searchTerm: string;

    // Feedback Bar
    feedbackMessage: FeedbackMessage | null;

    // Actions
    toggleCartPanel: (isOpen?: boolean) => void;
    openCartPanel: () => void;
    closeCartPanel: () => void;

    openPaymentModal: () => void;
    closePaymentModal: () => void;

    openReceiptPreviewModal: () => void;
    closeReceiptPreviewModal: () => void;

    openTableSelectorModal: () => void;
    closeTableSelectorModal: () => void;

    openDiscountModal: () => void;
    closeDiscountModal: () => void;

    openHoldOrdersModal: () => void;
    closeHoldOrdersModal: () => void;

    openCustomerSelectorModal: () => void;
    closeCustomerSelectorModal: () => void;

    openBarcodeScannerModal: () => void;
    closeBarcodeScannerModal: () => void;

    openProductModifiersModal: () => void;
    closeProductModifiersModal: () => void;

    openReturnsModal: () => void;
    closeReturnsModal: () => void;

    openKitchenSendModal: () => void;
    closeKitchenSendModal: () => void;

    setActiveCategory: (categoryId: string | null) => void;
    setSearchTerm: (term: string) => void;

    showFeedback: (message: FeedbackMessage) => void;
    clearFeedback: () => void;
}

export const usePOSUIStore = create<POSUIState>((set) => ({
    // Initial State
    isCartOpen: false,
    isPaymentModalOpen: false,
    isReceiptPreviewModalOpen: false,
    isTableSelectorModalOpen: false,
    isDiscountModalOpen: false,
    isHoldOrdersModalOpen: false,
    isCustomerSelectorModalOpen: false,
    isBarcodeScannerModalOpen: false,
    isProductModifiersModalOpen: false,
    isReturnsModalOpen: false,
    isKitchenSendModalOpen: false,
    activeCategoryId: 'all',
    searchTerm: '',
    feedbackMessage: null,

    // Cart Panel Actions
    toggleCartPanel: (isOpen) => set((state) => ({ isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen })),
    openCartPanel: () => set({ isCartOpen: true }),
    closeCartPanel: () => set({ isCartOpen: false }),

    // Modal Actions
    openPaymentModal: () => set({ isPaymentModalOpen: true }),
    closePaymentModal: () => set({ isPaymentModalOpen: false }),

    openReceiptPreviewModal: () => set({ isReceiptPreviewModalOpen: true }),
    closeReceiptPreviewModal: () => set({ isReceiptPreviewModalOpen: false }),

    openTableSelectorModal: () => set({ isTableSelectorModalOpen: true }),
    closeTableSelectorModal: () => set({ isTableSelectorModalOpen: false }),

    openDiscountModal: () => set({ isDiscountModalOpen: true }),
    closeDiscountModal: () => set({ isDiscountModalOpen: false }),

    openHoldOrdersModal: () => set({ isHoldOrdersModalOpen: true }),
    closeHoldOrdersModal: () => set({ isHoldOrdersModalOpen: false }),

    openCustomerSelectorModal: () => set({ isCustomerSelectorModalOpen: true }),
    closeCustomerSelectorModal: () => set({ isCustomerSelectorModalOpen: false }),

    openBarcodeScannerModal: () => set({ isBarcodeScannerModalOpen: true }),
    closeBarcodeScannerModal: () => set({ isBarcodeScannerModalOpen: false }),

    openProductModifiersModal: () => set({ isProductModifiersModalOpen: true }),
    closeProductModifiersModal: () => set({ isProductModifiersModalOpen: false }),

    openReturnsModal: () => set({ isReturnsModalOpen: true }),
    closeReturnsModal: () => set({ isReturnsModalOpen: false }),

    openKitchenSendModal: () => set({ isKitchenSendModalOpen: true }),
    closeKitchenSendModal: () => set({ isKitchenSendModalOpen: false }),

    // Product Grid Filter Actions
    setActiveCategory: (categoryId) => set({ activeCategoryId: categoryId }),
    setSearchTerm: (term) => set({ searchTerm: term }),

    // Feedback Bar Actions
    showFeedback: (message) => set({ feedbackMessage: message }),
    clearFeedback: () => set({ feedbackMessage: null }),
}));
