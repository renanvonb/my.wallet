import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BlogWidget: React.FC = () => {
    return (
        <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5 h-full relative overflow-hidden group">
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    Visite nosso <br /> blog financeiro
                </h3>
                <p className="text-sm text-gray-400 mb-6 max-w-[150px]">
                    Temos muitos artigos sobre finanças que ajudarão você a gerenciar seu dinheiro
                </p>

                <button className="px-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                    Visitar Blog
                </button>
            </div>

            {/* Abstract Shape/Illustration Placeholder */}
            <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors"></div>
            <div className="absolute bottom-4 right-4 text-6xl opacity-20 rotate-12">
                🧾
            </div>
        </div>
    );
};
