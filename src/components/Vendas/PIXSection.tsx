import React, { useState } from 'react';
import { CreditCard, Save, Phone, Mail, FileText, Key } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PIXConfig } from '../../types';

export const PIXSection: React.FC = () => {
  const [pixConfig, setPixConfig] = useLocalStorage<PIXConfig>('pix_config', {
    chaves: {},
    banco: {}
  });
  const [localConfig, setLocalConfig] = useState<PIXConfig>(pixConfig);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setPixConfig(localConfig);
    setMessage('Configurações PIX salvas com sucesso!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleInputChange = (section: 'chaves' | 'banco', field: string, value: string) => {
    setLocalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sistema PIX Integrado</h1>
        <p className="text-gray-600">Configure suas chaves PIX para receber pagamentos no PDV.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chaves PIX */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Key /> Suas Chaves PIX</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" value={localConfig.chaves.telefone || ''} onChange={e => handleInputChange('chaves', 'telefone', e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="email" value={localConfig.chaves.email || ''} onChange={e => handleInputChange('chaves', 'email', e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
              <div className="relative mt-1">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" value={localConfig.chaves.cpfCnpj || ''} onChange={e => handleInputChange('chaves', 'cpfCnpj', e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="00.000.000/0001-00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Chave Aleatória</label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" value={localConfig.chaves.aleatoria || ''} onChange={e => handleInputChange('chaves', 'aleatoria', e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="Chave aleatória gerada pelo banco" />
              </div>
            </div>
          </div>
        </div>

        {/* Dados Bancários */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><CreditCard /> Dados Bancários</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome do Banco</label>
              <input type="text" value={localConfig.banco.nome || ''} onChange={e => handleInputChange('banco', 'nome', e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ex: Banco Digital S.A." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Agência</label>
              <input type="text" value={localConfig.banco.agencia || ''} onChange={e => handleInputChange('banco', 'agencia', e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" placeholder="0001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Conta</label>
              <input type="text" value={localConfig.banco.conta || ''} onChange={e => handleInputChange('banco', 'conta', e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" placeholder="12345-6" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Conta</label>
              <select value={localConfig.banco.tipo || ''} onChange={e => handleInputChange('banco', 'tipo', e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Selecione</option>
                <option value="corrente">Corrente</option>
                <option value="poupanca">Poupança</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Save size={18} />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};
