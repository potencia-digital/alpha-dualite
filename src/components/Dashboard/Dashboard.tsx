import React from 'react';
import { StatsCard } from './StatsCard';
import { 
  DollarSign, ShoppingCart, Users, MessageSquare, ScanLine, Box, LineChart, Megaphone, UserPlus, CalendarPlus 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const salesData = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 2000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
];

const categoryData = [
  { name: 'Natura', value: 400, color: '#8884d8' },
  { name: 'O Boticário', value: 300, color: '#82ca9d' },
  { name: 'Outros', value: 200, color: '#ffc658' },
  { name: 'Avon', value: 100, color: '#ff7c7c' },
];

const QuickActionButton: React.FC<{ to: string, icon: React.ElementType, label: string }> = ({ to, icon: Icon, label }) => (
  <Link to={to} className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
    <Icon className="h-6 w-6 text-blue-600" />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </Link>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio - Versão 2.0</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Receita (Mês)"
          value="R$ 7.340"
          change="+12% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatsCard
          title="Taxa de Conversão"
          value="15.3%"
          change="-1.2% vs semana passada"
          changeType="negative"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <StatsCard
          title="Contatos Ativos"
          value="1.234"
          change="+23 este mês"
          changeType="positive"
          icon={Users}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Mensagens Enviadas"
          value="8.9k"
          change="24h"
          changeType="neutral"
          icon={MessageSquare}
          color="bg-teal-500"
        />
        <StatsCard
          title="Produtos Cosmos"
          value="156"
          change="3 marcas prioritárias"
          changeType="positive"
          icon={Box}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">⚡ Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickActionButton to="/scanner-cosmos" icon={ScanLine} label="Scanner Cosmos" />
          <QuickActionButton to="/produtos-cosmos" icon={Box} label="Produtos Cosmos" />
          <QuickActionButton to="/analytics-cosmos" icon={LineChart} label="Analytics Cosmos" />
          <QuickActionButton to="/campanhas" icon={Megaphone} label="Criar Campanha" />
          <QuickActionButton to="/crm" icon={UserPlus} label="Adicionar Contato" />
          <QuickActionButton to="/whatsapp" icon={CalendarPlus} label="Agendar Mensagem" />
        </div>
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Vendas Mensais</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              <Bar dataKey="vendas" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Vendas por Marca Prioritária</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [value, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Conversas Recentes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'Maria Silva', action: 'Nova venda realizada', time: '2 min atrás', status: 'resolvida' },
              { name: 'João Costa', action: 'Cliente respondeu no WhatsApp', time: '5 min atrás', status: 'pendente' },
              { name: 'Ana Pereira', action: 'Enviado orçamento do produto X', time: '10 min atrás', status: 'nova' },
              { name: 'Carlos Souza', action: 'Campanha de aniversário enviada', time: '1 hora atrás', status: 'resolvida' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-10 rounded-full ${
                  activity.status === 'resolvida' ? 'bg-green-500' :
                  activity.status === 'pendente' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.name}: <span className="font-normal">{activity.action}</span></p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
