import { User } from '@/contexts/AuthContext';
import { Visit, Prospect, Sale, ScheduledVisit, InventoryItem, Promotion, Notification } from '@/models/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@flumidiesel.com',
    role: 'admin',
    active: true,
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'manager@flumidiesel.com',
    role: 'manager',
    region: 'Norte',
    cpfCnpj: '123.456.789-00',
    phone: '(11) 98765-4321',
    active: true,
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'vendedor@flumidiesel.com',
    role: 'salesperson',
    region: 'Sul',
    cpfCnpj: '987.654.321-00',
    phone: '(21) 98765-4321',
    active: true,
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos@flumidiesel.com',
    role: 'salesperson',
    region: 'Sudeste',
    cpfCnpj: '111.222.333-44',
    phone: '(31) 97654-3210',
    active: true,
  },
  {
    id: '5',
    name: 'Ana Pereira',
    email: 'ana@flumidiesel.com',
    role: 'salesperson',
    region: 'Nordeste',
    cpfCnpj: '555.666.777-88',
    phone: '(81) 96543-2109',
    active: true,
  },
  {
    id: '6',
    name: 'Roberto Almeida',
    email: 'roberto@flumidiesel.com',
    role: 'salesperson',
    region: 'Centro-Oeste',
    cpfCnpj: '999.888.777-66',
    phone: '(61) 95432-1098',
    active: false,
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

// Updated mockSales with data spanning multiple months
export const mockSales: Sale[] = [
  // January
  {
    id: '101',
    clientName: 'Auto Peças Paulista',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 10, unitPrice: 1200 },
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 20, unitPrice: 120 }
    ],
    totalValue: 14400,
    paymentMethod: 'invoice',
    deliveryDate: '2023-01-15T00:00:00Z',
    date: '2023-01-10T00:00:00Z',
    orderNumber: 'ORD-2023-101',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-01-10T00:00:00Z',
  },
  {
    id: '102',
    clientName: 'Transportes Rápidos Norte',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 16, unitPrice: 350 }
    ],
    totalValue: 5600,
    paymentMethod: 'transfer',
    deliveryDate: '2023-01-20T00:00:00Z',
    date: '2023-01-12T00:00:00Z',
    orderNumber: 'ORD-2023-102',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2023-01-12T00:00:00Z',
  },
  
  // February
  {
    id: '103',
    clientName: 'Frota Municipal SP',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 24, unitPrice: 1200 }
    ],
    totalValue: 28800,
    paymentMethod: 'invoice',
    deliveryDate: '2023-02-28T00:00:00Z',
    date: '2023-02-05T00:00:00Z',
    orderNumber: 'ORD-2023-103',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2023-02-05T00:00:00Z',
  },
  {
    id: '104',
    clientName: 'Diesel Truck Center',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 8, unitPrice: 1200 },
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 30, unitPrice: 120 }
    ],
    totalValue: 13200,
    paymentMethod: 'credit',
    deliveryDate: '2023-02-15T00:00:00Z',
    date: '2023-02-10T00:00:00Z',
    orderNumber: 'ORD-2023-104',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-02-10T00:00:00Z',
  },
  
  // March
  {
    id: '105',
    clientName: 'Transportadora Nordeste',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 14, unitPrice: 1200 },
      { productId: '2', name: 'Pneu AT-200', quantity: 8, unitPrice: 350 }
    ],
    totalValue: 19600,
    paymentMethod: 'transfer',
    deliveryDate: '2023-03-10T00:00:00Z',
    date: '2023-03-03T00:00:00Z',
    orderNumber: 'ORD-2023-105',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2023-03-03T00:00:00Z',
  },
  {
    id: '106',
    clientName: 'Logística Express',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 20, unitPrice: 350 },
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 50, unitPrice: 120 }
    ],
    totalValue: 13000,
    paymentMethod: 'invoice',
    deliveryDate: '2023-03-20T00:00:00Z',
    date: '2023-03-15T00:00:00Z',
    orderNumber: 'ORD-2023-106',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2023-03-15T00:00:00Z',
  },
  
  // April
  {
    id: '107',
    clientName: 'Auto Peças Rodrigues',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 6, unitPrice: 1200 },
      { productId: '4', name: 'Filtro de Ar Premium', quantity: 30, unitPrice: 80 }
    ],
    totalValue: 9600,
    paymentMethod: 'credit',
    deliveryDate: '2023-04-10T00:00:00Z',
    date: '2023-04-05T00:00:00Z',
    orderNumber: 'ORD-2023-107',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-04-05T00:00:00Z',
  },
  {
    id: '108',
    clientName: 'Transportes Centro-Oeste',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 18, unitPrice: 1200 }
    ],
    totalValue: 21600,
    paymentMethod: 'transfer',
    deliveryDate: '2023-04-25T00:00:00Z',
    date: '2023-04-18T00:00:00Z',
    orderNumber: 'ORD-2023-108',
    salesPersonId: '6',
    salesPersonName: 'Roberto Almeida',
    status: 'completed',
    createdAt: '2023-04-18T00:00:00Z',
  },
  
  // May (existing sales)
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
    date: '2023-05-15T00:00:00Z',
    orderNumber: 'ORD-2023-001',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-05-15T00:00:00Z',
  },
  // ... keep existing code (the rest of May sales data)
  
  // New sales for June
  {
    id: '201',
    clientName: 'Transportadora São Paulo',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 16, unitPrice: 1200 },
    ],
    totalValue: 19200,
    paymentMethod: 'invoice',
    deliveryDate: '2023-06-15T00:00:00Z',
    date: '2023-06-08T00:00:00Z',
    orderNumber: 'ORD-2023-201',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2023-06-08T00:00:00Z',
  },
  {
    id: '202',
    clientName: 'Auto Center Premium',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 24, unitPrice: 350 },
      { productId: '5', name: 'Kit Suspensão Reforçada', quantity: 5, unitPrice: 1500 }
    ],
    totalValue: 15900,
    paymentMethod: 'credit',
    deliveryDate: '2023-06-20T00:00:00Z',
    date: '2023-06-12T00:00:00Z',
    orderNumber: 'ORD-2023-202',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2023-06-12T00:00:00Z',
  },
  
  // July
  {
    id: '203',
    clientName: 'Transporte Pesado Brasil',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 30, unitPrice: 1200 },
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 60, unitPrice: 120 }
    ],
    totalValue: 43200,
    paymentMethod: 'invoice',
    deliveryDate: '2023-07-15T00:00:00Z',
    date: '2023-07-05T00:00:00Z',
    orderNumber: 'ORD-2023-203',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-07-05T00:00:00Z',
  },
  {
    id: '204',
    clientName: 'Frota Express Logística',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 18, unitPrice: 350 },
      { productId: '6', name: 'Bateria de Alta Performance', quantity: 10, unitPrice: 850 }
    ],
    totalValue: 14800,
    paymentMethod: 'transfer',
    deliveryDate: '2023-07-28T00:00:00Z',
    date: '2023-07-20T00:00:00Z',
    orderNumber: 'ORD-2023-204',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2023-07-20T00:00:00Z',
  },
  
  // August
  {
    id: '205',
    clientName: 'Distribuidora Centro Sul',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 12, unitPrice: 1200 },
      { productId: '7', name: 'Sistema de Freios Heavy Duty', quantity: 8, unitPrice: 2200 }
    ],
    totalValue: 32000,
    paymentMethod: 'invoice',
    deliveryDate: '2023-08-15T00:00:00Z',
    date: '2023-08-07T00:00:00Z',
    orderNumber: 'ORD-2023-205',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2023-08-07T00:00:00Z',
  },
  {
    id: '206',
    clientName: 'Transportadora Nordestina',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 32, unitPrice: 350 }
    ],
    totalValue: 11200,
    paymentMethod: 'credit',
    deliveryDate: '2023-08-25T00:00:00Z',
    date: '2023-08-18T00:00:00Z',
    orderNumber: 'ORD-2023-206',
    salesPersonId: '6',
    salesPersonName: 'Roberto Almeida',
    status: 'completed',
    createdAt: '2023-08-18T00:00:00Z',
  },
  
  // September
  {
    id: '207',
    clientName: 'Auto Peças Brasil Central',
    products: [
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 100, unitPrice: 120 },
      { productId: '4', name: 'Filtro de Ar Premium', quantity: 80, unitPrice: 80 }
    ],
    totalValue: 18400,
    paymentMethod: 'invoice',
    deliveryDate: '2023-09-12T00:00:00Z',
    date: '2023-09-05T00:00:00Z',
    orderNumber: 'ORD-2023-207',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-09-05T00:00:00Z',
  },
  {
    id: '208',
    clientName: 'Transportes Pesados Unidos',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 20, unitPrice: 1200 },
      { productId: '7', name: 'Sistema de Freios Heavy Duty', quantity: 5, unitPrice: 2200 }
    ],
    totalValue: 35000,
    paymentMethod: 'transfer',
    deliveryDate: '2023-09-28T00:00:00Z',
    date: '2023-09-20T00:00:00Z',
    orderNumber: 'ORD-2023-208',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2023-09-20T00:00:00Z',
  },
  
  // October
  {
    id: '209',
    clientName: 'Frota Nacional Transportes',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 40, unitPrice: 1200 }
    ],
    totalValue: 48000,
    paymentMethod: 'invoice',
    deliveryDate: '2023-10-20T00:00:00Z',
    date: '2023-10-10T00:00:00Z',
    orderNumber: 'ORD-2023-209',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2023-10-10T00:00:00Z',
  },
  {
    id: '210',
    clientName: 'Auto Mecânica São Paulo',
    products: [
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 120, unitPrice: 120 },
      { productId: '8', name: 'Kit Ferramentas Especiais', quantity: 3, unitPrice: 3500 }
    ],
    totalValue: 24900,
    paymentMethod: 'credit',
    deliveryDate: '2023-10-28T00:00:00Z',
    date: '2023-10-22T00:00:00Z',
    orderNumber: 'ORD-2023-210',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-10-22T00:00:00Z',
  },
  
  // November
  {
    id: '211',
    clientName: 'Cooperativa de Transportes Sul',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 28, unitPrice: 1200 },
      { productId: '2', name: 'Pneu AT-200', quantity: 16, unitPrice: 350 }
    ],
    totalValue: 39200,
    paymentMethod: 'transfer',
    deliveryDate: '2023-11-15T00:00:00Z',
    date: '2023-11-05T00:00:00Z',
    orderNumber: 'ORD-2023-211',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2023-11-05T00:00:00Z',
  },
  {
    id: '212',
    clientName: 'Transportadora Sudeste',
    products: [
      { productId: '9', name: 'Sistema de Telemetria Avançado', quantity: 1, unitPrice: 25000 }
    ],
    totalValue: 25000,
    paymentMethod: 'invoice',
    deliveryDate: '2023-11-25T00:00:00Z',
    date: '2023-11-17T00:00:00Z',
    orderNumber: 'ORD-2023-212',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2023-11-17T00:00:00Z',
  },
  
  // December
  {
    id: '213',
    clientName: 'Distribuidora Nacional de Peças',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 50, unitPrice: 1200 },
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 200, unitPrice: 120 }
    ],
    totalValue: 84000,
    paymentMethod: 'invoice',
    deliveryDate: '2023-12-20T00:00:00Z',
    date: '2023-12-05T00:00:00Z',
    orderNumber: 'ORD-2023-213',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2023-12-05T00:00:00Z',
  },
  {
    id: '214',
    clientName: 'Transportes Executivos Brasil',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 40, unitPrice: 350 },
      { productId: '6', name: 'Bateria de Alta Performance', quantity: 15, unitPrice: 850 }
    ],
    totalValue: 26750,
    paymentMethod: 'credit',
    deliveryDate: '2023-12-28T00:00:00Z',
    date: '2023-12-18T00:00:00Z',
    orderNumber: 'ORD-2023-214',
    salesPersonId: '6',
    salesPersonName: 'Roberto Almeida',
    status: 'completed',
    createdAt: '2023-12-18T00:00:00Z',
  },
  
  // 2024 - January
  {
    id: '215',
    clientName: 'Transportadora Nacional',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 35, unitPrice: 1200 },
      { productId: '7', name: 'Sistema de Freios Heavy Duty', quantity: 10, unitPrice: 2200 }
    ],
    totalValue: 64000,
    paymentMethod: 'invoice',
    deliveryDate: '2024-01-20T00:00:00Z',
    date: '2024-01-10T00:00:00Z',
    orderNumber: 'ORD-2024-001',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '216',
    clientName: 'Auto Peças Capital',
    products: [
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 150, unitPrice: 120 },
      { productId: '4', name: 'Filtro de Ar Premium', quantity: 100, unitPrice: 80 }
    ],
    totalValue: 26000,
    paymentMethod: 'transfer',
    deliveryDate: '2024-01-28T00:00:00Z',
    date: '2024-01-15T00:00:00Z',
    orderNumber: 'ORD-2024-002',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2024-01-15T00:00:00Z',
  },
  
  // February
  {
    id: '217',
    clientName: 'Transportes Pesados Rio Grande',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 30, unitPrice: 1200 },
      { productId: '9', name: 'Sistema de Telemetria Avançado', quantity: 2, unitPrice: 25000 }
    ],
    totalValue: 86000,
    paymentMethod: 'invoice',
    deliveryDate: '2024-02-20T00:00:00Z',
    date: '2024-02-05T00:00:00Z',
    orderNumber: 'ORD-2024-003',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2024-02-05T00:00:00Z',
  },
  {
    id: '218',
    clientName: 'Frota Regional Nordeste',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 48, unitPrice: 350 }
    ],
    totalValue: 16800,
    paymentMethod: 'credit',
    deliveryDate: '2024-02-28T00:00:00Z',
    date: '2024-02-18T00:00:00Z',
    orderNumber: 'ORD-2024-004',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2024-02-18T00:00:00Z',
  },
  
  // March
  {
    id: '219',
    clientName: 'Distribuidora Sul Peças',
    products: [
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 200, unitPrice: 120 },
      { productId: '8', name: 'Kit Ferramentas Especiais', quantity: 5, unitPrice: 3500 }
    ],
    totalValue: 41500,
    paymentMethod: 'invoice',
    deliveryDate: '2024-03-15T00:00:00Z',
    date: '2024-03-03T00:00:00Z',
    orderNumber: 'ORD-2024-005',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2024-03-03T00:00:00Z',
  },
  {
    id: '220',
    clientName: 'Transportes Centro Brasil',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 25, unitPrice: 1200 },
      { productId: '6', name: 'Bateria de Alta Performance', quantity: 15, unitPrice: 850 }
    ],
    totalValue: 42750,
    paymentMethod: 'transfer',
    deliveryDate: '2024-03-28T00:00:00Z',
    date: '2024-03-20T00:00:00Z',
    orderNumber: 'ORD-2024-006',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2024-03-20T00:00:00Z',
  },
  
  // April
  {
    id: '221',
    clientName: 'Transportadora Rota Sul',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 40, unitPrice: 1200 },
      { productId: '7', name: 'Sistema de Freios Heavy Duty', quantity: 12, unitPrice: 2200 }
    ],
    totalValue: 74400,
    paymentMethod: 'invoice',
    deliveryDate: '2024-04-20T00:00:00Z',
    date: '2024-04-08T00:00:00Z',
    orderNumber: 'ORD-2024-007',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2024-04-08T00:00:00Z',
  },
  {
    id: '222',
    clientName: 'Megastore Auto Peças',
    products: [
      { productId: '2', name: 'Pneu AT-200', quantity: 60, unitPrice: 350 },
      { productId: '4', name: 'Filtro de Ar Premium', quantity: 120, unitPrice: 80 }
    ],
    totalValue: 30600,
    paymentMethod: 'credit',
    deliveryDate: '2024-04-28T00:00:00Z',
    date: '2024-04-17T00:00:00Z',
    orderNumber: 'ORD-2024-008',
    salesPersonId: '5',
    salesPersonName: 'Ana Pereira',
    status: 'completed',
    createdAt: '2024-04-17T00:00:00Z',
  },
  
  // May (current month)
  {
    id: '223',
    clientName: 'Federação de Transportes Sul',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 45, unitPrice: 1200 },
      { productId: '3', name: 'Óleo Lubrificante Premium', quantity: 180, unitPrice: 120 }
    ],
    totalValue: 75600,
    paymentMethod: 'invoice',
    deliveryDate: '2024-05-25T00:00:00Z',
    date: '2024-05-05T00:00:00Z',
    orderNumber: 'ORD-2024-009',
    salesPersonId: '3',
    salesPersonName: 'Maria Santos',
    status: 'completed',
    createdAt: '2024-05-05T00:00:00Z',
  },
  {
    id: '224',
    clientName: 'Transportes Pesados Bahia',
    products: [
      { productId: '1', name: 'Pneu XL-300', quantity: 30, unitPrice: 1200 },
      { productId: '9', name: 'Sistema de Telemetria Avançado', quantity: 3, unitPrice: 25000 }
    ],
    totalValue: 111000,
    paymentMethod: 'transfer',
    deliveryDate: '2024-05-30T00:00:00Z',
    date: '2024-05-10T00:00:00Z',
    orderNumber: 'ORD-2024-010',
    salesPersonId: '4',
    salesPersonName: 'Carlos Oliveira',
    status: 'completed',
    createdAt: '2024-05-10T00:00:00Z',
  }
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

