import React from 'react';
import { Settings2, User, Bell, Palette } from 'lucide-react';

export const ConfiguracoesGeraisSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações Gerais</h1>
        <p className="text-gray-600">Personalize as preferências do sistema.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-3xl mx-auto">
        {/* Perfil */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><User /> Perfil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input type="text" defaultValue="Usuário Demo" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" defaultValue="demo@chatmei.com" readOnly className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Bell /> Notificações</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
              <span>Receber notificações por email</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
              <span>Receber alertas de estoque baixo</span>
            </label>
          </div>
        </div>

        {/* Aparência */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Palette /> Aparência</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Modo</span>
            <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold">Claro</button>
            <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">Escuro</button>
          </div>
        </div>
      </div>
    </div>
  );
};
