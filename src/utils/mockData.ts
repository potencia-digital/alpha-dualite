import { faker } from '@faker-js/faker/locale/pt_BR';
import { Cliente, Produto, Venda, Campanha, CosmosProduct, Fornecedor, MovimentacaoEstoque, Agendamento } from '../types';

faker.seed(123);

export const generateMockClientes = (count: number = 50): Cliente[] => {
  const stages: Cliente['stage'][] = ['Lead', 'Qualificado', 'Proposta', 'Fechado', 'Perdido'];
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    nome: faker.person.fullName(),
    telefone: faker.phone.number('(##) #####-####'),
    email: faker.internet.email(),
    categoria: faker.helpers.arrayElement(['VIP', 'Regular', 'Novo'] as const),
    ultimaCompra: faker.date.recent({ days: 30 }),
    totalCompras: parseFloat(faker.commerce.price({ min: 100, max: 5000, dec: 2 })),
    stage: faker.helpers.arrayElement(stages),
  }));
};

export const generateMockProdutos = (count: number = 100): Produto[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    nome: faker.commerce.productName(),
    categoria: faker.commerce.department(),
    preco: parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
    estoque: faker.number.int({ min: 0, max: 100 }),
    codigoBarras: faker.string.numeric(13),
    estoqueMinimo: faker.number.int({ min: 5, max: 20 })
  }));
};

const mockClientes = generateMockClientes();
const mockProdutos = generateMockProdutos();

export const generateMockVendas = (count: number = 30): Venda[] => {
  return Array.from({ length: count }, () => {
    const cliente = faker.helpers.arrayElement(mockClientes);
    const produtosVendidos = faker.helpers.arrayElements(mockProdutos, { min: 1, max: 4 });
    const total = produtosVendidos.reduce((sum, p) => sum + p.preco, 0);

    return {
        id: faker.string.uuid(),
        clienteId: cliente.id,
        clienteNome: cliente.nome,
        produtos: produtosVendidos.map(p => ({
            produtoId: p.id,
            nome: p.nome,
            quantidade: 1,
            preco: p.preco
        })),
        total: total,
        metodoPagamento: faker.helpers.arrayElement(['dinheiro', 'cartao', 'pix'] as const),
        status: faker.helpers.arrayElement(['pendente', 'confirmado', 'cancelado'] as const),
        data: faker.date.recent({ days: 30 })
    }
  });
};

export const generateMockCampanhas = (count: number = 10): Campanha[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    nome: `Campanha ${faker.commerce.productAdjective()}`,
    tipo: faker.helpers.arrayElement(['promocional', 'informativo', 'recuperacao'] as const),
    segmento: faker.helpers.arrayElements(['VIP', 'Regular', 'Novo'], { min: 1, max: 3 }),
    mensagem: faker.lorem.paragraph(),
    agendamento: faker.date.future(),
    status: faker.helpers.arrayElement(['rascunho', 'agendada', 'enviada'] as const),
    estatisticas: {
      enviadas: faker.number.int({ min: 100, max: 1000 }),
      entregues: faker.number.int({ min: 80, max: 950 }),
      lidas: faker.number.int({ min: 50, max: 800 }),
      respondidas: faker.number.int({ min: 10, max: 200 })
    }
  }));
};

export const generateMockFornecedores = (count: number = 15): Fornecedor[] => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        nome: faker.company.name(),
        contato: faker.person.fullName(),
        telefone: faker.phone.number(),
        email: faker.internet.email(),
        produtosFornecidos: faker.helpers.arrayElements(mockProdutos.map(p => p.nome), { min: 2, max: 8 })
    }));
};

export const generateMockMovimentacoes = (count: number = 50): MovimentacaoEstoque[] => {
    return Array.from({ length: count }, () => {
        const produto = faker.helpers.arrayElement(mockProdutos);
        const tipo = faker.helpers.arrayElement(['entrada', 'saida', 'ajuste'] as const);
        return {
            id: faker.string.uuid(),
            produtoId: produto.id,
            produtoNome: produto.nome,
            tipo: tipo,
            quantidade: faker.number.int({ min: 1, max: 50 }),
            data: faker.date.recent({ days: 30 }),
            motivo: tipo === 'saida' ? 'Venda PDV' : tipo === 'entrada' ? 'Compra de fornecedor' : 'Ajuste de inventário',
            usuario: 'demo@chatmei.com'
        }
    });
};

export const generateMockAgendamentos = (count: number = 20): Agendamento[] => {
    return Array.from({ length: count }, () => {
        const cliente = faker.helpers.arrayElement(mockClientes);
        return {
            id: faker.string.uuid(),
            titulo: faker.lorem.sentence(4),
            data: faker.date.soon({ days: 15 }),
            tipo: faker.helpers.arrayElement(['Ligação', 'Reunião', 'Follow-up'] as const),
            clienteId: cliente.id,
            clienteNome: cliente.nome,
            status: faker.helpers.arrayElement(['pendente', 'concluido'] as const)
        }
    });
};


// Mock Cosmos API
const mockCosmosDB: { [key: string]: CosmosProduct } = {
  '7891000123456': {
    gtin: '7891000123456',
    description: 'Natura Tododia Desodorante Colônia',
    brand: { name: 'NATURA' },
    avg_price: 45.90,
    thumbnail: 'https://i.pinimg.com/originals/ce/bf/87/cebf87af425619914c7159f2f9aeb976.jpg',
    ncm: { code: '33030010', description: 'Perfumes (extratos)' }
  },
  '7891150033023': {
    gtin: '7891150033023',
    description: 'Shampoo Pantene 400ml',
    brand: { name: 'Pantene' },
    avg_price: 15.90,
    thumbnail: 'https://i.pinimg.com/originals/ce/bf/87/cebf87af425619914c7159f2f9aeb976.jpg',
    ncm: { code: '33051000', description: 'Champôs' }
  },
    '7891234567890': {
    gtin: '7891234567890',
    description: 'Creme para Mãos O Boticário',
    brand: { name: 'O BOTICÁRIO' },
    avg_price: 29.99,
    thumbnail: 'https://i.pinimg.com/originals/ce/bf/87/cebf87af425619914c7159f2f9aeb976.jpg',
    ncm: { code: '33049990', description: 'Outros cremes' }
  }
};

export const fetchMockCosmosProduct = (gtin: string): Promise<CosmosProduct | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCosmosDB[gtin] || null);
    }, 1000); // Simulate network delay
  });
};
