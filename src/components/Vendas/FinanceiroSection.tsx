import React from 'react';
import { DollarSign, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const financialData = [
  { name: 'Seg', Receita: 1200, Despesa: 300 },
  { name: 'Ter', Receita: 1500, Despesa: 450 },
  { name: 'Qua', Receita: 900, Despesa: 200 },
  { name: 'Qui', Receita: 2100, Despesa: 600 },
  { name: 'Sex', Receita: 1800, Despesa: 500 },
  { name: 'Sáb', Receita: 2500, Despesa: 700 },
  { name: 'Dom', Receita: 800, Despesa: 150 },
];

const StatCard: React.FC<{ title: string, value: string, icon: React.ElementType, color: string }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export const FinanceiroSection: React.FC = () => {
  const totalReceita = financialData.reduce((sum, item) => sum + item.Receita, 0);
  const totalDespesa = financialData.reduce((sum, item) => sum + item.Despesa, 0);
  const lucro = totalReceita - totalDespesa;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Controle Financeiro</h1>
        <p className="text-gray-600">Acompanhe seu fluxo de caixa, receitas e despesas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total (Semana)" value={`R$ ${totalReceita.toFixed(2)}`} icon={TrendingUp} color="bg-green-500" />
        <StatCard title="Despesa Total (Semana)" value={`R$ ${totalDespesa.toFixed(2)}`} icon={TrendingDown} color="bg-red-500" />
        <StatCard title="Lucro Líquido" value={`R$ ${lucro.toFixed(2)}`} icon={DollarSign} color="bg-blue-500" />
        <StatCard title="Ticket Médio" value={`R$ ${(totalReceita / 30).toFixed(2)}`} icon={CreditCard} color="bg-yellow-500" />
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Fluxo de Caixa Semanal</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Bar dataKey="Receita" fill="#22c55e" name="Receita" />
            <Bar dataKey="Despesa" fill="#ef4444" name="Despesa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
