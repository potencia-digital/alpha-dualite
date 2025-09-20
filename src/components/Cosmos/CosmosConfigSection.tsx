import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const CosmosConfigSection: React.FC = () => {
  const [token, setToken] = useLocalStorage('cosmos_token', '');
  const [inputValue, setInputValue] = useState(token);
  const [status, setStatus] = useLocalStorage<'disconnected' | 'connected' | 'testing'>('cosmos_status', 'disconnected');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      setInputValue(token);
      // Auto-test on load if token exists
      if(status !== 'connected') handleTestConnection();
    }
  }, []);

  const handleSaveToken = () => {
    setToken(inputValue);
    setMessage('Token salvo! Teste a conexão para ativá-la.');
    setStatus('disconnected');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleTestConnection = () => {
    setStatus('testing');
    setMessage('');
    setTimeout(() => {
      if (inputValue === 'X8XDlqJrqUMpLjShRsccGA') {
        setStatus('connected');
        setMessage('Conexão bem-sucedida!');
      } else {
        setStatus('disconnected');
        setMessage('Token inválido ou expirado. Verifique e tente novamente.');
      }
    }, 1500);
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'connected':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          text: 'Conectado',
          color: 'text-green-700 bg-green-50',
        };
      case 'testing':
        return {
          icon: <Loader className="h-6 w-6 text-blue-500 animate-spin" />,
          text: 'Testando...',
          color: 'text-blue-700 bg-blue-50',
        };
      default:
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          text: 'Desconectado',
          color: 'text-red-700 bg-red-50',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurar API Cosmos</h1>
        <p className="text-gray-600">Conecte-se à base de dados oficial de produtos do Brasil.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Configuração do Token</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="cosmos-token" className="block text-sm font-medium text-gray-700 mb-1">
              Seu Token da API Cosmos
            </label>
            <input
              id="cosmos-token"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cole seu token aqui (ex: X8XDlqJrqUMpLjShRsccGA)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSaveToken}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvar Token
            </button>
            <button
              onClick={handleTestConnection}
              disabled={!inputValue || status === 'testing'}
              className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
            >
              Testar Conexão
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Status da Conexão</h3>
        <div className={`flex items-center gap-4 p-4 rounded-lg ${statusInfo.color}`}>
          {statusInfo.icon}
          <div>
            <p className="font-bold">{statusInfo.text}</p>
            {message && <p className="text-sm">{message}</p>}
          </div>
        </div>
        
        {status === 'connected' && (
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p><strong>Usuário:</strong> Seu Nome (Demo)</p>
            <p><strong>Plano:</strong> Premium</p>
            <p><strong>Consultas restantes:</strong> 982/mês</p>
            <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
