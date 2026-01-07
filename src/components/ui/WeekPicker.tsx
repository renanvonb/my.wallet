import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WeekPickerProps {
    currentDate: Date;
    onDateChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

export const WeekPicker: React.FC<WeekPickerProps> = ({ currentDate, onDateChange, minDate, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date(currentDate));
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate Week Range for Display
    const getWeekRange = (date: Date) => {
        const start = new Date(date);
        const day = start.getDay();
        start.setDate(start.getDate() - day); // Sunday

        const end = new Date(start);
        end.setDate(end.getDate() + 6); // Saturday

        return { start, end };
    };

    const currentWeekRange = getWeekRange(currentDate);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    };

    const displayLabel = `${formatDate(currentWeekRange.start)} - ${formatDate(currentWeekRange.end)}`;

    // Calendar Generation Logic
    const getDaysInMonth = (year: number, month: number) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const generateCalendar = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const startingDayOfWeek = firstDayOfMonth.getDay(); // 0-6

        const daysInMonth = getDaysInMonth(year, month);

        // Pad start
        const calendarDays = Array(startingDayOfWeek).fill(null).concat(daysInMonth);
        return calendarDays;
    };

    const calendarDays = generateCalendar();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMonthChange = (increment: number) => {
        const newDate = new Date(viewDate);
        newDate.setMonth(newDate.getMonth() + increment);
        // Validate month navigation?
        // If next month is completely out of min/max?
        // Simpler: Allow navigation, just disable days.
        setViewDate(newDate);
    };

    const isDateDisabled = (date: Date) => {
        if (!date) return true;
        const d = new Date(date);
        d.setHours(12, 0, 0, 0); // Normalize time

        if (minDate) {
            const min = new Date(minDate);
            min.setHours(0, 0, 0, 0);
            if (d < min) return true;
        }
        if (maxDate) {
            const max = new Date(maxDate);
            max.setHours(23, 59, 59, 999);
            if (d > max) return true;
        }
        return false;
    };

    const handleDaySelect = (day: Date) => {
        if (!day || isDateDisabled(day)) return;
        onDateChange(day);
        setIsOpen(false);
    };

    return (
        <div className="relative h-full" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
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
                    {displayLabel}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 z-50 w-[320px] bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                            <button
                                onClick={() => handleMonthChange(-1)}
                                className="p-1 hover:bg-white/5 rounded-full text-gray-400 hover:text-white"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm font-bold text-white capitalize">
                                {viewDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                            </span>
                            <button
                                onClick={() => handleMonthChange(1)}
                                className="p-1 hover:bg-white/5 rounded-full text-gray-400 hover:text-white"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Week Headers */}
                        <div className="grid grid-cols-7 gap-1 p-2 text-center border-b border-white/5">
                            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                                <span key={i} className="text-xs font-bold text-gray-500">{d}</span>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 p-2">
                            {calendarDays.map((day, index) => {
                                if (!day) return <div key={`empty-${index}`} />;

                                const isDisabled = isDateDisabled(day);

                                // Check if day is within selected week
                                const weekRange = getWeekRange(currentDate);

                                const start = new Date(weekRange.start);
                                start.setHours(0, 0, 0, 0);
                                const end = new Date(weekRange.end);
                                end.setHours(23, 59, 59, 999);
                                const d = new Date(day);
                                d.setHours(12, 0, 0, 0);

                                const isSelected = d >= start && d <= end;
                                const isStart = d.getDate() === start.getDate() && d.getMonth() === start.getMonth();
                                const isEnd = d.getDate() === end.getDate() && d.getMonth() === end.getMonth();

                                return (
                                    <button
                                        key={day.toISOString()}
                                        onClick={() => handleDaySelect(day)}
                                        disabled={isDisabled}
                                        className={`
                                            h-8 w-full text-xs font-medium rounded-md transition-colors relative
                                            ${isSelected ? 'bg-green-500/10 text-green-500' : isDisabled ? 'text-gray-600/50 cursor-not-allowed' : 'text-gray-400 hover:bg-white/5'}
                                            ${(isStart && !isDisabled) ? 'bg-green-500 text-white font-bold rounded-l-md' : ''}
                                            ${(isEnd && !isDisabled) ? 'bg-green-500 text-white font-bold rounded-r-md' : ''}
                                            ${((isStart || isEnd) && !isDisabled) ? '!bg-green-500 !text-white' : ''}
                                        `}
                                    >
                                        {day.getDate()}
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
