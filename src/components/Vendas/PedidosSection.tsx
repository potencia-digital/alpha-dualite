import React, { useState } from 'react';
import { FileText, Search, User, CreditCard, DollarSign, Truck } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Venda } from '../../types';
import { generateMockVendas } from '../../utils/mockData';

export const PedidosSection: React.FC = () => {
  const [vendas] = useLocalStorage<Venda[]>('vendas', generateMockVendas());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendas = vendas.filter(v =>
    v.clienteNome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const getStatusChip = (status: Venda['status']) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPaymentIcon = (method: Venda['metodoPagamento']) => {
    switch(method) {
        case 'pix': return <CreditCard className="h-4 w-4 text-teal-500" />;
        case 'cartao': return <CreditCard className="h-4 w-4 text-blue-500" />;
        case 'dinheiro': return <DollarSign className="h-4 w-4 text-green-500" />;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Pedidos</h1>
        <p className="text-gray-600">Visualize e gerencie todas as vendas realizadas.</p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por cliente ou ID do pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pedido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pagamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendas.map((venda) => (
                <tr key={venda.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">#{venda.id.substring(0, 8)}</p>
                    <p className="text-xs text-gray-500">{new Date(venda.data).toLocaleString('pt-BR')}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{venda.clienteNome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">R$ {venda.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-2 text-sm capitalize">
                        {getPaymentIcon(venda.metodoPagamento)}
                        {venda.metodoPagamento}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(venda.status)}`}>
                      {venda.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                      <FileText size={14} /> Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
