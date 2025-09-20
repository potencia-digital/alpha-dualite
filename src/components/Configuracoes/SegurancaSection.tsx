import React from 'react';
import { Shield, Key, Lock } from 'lucide-react';

export const SegurancaSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Segurança</h1>
        <p className="text-gray-600">Gerencie o controle de acesso e senhas.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-3xl mx-auto">
        {/* Mudar Senha */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Key /> Alterar Senha</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha Atual</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nova Senha</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar Nova Senha</button>
          </div>
        </div>

        {/* Autenticação de Dois Fatores */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lock /> Autenticação de Dois Fatores (2FA)</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">Mantenha sua conta mais segura com a verificação em duas etapas.</p>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Ativar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
