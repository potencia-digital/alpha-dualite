import React, { useState } from 'react';
import { Users, LayoutGrid, ListChecks, Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Cliente } from '../../types';
import { generateMockClientes } from '../../utils/mockData';
import { PipelineView } from './PipelineView';
import { ContactsList } from './ContactsList';

type CrmTab = 'leads' | 'contacts' | 'activities';

export const CRMSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CrmTab>('leads');
  const [clientes] = useLocalStorage<Cliente[]>('clientes', generateMockClientes(50));

  const renderContent = () => {
    switch (activeTab) {
      case 'leads':
        return <PipelineView leads={clientes} />;
      case 'contacts':
        return <ContactsList contacts={clientes} />;
      case 'activities':
        return <div className="p-6 text-center text-gray-500">Gerenciamento de atividades em desenvolvimento...</div>;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tab: CrmTab; icon: React.ElementType; label: string }> = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
        activeTab === tab
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Contatos (CRM)</h1>
          <p className="text-gray-600">Organize seus leads e clientes com um pipeline de vendas</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Adicionar Contato
        </button>
      </div>

      <div className="bg-white p-2 rounded-lg border border-gray-200 inline-flex gap-2">
        <TabButton tab="leads" icon={LayoutGrid} label="Leads (Pipeline)" />
        <TabButton tab="contacts" icon={Users} label="Contatos" />
        <TabButton tab="activities" icon={ListChecks} label="Atividades" />
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  );
};
