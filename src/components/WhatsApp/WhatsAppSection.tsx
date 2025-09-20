import React, { useState } from 'react';
import { Send, Phone, MessageCircle, Users, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppSection: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: '1', name: 'João Silva', lastMessage: 'Obrigado pela compra!', time: '10:30', unread: 2 },
    { id: '2', name: 'Maria Santos', lastMessage: 'Quando chega meu pedido?', time: '09:15', unread: 1 },
    { id: '3', name: 'Pedro Costa', lastMessage: 'Perfeito, muito obrigado!', time: 'Ontem', unread: 0 },
  ];

  const messages = [
    { id: '1', sender: 'client', content: 'Olá! Gostaria de saber sobre o produto X', time: '10:25' },
    { id: '2', sender: 'me', content: 'Olá! Claro, o produto X está disponível por R$ 99,90', time: '10:26' },
    { id: '3', sender: 'client', content: 'Perfeito! Como posso fazer o pedido?', time: '10:28' },
    { id: '4', sender: 'me', content: 'Você pode fazer o pedido pelo nosso sistema ou pelo WhatsApp mesmo!', time: '10:29' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp Business</h1>
        <p className="text-gray-600">Gerencie suas conversas e automatize o atendimento</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-gray-600">Mensagens hoje</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-gray-600">Conversas ativas</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold">1.2min</p>
              <p className="text-sm text-gray-600">Tempo médio de resposta</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Taxa de entrega</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 h-96 flex">
        {/* Contacts List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Conversas</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                  selectedContact === contact.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{contact.time}</p>
                    {contact.unread > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold">João Silva</h3>
                <p className="text-sm text-green-600">Online</p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'me'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Selecione uma conversa para começar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
