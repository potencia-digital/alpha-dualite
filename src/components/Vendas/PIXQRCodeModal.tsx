import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, Loader } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PIXConfig } from '../../types';

interface PIXQRCodeModalProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PIXQRCodeModal: React.FC<PIXQRCodeModalProps> = ({ amount, onClose, onSuccess }) => {
  const [pixConfig] = useLocalStorage<PIXConfig>('pix_config', { chaves: {}, banco: {} });
  const [pixCode, setPixCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'confirming' | 'confirmed'>('waiting');
  
  useEffect(() => {
    // Generate a mock PIX code and QR code URL
    const chave = pixConfig.chaves.aleatoria || pixConfig.chaves.email || 'demo@chatmei.com';
    const mockCode = `00020126580014br.gov.bcb.pix0136${chave}520400005303986540${amount.toFixed(2).length.toString().padStart(2, '0')}${amount.toFixed(2)}5802BR5913ChatMEI Pro6009SAO PAULO62070503***6304E5A4`;
    setPixCode(mockCode);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mockCode)}`);

    // Simulate payment confirmation
    const timer = setTimeout(() => {
      setPaymentStatus('confirming');
      const confirmationTimer = setTimeout(() => {
        setPaymentStatus('confirmed');
        const successTimer = setTimeout(onSuccess, 2000);
        return () => clearTimeout(successTimer);
      }, 3000); // Time to show 'confirming'
      return () => clearTimeout(confirmationTimer);
    }, 10000); // Time until payment is 'confirmed'

    return () => clearTimeout(timer);
  }, [amount, pixConfig, onSuccess]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        
        {paymentStatus === 'confirmed' ? (
          <div className="flex flex-col items-center justify-center h-80">
            <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Pagamento Confirmado!</h2>
            <p className="text-gray-600 mt-2">A venda foi finalizada com sucesso.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800">Pague com PIX</h2>
            <p className="text-gray-600 mt-1">Escaneie o QR Code com seu app do banco.</p>
            
            <div className="my-6 flex justify-center items-center">
              {paymentStatus === 'confirming' ? (
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <Loader className="h-16 w-16 text-blue-500 animate-spin" />
                  <p className="mt-4 font-semibold">Confirmando pagamento...</p>
                </div>
              ) : (
                <img src={qrCodeUrl} alt="PIX QR Code" className="w-[200px] h-[200px]" />
              )}
            </div>

            <p className="font-bold text-2xl text-gray-900">R$ {amount.toFixed(2)}</p>

            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Ou use o PIX Copia e Cola:</p>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={pixCode}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 pr-10 text-xs text-gray-700"
                />
                <button onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
                  {copied ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
