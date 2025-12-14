import React from 'react';
import { usePOSData } from '../hooks/usePOSData';
import { usePOSModals } from '../hooks/usePOSModals';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

const CategoryFilters: React.FC = () => {
    const { t } = useTranslation('sales-pos');
    const { categories } = usePOSData();
    const { activeCategoryId, setActiveCategory } = usePOSModals();

    // Normalize categories just like products
    const categoriesList = Array.isArray(categories) ? categories : (categories as any)?.items || [];

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 mb-2 custom-scrollbar">
            {/* All Categories Button */}
            <button
                onClick={() => setActiveCategory(null)}
                className={clsx(
                    "px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 border font-almarai",
                    !activeCategoryId
                        ? "bg-[#22D3EE] text-[#00373a] shadow-lg border-cyan-400"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-cyan-400/50"
                )}
            >
                {t('common.all')}
            </button>

            {/* Dynamic Categories */}
            {categoriesList.map((cat: any) => (
                <button
                    key={cat.id} // Added missing key
                    onClick={() => setActiveCategory(String(cat.id))}
                    className={clsx(
                        "px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 border font-almarai",
                        activeCategoryId === String(cat.id)
                            ? "bg-[#22D3EE] text-[#00373a] shadow-lg border-cyan-400"
                            : "bg-white/5 text-gray-400 border-white/10 hover:border-cyan-400/50"
                    )}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilters;
