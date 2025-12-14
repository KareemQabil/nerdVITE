// src/features/sales-pos/components/OrderTypeDropdown.tsx
import React from 'react';
import { useCart } from '../hooks/useCart';
import { ChevronDown, Utensils, ShoppingBag, Truck } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const OrderTypeDropdown: React.FC = () => {
    const { orderType, setOrderType } = useCart();

    const types = [
        { id: 'Dine-In', label: 'محلي', icon: Utensils },
        { id: 'Takeaway', label: 'سفري', icon: ShoppingBag },
        { id: 'Delivery', label: 'توصيل', icon: Truck },
    ] as const;

    const activeType = types.find(t => t.id === orderType) || types[0];

    return (
        <Menu as="div" className="relative inline-block text-left font-almarai z-40">
            <Menu.Button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0a1f2e] border border-cyan-900/30 text-white hover:bg-[#0f2738] transition-all min-w-[140px] justify-between group">
                <div className="flex items-center gap-2">
                    <activeType.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold">{activeType.label}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-[#0f2738] border border-cyan-900/50 shadow-xl focus:outline-none p-1">
                    {types.map((type) => (
                        <Menu.Item key={type.id}>
                            {({ active }) => (
                                <button
                                    onClick={() => setOrderType(type.id)}
                                    className={`
                                        flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                        ${active ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-300'}
                                    `}
                                >
                                    <type.icon className="w-4 h-4" />
                                    {type.label}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default OrderTypeDropdown;
