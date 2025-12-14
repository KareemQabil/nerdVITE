// src/features/sales-pos/components/SearchBar.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { usePOSModals } from '../hooks/usePOSModals';


const SearchBar: React.FC = () => {
    const { searchTerm, setSearchTerm } = usePOSModals();
    // const { t } = useTranslation('sales-pos'); // Not used currently

    return (
        <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <Search className="w-5 h-5" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث عن منتج (الاسم، الباركود)..."
                className="w-full py-3 pr-12 pl-4 bg-[#0a1f2e] border border-cyan-900/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:bg-[#0f2738] transition-all font-almarai text-sm"
            />
        </div>
    );
};

export default SearchBar;