// Updated Mock Inventory with more items and some with low stock
export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Pneu XL-300',
    category: 'Pneus',
    description: 'Pneu para caminhões pesados, alta durabilidade',
    sku: 'PN-XL300',
    price: 1200,
    stock: 5,
    minimumStock: 10,
    unit: 'Unidade',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Pneu AT-200',
    category: 'Pneus',
    description: 'Pneu para veículos leves, bom desempenho em terrenos úmidos',
    sku: 'PN-AT200',
    price: 350,
    stock: 15,
    minimumStock: 20,
    unit: 'Unidade',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Óleo Lubrificante Premium',
    category: 'Lubrificantes',
    description: 'Óleo lubrificante de alta performance para motores diesel',
    sku: 'LB-OLEO1',
    price: 120,
    stock: 40,
    minimumStock: 50,
    unit: 'Litro',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Filtro de Ar Premium',
    category: 'Filtros',
    description: 'Filtro de ar de alta qualidade para motores diesel',
    sku: 'FT-AR001',
    price: 80,
    stock: 25,
    minimumStock: 30,
    unit: 'Unidade',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Kit Suspensão Reforçada',
    category: 'Suspensão',
    description: 'Kit completo de suspensão reforçada para veículos pesados',
    sku: 'SP-KT001',
    price: 1500,
    stock: 3,
    minimumStock: 5,
    unit: 'Kit',
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Bateria de Alta Performance',
    category: 'Elétrica',
    description: 'Bateria de 180Ah para veículos pesados com maior vida útil',
    sku: 'EL-BAT180',
    price: 850,
    stock: 8,
    minimumStock: 10,
    unit: 'Unidade',
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Sistema de Freios Heavy Duty',
    category: 'Freios',
    description: 'Sistema completo de freios para caminhões e carretas de alto desempenho',
    sku: 'FR-SIS001',
    price: 2200,
    stock: 2,
    minimumStock: 4,
    unit: 'Kit',
    createdAt: '2023-05-20T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Kit Ferramentas Especiais',
    category: 'Ferramentas',
    description: 'Kit completo de ferramentas especiais para manutenção de caminhões',
    sku: 'FER-KT001',
    price: 3500,
    stock: 1,
    minimumStock: 2,
    unit: 'Kit',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '9',
    name: 'Sistema de Telemetria Avançado',
    category: 'Tecnologia',
    description: 'Sistema de telemetria avançado para gerenciamento de frotas',
    sku: 'TEC-TEL001',
    price: 25000,
    stock: 0,
    minimumStock: 1,
    unit: 'Sistema',
    createdAt: '2023-07-10T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: '10',
    name: 'Pneu Off-Road XTR-500',
    category: 'Pneus',
    description: 'Pneu para uso em terrenos acidentados, alta resistência',
    sku: 'PN-XTR500',
    price: 1800,
    stock: 12,
    minimumStock: 8,
    unit: 'Unidade',
    createdAt: '2023-08-05T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  }
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

