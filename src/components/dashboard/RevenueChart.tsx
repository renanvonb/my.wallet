import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type Transaction } from './TransactionDrawer';

interface RevenueChartProps {
    dateRange: {
        start: Date;
        end: Date;
    };
    transactions: Transaction[];
}

// Custom Tooltip Component
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const incomeItem = payload.find((p: any) => p.dataKey === 'income');
        const expenseItem = payload.find((p: any) => p.dataKey === 'expense');
        const investmentItem = payload.find((p: any) => p.dataKey === 'investment');
        const data = payload[0].payload;

        return (
            <div className="bg-[#121212] border border-white/5 rounded-lg p-3 shadow-xl">
                <p className="text-xs text-gray-400 mb-2">
                    {data.tooltipTitle || data.name}
                </p>
                <div className="space-y-1">
                    {incomeItem && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-gray-400">Receita:</span>
                            <span className="text-sm font-semibold text-green-400">
                                R$ {incomeItem.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    )}
                    {expenseItem && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-xs text-gray-400">Despesa:</span>
                            <span className="text-sm font-semibold text-red-400">
                                R$ {expenseItem.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    )}
                    {investmentItem && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-400">Investimento:</span>
                            <span className="text-sm font-semibold text-blue-400">
                                R$ {investmentItem.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    )}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5">
                    <span className="text-xs text-gray-400">Saldo: </span>
                    <span className="text-sm font-bold text-white">
                        R$ {(data.balance !== undefined ? data.balance : ((data.income || 0) - (data.expense || 0))).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const CustomYAxisTick = ({ y, payload }: any) => {
    return (
        <g transform={`translate(0,${y})`}>
            <text x={0} y={0} dy={4} textAnchor="start" fill="#9ca3af" fontSize={12}>
                {`R$${payload.value >= 1000 ? (payload.value / 1000).toFixed(0) + 'k' : payload.value}`}
            </text>
        </g>
    );
};

export const RevenueChart: React.FC<RevenueChartProps> = ({ dateRange, transactions }) => {
    const [visibleSeries, setVisibleSeries] = useState({ income: true, expense: true, investment: true });

    const toggleSeries = (key: keyof typeof visibleSeries) => {
        setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const data = useMemo(() => {
        const { start, end } = dateRange;
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let chartData = [];

        if (diffDays <= 1) {
            // Hourly view - Mocking hourly distribution for now as DB doesn't have time
            // Or just split daily total by 24?
            // Let's stick to simple daily sum for now to avoid complexity, or just 1 point if 1 day.
            // But usually this view is for "Today".
            // Since our DB date format is YYYY-MM-DD, we can't show hourly accurately.
            // I'll show 1 bar/point for the Whole day, or split it if many txs have time (but they don't).
            // I'll just skip detailed hourly logic and show 1 point or simple flat line for now based on total.
            // Actually, let's just default to Daily view logic if diffDays is small, effectively showing 1 point.
            // Or better: Just show the daily sum at 12:00.
        }

        // Use Daily/Yearly logic primarily
        if (diffDays <= 365) {
            // Iterate days
            const loopDays = diffDays <= 1 ? 1 : diffDays;

            for (let i = 0; i < loopDays; i++) {
                const d = new Date(start);
                d.setDate(d.getDate() + i);

                // Date Formatting
                const dayOfWeek = d.toLocaleDateString('pt-BR', { weekday: 'long' });
                const dayOfWeekFormatted = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
                const dayMonth = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                const dayNum = d.toLocaleDateString('pt-BR', { day: '2-digit' });
                const weekDayShort = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
                const weekDayLabel = weekDayShort.charAt(0).toUpperCase() + weekDayShort.slice(1);
                const axisLabel = diffDays <= 12 ? `${dayNum}, ${weekDayLabel}` : dayNum;

                // Aggregate
                const dayTransactions = transactions.filter(t => {
                    // Compare YYYY-MM-DD
                    const tDate = new Date(t.date + 'T12:00:00');
                    return tDate.getDate() === d.getDate() && tDate.getMonth() === d.getMonth() && tDate.getFullYear() === d.getFullYear();
                });

                const income = dayTransactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.amount, 0);
                const expense = dayTransactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.amount, 0);
                const investment = dayTransactions.filter(t => t.type === 'Investimento').reduce((sum, t) => sum + t.amount, 0);

                chartData.push({
                    name: axisLabel,
                    tooltipTitle: `${dayMonth} | ${dayOfWeekFormatted}`,
                    income,
                    expense,
                    investment,
                    balance: income - expense
                });
            }
        } else {
            // Monthly Aggregation (Year view+)
            // Loop 12 months? Or steps.
            // Assume 12 steps for now if year filter.
            for (let i = 0; i < 12; i++) {
                const d = new Date(start.getFullYear(), i, 1);

                const monthYear = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                const formattedTooltip = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
                const monthShort = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                const monthLabel = monthShort.charAt(0).toUpperCase() + monthShort.slice(1);

                // Aggregate Month
                const monthTransactions = transactions.filter(t => {
                    const tDate = new Date(t.date + 'T12:00:00');
                    // Check if date falls in this month/year
                    // And within dateRange (start/end)? 
                    // dateRange for 'year' covers the whole year.
                    return tDate.getMonth() === d.getMonth() && tDate.getFullYear() === d.getFullYear();
                });

                const income = monthTransactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.amount, 0);
                const expense = monthTransactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.amount, 0);
                const investment = monthTransactions.filter(t => t.type === 'Investimento').reduce((sum, t) => sum + t.amount, 0);

                chartData.push({
                    name: monthLabel,
                    tooltipTitle: formattedTooltip,
                    income,
                    expense,
                    investment,
                    balance: income - expense
                });
            }
        }

        return chartData;
    }, [dateRange, transactions]);



    const ChartContent = (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>

                    <pattern id="striped-pattern-revenue" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="6" stroke="black" strokeWidth="4" strokeOpacity={0.1} />
                    </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    dy={10}
                    interval={0} // Force show all ticks
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    width={60}
                    tick={<CustomYAxisTick />}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />

                {/* Main Gradient Areas */}
                <Area hide={!visibleSeries.income} type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" animationDuration={800} animationEasing="ease-out" />
                <Area hide={!visibleSeries.expense} type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" animationDuration={800} animationEasing="ease-out" />
                <Area hide={!visibleSeries.investment} type="monotone" dataKey="investment" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorInvestment)" animationDuration={800} animationEasing="ease-out" />

                {/* Pattern Overlays */}
                <Area hide={!visibleSeries.income} type="monotone" dataKey="income" stroke="none" fill="url(#striped-pattern-revenue)" animationDuration={800} animationEasing="ease-out" activeDot={false} legendType="none" tooltipType="none" />
                <Area hide={!visibleSeries.expense} type="monotone" dataKey="expense" stroke="none" fill="url(#striped-pattern-revenue)" animationDuration={800} animationEasing="ease-out" activeDot={false} legendType="none" tooltipType="none" />
                <Area hide={!visibleSeries.investment} type="monotone" dataKey="investment" stroke="none" fill="url(#striped-pattern-revenue)" animationDuration={800} animationEasing="ease-out" activeDot={false} legendType="none" tooltipType="none" />
            </AreaChart>
        </ResponsiveContainer>
    );

    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 h-full flex flex-col select-none">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-base font-medium text-gray-400">Balanço</h3>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => toggleSeries('income')}
                        className={`flex items-center gap-2 cursor-pointer transition-opacity ${!visibleSeries.income ? 'opacity-40' : ''}`}
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-400">Receita</span>
                    </button>
                    <button
                        onClick={() => toggleSeries('expense')}
                        className={`flex items-center gap-2 cursor-pointer transition-opacity ${!visibleSeries.expense ? 'opacity-40' : ''}`}
                    >
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-xs text-gray-400">Despesa</span>
                    </button>
                    <button
                        onClick={() => toggleSeries('investment')}
                        className={`flex items-center gap-2 cursor-pointer transition-opacity ${!visibleSeries.investment ? 'opacity-40' : ''}`}
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-400">Investimento</span>
                    </button>

                </div>
            </div>

            <div className="flex-1 min-h-0 w-full [&_.recharts-wrapper]:outline-none [&_text]:select-none">
                {ChartContent}
            </div>
        </div>
    );
};
