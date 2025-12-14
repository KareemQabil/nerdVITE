// src/features/sales-pos/components/CartPanel.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, X, User, Table } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { usePOSModals } from '../hooks/usePOSModals';
import CartItemCard from './CartItemCard';
import { formatCurrency } from '../utils/pos.utils';

const SummaryFooter: React.FC<{ subtotal: number; tax: number; discount: number; grandTotal: number }> = ({
    subtotal, tax, discount, grandTotal
}) => {
    const { t } = useTranslation('sales-pos');
    return (
        <div className="p-4 border-t border-cyan-800/30 bg-[#023047] text-white font-almarai">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{t('cart.subtotal')}</span>
                <span className="text-lg font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{t('cart.discount')}</span>
                <span className="text-lg font-semibold text-red-400">{formatCurrency(discount || 0)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{t('cart.tax')}</span>
                <span className="text-lg font-semibold">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-cyan-700/50 mt-3">
                <span className="text-xl font-bold text-cyan-300">{t('cart.grand_total')}</span>
                <span className="text-2xl font-extrabold text-cyan-200">{formatCurrency(grandTotal)}</span>
            </div>
        </div>
    );
};

const CartPanel: React.FC = () => {
    const { t } = useTranslation('sales-pos');
    const { isCartOpen, toggleCart } = usePOSModals();
    const { items, subtotal, tax, discount, grandTotal, selectedCustomer, selectedTable } = useCart();

    const panelVariants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            },
        },
        exit: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            },
        },
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed top-0 right-0 h-full w-80 md:w-96
                     bg-gradient-to-b from-[#023047] to-[#001219]
                     shadow-2xl z-50 flex flex-col font-almarai text-white"
                    dir="rtl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-cyan-800/30">
                        <h2 className="text-2xl font-bold text-cyan-300 flex items-center">
                            <ShoppingCart className="w-6 h-6 ml-2" />
                            {t('cart.your_order')}
                        </h2>
                        <motion.button
                            onClick={() => toggleCart(false)}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                            title={t('cart.close_cart')}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Customer & Table Info */}
                    <div className="p-4 border-b border-cyan-800/30 text-sm text-gray-300">
                        <div className="flex items-center mb-1">
                            <User className="w-4 h-4 ml-2 text-cyan-400" />
                            <span>{t('cart.customer')}: </span>
                            <span className="font-medium text-white mr-1">
                                {selectedCustomer ? selectedCustomer.name : t('cart.no_customer')}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Table className="w-4 h-4 ml-2 text-cyan-400" />
                            <span>{t('cart.table')}: </span>
                            <span className="font-medium text-white mr-1">
                                {selectedTable ? selectedTable.name : t('cart.no_table')}
                            </span>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                        <AnimatePresence>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <CartItemCard key={item.product.id} item={item} />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-gray-400 text-lg"
                                >
                                    <ShoppingCart className="w-16 h-16 mb-4" />
                                    {t('cart.empty_cart')}
                                    <p className="text-sm text-gray-500 mt-2">{t('cart.add_items_to_start')}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Summary Footer */}
                    <SummaryFooter
                        subtotal={subtotal}
                        tax={tax}
                        discount={discount ? (discount.type === 'fixed' ? discount.value : subtotal * discount.value / 100) : 0}
                        grandTotal={grandTotal}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartPanel;
