import React, { useState } from 'react';
import { Box, Search, PackagePlus, Zap } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CosmosProduct } from '../../types';

const mockCosmosProducts: CosmosProduct[] = [
    {
        gtin: '7891000123456',
        description: 'Natura Tododia Desodorante Colônia',
        brand: { name: 'NATURA' },
        avg_price: 45.90,
        thumbnail: 'https://i.pinimg.com/originals/ce/bf/87/cebf87af425619914c7159f2f9aeb976.jpg',
    },
    {
        gtin: '7891234567890',
        description: 'Creme para Mãos O Boticário',
        brand: { name: 'O BOTICÁRIO' },
        avg_price: 29.99,
        thumbnail: 'https://i.pinimg.com/originals/ce/bf/87/cebf87af425619914c7159f2f9aeb976.jpg',
    },
    {
        gtin: '7891150033023',
        description: 'Shampoo Pantene 400ml',
        brand: { name: 'Pantene' },
        avg_price: 15.90,
        thumbnail: 'https://i.pinimg.com/originals/ce/bf/87/cebf87af425619914c7159f2f9aeb976.jpg',
    }
];

export const ProdutosCosmosSection: React.FC = () => {
  const [produtos] = useLocalStorage<CosmosProduct[]>('cosmos_produtos', mockCosmosProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProdutos = produtos.filter(p =>
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isPriority = (product: CosmosProduct) => {
    const priorityBrands = ['NATURA', 'O BOTICÁRIO', 'AVON'];
    return product.brand && priorityBrands.includes(product.brand.name.toUpperCase());
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produtos Cosmos</h1>
        <p className="text-gray-600">Gerencie os produtos identificados pela API Cosmos.</p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produtos Cosmos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProdutos.map(produto => (
          <div key={produto.gtin} className={`bg-white rounded-lg border ${isPriority(produto) ? 'border-purple-300' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-lg transition-shadow`}>
            {isPriority(produto) && (
                <div className="p-1 bg-purple-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1">
                    <Zap size={12} /> MARCA PRIORITÁRIA
                </div>
            )}
            <div className="p-4">
              <img src={produto.thumbnail} alt={produto.description} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="font-semibold text-gray-800">{produto.description}</h3>
              <p className="text-sm text-gray-500">{produto.brand?.name}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold text-lg text-blue-600">R$ {produto.avg_price?.toFixed(2)}</p>
                <button className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
                  <PackagePlus size={14}/> Adicionar ao Estoque
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
