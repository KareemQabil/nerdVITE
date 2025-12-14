// src/features/sales-pos/components/ProductCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PlusCircle, Ban } from 'lucide-react';
import { POSProduct } from '../types/pos.types';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/pos.utils';

interface ProductCardProps {
    product: POSProduct;
    index: number; // For staggered animation
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
    const { t } = useTranslation('sales-pos');
    const { addItemToCart } = useCart();

    const isInStock = product.stockQuantity > 0;

    const handleAddToCart = () => {
        if (isInStock) {
            addItemToCart(product);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.03, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="relative flex flex-col p-4 rounded-xl shadow-lg
                 bg-gradient-to-br from-[#023047]/60 to-[#001219]/60
                 border border-cyan-800/30 backdrop-blur-sm overflow-hidden
                 text-white font-almarai"
        >
            {/* Product Image */}
            <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-800/50">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                        {t('product.no_image')}
                    </div>
                )}
                {!isInStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-red-400 font-bold text-lg rounded-lg">
                        {t('product.out_of_stock')}
                    </div>
                )}
            </div>

            {/* Product Details */}
            <h3 className="text-lg font-semibold mb-1 truncate" title={product.name}>
                {product.name}
            </h3>
            <p className="text-cyan-300 text-xl font-bold mb-2">
                {formatCurrency(product.price)}
            </p>
            <p className="text-sm text-gray-400 mb-3 flex items-center">
                <span className="mr-1">{t('product.stock')}:</span>
                <span className={isInStock ? 'text-green-400' : 'text-red-400'}>
                    {product.stockQuantity}
                </span>
            </p>

            {/* Add to Cart Button */}
            <motion.button
                onClick={handleAddToCart}
                disabled={!isInStock}
                whileTap={{ scale: 0.95 }}
                className={`mt-auto flex items-center justify-center w-full py-2 px-4 rounded-lg text-lg font-medium transition-all duration-200
                    ${isInStock
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/30'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {isInStock ? (
                    <>
                        <PlusCircle className="w-5 h-5 mr-2" />
                        {t('product.add_to_cart')}
                    </>
                ) : (
                    <>
                        <Ban className="w-5 h-5 mr-2" />
                        {t('product.unavailable')}
                    </>
                )}
            </motion.button>
        </motion.div>
    );
};

export default ProductCard;
