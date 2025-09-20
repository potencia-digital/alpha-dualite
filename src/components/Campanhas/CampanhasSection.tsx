import React, { useState } from 'react';
import { Megaphone, Plus, Search, BarChart2, Edit, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Campanha } from '../../types';
import { generateMockCampanhas } from '../../utils/mockData';

export const CampanhasSection: React.FC = () => {
  const [campanhas] = useLocalStorage<Campanha[]>('campanhas', generateMockCampanhas());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampanhas = campanhas.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusChip = (status: Campanha['status']) => {
    switch (status) {
      case 'enviada':
        return 'bg-green-100 text-green-800';
      case 'agendada':
        return 'bg-blue-100 text-blue-800';
      case 'rascunho':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campanhas de Marketing</h1>
          <p className="text-gray-600">Crie e gerencie suas campanhas de WhatsApp.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Criar Campanha
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar campanhas..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campanha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estatísticas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agendamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampanhas.map((campanha) => (
                <tr key={campanha.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{campanha.nome}</p>
                    <p className="text-xs text-gray-500">{campanha.tipo}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(campanha.status)}`}>
                      {campanha.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex gap-4">
                      <span>Enviadas: {campanha.estatisticas.enviadas}</span>
                      <span>Lidas: {campanha.estatisticas.lidas}</span>
                      <span>ROI: {(campanha.estatisticas.respondidas / campanha.estatisticas.enviadas * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campanha.agendamento ? new Date(campanha.agendamento).toLocaleString('pt-BR') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button className="text-gray-500 hover:text-blue-700"><BarChart2 size={16} /></button>
                      <button className="text-gray-500 hover:text-yellow-700"><Edit size={16} /></button>
                      <button className="text-gray-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
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
