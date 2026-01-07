import React, { useState, useEffect } from 'react';
import { ChevronDown, Circle, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface TransactionFormDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    onSave?: (data: any) => void;
}

const TYPE_OPTIONS = [
    { label: 'Despesa', value: 'Despesa' },
    { label: 'Receita', value: 'Receita' },
    { label: 'Investimento', value: 'Investimento' }
];

const CATEGORY_OPTIONS = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Moradia', 'Outros'];
const SUBCATEGORY_OPTIONS = ['Restaurante', 'Supermercado', 'Uber', 'Combustível', 'Cinema', 'Farmácia', 'Aluguel'];
const DESTINATION_OPTIONS = ['Banco Inter', 'Nubank', 'Carteira', 'Bradesco', 'Itaú', 'XP Investimentos'];
const METHOD_OPTIONS = ['Crédito', 'Débito', 'Pix', 'Dinheiro', 'Boleto'];
const CLASSIFICATION_OPTIONS = ['Necessário', 'Essencial', 'Supérfluo'];

export const TransactionFormDrawer: React.FC<TransactionFormDrawerProps> = ({ isOpen, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState({
        type: 'Despesa',
        description: '',
        destination: '',
        method: '',
        category: '',
        subcategory: '',
        classification: 'Essencial',
        amount: '',
        dueDate: '',
        date: '',
        status: 'Pendente'
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    ...initialData,
                    amount: initialData.amount ? initialData.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '',
                    date: initialData.date || '',
                });
            } else {
                setFormData({
                    type: 'Despesa',
                    description: '',
                    destination: '',
                    method: '',
                    category: '',
                    subcategory: '',
                    classification: 'Essencial',
                    amount: '',
                    dueDate: '',
                    date: '',
                    status: 'Pendente'
                });
            }
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        const numberValue = Number(value) / 100;
        const formatted = numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setFormData(prev => ({ ...prev, amount: formatted }));
    };

    const handleSubmit = () => {
        if (onSave) {
            onSave(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="bg-[#09090b] w-full max-w-md max-h-[90vh] rounded-xl border border-white/10 flex flex-col shadow-2xl focus-visible:outline-none"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 pb-2 text-left space-y-1 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {initialData ? 'Editar transação' : 'Nova transação'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Preencha os dados abaixo
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {/* Type Selector */}
                    <div className="bg-[#18181b] p-1 rounded-lg flex items-center justify-between border border-white/5">
                        {TYPE_OPTIONS.map((opt) => {
                            const isSelected = formData.type === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type: opt.value }))}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
                                        isSelected ? "bg-[#27272a] text-white shadow-sm" : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Circle size={12} className={cn(isSelected ? "fill-current" : "")} />
                                    {opt.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Value + Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Valor</label>
                            <Input
                                value={formData.amount}
                                onChange={handleAmountChange}
                                placeholder="R$ 0,00"
                                className="bg-[#09090b] border-[#27272a] focus-visible:ring-emerald-500/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Data</label>
                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="bg-[#09090b] border-[#27272a] focus-visible:ring-emerald-500/50 block w-full [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-200">Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Informe uma descrição"
                            rows={3}
                            className="flex min-h-[80px] w-full rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                    </div>

                    {/* Separator */}
                    <div className="border-b border-dashed border-[#27272a]" />

                    {/* Destino + Método */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Destino</label>
                            <div className="relative">
                                <select
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className="flex h-9 w-full items-center justify-between rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none text-white"
                                >
                                    <option value="" disabled>Selecione</option>
                                    {DESTINATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Método</label>
                            <div className="relative">
                                <select
                                    name="method"
                                    value={formData.method}
                                    onChange={handleChange}
                                    className="flex h-9 w-full items-center justify-between rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none text-white"
                                >
                                    <option value="" disabled>Selecione</option>
                                    {METHOD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Categoria + Subcategoria */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Categoria</label>
                            <div className="relative">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="flex h-9 w-full items-center justify-between rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none text-white"
                                >
                                    <option value="" disabled>Selecione</option>
                                    {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Subcategoria</label>
                            <div className="relative">
                                <select
                                    name="subcategory"
                                    value={formData.subcategory}
                                    onChange={handleChange}
                                    className="flex h-9 w-full items-center justify-between rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none text-white"
                                >
                                    <option value="" disabled>Selecione</option>
                                    {SUBCATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Classificação */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-200">Classificação</label>
                        <div className="relative">
                            <select
                                name="classification"
                                value={formData.classification}
                                onChange={handleChange}
                                className="flex h-9 w-full items-center justify-between rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none text-white"
                            >
                                <option value="" disabled>Selecione</option>
                                {CLASSIFICATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:justify-between gap-3 bg-[#09090b] rounded-b-xl">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="w-full sm:w-auto h-10 border border-[#27272a] text-white hover:bg-white/5 hover:text-white"
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="w-full sm:w-auto h-10 bg-white text-black hover:bg-white/90 shadow-none font-semibold"
                        onClick={handleSubmit}
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    );
};
