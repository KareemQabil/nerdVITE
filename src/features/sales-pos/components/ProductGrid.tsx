import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import { usePOSData } from '../hooks/usePOSData';
import { usePOSModals } from '../hooks/usePOSModals';
import { Search, Frown } from 'lucide-react';

const ProductGrid: React.FC = () => {
    const { t } = useTranslation('sales-pos');
    const { products: rawData, isLoading, isError } = usePOSData(); // Named as rawData to handle potential pagination
    const { activeCategoryId, searchTerm } = usePOSModals();

    // 🛠️ THE FIX: Handle both Array and Paginated Object structures
    const productsList = Array.isArray(rawData) ? rawData : (rawData as any)?.items || [];

    const filteredProducts = productsList.filter((product: any) => {
        // Handle 'all' or null category or string comparison
        const matchesCategory = !activeCategoryId || activeCategoryId === 'all' ||
            product.categoryId === activeCategoryId ||
            product.categoryId === Number(activeCategoryId);

        // Safe search check
        const search = searchTerm?.toLowerCase() || '';
        const matchesSearch = product.name?.toLowerCase().includes(search) ||
            product.sku?.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full text-cyan-300 text-xl font-almarai">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-t-4 border-cyan-500 border-t-transparent rounded-full mr-3"
                ></motion.div>
                {t('common.loading')}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-400 text-xl font-almarai">
                <Frown className="w-16 h-16 mb-4" />
                {t('product.no_products_found')}
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xl font-almarai">
                <Search className="w-16 h-16 mb-4" />
                {t('product.no_products_found')}
                <p className="text-sm text-gray-500 mt-2">{t('product.adjust_filters')}</p>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 pb-24"
        >
            <AnimatePresence>
                {filteredProducts.map((product: any, index: number) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductGrid;
