import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface YearPickerProps {
    currentDate: Date;
    onDateChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

export const YearPicker: React.FC<YearPickerProps> = ({ currentDate, onDateChange, minDate, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(currentDate.getFullYear());
    const containerRef = useRef<HTMLDivElement>(null);

    const years = Array.from({ length: 12 }, (_, i) => viewYear - 4 + i);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isYearDisabled = (year: number) => {
        if (minDate && year < minDate.getFullYear()) return true;
        if (maxDate && year > maxDate.getFullYear()) return true;
        return false;
    };

    const handleYearSelect = (year: number) => {
        if (isYearDisabled(year)) return;
        const newDate = new Date(currentDate);
        newDate.setFullYear(year);
        onDateChange(newDate);
        setIsOpen(false);
    };

    const handleNavigation = (increment: number) => {
        // Allow navigation even if years are disabled, to see they are disabled?
        // Or block?
        // Let's allow nav.
        setViewYear(prev => prev + (increment * 10));
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setViewYear(currentDate.getFullYear());
        }
    };

    return (
        <div className="relative h-full" ref={containerRef}>
            <button
                onClick={toggleOpen}
                className={`
                    flex items-center justify-center gap-2 h-[44px] px-4 rounded-lg border transition-all duration-300 w-fit
                    ${isOpen
                        ? 'bg-white/5 border-white/20 text-white shadow-sm'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }
                `}
            >
                <Calendar size={18} className={isOpen ? 'text-white' : 'text-gray-400'} />
                <span className="text-sm font-medium whitespace-nowrap">
                    {currentDate.getFullYear()}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 z-50 w-[280px] bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                            <button
                                onClick={() => handleNavigation(-1)}
                                className="p-1 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-lg font-bold text-white">
                                {years[0]} - {years[years.length - 1]}
                            </span>
                            <button
                                onClick={() => handleNavigation(1)}
                                className="p-1 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="p-4 grid grid-cols-3 gap-2">
                            {years.map((year) => {
                                const isSelected = currentDate.getFullYear() === year;
                                const isDisabled = isYearDisabled(year);
                                return (
                                    <button
                                        key={year}
                                        onClick={() => handleYearSelect(year)}
                                        disabled={isDisabled}
                                        className={`
                                            py-2 rounded-lg text-sm font-medium transition-all duration-200
                                            ${isSelected
                                                ? 'bg-green-500 text-white font-bold shadow-lg shadow-emerald-500/20'
                                                : isDisabled
                                                    ? 'text-gray-600/50 cursor-not-allowed bg-transparent'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
