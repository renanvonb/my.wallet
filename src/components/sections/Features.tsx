import React from 'react';
import { Container } from '../ui/container';
import { Section } from '../ui/section';
import { PieChart, Smartphone, CreditCard, Bell, Shield, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <PieChart size={24} />,
        title: 'Análise Inteligente',
        description: 'Visualize seus hábitos de consumo com gráficos intuitivos e detalhamentos precisos.'
    },
    {
        icon: <Wallet size={24} />,
        title: 'Planejamento de Orçamento',
        description: 'Defina orçamentos mensais para diferentes categorias e seja notificado ao atingir os limites.'
    },
    {
        icon: <Smartphone size={24} />,
        title: 'Mobile First',
        description: 'Acesse suas finanças em qualquer lugar, a qualquer hora com nosso design totalmente responsivo.'
    },
    {
        icon: <CreditCard size={24} />,
        title: 'Rastreamento de Despesas',
        description: 'Registre facilmente despesas e receitas para manter seu balanço atualizado.'
    },
    {
        icon: <Bell size={24} />,
        title: 'Alertas Inteligentes',
        description: 'Receba notificações em tempo real para vencimento de contas, saldo baixo e atividades incomuns.'
    },
    {
        icon: <Shield size={24} />,
        title: 'Segurança e Privacidade',
        description: 'Seus dados são criptografados com protocolos de segurança bancária. Valorizamos sua privacidade.'
    }
];

export const Features: React.FC = () => {
    return (
        <Section id="features" className="bg-white">
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Tudo o que você precisa para ter <span className="text-secondary">sucesso</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Ferramentas poderosas para ajudar você a gerenciar seu dinheiro, cortar gastos e economizar para o que mais importa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
