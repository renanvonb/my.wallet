import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { motion } from 'framer-motion';


export const LoginPage: React.FC = () => {
    // ... (state hooks) ...
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password123');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('Falha ao entrar');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#090909] flex"
        >
            {/* Left Side - Visual/Branding */}
            <div className="hidden lg:flex lg:w-[30%] bg-gradient-to-br from-[#121212] to-[#090909] p-12 flex-col justify-between relative overflow-hidden m-4 rounded-2xl">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-white">my.wallet</h1>
                </div>

                {/* Main Content */}
                <div className="z-10">
                    <h2 className="text-[48px] leading-tight font-bold text-white mb-8">
                        Gerencie suas<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">finanças com<br />inteligência</span> 💸
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md">
                        Controle completo do seu dinheiro<br />
                        com dashboards inteligentes<br />
                        e análises em tempo real.
                    </p>
                </div>

                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>

                {/* Footer */}
                <div className="text-white text-sm">
                    © 2026 my.wallet. Todos os direitos reservados.
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-[70%] flex items-center justify-center p-8 bg-[#090909]">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <img src="/assets/logo-new.png" alt="my.wallet" className="w-10 h-10 object-contain" />
                        <h1 className="text-3xl font-bold font-readex bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            my.wallet
                        </h1>
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mx-auto mb-4 relative">
                            <img src="/assets/logo-new.png" alt="my.wallet" className="w-20 h-20 object-contain" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo!</h2>
                        <p className="text-gray-400 text-sm">Insira suas credenciais abaixo para entrar</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Identificação
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                                placeholder="Insira seu e-mail"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Senha
                                </label>
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                                    Esqueceu sua senha?
                                </a >
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                                placeholder="Insira sua senha"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 bg-[#121212] border-white/10 rounded text-black focus:ring-white/50 focus:ring-2 accent-white"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                Manter-me conectado
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-white to-gray-400 text-black font-bold rounded-lg transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-white/20 hover:opacity-90"
                        >
                            Acessar
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            Ainda não é cliente?{' '}
                            <Link to="/signup" className="text-white font-bold hover:underline transition-all">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
