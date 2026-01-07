import React from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import { ArrowRight, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    return (
        <Section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-slate-50 to-slate-100 overflow-visible">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
                                Gerencie sua riqueza com inteligência
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                                Domine seu Dinheiro com <span className="text-secondary">Precisão</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Assuma o controle do seu futuro financeiro com nossa plataforma intuitiva. Acompanhe despesas, defina orçamentos e aumente suas economias sem esforço.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Button size="lg" className="w-full sm:w-auto group">
                                    Teste Grátis
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Ver Demo
                                </Button>
                            </div>
                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-secondary" />
                                    <span>Segurança Bancária</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={18} className="text-secondary" />
                                    <span>Análise em Tempo Real</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual/Graphic */}
                    <div className="flex-1 w-full max-w-[500px] lg:max-w-none relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {/* Abstract Card UI Representation */}
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <p className="text-sm text-slate-500">Saldo Total</p>
                                        <h3 className="text-3xl font-bold text-slate-900">R$ 24.562,00</h3>
                                    </div>
                                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <TrendingUp size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${i === 1 ? 'bg-orange-100 text-orange-600' : i === 2 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                                    <PieChart size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">{i === 1 ? 'Supermercado' : i === 2 ? 'Contas' : 'Lazer'}</p>
                                                    <p className="text-xs text-slate-500">Hoje, 14:30</p>
                                                </div>
                                            </div>
                                            <span className="font-semibold text-slate-900">-R$ {(i * 45.50).toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Orçamento Mensal</span>
                                        <span className="font-semibold text-secondary">75% Usado</span>
                                    </div>
                                    <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements around the card */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
