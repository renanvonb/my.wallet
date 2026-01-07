import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { type Transaction } from './TransactionDrawer';

interface ClassificationChartProps {
    transactions: Transaction[];
}

const COLORS: Record<string, string> = {
    'Essencial': '#22c55e',
    'Necessário': '#eab308',
    'Supérfluo': '#ef4444'
};

export const ClassificationChart: React.FC<ClassificationChartProps> = ({ transactions }) => {
    const data = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'Despesa');

        const grouped: Record<string, number> = {};
        expenses.forEach(t => {
            const key = t.classification || 'Outros';
            grouped[key] = (grouped[key] || 0) + t.amount;
        });

        const total = Object.values(grouped).reduce((acc, val) => acc + val, 0);

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
            percent: total > 0 ? (value / total) * 100 : 0
        })).filter(item => item.value > 0).sort((a, b) => b.value - a.value);

    }, [transactions]);



    const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

    const visibleData = useMemo(() => {
        return data.filter(item => !hiddenSeries.includes(item.name));
    }, [data, hiddenSeries]);

    const toggleSeries = (name: string) => {
        setHiddenSeries(prev =>
            prev.includes(name)
                ? prev.filter(n => n !== name)
                : [...prev, name]
        );
    };

    const renderLabel = ({ cx, cy, midAngle, outerRadius, payload, name }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 35;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                <rect
                    x={x - 24}
                    y={y - 11}
                    width={48}
                    height={22}
                    rx={11}
                    fill={COLORS[name]}
                    fillOpacity={0.15}
                />
                <text
                    x={x}
                    y={y}
                    fill={COLORS[name]}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={11}
                    fontWeight="600"
                >
                    {`${payload.percent.toFixed(1)}%`}
                </text>
            </g>
        );
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-[#18181b] border border-white/10 p-3 rounded-lg shadow-xl">
                    <div className="font-medium text-white mb-1">{data.name}</div>
                    <div className="text-sm text-gray-300">
                        R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {data.percent.toFixed(1)}% do total
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 h-full flex flex-col select-none">
            <h3 className="text-base font-medium text-gray-400 mb-4">Classificações</h3>

            <div className="flex-1 min-h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <defs>
                            <pattern id="striped-pattern-classification" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="6" stroke="black" strokeWidth="4" strokeOpacity={0.1} />
                            </pattern>
                        </defs>
                        {/* Colored Layer */}
                        <Pie
                            data={visibleData}
                            dataKey="value"
                            nameKey="name"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={105}
                            stroke="none"
                            label={renderLabel}
                            labelLine={false}
                        >
                            {visibleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#6b7280'} />
                            ))}
                        </Pie>
                        {/* Pattern Overlay Layer */}
                        <Pie
                            data={visibleData}
                            dataKey="value"
                            nameKey="name"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={105}
                            stroke="none"
                            fill="url(#striped-pattern-classification)"
                            isAnimationActive={false}
                            legendType="none"
                            tooltipType="none"
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-white/5">
                {data.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => toggleSeries(item.name)}
                        className={`flex items-center gap-2 cursor-pointer transition-opacity ${hiddenSeries.includes(item.name) ? 'opacity-40' : ''}`}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[item.name] }}></div>
                        <span className="text-xs text-gray-400">
                            {item.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};
