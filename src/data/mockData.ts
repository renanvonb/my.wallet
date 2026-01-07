import { type Transaction } from '../components/dashboard/TransactionDrawer';

export const CATEGORIES = [
    { name: 'Comida & Bebida', color: '#10b981' },
    { name: 'Supermercado', color: '#8b5cf6' },
    { name: 'Compras', color: '#ec4899' },
    { name: 'Transporte', color: '#f59e0b' },
    { name: 'Lazer', color: '#3b82f6' },
    { name: 'Saúde', color: '#ef4444' },
    { name: 'Educação', color: '#06b6d4' },
    { name: 'Investimento', color: '#F59E0B' },
    { name: 'Renda', color: '#10B981' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    // JANEIRO 2026
    {
        id: 101, destination: 'Salário Mensal', description: 'Recebimento Salário', date: '2026-01-05',
        amount: 15000.00, status: 'Concluído', color: 'bg-green-500', initial: 'S', type: 'Receita', category: 'Renda', method: 'Pix', classification: 'Essencial'
    },
    {
        id: 102, destination: 'Freelance Project', description: 'Projeto Web', date: '2026-01-15',
        amount: 8500.00, status: 'Concluído', color: 'bg-green-600', initial: 'F', type: 'Receita', category: 'Renda', method: 'Pix', classification: 'Essencial'
    },
    {
        id: 103, destination: 'Dividendos', description: 'Investimentos', date: '2026-01-20',
        amount: 3200.00, status: 'Concluído', color: 'bg-green-400', initial: 'D', type: 'Receita', category: 'Renda', method: 'Pix', classification: 'Essencial'
    },
    {
        id: 104, destination: 'Supermercado', description: 'Compras do mês', date: '2026-01-10',
        amount: 1250.00, status: 'Concluído', color: 'bg-purple-500', initial: 'S', type: 'Despesa', category: 'Supermercado', method: 'Crédito', classification: 'Essencial', installments: '1/1'
    },
    {
        id: 105, destination: 'Aluguel', description: 'Mensalidade Apto', date: '2026-01-05',
        amount: 3500.00, status: 'Concluído', color: 'bg-red-500', initial: 'A', type: 'Despesa', category: 'Moradia', method: 'Pix', classification: 'Essencial'
    },
    {
        id: 106, destination: 'Posto Shell', description: 'Gasolina', date: '2026-01-12',
        amount: 350.00, status: 'Concluído', color: 'bg-orange-500', initial: 'P', type: 'Despesa', category: 'Transporte', method: 'Crédito', classification: 'Necessário', installments: '1/1'
    },
    {
        id: 107, destination: 'Cinema', description: 'Ingressos e Pipoca', date: '2026-01-18',
        amount: 120.00, status: 'Concluído', color: 'bg-blue-500', initial: 'C', type: 'Despesa', category: 'Lazer', method: 'Débito', classification: 'Supérfluo'
    },
    {
        id: 108, destination: 'Farmácia', description: 'Remédios', date: '2026-01-22',
        amount: 240.50, status: 'Concluído', color: 'bg-red-400', initial: 'F', type: 'Despesa', category: 'Saúde', method: 'Débito', classification: 'Essencial'
    },
    {
        id: 109, destination: 'Netflix', description: 'Assinatura', date: '2026-01-25',
        amount: 55.90, status: 'Concluído', color: 'bg-red-600', initial: 'N', type: 'Despesa', category: 'Lazer', method: 'Crédito', classification: 'Supérfluo', installments: 'Assinatura'
    },

    // INVESTIMENTOS JAN
    {
        id: 110, destination: 'XP Investimentos', description: 'Aporte CDB', date: '2026-01-08',
        amount: 5000.00, status: 'Concluído', color: 'bg-yellow-500', initial: 'X', type: 'Investimento', category: 'Investimento', method: 'Pix', classification: 'Essencial'
    },

    // FEVEREIRO 2026 (Alguns dados para teste de filtro)
    {
        id: 201, destination: 'Salário Mensal', description: 'Recebimento Salário', date: '2026-02-05',
        amount: 15000.00, status: 'Concluído', color: 'bg-green-500', initial: 'S', type: 'Receita', category: 'Renda', method: 'Pix', classification: 'Essencial'
    },
    {
        id: 204, destination: 'Supermercado', description: 'Compras', date: '2026-02-12',
        amount: 1400.00, status: 'Concluído', color: 'bg-purple-500', initial: 'S', type: 'Despesa', category: 'Supermercado', method: 'Crédito', classification: 'Essencial', installments: '2/3'
    },
];

// Helper para converter string Date do mock para Date object (se necessário no futuro, mas aqui já passo string ISO yyyy-mm-dd que é parsable fácil)
