import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const data = [
    { name: '01', value: 400 },
    { name: '02', value: 300 },
    { name: '03', value: 600 },
    { name: '04', value: 200 },
    { name: '05', value: 500 },
    { name: '06', value: 450 },
    { name: '07', value: 350 },
    { name: '08', value: 480 },
    { name: '09', value: 250 },
    { name: '10', value: 550 },
    { name: '11', value: 380 },
    { name: '12', value: 420 },
];

// Custom Tooltip Component
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 shadow-xl">
                <p className="text-xs text-gray-400 mb-1">Abr {payload[0].payload.name}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-xs text-gray-300">Despesas:</span>
                    <span className="text-sm font-semibold text-purple-400">R$ {payload[0].value?.toLocaleString('pt-BR')}</span>
                </div>
            </div>
        );
    }
    return null;
};

export const DailyExpensesChart: React.FC = () => {
    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-semibold text-white">Despesas Diárias</h3>
                    <p className="text-sm text-gray-500">Dados de 1-12 Abr, 2024</p>
                </div>
                <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-gray-400 hover:bg-white/5 transition-colors">
                    Ver Relatório
                </button>
            </div>

            <div className="h-[250px] w-full flex items-end justify-center">
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={data} barSize={8}>
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
                        <Bar dataKey="value" radius={[10, 10, 10, 10]} animationDuration={600} animationEasing="ease-out">
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#4b5563'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex gap-6 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-xs text-gray-400">Despesas</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                    <span className="text-xs text-gray-400">Comparar com mês anterior</span>
                </div>
            </div>
        </div>
    );
};
