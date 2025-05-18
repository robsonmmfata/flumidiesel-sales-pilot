import { User } from '@/contexts/AuthContext';
import { Visit, Prospect, Sale, ScheduledVisit, InventoryItem, Promotion, Notification } from '@/models/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@flumidiesel.com',
    role: 'admin',
    active: true, // Added active property
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'manager@flumidiesel.com',
    role: 'manager',
    region: 'Norte',
    cpfCnpj: '123.456.789-00',
    phone: '(11) 98765-4321',
    active: true, // Added active property
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'vendedor@flumidiesel.com',
    role: 'salesperson',
    region: 'Sul',
    cpfCnpj: '987.654.321-00',
    phone: '(21) 98765-4321',
    active: true, // Added active property
  },
];

// Mock Visits
export const mockVisits: Visit[] = [
  {
    id: '1',
    date: '2023-05-15T00:00:00Z',
    clientName: 'Transportes Rápidos Ltda',
    address: 'Av. Brasil, 1500',
    city: 'São Paulo',
    contactName: 'Carlos Oliveira',
    contactInfo: 'carlos@transportesrapidos.com',
    arrivalTime: '09:30',
    departureTime: '10:45',
    subject: 'Apresentação de pneus para frota',
    interestLevel: 'high',
    productsPresented: ['Pneu XL-300', 'Pneu AT-200'],
    salesPersonId: '3',
    location: {
      latitude: -23.5505,
      longitude: -46.6333,
    },
  },
  {
    id: '2',
    date: '2023-05-16T00:00:00Z',
    clientName: 'Logística Express',
    address: 'Rua das Palmeiras, 300',
    city: 'Rio de Janeiro',
    contactName: 'Ana Paula',
    contactInfo: 'ana@logisticaexpress.com',
    arrivalTime: '14:00',
    departureTime: '15:30',
    subject: 'Apresentação de serviços de manutenção',
    interestLevel: 'medium',
    productsPresented: ['Serviço de alinhamento', 'Balanceamento'],
    salesPersonId: '3',
    location: {
      latitude: -22.9068,
      longitude: -43.1729,
    },
  },
  {
    id: '3',
    date: '2023-05-25T00:00:00Z',
    clientName: 'Auto Peças Silva',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    contactName: 'Roberto Silva',
    contactInfo: 'roberto@autopecassilva.com.br',
    arrivalTime: '08:30',
    departureTime: '10:00',
    subject: 'Apresentação de novos produtos da linha premium',
    interestLevel: 'high',
    productsPresented: ['Óleo Lubrificante Premium', 'Filtro de Ar High Performance'],
    salesPersonId: '3',
    location: {
      latitude: -23.5613,
      longitude: -46.6558,
    },
  },
  {
    id: '4',
    date: '2023-05-25T00:00:00Z',
    clientName: 'Transportes Rápidos',
    address: 'Rua Augusta, 500',
    city: 'São Paulo',
    contactName: 'Ana Santos',
    contactInfo: 'ana@transportesrapidos.com.br',
    arrivalTime: '11:00',
    departureTime: '12:30',
    subject: 'Negociação de contrato de fornecimento',
    interestLevel: 'high',
    productsPresented: ['Pneu AT-200', 'Serviço de alinhamento'],
    salesPersonId: '3',
    location: {
      latitude: -23.5532,
      longitude: -46.6582,
    },
  },
  {
    id: '5',
    date: '2023-05-25T00:00:00Z',
    clientName: 'Oficina Mecânica Central',
    address: 'Rua Vergueiro, 200',
    city: 'São Paulo',
    contactName: 'Carlos Oliveira',
    contactInfo: 'carlos@mecanicacentral.com.br',
    arrivalTime: '14:00',
    departureTime: '15:30',
    subject: 'Demonstração de novos equipamentos',
    interestLevel: 'medium',
    productsPresented: ['Kit de ferramentas profissional', 'Elevador hidráulico'],
    salesPersonId: '3',
    location: {
      latitude: -23.5708,
      longitude: -46.6400,
    },
  },
  {
    id: '6',
    date: '2023-05-25T00:00:00Z',
    clientName: 'Frota Express',
    address: 'Av. Brasil, 1500',
    city: 'São Paulo',
    contactName: 'Fernanda Lima',
    contactInfo: 'fernanda@frotaexpress.com.br',
    arrivalTime: '16:00',
    departureTime: '17:30',
    subject: 'Avaliação de frota para manutenção preventiva',
    interestLevel: 'low',
    productsPresented: ['Plano de manutenção preventiva', 'Serviço de diagnóstico'],
    salesPersonId: '3',
    location: {
      latitude: -23.5446,
      longitude: -46.6330,
    },
  },
  {
    id: '7',
    date: '2023-05-26T00:00:00Z',
    clientName: 'Diesel Truck',
    address: 'Rua Consolação, 800',
    city: 'São Paulo',
    contactName: 'Marcos Souza',
    contactInfo: 'marcos@dieseltruck.com.br',
    arrivalTime: '09:00',
    departureTime: '10:30',
    subject: 'Apresentação de peças para caminhões pesados',
    interestLevel: 'medium',
    productsPresented: ['Kit de embreagem reforçada', 'Sistema de freios de alta performance'],
    salesPersonId: '3',
    location: {
      latitude: -23.5486,
      longitude: -46.6529,
    },
  },
];

