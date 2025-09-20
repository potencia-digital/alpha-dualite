import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LoginPage } from './components/Auth/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { WhatsAppSection } from './components/WhatsApp/WhatsAppSection';
import { EstoqueSection } from './components/Estoque/EstoqueSection';
import { CRMSection } from './components/CRM/CRMSection';
import { CosmosConfigSection } from './components/Cosmos/CosmosConfigSection';
import { CosmosScannerSection } from './components/Cosmos/CosmosScannerSection';
import { ProdutosCosmosSection } from './components/Cosmos/ProdutosCosmosSection';
import { AnalyticsCosmosSection } from './components/Cosmos/AnalyticsCosmosSection';
import { PDVSection } from './components/Vendas/PDVSection';
import { PIXSection } from './components/Vendas/PIXSection';
import { CampanhasSection } from './components/Campanhas/CampanhasSection';
import { ChatbotSection } from './components/Chatbot/ChatbotSection';
import { RelatoriosSection } from './components/Analytics/RelatoriosSection';

// Novas seções
import { MovimentacoesSection } from './components/Estoque/MovimentacoesSection';
import { AlertasSection } from './components/Estoque/AlertasSection';
import { PedidosSection } from './components/Vendas/PedidosSection';
import { FinanceiroSection } from './components/Vendas/FinanceiroSection';
import { AgendamentosSection } from './components/Analytics/AgendamentosSection';
import { ConfiguracoesGeraisSection } from './components/Configuracoes/ConfiguracoesGeraisSection';
import { SegurancaSection } from './components/Configuracoes/SegurancaSection';
import { IntegracoesSection } from './components/Configuracoes/IntegracoesSection';
import { FornecedoresSection } from './components/Fornecedores/FornecedoresSection';


// Simple authentication hook for demonstration
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('chatmei_auth') === 'true';
  });
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem('chatmei_auth', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('chatmei_auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return { isAuthenticated, login, logout };
};

const ProtectedRoute = ({ children, isAuthenticated }: { children: JSX.Element, isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={login} />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainLayout onLogout={logout} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="whatsapp" element={<WhatsAppSection />} />
        <Route path="crm" element={<CRMSection />} />
        <Route path="chatbot" element={<ChatbotSection />} />
        
        <Route path="scanner-cosmos" element={<CosmosScannerSection />} />
        <Route path="produtos-cosmos" element={<ProdutosCosmosSection />} />
        <Route path="analytics-cosmos" element={<AnalyticsCosmosSection />} />
        <Route path="config-cosmos" element={<CosmosConfigSection />} />

        <Route path="estoque" element={<EstoqueSection />} />
        <Route path="movimentacoes" element={<MovimentacoesSection />} />
        <Route path="alertas" element={<AlertasSection />} />
        <Route path="fornecedores" element={<FornecedoresSection />} />

        <Route path="pdv" element={<PDVSection />} />
        <Route path="pedidos" element={<PedidosSection />} />
        <Route path="pix" element={<PIXSection />} />
        <Route path="financeiro" element={<FinanceiroSection />} />

        <Route path="relatorios" element={<RelatoriosSection />} />
        <Route path="campanhas" element={<CampanhasSection />} />
        <Route path="agendamentos" element={<AgendamentosSection />} />
        
        <Route path="configuracoes" element={<ConfiguracoesGeraisSection />} />
        <Route path="seguranca" element={<SegurancaSection />} />
        <Route path="integracoes" element={<IntegracoesSection />} />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
