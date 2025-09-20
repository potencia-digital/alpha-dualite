import React, { useState } from 'react';
import { Bot, Plus, ChevronRight, MessageSquare, Zap } from 'lucide-react';

interface Flow {
  id: string;
  name: string;
  trigger: string;
  responses: number;
  active: boolean;
}

const mockFlows: Flow[] = [
  { id: '1', name: 'Mensagem de Boas-Vindas', trigger: 'Primeiro contato', responses: 2, active: true },
  { id: '2', name: 'Dúvidas Frequentes sobre Produtos', trigger: 'Palavras-chave: "preço", "estoque"', responses: 5, active: true },
  { id: '3', name: 'Follow-up de Carrinho Abandonado', trigger: 'Após 2 horas sem finalizar', responses: 1, active: false },
  { id: '4', name: 'Pesquisa de Satisfação', trigger: 'Após entrega do pedido', responses: 3, active: true },
];

export const ChatbotSection: React.FC = () => {
  const [flows, setFlows] = useState(mockFlows);

  const toggleFlow = (id: string) => {
    setFlows(flows.map(flow => flow.id === id ? { ...flow, active: !flow.active } : flow));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chatbots com Inteligência Artificial</h1>
          <p className="text-gray-600">Crie fluxos de conversa e respostas automáticas.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Fluxo
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Fluxos de Automação</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {flows.map(flow => (
            <div key={flow.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{flow.name}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Zap size={12} /> Trigger: {flow.trigger}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12} /> {flow.responses} Respostas</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className={`text-sm font-medium mr-2 ${flow.active ? 'text-green-600' : 'text-gray-500'}`}>
                    {flow.active ? 'Ativo' : 'Inativo'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={flow.active} onChange={() => toggleFlow(flow.id)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-200">
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
