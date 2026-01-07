import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MonthPickerProps {
    currentDate: Date;
    onDateChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({ currentDate, onDateChange, minDate, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(currentDate.getFullYear());
    const containerRef = useRef<HTMLDivElement>(null);



    const shortMonths = [
        'Jan', 'Fev', 'Mar', 'Abr',
        'Mai', 'Jun', 'Jul', 'Ago',
        'Set', 'Out', 'Nov', 'Dez'
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isMonthDisabled = (monthIndex: number, year: number) => {
        if (minDate) {
            if (year < minDate.getFullYear()) return true;
            if (year === minDate.getFullYear() && monthIndex < minDate.getMonth()) return true;
        }
        if (maxDate) {
            if (year > maxDate.getFullYear()) return true;
            if (year === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) return true;
        }
        return false;
    };

    const handleMonthSelect = (monthIndex: number) => {
        if (isMonthDisabled(monthIndex, viewYear)) return;
        const newDate = new Date(currentDate);
        newDate.setFullYear(viewYear);
        newDate.setMonth(monthIndex);
        onDateChange(newDate);
        setIsOpen(false);
    };

    const handleYearChange = (increment: number) => {
        const newYear = viewYear + increment;
        // Optional: Prevent navigation if entirely out of range?
        // Let's rely on button disabling
        setViewYear(newYear);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setViewYear(currentDate.getFullYear());
        }
    };

    return (
        <div className="relative h-full" ref={containerRef}>
            {/* Trigger Button */}
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
                <span className="text-sm font-medium capitalize whitespace-nowrap">
                    {`${shortMonths[currentDate.getMonth()]}. ${currentDate.getFullYear()}`}
                </span>
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 z-50 w-[280px] bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header: Year Navigation */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                            <button
                                onClick={() => handleYearChange(-1)}
                                disabled={minDate && (viewYear - 1) < minDate.getFullYear()}
                                className="p-1 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-lg font-bold text-white">{viewYear}</span>
                            <button
                                onClick={() => handleYearChange(1)}
                                disabled={maxDate && (viewYear + 1) > maxDate.getFullYear()}
                                className="p-1 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Month Grid */}
                        <div className="p-4 grid grid-cols-3 gap-2">
                            {shortMonths.map((month, index) => {
                                const isSelected = currentDate.getMonth() === index && currentDate.getFullYear() === viewYear;
                                const isDisabled = isMonthDisabled(index, viewYear);
                                return (
                                    <button
                                        key={month}
                                        onClick={() => handleMonthSelect(index)}
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
                                        {month}
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
