import React from 'react';
import { Container } from '../ui/container';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 md:py-20 border-t border-slate-800">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <span className="text-2xl font-bold text-white mb-4 block">my.wallet</span>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            A maneira mais inteligente de gerenciar suas finanças pessoais. Acompanhe, economize e aumente seu patrimônio com facilidade.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Produto</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Empresa</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} my.wallet. Todos os direitos reservados.</p>
                    <p>Feito com &hearts; para melhorar suas finanças.</p>
                </div>
            </Container>
        </footer>
    );
};
