import React, { useState } from 'react';
import { ShoppingCart, ScanLine, Search, User, Trash2, Plus, Minus, X, CreditCard } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Produto, Cliente } from '../../types';
import { PIXQRCodeModal } from './PIXQRCodeModal';

interface CartItem extends Produto {
  quantidade: number;
}

export const PDVSection: React.FC = () => {
  const [produtos, setProdutos] = useLocalStorage<Produto[]>('produtos', []);
  const [clientes] = useLocalStorage<Cliente[]>('clientes', []);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPIXModal, setShowPIXModal] = useState(false);

  const searchResults = searchTerm
    ? produtos.filter(p => 
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.codigoBarras?.includes(searchTerm)
      ).slice(0, 5)
    : [];

  const addToCart = (produto: Produto) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === produto.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCart, { ...produto, quantidade: 1 }];
    });
    setSearchTerm('');
  };
  
  const updateQuantity = (id: string, delta: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item
      );
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const desconto = selectedCliente && clientes.find(c => c.id === selectedCliente)?.categoria === 'VIP' ? subtotal * 0.05 : 0;
  const total = subtotal - desconto;

  const handleFinalizeSale = (method: 'pix' | 'card' | 'money') => {
    if (cart.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    // Update stock
    const newProducts = [...produtos];
    cart.forEach(item => {
      const productIndex = newProducts.findIndex(p => p.id === item.id);
      if(productIndex !== -1) {
        newProducts[productIndex].estoque -= item.quantidade;
      }
    });
    setProdutos(newProducts);

    if (method === 'pix') {
      setShowPIXModal(true);
    } else {
      alert(`Venda finalizada com ${method}!`);
      setCart([]);
      setSelectedCliente('');
    }
  };

  const handlePIXSuccess = () => {
    setShowPIXModal(false);
    alert('Pagamento PIX confirmado! Venda finalizada.');
    setCart([]);
    setSelectedCliente('');
  }

  return (
    <div className="space-y-6">
      {showPIXModal && (
        <PIXQRCodeModal
          amount={total}
          onClose={() => setShowPIXModal(false)}
          onSuccess={handlePIXSuccess}
        />
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">PDV - Ponto de Venda Inteligente</h1>
        <p className="text-gray-600">Realize vendas de forma rápida e integrada.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search/Scan */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar produto por nome ou código de barras..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
                {searchTerm && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {searchResults.map(p => (
                      <div key={p.id} onClick={() => addToCart(p)} className="p-3 hover:bg-gray-100 cursor-pointer">
                        <p className="font-semibold">{p.nome}</p>
                        <p className="text-sm text-gray-500">R$ {p.preco.toFixed(2)} - Estoque: {p.estoque}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
                <ScanLine size={18} />
                Scanner
              </button>
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><ShoppingCart size={20} /> Carrinho de Compras</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.length > 0 ? cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-semibold">{item.nome}</p>
                    <p className="text-sm text-gray-600">R$ {item.preco.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><Minus size={14} /></button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><Plus size={14} /></button>
                  </div>
                  <p className="font-semibold w-20 text-right">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
              )) : <p className="text-center text-gray-500 py-8">O carrinho está vazio.</p>}
            </div>
          </div>
        </div>

        {/* Summary & Finalize */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Resumo da Venda</h3>
          
          {/* Customer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedCliente}
                onChange={e => setSelectedCliente(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg appearance-none"
              >
                <option value="">Cliente Avulso</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
             {selectedCliente && clientes.find(c => c.id === selectedCliente)?.categoria === 'VIP' && (
              <p className="text-xs text-purple-600 mt-1">Cliente VIP! Desconto de 5% aplicado.</p>
            )}
          </div>
          
          <div className="space-y-2 text-sm flex-grow">
            <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-purple-600"><span>Desconto VIP</span><span>- R$ {desconto.toFixed(2)}</span></div>
            <hr className="my-2"/>
            <div className="flex justify-between font-bold text-lg"><span>TOTAL</span><span>R$ {total.toFixed(2)}</span></div>
          </div>
          
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Finalizar Venda</h4>
            <button onClick={() => handleFinalizeSale('pix')} className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-600">
              <CreditCard size={18} /> Pagar com PIX
            </button>
            <button onClick={() => handleFinalizeSale('card')} className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Pagar com Cartão</button>
            <button onClick={() => handleFinalizeSale('money')} className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">Pagar com Dinheiro</button>
          </div>
        </div>
      </div>
    </div>
  );
};
