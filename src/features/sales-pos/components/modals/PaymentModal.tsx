// src/features/sales-pos/components/modals/PaymentModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

import { usePOSModals } from '../../hooks/usePOSModals';
import { usePOSData } from '../../hooks/usePOSData';
import { useCart } from '../../hooks/useCart';
import { useOrderActions } from '../../hooks/useOrderActions';
import { formatCurrency } from '../../utils/pos.utils';
import { useFeedback } from '../../hooks/useFeedback';

const PaymentModal: React.FC = () => {
    const { t } = useTranslation('sales-pos');
    const { isPaymentModalOpen, closePaymentModal } = usePOSModals();
    const { paymentMethods, isLoading: isLoadingPaymentMethods } = usePOSData();
    const { grandTotal, clearCart } = useCart();
    const { showFeedback } = useFeedback();

    const { isLoading: isProcessingPayment } = useOrderActions();

    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null);
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [changeDue, setChangeDue] = useState<number>(0);

    useEffect(() => {
        if (isPaymentModalOpen) {
            setAmountPaid(grandTotal);
            setChangeDue(0);
            setSelectedPaymentMethodId(null);
        }
    }, [isPaymentModalOpen, grandTotal]);

    useEffect(() => {
        setChangeDue(amountPaid - grandTotal);
    }, [amountPaid, grandTotal]);

    const handlePayment = async () => {
        if (!selectedPaymentMethodId) {
            showFeedback('error', t('paymentModal.selectPaymentMethod'));
            return;
        }
        if (amountPaid < grandTotal) {
            showFeedback('error', t('paymentModal.amountLessThanTotal'));
            return;
        }

        const selectedMethod = paymentMethods?.find(pm => pm.id === selectedPaymentMethodId);

        if (!selectedMethod) {
            showFeedback('error', t('paymentModal.invalidPaymentMethod'));
            return;
        }

        try {
            // In a real implementation we would first Create the Order then Process Payment, or do it in one transaction.
            // Assuming Create Order happens before or part of this flow. For now, calling processPayment directly as requested.
            // Ideally we need an orderId here which implies the order is already created. 
            // For this simplified version (no backend), we'll simulate success.

            // await processPaymentMutation.mutateAsync({ ... });

            showFeedback('success', t('paymentModal.paymentSuccess'));
            clearCart();
            closePaymentModal();
        } catch (error) {
            console.error('Payment failed:', error);
            showFeedback('error', t('paymentModal.paymentFailed'));
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setAmountPaid(value);
        } else if (e.target.value === '') {
            setAmountPaid(0);
        }
    };

    return (
        <AnimatePresence>
            {isPaymentModalOpen && (
                <Dialog
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] overflow-y-auto"
                    onClose={closePaymentModal}
                >
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 font-almarai"
                        >
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
                            >
                                {t('paymentModal.title')}
                            </Dialog.Title>
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                onClick={closePaymentModal}
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <div className="mt-4">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {t('paymentModal.amountDue')}:{' '}
                                        <span className="font-semibold text-cyan-600 dark:text-cyan-400 text-xl">
                                            {formatCurrency(grandTotal)}
                                        </span>
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        {t('paymentModal.amountPaid')}
                                    </label>
                                    <input
                                        type="number"
                                        id="amountPaid"
                                        value={amountPaid === 0 ? '' : amountPaid}
                                        onChange={handleAmountChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 focus:border-cyan-500 focus:ring-cyan-500 dark:text-white"
                                        placeholder={formatCurrency(grandTotal)}
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {t('paymentModal.changeDue')}:{' '}
                                        <span
                                            className={clsx(
                                                'font-semibold',
                                                changeDue < 0 ? 'text-red-500' : 'text-green-600 dark:text-green-400'
                                            )}
                                        >
                                            {formatCurrency(changeDue)}
                                        </span>
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <p className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        {t('paymentModal.selectMethod')}
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {isLoadingPaymentMethods ? (
                                            <div className="col-span-2 text-center text-gray-500 dark:text-gray-400">
                                                {t('common.loading')}...
                                            </div>
                                        ) : (
                                            <div className="col-span-2 text-center text-gray-400 italic">No payment methods loaded (Mock Mode)</div>
                                        )}
                                        {/* Mock buttons for payment methods if none loaded */}
                                        {!isLoadingPaymentMethods && (!paymentMethods || paymentMethods.length === 0) && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPaymentMethodId('cash')}
                                                    className={clsx(
                                                        'flex items-center justify-center rounded-lg border p-4 text-sm font-medium transition-colors',
                                                        selectedPaymentMethodId === 'cash'
                                                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                                                            : 'border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                                                    )}
                                                >
                                                    Cash
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPaymentMethodId('card')}
                                                    className={clsx(
                                                        'flex items-center justify-center rounded-lg border p-4 text-sm font-medium transition-colors',
                                                        selectedPaymentMethodId === 'card'
                                                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                                                            : 'border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                                                    )}
                                                >
                                                    Card
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    onClick={closePaymentModal}
                                    disabled={isProcessingPayment}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePayment}
                                    disabled={!selectedPaymentMethodId || amountPaid < grandTotal || isProcessingPayment}
                                >
                                    {isProcessingPayment ? t('common.processing') : t('paymentModal.payButton')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
