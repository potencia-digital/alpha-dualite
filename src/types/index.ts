export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  categoria: 'VIP' | 'Regular' | 'Novo';
  ultimaCompra?: Date;
  totalCompras: number;
  stage: 'Lead' | 'Qualificado' | 'Proposta' | 'Fechado' | 'Perdido';
}

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  codigoBarras?: string;
  estoqueMinimo: number;
}

export interface Venda {
  id: string;
  clienteId?: string;
  clienteNome?: string;
  produtos: Array<{
    produtoId: string;
    nome: string;
    quantidade: number;
    preco: number;
  }>;
  total: number;
  metodoPagamento: 'dinheiro' | 'cartao' | 'pix';
  status: 'pendente' | 'confirmado' | 'cancelado';
  data: Date;
}

export interface Campanha {
  id: string;
  nome: string;
  tipo: 'promocional' | 'informativo' | 'recuperacao';
  segmento: string[];
  mensagem: string;
  agendamento?: Date;
  status: 'rascunho' | 'agendada' | 'enviada';
  estatisticas: {
    enviadas: number;
    entregues: number;
    lidas: number;
    respondidas: number;
  };
}

export interface CosmosProduct {
  gtin: string;
  description: string;
  brand?: { name: string };
  avg_price?: number;
  ncm?: { code: string; description: string };
  thumbnail?: string;
}

export interface PIXConfig {
  chaves: {
    telefone?: string;
    email?: string;
    cpfCnpj?: string;
    aleatoria?: string;
  };
  banco: {
    nome?: string;
    agencia?: string;
    conta?: string;
    tipo?: 'corrente' | 'poupanca';
  };
}

export interface Fornecedor {
  id: string;
  nome: string;
  contato: string;
  telefone: string;
  email: string;
  produtosFornecidos: string[];
}

export interface MovimentacaoEstoque {
    id: string;
    produtoId: string;
    produtoNome: string;
    tipo: 'entrada' | 'saida' | 'ajuste';
    quantidade: number;
    data: Date;
    motivo: string;
    usuario: string;
}

export interface Agendamento {
  id: string;
  titulo: string;
  data: Date;
  tipo: 'Ligação' | 'Reunião' | 'Follow-up';
  clienteId?: string;
  clienteNome?: string;
  status: 'pendente' | 'concluido';
}
