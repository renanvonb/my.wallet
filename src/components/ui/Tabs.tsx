import React from 'react';
import { motion } from 'framer-motion';

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex items-center gap-1 bg-[#1A1A1A] border border-white/5 rounded-lg p-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-[#2A2A2A] rounded-lg shadow-lg shadow-black/20 -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
