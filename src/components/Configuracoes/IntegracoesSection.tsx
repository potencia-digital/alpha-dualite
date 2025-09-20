import React from 'react';
import { Plug, Settings } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const IntegracoesSection: React.FC = () => {
    const [cosmosStatus] = useLocalStorage<'disconnected' | 'connected' | 'testing'>('cosmos_status', 'disconnected');

    const IntegrationCard: React.FC<{ name: string, description: string, status: 'connected' | 'disconnected' }> = ({ name, description, status }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
                <h4 className="font-semibold text-gray-800">{name}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {status === 'connected' ? 'Conectado' : 'Desconectado'}
                </span>
                <button className="text-gray-500 hover:text-blue-600"><Settings size={18} /></button>
            </div>
        </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrações</h1>
        <p className="text-gray-600">Conecte o ChatMEI Pro com outras ferramentas e APIs.</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
          <IntegrationCard 
            name="API Cosmos"
            description="Base de dados oficial de produtos do Brasil."
            status={cosmosStatus === 'connected' ? 'connected' : 'disconnected'}
          />
          <IntegrationCard 
            name="Twilio (WhatsApp)"
            description="API para envio e recebimento de mensagens WhatsApp."
            status="disconnected"
          />
          <IntegrationCard 
            name="GerenciaNet (PIX)"
            description="Provedor de serviços para pagamentos PIX."
            status="disconnected"
          />
           <IntegrationCard 
            name="Google Dialogflow"
            description="Plataforma de IA para chatbots avançados."
            status="disconnected"
          />
      </div>
    </div>
  );
};
