import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LogOut,
    ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const navItems = [
        { name: 'Visão geral', path: '/dashboard' },
        { name: 'Transações', path: '/dashboard/transactions' },
        { name: 'Relatórios', path: '/dashboard/reports', disabled: true },
        { name: 'Cadastros', path: '/dashboard/registrations', disabled: true },
    ];

    return (
        <div className="h-screen overflow-hidden bg-[#090909] text-white font-sans flex flex-col">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 w-full z-50 bg-[#090909]/80 backdrop-blur-md border-b border-white/10 h-20">
                <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src="/assets/logo-new.png" alt="my.wallet" className="w-10 h-10 object-contain" />
                        <span className="text-[28px] font-bold font-readex bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            my.wallet
                        </span>
                    </div>

                    {/* Centered Navigation */}
                    {/* Centered Navigation */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 h-full">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                            if (item.disabled) {
                                return (
                                    <div
                                        key={item.name}
                                        className="relative h-full flex items-center px-1 text-sm font-medium text-gray-700 cursor-not-allowed select-none"
                                    >
                                        {item.name}
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`relative h-full flex items-center px-1 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 hover:bg-muted p-2 rounded-full transition-colors outline-none"
                            >
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-white">{user?.name || 'Renan Von Borstel'}</p>
                                </div>
                                <img
                                    src={user?.avatar || "/assets/avatar_renan.png"}
                                    alt={user?.name || "User"}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-[#121212] border border-white/10 rounded-xl shadow-xl py-1 z-50">
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/5 transition-colors flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden pt-20">
                <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col px-6 pt-8 pb-6 overflow-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
};
