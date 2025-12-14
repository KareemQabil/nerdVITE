// src/features/sales-pos/components/POSScreen.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';


// HOOKS
import { usePOSData } from '../hooks/usePOSData';
import { useShift } from '../hooks/useShift';
import { usePOSModals } from '../hooks/usePOSModals';

// COMPONENTS
import MainNavigationSidebar from './MainNavigationSidebar';
import CartPanel from './CartPanel';
import POSActionBar from './POSActionBar';
import ProductGrid from './ProductGrid';
import CategoryFilters from './CategoryFilters';
import SearchBar from './SearchBar';
import OrderTypeDropdown from './OrderTypeDropdown';
import FeedbackBar from './FeedbackBar';

// MODALS
import PaymentModal from './modals/PaymentModal';

const POSScreen: React.FC = () => {
    const { t } = useTranslation('sales-pos');
    const {
        isLoading: isDataLoading,
        isError: isDataError,
        error: dataError
    } = usePOSData();
    const {
        shift,
        isLoading: isShiftLoading,
        isError: isShiftError,
        error: shiftError
    } = useShift();
    const { isCartOpen } = usePOSModals();

    const isLoading = isDataLoading || isShiftLoading;
    const isError = isDataError || isShiftError;
    const errorMessage = dataError?.message || shiftError?.message;

    // RTL Note: In RTL 'ml-80' pushes content from left (which is end in LTR but start in RTL? Wait).
    // In RTL, margin-left pushes away from left. Cart is on Right. So we need margin-right to push away from right?
    // Let's verify: CartPanel is `fixed top-0 right-0`. It covers the right side.
    // So the content needs `margin-right` to not be covered.
    // In Tailwind RTL plugin, `mr` is margin-inline-start? Standard Tailwind `mr` is `margin-right`.
    // Assuming standard Tailwind without RTL plugin logic for physical properties:
    // We need `mr-96` to push content away from the fixed right panel.
    const contentStyle = {
        marginRight: isCartOpen ? '24rem' : '5rem', // 24rem = 96 (w-96), 5rem = 20 (w-20 for sidebar)
        transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#001219] text-cyan-400 font-almarai">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xl animate-pulse">{t('posScreen.loadingPOSData')}</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#001219] text-red-400 font-almarai">
                <div className="text-center p-8 border border-red-900/50 rounded-2xl bg-red-900/10 backdrop-blur">
                    <h2 className="text-2xl font-bold mb-2">Error</h2>
                    <p>{t('posScreen.dataLoadError', { message: errorMessage })}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!shift || shift.status === 'Closed') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#001219] text-orange-400 font-almarai">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Shift Closed</h2>
                    <p>{t('posScreen.noActiveShift')}</p>
                    {/* Add Start Shift button/logic here later */}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#001219] text-white font-almarai overflow-hidden relative">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

            {/* Layout Components */}
            <MainNavigationSidebar />
            <FeedbackBar />

            {/* Main Content Area */}
            <div style={contentStyle} className="min-h-screen flex flex-col relative z-0">

                {/* Header / Top Bar */}
                <header className="px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10 bg-[#001219]/80 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-4 flex-1">
                        <SearchBar />
                    </div>
                    <div className="flex items-center gap-4">
                        <OrderTypeDropdown />
                        {/* More header items like table selector indicator could go here */}
                    </div>
                </header>

                {/* Categories */}
                <div className="px-6 py-2 sticky top-[80px] z-10 bg-[#001219]/80 backdrop-blur-md">
                    <CategoryFilters />
                </div>

                {/* Product Grid */}
                <main className="flex-1 overflow-y-auto px-2 pb-24 custom-scrollbar">
                    <ProductGrid />
                </main>

                {/* Action Bar (Fixed at bottom) */}
                <POSActionBar />
            </div>

            {/* Side Panels & Modals */}
            <CartPanel />
            <PaymentModal />

            {/* Other modals will be added here */}
            {/* <TableSelectorModal /> */}
            {/* <DiscountModal /> */}
        </div>
    );
};

export default POSScreen;
