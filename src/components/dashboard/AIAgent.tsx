import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export const AIAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Olá! Sou seu assistente financeiro. Como posso ajudar com seus gastos hoje?', sender: 'ai' }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = { id: (Date.now() + 1).toString(), text: 'Entendi! Estou analisando seus dados para fornecer a melhor resposta.', sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                title="Assistente IA"
            >
                <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20 duration-[2000ms]"></div>
                <Bot size={24} className="text-white relative z-10" />
            </button>

            {/* Chat Window */}
            <div className={`fixed top-6 left-6 z-50 w-80 h-[450px] bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-top-left font-sans ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-purple-900/10 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white leading-tight">Assistente</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                                <span className="text-[10px] text-green-400 font-medium">Online</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#09090b]" ref={scrollRef}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                    ? 'bg-purple-600 text-white rounded-2xl rounded-br-sm'
                                    : 'bg-[#18181b] text-gray-200 border border-white/5 rounded-2xl rounded-bl-sm'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/10 bg-[#09090b]">
                    <div className="flex items-center gap-2 bg-[#18181b] rounded-full px-4 py-2 border border-white/5 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Digite sua dúvida..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 min-w-0"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="text-purple-500 hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-1"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
