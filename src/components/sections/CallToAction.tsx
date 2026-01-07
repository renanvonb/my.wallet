import React from 'react';
import { Container } from '../ui/container';
import { Section } from '../ui/section';
import { Button } from '../ui/button';

export const CallToAction: React.FC = () => {
    return (
        <Section className="bg-primary text-white py-24">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl">
                        Comece sua jornada para a liberdade financeira hoje
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 max-w-2xl">
                        Junte-se a mais de 50.000 usuários que já estão gerenciando suas finanças de forma mais inteligente, rápida e melhor.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                            Comece Agora
                        </Button>
                        <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hover:text-white">
                            Baixar App
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