// Client locations data for heatmap visualization
export const mockClientLocations = [
  { name: 'Auto Peças Paulista', lat: -23.5505, lng: -46.6333, sales: 14400 }, // São Paulo
  { name: 'Transportes Rápidos Norte', lat: -22.9068, lng: -43.1729, sales: 5600 }, // Rio de Janeiro
  { name: 'Frota Municipal SP', lat: -23.5505, lng: -46.6333, sales: 28800 }, // São Paulo
  { name: 'Diesel Truck Center', lat: -25.4284, lng: -49.2733, sales: 13200 }, // Curitiba
  { name: 'Transportadora Nordeste', lat: -8.0578, lng: -34.8829, sales: 19600 }, // Recife
  { name: 'Logística Express', lat: -22.9068, lng: -43.1729, sales: 13000 }, // Rio de Janeiro
  { name: 'Auto Peças Rodrigues', lat: -30.0346, lng: -51.2177, sales: 9600 }, // Porto Alegre
  { name: 'Transportes Centro-Oeste', lat: -15.7801, lng: -47.9292, sales: 21600 }, // Brasília
  { name: 'Transportes Rápidos Ltda', lat: -23.5505, lng: -46.6333, sales: 10000 }, // São Paulo
  { name: 'Transportadora São Paulo', lat: -23.5505, lng: -46.6333, sales: 19200 }, // São Paulo
  { name: 'Auto Center Premium', lat: -19.9208, lng: -43.9378, sales: 15900 }, // Belo Horizonte
  { name: 'Transporte Pesado Brasil', lat: -22.9068, lng: -43.1729, sales: 43200 }, // Rio de Janeiro
  { name: 'Frota Express Logística', lat: -3.7327, lng: -38.5270, sales: 14800 }, // Fortaleza
  { name: 'Distribuidora Centro Sul', lat: -23.5505, lng: -46.6333, sales: 32000 }, // São Paulo
  { name: 'Transportadora Nordestina', lat: -12.9714, lng: -38.5014, sales: 11200 }, // Salvador
  { name: 'Auto Peças Brasil Central', lat: -16.6799, lng: -49.2550, sales: 18400 }, // Goiânia
  { name: 'Transportes Pesados Unidos', lat: -20.4428, lng: -54.6464, sales: 35000 }, // Campo Grande
  { name: 'Frota Nacional Transportes', lat: -23.5505, lng: -46.6333, sales: 48000 }, // São Paulo
  { name: 'Auto Mecânica São Paulo', lat: -23.5505, lng: -46.6333, sales: 24900 }, // São Paulo
  { name: 'Cooperativa de Transportes Sul', lat: -27.5954, lng: -48.5480, sales: 39200 }, // Florianópolis
  { name: 'Transportadora Sudeste', lat: -22.9068, lng: -43.1729, sales: 25000 }, // Rio de Janeiro
  { name: 'Distribuidora Nacional de Peças', lat: -23.5505, lng: -46.6333, sales: 84000 }, // São Paulo
  { name: 'Transportes Executivos Brasil', lat: -15.7801, lng: -47.9292, sales: 26750 }, // Brasília
  { name: 'Transportadora Nacional', lat: -23.5505, lng: -46.6333, sales: 64000 }, // São Paulo
  { name: 'Auto Peças Capital', lat: -15.7801, lng: -47.9292, sales: 26000 }, // Brasília
  { name: 'Transportes Pesados Rio Grande', lat: -30.0346, lng: -51.2177, sales: 86000 }, // Porto Alegre
  { name: 'Frota Regional Nordeste', lat: -5.7945, lng: -35.2110, sales: 16800 }, // Natal
  { name: 'Distribuidora Sul Peças', lat: -30.0346, lng: -51.2177, sales: 41500 }, // Porto Alegre
  { name: 'Transportes Centro Brasil', lat: -15.7801, lng: -47.9292, sales: 42750 }, // Brasília
  { name: 'Transportadora Rota Sul', lat: -25.4284, lng: -49.2733, sales: 74400 }, // Curitiba
  { name: 'Megastore Auto Peças', lat: -23.5505, lng: -46.6333, sales: 30600 }, // São Paulo
  { name: 'Federação de Transportes Sul', lat: -30.0346, lng: -51.2177, sales: 75600 }, // Porto Alegre
  { name: 'Transportes Pesados Bahia', lat: -12.9714, lng: -38.5014, sales: 111000 }, // Salvador
];
