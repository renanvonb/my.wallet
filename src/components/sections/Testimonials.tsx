import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';

const testimonials = [
    {
        content: "Este aplicativo mudou completamente a forma como vejo meu dinheiro. Economizei R$ 3.000 nos meus primeiros três meses apenas vendo para onde meu dinheiro estava realmente indo.",
        author: "Sarah J.",
        role: "Designer Freelancer"
    },
    {
        content: "A interface é absolutamente deslumbrante e intuitiva. É o primeiro aplicativo de finanças que eu realmente gosto de usar todos os dias.",
        author: "Michael C.",
        role: "Engenheiro de Software"
    },
    {
        content: "Finalmente, uma ferramenta que equilibra simplicidade com poder. O recurso de rastreamento de investimentos é um divisor de águas para meu portfólio.",
        author: "Elena R.",
        role: "Diretora de Marketing"
    }
];

export const Testimonials: React.FC = () => {
    return (
        <Section id="testimonials" className="bg-white">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Confiado por milhares de <span className="text-secondary">poupadores</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-8 rounded-2xl relative"
                        >
                            <div className="text-6xl text-secondary/20 absolute top-4 left-6 font-serif">"</div>
                            <p className="text-slate-600 mb-6 relative z-10 leading-relaxed pt-4">
                                {t.content}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                                    <p className="text-xs text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
