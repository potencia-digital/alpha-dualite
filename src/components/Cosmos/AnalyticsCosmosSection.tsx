import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

const searchData = [
  { name: 'Seg', Sucesso: 85, Falha: 15 },
  { name: 'Ter', Sucesso: 92, Falha: 8 },
  { name: 'Qua', Sucesso: 78, Falha: 22 },
  { name: 'Qui', Sucesso: 95, Falha: 5 },
  { name: 'Sex', Sucesso: 88, Falha: 12 },
];

const brandData = [
  { name: 'Natura', value: 156, color: '#a855f7' },
  { name: 'O Boticário', value: 98, color: '#ec4899' },
  { name: 'Outras', value: 479, color: '#6b7280' },
  { name: 'Avon', value: 72, color: '#f43f5e' },
];

const StatCard: React.FC<{ title: string, value: string, icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
        <Icon className="h-8 w-8 text-purple-600" />
        <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-600">{title}</p>
        </div>
    </div>
);

export const AnalyticsCosmosSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Cosmos</h1>
        <p className="text-gray-600">Métricas e performance da sua integração com a API Cosmos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Consultas Realizadas (Mês)" value="847" icon={CheckCircle} />
        <StatCard title="Produtos Não Encontrados" value="124" icon={XCircle} />
        <StatCard title="Tempo Médio de Resposta" value="1.2s" icon={Clock} />
        <StatCard title="Marcas Prioritárias" value="326" icon={Zap} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Taxa de Sucesso das Buscas (Semana)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={searchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Sucesso" stackId="a" fill="#22c55e" />
              <Bar dataKey="Falha" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Marcas Encontradas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={brandData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {brandData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
