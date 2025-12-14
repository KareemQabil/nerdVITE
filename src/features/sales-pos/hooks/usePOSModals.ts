// src/features/sales-pos/hooks/usePOSModals.ts
import { usePOSUIStore } from '../stores/pos-ui.store';

export const usePOSModals = () => {
    const store = usePOSUIStore();
    return {
        isCartOpen: store.isCartOpen,
        toggleCart: store.toggleCartPanel,
        openDiscountModal: store.openDiscountModal,
        activeCategoryId: store.activeCategoryId,
        searchTerm: store.searchTerm,
        setActiveCategory: store.setActiveCategory,
        setSearchTerm: store.setSearchTerm,
        isPaymentModalOpen: store.isPaymentModalOpen,
        closePaymentModal: store.closePaymentModal,
        isTableModalOpen: store.isTableSelectorModalOpen,
        isDiscountModalOpen: store.isDiscountModalOpen,
        isHoldOrdersModalOpen: store.isHoldOrdersModalOpen,
        isCustomerSelectorModalOpen: store.isCustomerSelectorModalOpen,
        isBarcodeScannerModalOpen: store.isBarcodeScannerModalOpen,
        isProductModifiersModalOpen: store.isProductModifiersModalOpen,
        isReturnsModalOpen: store.isReturnsModalOpen,
        isKitchenSendModalOpen: store.isKitchenSendModalOpen,
        isReceiptPreviewModalOpen: store.isReceiptPreviewModalOpen,
        openPaymentModal: store.openPaymentModal,
        openTableSelectorModal: store.openTableSelectorModal
    };
};
