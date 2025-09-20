import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'Sem 1', Vendas: 2100, ROI: 15 },
  { name: 'Sem 2', Vendas: 3200, ROI: 22 },
  { name: 'Sem 3', Vendas: 1800, ROI: 12 },
  { name: 'Sem 4', Vendas: 4500, ROI: 35 },
];

const topProducts = [
  { name: 'Natura Tododia', Vendas: 120 },
  { name: 'Shampoo Pantene', Vendas: 98 },
  { name: 'Creme O Boticário', Vendas: 85 },
  { name: 'Esmalte Avon', Vendas: 72 },
  { name: 'Sabonete Dove', Vendas: 60 },
];

const customerData = [
  { name: 'Jan', Novos: 15, Total: 150 },
  { name: 'Fev', Novos: 25, Total: 175 },
  { name: 'Mar', Novos: 22, Total: 197 },
  { name: 'Abr', Novos: 35, Total: 232 },
];

const campaignSourceData = [
    { name: 'WhatsApp', value: 45, color: '#25D366' },
    { name: 'Email', value: 25, color: '#3b82f6' },
    { name: 'Anúncios', value: 20, color: '#f97316' },
    { name: 'Outros', value: 10, color: '#6b7280' },
];

const ChartCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div style={{ width: '100%', height: 300 }}>
      {children}
    </div>
  </div>
);

export const RelatoriosSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios e Analytics Avançados</h1>
        <p className="text-gray-600">Métricas detalhadas para impulsionar seu negócio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Vendas vs. ROI de Campanhas (Últimas 4 semanas)">
          <ResponsiveContainer>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="Vendas" stroke="#3b82f6" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="ROI" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Produtos Mais Vendidos">
          <ResponsiveContainer>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip />
              <Bar dataKey="Vendas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Aquisição de Clientes">
            <ResponsiveContainer>
                <BarChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Novos" stackId="a" fill="#8884d8" name="Novos Clientes" />
                <Bar dataKey="Total" stackId="b" fill="#82ca9d" name="Total de Clientes" />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Origem das Vendas por Campanha">
            <ResponsiveContainer>
                <PieChart>
                <Pie data={campaignSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {campaignSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
