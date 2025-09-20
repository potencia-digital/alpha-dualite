import React, { useState, useEffect } from 'react';
import { ScanLine, Search, Loader, CheckCircle, XCircle, PackagePlus, Zap } from 'lucide-react';
import { CosmosProduct } from '../../types';
import { fetchMockCosmosProduct } from '../../utils/mockData';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ScanStatus = 'idle' | 'scanning' | 'found' | 'not_found' | 'error';

export const CosmosScannerSection: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [product, setProduct] = useState<CosmosProduct | null>(null);
  const [isPriority, setIsPriority] = useState(false);
  const [cosmosConnected] = useLocalStorage('cosmos_status', 'disconnected');

  const handleScan = async () => {
    if (!barcode) return;
    setStatus('scanning');
    setProduct(null);
    setIsPriority(false);

    if (cosmosConnected !== 'connected') {
      setStatus('error');
      return;
    }

    const foundProduct = await fetchMockCosmosProduct(barcode);
    if (foundProduct) {
      setProduct(foundProduct);
      setStatus('found');
      const priorityBrands = ['NATURA', 'O BOTICÁRIO', 'AVON'];
      if (foundProduct.brand && priorityBrands.includes(foundProduct.brand.name.toUpperCase())) {
        setIsPriority(true);
      }
    } else {
      setStatus('not_found');
    }
  };

  const ResultCard = () => {
    switch (status) {
      case 'scanning':
        return (
          <div className="text-center p-6 border-2 border-dashed rounded-lg">
            <Loader className="h-10 w-10 mx-auto text-blue-500 animate-spin mb-2" />
            <p className="font-semibold">Buscando na Cosmos...</p>
            <p className="text-sm text-gray-500">Aguarde um momento.</p>
          </div>
        );
      case 'found':
        if (!product) return null;
        return (
          <div className={`p-6 rounded-lg border-2 ${isPriority ? 'border-purple-500 bg-purple-50' : 'border-green-500 bg-green-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isPriority ? <Zap className="h-6 w-6 text-purple-600" /> : <CheckCircle className="h-6 w-6 text-green-600" />}
              <h3 className={`text-lg font-bold ${isPriority ? 'text-purple-800' : 'text-green-800'}`}>
                {isPriority ? 'Marca Prioritária Detectada!' : 'Produto Encontrado!'}
              </h3>
            </div>
            <div className="flex gap-4">
              <img src={product.thumbnail} alt={product.description} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <p className="font-bold text-lg">{product.description}</p>
                <p className="text-sm text-gray-600">Marca: {product.brand?.name}</p>
                <p className="text-sm text-gray-600">Preço Sugerido: <span className="font-semibold">R$ {product.avg_price?.toFixed(2)}</span></p>
                <p className="text-xs text-gray-500">GTIN: {product.gtin}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className={`flex-1 py-2 text-white rounded-lg transition-colors ${isPriority ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}`}>
                {isPriority ? 'Cadastrar Automaticamente' : 'Cadastrar Produto'}
              </button>
              <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                Ver Detalhes
              </button>
            </div>
          </div>
        );
      case 'not_found':
        return (
          <div className="text-center p-6 border-2 border-dashed rounded-lg border-red-400 bg-red-50">
            <XCircle className="h-10 w-10 mx-auto text-red-500 mb-2" />
            <p className="font-semibold text-red-800">Produto Não Encontrado</p>
            <p className="text-sm text-gray-600">O código "{barcode}" não foi encontrado em nenhuma base.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Cadastrar Manualmente
            </button>
          </div>
        );
      case 'error':
        return (
           <div className="text-center p-6 border-2 border-dashed rounded-lg border-yellow-400 bg-yellow-50">
            <XCircle className="h-10 w-10 mx-auto text-yellow-500 mb-2" />
            <p className="font-semibold text-yellow-800">API Cosmos Desconectada</p>
            <p className="text-sm text-gray-600">Por favor, configure o token da API Cosmos para usar o scanner.</p>
          </div>
        )
      default:
        return (
          <div className="text-center p-6 border-2 border-dashed rounded-lg">
            <ScanLine className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="font-semibold">Aguardando escaneamento</p>
            <p className="text-sm text-gray-500">Digite um código de barras para buscar.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Scanner Cosmos</h1>
        <p className="text-gray-600">Identifique produtos instantaneamente com o código de barras.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Buscar Produto</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <ScanLine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Digite o código de barras (GTIN/EAN)"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleScan}
            disabled={!barcode || status === 'scanning'}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:bg-gray-400"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
            <p>Tente estes códigos de exemplo:</p>
            <ul className="list-disc list-inside">
                <li><b className="text-purple-600">7891000123456</b> (Natura - Marca Prioritária)</li>
                <li><b className="text-green-600">7891150033023</b> (Pantene - Produto Comum)</li>
                <li><b className="text-red-600">9999999999999</b> (Não Encontrado)</li>
            </ul>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <ResultCard />
      </div>
    </div>
  );
};