// Mock Prospects
export const mockProspects: Prospect[] = [
  {
    id: '1',
    clientName: 'Transportadora Nova Era',
    clientType: 'fleet',
    contactName: 'Roberto Mendes',
    contactInfo: 'roberto@novaera.com.br',
    interestLevel: 'high',
    requestedQuote: true,
    requestedFollowUp: true,
    notes: 'Interessado em renovar frota de 20 caminhões',
    salesPersonId: '3',
    createdAt: '2023-05-10T00:00:00Z',
  },
  {
    id: '2',
    clientName: 'João Caminhoneiro',
    clientType: 'autonomous',
    contactName: 'João Silva',
    contactInfo: '(11) 99887-6655',
    interestLevel: 'medium',
    requestedQuote: false,
    requestedFollowUp: true,
    notes: 'Procurando pneus para carreta',
    salesPersonId: '3',
    createdAt: '2023-05-12T00:00:00Z',
  },
];

// Updated mockSales with additional examples for the new sales team
export const mockSales: Sale[] = [
  {
    id: '1',
    clientName: 'Transportes Rápidos Ltda',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 8,
        unitPrice: 1200,
      },
      {
        productId: '2',
        name: 'Serviço de montagem',
        quantity: 8,
        unitPrice: 50,
      },
    ],
    totalValue: 10000,
    paymentMethod: 'invoice',
    deliveryDate: '2023-05-20T00:00:00Z',
    date: '2023-05-15T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-001',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed', // Added status property
    createdAt: '2023-05-15T00:00:00Z',
  },
  // Novos exemplos de vendas
  {
    id: '2',
    clientName: 'Oficina Mecânica Central',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 4,
        unitPrice: 1200,
      },
      {
        productId: '3',
        name: 'Óleo Lubrificante Premium',
        quantity: 10,
        unitPrice: 120,
      },
    ],
    totalValue: 6000,
    paymentMethod: 'credit',
    deliveryDate: '2023-06-05T00:00:00Z',
    date: '2023-05-25T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-002',
    salesPersonId: 'BALCAO',
    salesPersonName: 'BALCAO PECAS - ATACADO',
    status: 'completed', // Added status property
    createdAt: '2023-05-25T00:00:00Z',
  },
  {
    id: '3',
    clientName: 'Transportadora Nordeste',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 12,
        unitPrice: 1200,
      },
    ],
    totalValue: 14400,
    paymentMethod: 'transfer',
    deliveryDate: '2023-06-10T00:00:00Z',
    date: '2023-05-28T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-003',
    salesPersonId: 'DAIANE',
    salesPersonName: 'DAIANE ARANTES',
    status: 'completed', // Added status property
    createdAt: '2023-05-28T00:00:00Z',
  },
  {
    id: '4',
    clientName: 'Auto Peças Silva',
    products: [
      {
        productId: '2',
        name: 'Pneu AT-200',
        quantity: 16,
        unitPrice: 350,
      },
      {
        productId: '3',
        name: 'Óleo Lubrificante Premium',
        quantity: 25,
        unitPrice: 120,
      },
    ],
    totalValue: 8600,
    paymentMethod: 'invoice',
    deliveryDate: '2023-06-15T00:00:00Z',
    date: '2023-06-01T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-004',
    salesPersonId: 'ESCRITORIO',
    salesPersonName: 'ESCRITORIO DE PECAS',
    status: 'completed', // Added status property
    createdAt: '2023-06-01T00:00:00Z',
  },
  {
    id: '5',
    clientName: 'Logística Express',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 20,
        unitPrice: 1200,
      },
      {
        productId: '3',
        name: 'Óleo Lubrificante Premium',
        quantity: 40,
        unitPrice: 120,
      },
    ],
    totalValue: 28800,
    paymentMethod: 'invoice',
    deliveryDate: '2023-06-20T00:00:00Z',
    date: '2023-06-05T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-005',
    salesPersonId: 'WAGNER',
    salesPersonName: 'WAGNER COSTA BATISTA',
    status: 'pending', // Added status property
    createdAt: '2023-06-05T00:00:00Z',
  },
  {
    id: '6',
    clientName: 'Frota Municipal de São Paulo',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 30,
        unitPrice: 1200,
      },
      {
        productId: '2',
        name: 'Pneu AT-200',
        quantity: 14,
        unitPrice: 350,
      },
    ],
    totalValue: 40900,
    paymentMethod: 'transfer',
    deliveryDate: '2023-06-25T00:00:00Z',
    date: '2023-06-10T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-006',
    salesPersonId: 'DAIANE',
    salesPersonName: 'DAIANE ARANTES',
    status: 'pending', // Added status property
    createdAt: '2023-06-10T00:00:00Z',
  },
  {
    id: '7',
    clientName: 'Caminhões & Carretas Ltda',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 16,
        unitPrice: 1200,
      },
      {
        productId: '3',
        name: 'Óleo Lubrificante Premium',
        quantity: 32,
        unitPrice: 120,
      },
    ],
    totalValue: 23040,
    paymentMethod: 'credit',
    deliveryDate: '2023-06-28T00:00:00Z',
    date: '2023-06-15T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-007',
    salesPersonId: 'WAGNER',
    salesPersonName: 'WAGNER COSTA BATISTA',
    status: 'completed', // Added status property
    createdAt: '2023-06-15T00:00:00Z',
  },
  {
    id: '8',
    clientName: 'Auto Escola Direção Segura',
    products: [
      {
        productId: '2',
        name: 'Pneu AT-200',
        quantity: 20,
        unitPrice: 350,
      },
    ],
    totalValue: 7000,
    paymentMethod: 'debit',
    deliveryDate: '2023-07-05T00:00:00Z',
    date: '2023-06-20T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-008',
    salesPersonId: 'BALCAO',
    salesPersonName: 'BALCAO PECAS - ATACADO',
    status: 'completed', // Added status property
    createdAt: '2023-06-20T00:00:00Z',
  },
  {
    id: '9',
    clientName: 'Distribuidora Sul de Peças',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 10,
        unitPrice: 1200,
      },
      {
        productId: '2',
        name: 'Pneu AT-200',
        quantity: 24,
        unitPrice: 350,
      },
      {
        productId: '3',
        name: 'Óleo Lubrificante Premium',
        quantity: 50,
        unitPrice: 120,
      },
    ],
    totalValue: 26400,
    paymentMethod: 'invoice',
    deliveryDate: '2023-07-10T00:00:00Z',
    date: '2023-06-25T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-009',
    salesPersonId: 'ESCRITORIO',
    salesPersonName: 'ESCRITORIO DE PECAS',
    status: 'completed', // Added status property
    createdAt: '2023-06-25T00:00:00Z',
  },
  {
    id: '10',
    clientName: 'Transportadora Estrada Real',
    products: [
      {
        productId: '1',
        name: 'Pneu XL-300',
        quantity: 24,
        unitPrice: 1200,
      },
    ],
    totalValue: 28800,
    paymentMethod: 'transfer',
    deliveryDate: '2023-07-15T00:00:00Z',
    date: '2023-07-01T00:00:00Z', // Added date property
    orderNumber: 'ORD-2023-010',
    salesPersonId: 'DAIANE',
    salesPersonName: 'DAIANE ARANTES',
    status: 'completed', // Added status property
    createdAt: '2023-07-01T00:00:00Z',
  },
];

