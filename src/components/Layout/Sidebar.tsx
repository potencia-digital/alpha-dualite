import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, MessageSquare, Package, ShoppingCart, CreditCard, Users, Megaphone, Bot, BarChart3,
  ScanLine, Box, LineChart, Settings2, Shield, Plug, X, History, BellRing, FileText, DollarSign, CalendarClock, Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuSections = [
  {
    title: 'Principal',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: Home },
      { path: '/whatsapp', label: 'Conversas', icon: MessageSquare },
      { path: '/crm', label: 'Contatos', icon: Users },
      { path: '/chatbot', label: 'Chatbots', icon: Bot },
    ]
  },
  {
    title: 'Cosmos',
    items: [
      { path: '/scanner-cosmos', label: 'Scanner Cosmos', icon: ScanLine },
      { path: '/produtos-cosmos', label: 'Produtos Cosmos', icon: Box },
      { path: '/analytics-cosmos', label: 'Analytics Cosmos', icon: LineChart },
      { path: '/config-cosmos', label: 'Configurar Cosmos', icon: Settings2 },
    ]
  },
  {
    title: 'Estoque',
    items: [
      { path: '/estoque', label: 'Produtos', icon: Package },
      { path: '/movimentacoes', label: 'Movimentações', icon: History },
      { path: '/alertas', label: 'Alertas', icon: BellRing },
      { path: '/fornecedores', label: 'Fornecedores', icon: Truck },
    ]
  },
  {
    title: 'Vendas',
    items: [
      { path: '/pdv', label: 'PDV Barcode', icon: ShoppingCart },
      { path: '/pedidos', label: 'Pedidos', icon: FileText },
      { path: '/pix', label: 'PIX', icon: CreditCard },
      { path: '/financeiro', label: 'Financeiro', icon: DollarSign },
    ]
  },
  {
    title: 'Analytics',
    items: [
      { path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
      { path: '/campanhas', label: 'Campanhas', icon: Megaphone },
      { path: '/agendamentos', label: 'Agendamentos', icon: CalendarClock },
    ]
  },
  {
    title: 'Configurações',
    items: [
      { path: '/configuracoes', label: 'Configurações', icon: Settings2 },
      { path: '/seguranca', label: 'Segurança', icon: Shield },
      { path: '/integracoes', label: 'Integrações', icon: Plug },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className="fixed left-0 top-0 h-full w-70 bg-white border-r border-gray-200 z-50 flex flex-col lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-600">ChatMEI Pro</h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {menuSections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onToggle();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${section.title === 'Cosmos' && isActive ? 'text-purple-600' : ''}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};
