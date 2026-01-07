import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { CATEGORIES } from '../../data/mockData';
import { type Transaction } from './TransactionDrawer';

interface SummaryChartProps {
    transactions: Transaction[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, total }) => {
    if (active && payload && payload.length) {
        const percent = total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : '0';

        return (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 shadow-xl">
                <p className="text-sm font-medium text-white mb-1">{payload[0].payload.name}</p>
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400">
                        R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500">
                        {percent}% do total
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const StripedBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    const radius = 4;
    const effectiveRadius = Math.min(radius, height / 2);

    const path = `M${x},${y + height} 
                 L${x},${y + effectiveRadius} 
                 Q${x},${y} ${x + effectiveRadius},${y} 
                 L${x + width - effectiveRadius},${y} 
                 Q${x + width},${y} ${x + width},${y + effectiveRadius} 
                 L${x + width},${y + height} 
                 Z`;

    return (
        <g>
            <path d={path} fill={fill} />
            <path d={path} fill="url(#striped-pattern-summary)" />
        </g>
    );
};

export const SummaryChart: React.FC<SummaryChartProps> = ({ transactions }) => {
    const [viewMode, setViewMode] = useState<'category' | 'subcategory'>('category');

    const data = useMemo(() => {
        // Filter expenses
        const expenses = transactions.filter(t => t.type === 'Despesa');

        // Group by category or subcategory (destination)
        const grouped: Record<string, number> = {};
        expenses.forEach(t => {
            const key = viewMode === 'category' ? (t.category || 'Outros') : t.destination;
            grouped[key] = (grouped[key] || 0) + t.amount;
        });

        // Format for Recharts
        return Object.entries(grouped).map(([name, value], index) => {
            let color;
            if (viewMode === 'category') {
                const catInfo = CATEGORIES.find(c => c.name === name);
                color = catInfo?.color || '#6b7280';
            } else {
                color = CATEGORIES[index % CATEGORIES.length].color;
            }

            return {
                name,
                value,
                color
            };
        }).sort((a, b) => b.value - a.value).slice(0, 7);

    }, [transactions, viewMode]);


    const totalValue = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [data]);

    const ChartContent = (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <defs>
                    <pattern id="striped-pattern-summary" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="6" stroke="black" strokeWidth="4" strokeOpacity={0.1} />
                    </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    dy={10}
                    interval={0}
                />
                <YAxis
                    domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickFormatter={(value) => `R$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                />
                <Tooltip content={<CustomTooltip total={totalValue} />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
                <Bar
                    dataKey="value"
                    barSize={40}
                    isAnimationActive={true}
                    shape={<StripedBar />}
                >
                    <LabelList
                        dataKey="value"
                        position="top"
                        content={({ x, y, width, value }: any) => {
                            return (
                                <text x={Number(x) + Number(width) / 2} y={Number(y) - 10} fill="#9ca3af" textAnchor="middle" fontSize={11}>
                                    {`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </text>
                            );
                        }}
                    />
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 h-full flex flex-col select-none">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-base font-medium text-gray-400">
                    {viewMode === 'category' ? 'Categorias' : 'Subcategorias'}
                </h3>

                <div className="flex bg-[#0a0a0a] rounded-lg p-1 border border-white/5">
                    <button
                        onClick={() => setViewMode('category')}
                        className={`px-3 py-1 text-xs rounded-md transition-all font-medium ${viewMode === 'category'
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        Categorias
                    </button>
                    <button
                        onClick={() => setViewMode('subcategory')}
                        className={`px-3 py-1 text-xs rounded-md transition-all font-medium ${viewMode === 'subcategory'
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        Subcategorias
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 w-full [&_.recharts-wrapper]:outline-none [&_text]:select-none">
                {data.length > 0 ? ChartContent : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        Nenhum dado neste período
                    </div>
                )}
            </div>
        </div>
    );
};
