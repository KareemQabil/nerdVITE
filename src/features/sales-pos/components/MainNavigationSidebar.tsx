import React from 'react';
import { Home, ShoppingCart, Users, FileText, Settings, LogOut, Box } from 'lucide-react';

const MainNavigationSidebar: React.FC = () => {
    return (
        <div className="fixed right-0 top-0 h-full w-20 bg-gradient-to-b from-[#023047] to-[#001219] flex flex-col items-center justify-between py-6 z-50 text-white border-l border-white/5">
            {/* Logo */}
            <div className="mb-8">
                <Box className="w-8 h-8 text-cyan-400" />
            </div>

            {/* Nav Items */}
            <div className="flex-1 flex flex-col gap-4 w-full px-2 overflow-y-auto custom-scrollbar">
                <NavItem icon={<Home />} label="Home" />
                <NavItem icon={<ShoppingCart />} label="POS" active />
                <NavItem icon={<Users />} label="Users" />
                <NavItem icon={<FileText />} label="Orders" />
                <NavItem icon={<Settings />} label="Settings" />
            </div>

            {/* User & Logout */}
            <div className="flex flex-col items-center gap-4 mt-4 w-full">
                <div className="w-10 h-10 rounded-full bg-cyan-900 border-2 border-cyan-400 flex items-center justify-center font-bold text-xs">
                    AB
                </div>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
    <button className={`w-full h-16 rounded-xl flex flex-col items-center justify-center gap-1 transition-all
        ${active ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 border-r-4 border-cyan-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
    `}>
        <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
        <span className="text-[10px] font-bold">{label}</span>
    </button>
);

export default MainNavigationSidebar;
