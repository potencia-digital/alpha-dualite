import React from 'react';
import { BellRing, AlertTriangle, Package, ShoppingCart } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Produto } from '../../types';
import { generateMockProdutos } from '../../utils/mockData';

export const AlertasSection: React.FC = () => {
  const [produtos] = useLocalStorage<Produto[]>('produtos', generateMockProdutos());

  const lowStockProducts = produtos.filter(p => p.estoque <= p.estoqueMinimo);
  const outOfStockProducts = produtos.filter(p => p.estoque === 0);
  const highDemandProducts = produtos.sort((a,b) => b.estoque - a.estoque).slice(0,3); // Mocking high demand

  const AlertCard: React.FC<{ title: string, products: Produto[], icon: React.ElementType, color: string }> = ({ title, products, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`h-6 w-6 ${color}`} />
        <h3 className="text-lg font-semibold text-gray-800">{title} ({products.length})</h3>
      </div>
      <div className="space-y-2">
        {products.length > 0 ? products.map(p => (
          <div key={p.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <span className="text-sm font-medium">{p.nome}</span>
            <span className={`text-sm font-bold ${p.estoque === 0 ? 'text-red-600' : 'text-yellow-600'}`}>
              {p.estoque} un.
            </span>
          </div>
        )) : <p className="text-sm text-gray-500 text-center py-4">Nenhum alerta nesta categoria.</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alertas Inteligentes</h1>
        <p className="text-gray-600">Configure e visualize notificações automáticas para seu estoque.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AlertCard title="Estoque Baixo" products={lowStockProducts} icon={AlertTriangle} color="text-yellow-500" />
        <AlertCard title="Fora de Estoque" products={outOfStockProducts} icon={Package} color="text-red-500" />
        <AlertCard title="Alta Demanda" products={highDemandProducts} icon={ShoppingCart} color="text-blue-500" />
      </div>
    </div>
  );
};