// Mock Scheduled Visits
export const mockScheduledVisits: ScheduledVisit[] = [
  {
    id: '1',
    clientName: 'Auto Peças Silva',
    contactName: 'José Silva',
    contactInfo: 'jose@autopecassilva.com.br',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    date: '2023-05-25T00:00:00Z',
    time: '10:00',
    purpose: 'Apresentação de novos produtos',
    salesPersonId: '3',
    createdAt: '2023-05-15T00:00:00Z',
    completed: false,
  },
  {
    id: '2',
    clientName: 'Transportadora Veloz',
    contactName: 'Marcelo Santos',
    contactInfo: 'marcelo@veloz.com.br',
    address: 'Rua das Acácias, 500',
    city: 'Curitiba',
    date: '2023-05-26T00:00:00Z',
    time: '14:30',
    purpose: 'Renovação de contrato',
    salesPersonId: '3',
    createdAt: '2023-05-15T00:00:00Z',
    completed: false,
  },
];

// Mock Inventory Items - rename to mockInventory for consistency
export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Pneu XL-300',
    category: 'Pneus',
    description: 'Pneu para caminhões pesados, alta durabilidade',
    sku: 'PN-XL300',
    price: 1200,
    stock: 45,
    minimumStock: 10,
    unit: 'Unidade',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Pneu AT-200',
    category: 'Pneus',
    description: 'Pneu para veículos leves, bom desempenho em terrenos úmidos',
    sku: 'PN-AT200',
    price: 350,
    stock: 120,
    minimumStock: 20,
    unit: 'Unidade',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Óleo Lubrificante Premium',
    category: 'Lubrificantes',
    description: 'Óleo lubrificante de alta performance para motores diesel',
    sku: 'LB-OLEO1',
    price: 120,
    stock: 200,
    minimumStock: 50,
    unit: 'Litro',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
  },
];

// We'll keep the existing mockInventoryItems as an alias for backward compatibility
export const mockInventoryItems = mockInventory;

// Mock Promotions
export const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Promoção de Inverno',
    description: 'Desconto especial em pneus para caminhões',
    discount: 15,
    applicableProducts: ['1'],
    startDate: '2023-06-01T00:00:00Z',
    endDate: '2023-07-31T00:00:00Z',
    createdBy: '2',
    createdAt: '2023-05-15T00:00:00Z',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Lembrete de Visita',
    message: 'Você tem uma visita agendada para amanhã com Auto Peças Silva',
    type: 'reminder',
    read: false,
    userId: '3',
    createdAt: '2023-05-24T00:00:00Z',
  },
  {
    id: '2',
    title: 'Nova Promoção',
    message: 'Nova promoção de inverno disponível. Confira os detalhes.',
    type: 'promotion',
    read: false,
    userId: '3',
    createdAt: '2023-05-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'Meta Alcançada',
    message: 'Parabéns! Você alcançou 80% da sua meta mensal.',
    type: 'achievement',
    read: true,
    userId: '3',
    createdAt: '2023-05-20T00:00:00Z',
  },
];
