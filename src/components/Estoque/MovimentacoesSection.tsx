import React, { useState } from 'react';
import { History, Search, ArrowUp, ArrowDown, Edit } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { MovimentacaoEstoque } from '../../types';
import { generateMockMovimentacoes } from '../../utils/mockData';

export const MovimentacoesSection: React.FC = () => {
  const [movimentacoes] = useLocalStorage<MovimentacaoEstoque[]>('movimentacoes', generateMockMovimentacoes());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovimentacoes = movimentacoes.filter(m =>
    m.produtoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.motivo.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const getIconAndColor = (tipo: MovimentacaoEstoque['tipo']) => {
    switch (tipo) {
      case 'entrada':
        return { icon: <ArrowUp className="h-5 w-5 text-green-500" />, color: 'bg-green-50' };
      case 'saida':
        return { icon: <ArrowDown className="h-5 w-5 text-red-500" />, color: 'bg-red-50' };
      case 'ajuste':
        return { icon: <Edit className="h-5 w-5 text-yellow-500" />, color: 'bg-yellow-50' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Histórico de Movimentações</h1>
        <p className="text-gray-600">Acompanhe todas as entradas e saídas do seu estoque.</p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por produto ou motivo..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovimentacoes.map((mov) => {
                const { icon, color } = getIconAndColor(mov.tipo);
                return (
                  <tr key={mov.id} className={`hover:bg-gray-50 ${color}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(mov.data).toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{mov.produtoNome}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-2 text-sm capitalize">
                        {icon}
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{mov.tipo === 'saida' ? '-' : '+'}{mov.quantidade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mov.motivo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
