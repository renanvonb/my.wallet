import React from 'react';
import { motion } from 'framer-motion';
import { type FilterPreset, getPresetLabel } from '../../utils/dateHelpers';

interface DateRangeFilterProps {
    activeFilter: FilterPreset;
    onFilterChange: (preset: FilterPreset) => void;
}

const presets: FilterPreset[] = ['week', 'month', 'year'];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="flex items-center gap-1 bg-[#121212] border border-white/5 rounded-lg p-1">
            {presets.map((preset) => {
                const isActive = activeFilter === preset;
                return (
                    <button
                        key={preset}
                        onClick={() => onFilterChange(preset)}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeFilterTab"
                                className="absolute inset-0 bg-white/10 rounded-lg shadow-sm -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {getPresetLabel(preset)}
                    </button>
                );
            })}
        </div>
    );
};
