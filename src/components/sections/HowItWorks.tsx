import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { UserPlus, LayoutDashboard, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    {
        icon: <UserPlus size={28} />,
        title: 'Crie sua Conta',
        description: 'Cadastre-se em segundos. Conecte suas contas bancárias com segurança ou comece a maximizar seus lançamentos manuais.'
    },
    {
        icon: <LayoutDashboard size={28} />,
        title: 'Rastreie Despesas',
        description: 'Categorize seus gastos e veja exatamente para onde seu dinheiro vai a cada mês.'
    },
    {
        icon: <TrendingUp size={28} />,
        title: 'Veja Crescer',
        description: 'Use nossos insights para cortar custos, economizar mais e alcançar sua liberdade financeira.'
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <Section id="how-it-works" className="bg-slate-50">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Três passos simples para a <span className="text-secondary">clareza</span> financeira
                        </h2>
                        <p className="text-slate-600 text-lg mb-10">
                            Simplificamos as finanças pessoais para que você pare de se estressar e comece a viver. Sem planilhas complexas, apenas insights claros.
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-secondary shadow-sm">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-slate-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                                <h3 className="font-bold text-lg text-slate-900">Visão Mensal</h3>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+12% Economia</span>
                            </div>
                            {/* Mock Chart UI */}
                            <div className="flex items-end justify-between h-48 gap-2">
                                {[40, 65, 35, 80, 50, 90, 75].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 + (i * 0.1) }}
                                        className="w-full bg-slate-100 hover:bg-secondary/60 rounded-t-sm transition-colors cursor-pointer relative group"
                                    >
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            R${h * 10}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium">
                                <span>Seg</span>
                                <span>Ter</span>
                                <span>Qua</span>
                                <span>Qui</span>
                                <span>Sex</span>
                                <span>Sáb</span>
                                <span>Dom</span>
                            </div>
                        </div>

                        {/* Decorative */}
                        <div className="absolute top-1/2 -right-12 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
