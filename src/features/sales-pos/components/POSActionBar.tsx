import React from 'react';
import { ShoppingCart, User, Tag, Clock, RotateCcw, ChefHat, FileText, Printer, Receipt } from 'lucide-react';
import { usePOSModals } from '../hooks/usePOSModals';
import { useCart } from '../hooks/useCart';

const POSActionBar: React.FC = () => {
    const { toggleCart, openPaymentModal, isCartOpen } = usePOSModals();
    const { items } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className={`fixed bottom-0 left-0 right-20 bg-[#1a1c1e]/98 backdrop-blur shadow-2xl z-50 transition-all duration-300 font-almarai border-t border-white/10 ${isCartOpen ? 'right-[460px]' : ''}`}>
            <div className="flex items-center justify-between px-4 py-3 gap-2 overflow-x-auto custom-scrollbar">
                {/* Left Group */}
                <div className="flex items-center gap-2">
                    <ActionButton
                        icon={<ShoppingCart />}
                        label="السلة"
                        badge={itemCount}
                        onClick={() => toggleCart()}
                        variant="primary"
                    />
                    <div className="w-px h-8 bg-white/10" />
                    <ActionButton icon={<User />} label="عميل" />
                    <ActionButton icon={<Tag />} label="خصم" disabled={itemCount === 0} />
                </div>

                {/* Center Group */}
                <div className="flex items-center gap-2">
                    <ActionButton icon={<Clock />} label="تعليق" variant="warning" disabled={itemCount === 0} />
                    <ActionButton icon={<RotateCcw />} label="الفواتير المعلقة" />
                    <ActionButton icon={<ChefHat />} label="مطبخ" disabled={itemCount === 0} />
                    <ActionButton icon={<FileText />} label="الطلبات" />
                    <ActionButton icon={<RotateCcw />} label="استرجاع" />
                </div>

                {/* Right Group */}
                <div className="flex items-center gap-2">
                    <ActionButton icon={<Printer />} label="طباعة" disabled={itemCount === 0} />
                    <div className="w-px h-8 bg-white/10" />
                    <button
                        onClick={openPaymentModal}
                        disabled={itemCount === 0}
                        className="h-14 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-3 shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                    >
                        <Receipt className="w-6 h-6" />
                        <span className="text-lg font-bold">الدفع</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    variant?: 'default' | 'primary' | 'warning' | 'success';
    disabled?: boolean;
    badge?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, variant = 'default', disabled, badge }) => {
    const baseClasses = "relative h-14 min-w-[70px] px-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        default: "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 hover:border-cyan-500/50",
        primary: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30",
        warning: "bg-gradient-to-br from-orange-500/20 to-red-600/20 text-orange-300 border border-orange-500/30",
        success: "bg-green-500/20 text-green-300"
    };

    return (
        <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick} disabled={disabled}>
            {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#1a1c1e]">
                    {badge}
                </span>
            )}
            <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
            <span className="text-[10px] font-bold whitespace-nowrap">{label}</span>
        </button>
    );
};

export default POSActionBar;
