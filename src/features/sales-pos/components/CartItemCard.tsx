// src/features/sales-pos/components/CartItemCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, XCircle } from 'lucide-react';
import { CartItem } from '../types/pos.types';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/pos.utils';

interface CartItemCardProps {
    item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
    const { t } = useTranslation('sales-pos');
    const { increaseQuantity, decreaseQuantity, removeItemFromCart } = useCart();

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            layout
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center p-3 rounded-lg mb-2
                 bg-gradient-to-r from-[#023047]/70 to-[#001219]/70
                 border border-cyan-800/20 backdrop-blur-sm text-white font-almarai"
        >
            {/* Item Image/Placeholder */}
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-700 flex-shrink-0 mr-3">
                {item.product.imageUrl ? (
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
                        {t('product.no_image_short')}
                    </div>
                )}
            </div>

            {/* Item Details */}
            <div className="flex-grow">
                <h4 className="text-base font-medium truncate" title={item.product.name}>
                    {item.product.name}
                </h4>
                <p className="text-sm text-cyan-300">{formatCurrency(item.price)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center mx-3 flex-shrink-0">
                <motion.button
                    onClick={() => decreaseQuantity(item.product.id)}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-cyan-300 transition-colors"
                >
                    <Minus className="w-4 h-4" />
                </motion.button>
                <span className="mx-2 text-lg font-semibold w-6 text-center">{item.quantity}</span>
                <motion.button
                    onClick={() => increaseQuantity(item.product.id)}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-cyan-300 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </motion.button>
            </div>

            {/* Item Total & Remove Button */}
            <div className="flex flex-col items-end flex-shrink-0">
                <p className="text-lg font-bold text-cyan-200">{formatCurrency(item.totalPrice)}</p>
                <motion.button
                    onClick={() => removeItemFromCart(item.product.id)}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-500 transition-colors mt-1"
                    title={t('cart.remove_item')}
                >
                    <XCircle className="w-5 h-5" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CartItemCard;
