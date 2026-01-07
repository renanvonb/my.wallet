import React from 'react';

export const SavingGoal: React.FC = () => {
    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">Orçamento</h3>
                </div>

            </div>

            <div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-3xl font-bold text-white">R$ 1.052,98</span>
                    <span className="px-2 py-1 rounded-lg bg-white/10 text-gray-400 text-xs font-medium">
                        75%
                    </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">de R$ 1.200</p>


            </div>
        </div>
    );
};
