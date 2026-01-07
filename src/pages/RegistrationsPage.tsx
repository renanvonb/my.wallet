import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Search, Construction, Plus } from 'lucide-react';

export const RegistrationsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full">
                <PageHeader title="Cadastros">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-full sm:w-64 transition-colors placeholder:text-gray-500"
                        />
                    </div>

                    <button className="h-[44px] px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 active:scale-95 shadow-lg shadow-emerald-500/20">
                        <Plus size={20} />
                        <span className="hidden sm:inline">Adicionar</span>
                    </button>
                </PageHeader>

                <div className="flex-1 bg-[#121212] rounded-xl border border-white/5 flex items-center justify-center text-gray-500 shadow-xl p-8 mb-4">
                    <div className="flex flex-col items-center gap-4">
                        <Construction size={48} className="opacity-50" />
                        <p className="text-lg font-medium">Esta página está em construção</p>
                        <p className="text-sm opacity-60">Gerencie seus cadastros aqui em breve.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
