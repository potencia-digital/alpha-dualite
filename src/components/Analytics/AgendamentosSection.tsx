import React from 'react';
import { CalendarClock, Plus, Check } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Agendamento } from '../../types';
import { generateMockAgendamentos } from '../../utils/mockData';

export const AgendamentosSection: React.FC = () => {
  const [agendamentos, setAgendamentos] = useLocalStorage<Agendamento[]>('agendamentos', generateMockAgendamentos());

  const toggleStatus = (id: string) => {
    setAgendamentos(prev =>
      prev.map(ag =>
        ag.id === id ? { ...ag, status: ag.status === 'pendente' ? 'concluido' : 'pendente' } : ag
      )
    );
  };

  const upcomingAgendamentos = agendamentos
    .filter(a => a.status === 'pendente')
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerencie seus compromissos e follow-ups.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Próximos Compromissos</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAgendamentos.length > 0 ? (
            upcomingAgendamentos.map(ag => (
              <div key={ag.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <CalendarClock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{ag.titulo}</p>
                    <p className="text-sm text-gray-600">
                      {ag.clienteNome} - <span className="font-medium">{ag.tipo}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(ag.data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleStatus(ag.id)}
                    className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    <Check size={14} />
                    Marcar como Concluído
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="p-8 text-center text-gray-500">Nenhum agendamento pendente.</p>
          )}
        </div>
      </div>
    </div>
  );
};
