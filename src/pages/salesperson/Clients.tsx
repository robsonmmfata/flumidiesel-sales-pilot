
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sale } from '@/models/types';
import { Search, UserRound, Package, Calendar, Phone } from 'lucide-react';

// Mock data for client list
const mockClients = [
  {
    id: '1',
    name: 'Auto Peças Silva',
    contactName: 'Roberto Silva',
    phone: '(11) 98765-4321',
    email: 'roberto@autopecassilva.com.br',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    status: 'active',
    lastPurchase: '2025-05-10',
    totalPurchases: 12,
    totalSpent: 28500.50
  },
  {
    id: '2',
    name: 'Transportes Rápidos',
    contactName: 'Ana Santos',
    phone: '(11) 91234-5678',
    email: 'ana@transportesrapidos.com.br',
    address: 'Rua Augusta, 500, São Paulo - SP',
    status: 'active',
    lastPurchase: '2025-05-05',
    totalPurchases: 8,
    totalSpent: 15780.25
  },
  {
    id: '3',
    name: 'Oficina Mecânica Central',
    contactName: 'Carlos Oliveira',
    phone: '(11) 97890-1234',
    email: 'carlos@mecanicacentral.com.br',
    address: 'Rua Vergueiro, 200, São Paulo - SP',
    status: 'inactive',
    lastPurchase: '2025-01-15',
    totalPurchases: 3,
    totalSpent: 4250.00
  },
  {
    id: '4',
    name: 'Frota Express',
    contactName: 'Fernanda Lima',
    phone: '(11) 94567-8901',
    email: 'fernanda@frotaexpress.com.br',
    address: 'Av. Brasil, 1500, São Paulo - SP',
    status: 'active',
    lastPurchase: '2025-05-12',
    totalPurchases: 15,
    totalSpent: 32450.75
  },
  {
    id: '5',
    name: 'Diesel Truck',
    contactName: 'Marcos Souza',
    phone: '(11) 92345-6789',
    email: 'marcos@dieseltruck.com.br',
    address: 'Rua Consolação, 800, São Paulo - SP',
    status: 'inactive',
    lastPurchase: '2024-12-05',
    totalPurchases: 2,
    totalSpent: 3850.00
  }
];

// Mock data for purchase history
const mockPurchaseHistory: Record<string, Sale[]> = {
  '1': [
    {
      id: 'p1',
      clientName: 'Auto Peças Silva',
      products: [
        { productId: 'prod1', name: 'Bomba de Combustível', quantity: 2, unitPrice: 1200.00 },
        { productId: 'prod2', name: 'Filtro de Combustível', quantity: 5, unitPrice: 150.00 }
      ],
      totalValue: 3150.00,
      paymentMethod: 'invoice',
      deliveryDate: '2025-05-10',
      orderNumber: 'ORD-2025-0123',
      salesPersonId: 'sp001',
      createdAt: '2025-05-05'
    },
    {
      id: 'p2',
      clientName: 'Auto Peças Silva',
      products: [
        { productId: 'prod3', name: 'Kit de Reparo de Motor', quantity: 1, unitPrice: 5000.00 }
      ],
      totalValue: 5000.00,
      paymentMethod: 'credit',
      deliveryDate: '2025-04-15',
      orderNumber: 'ORD-2025-0098',
      salesPersonId: 'sp001',
      createdAt: '2025-04-10'
    }
  ],
  '2': [
    {
      id: 'p3',
      clientName: 'Transportes Rápidos',
      products: [
        { productId: 'prod4', name: 'Injetores', quantity: 6, unitPrice: 800.00 },
        { productId: 'prod5', name: 'Óleo de Motor 20L', quantity: 3, unitPrice: 350.00 }
      ],
      totalValue: 6050.00,
      paymentMethod: 'transfer',
      deliveryDate: '2025-05-05',
      orderNumber: 'ORD-2025-0115',
      salesPersonId: 'sp002',
      createdAt: '2025-04-28'
    }
  ]
};

const SalespersonClientsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('active');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Filter clients based on search term and active/inactive status
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === 'all' || client.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });

  // Sort clients based on selected sort option
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
        return new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime();
      case 'value':
        return b.totalSpent - a.totalSpent;
      default:
        return 0;
    }
  });

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Clientes</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="active">Clientes Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Clientes Inativos</TabsTrigger>
              <TabsTrigger value="all">Todos os Clientes</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="recent">Compra Recente</SelectItem>
                  <SelectItem value="value">Valor Total</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="active" className="mt-0">
            <ClientsTable 
              clients={sortedClients.filter(client => client.status === 'active')}
              onSelectClient={(id) => setSelectedClientId(id)}
              selectedClientId={selectedClientId}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <ClientsTable 
              clients={sortedClients.filter(client => client.status === 'inactive')}
              onSelectClient={(id) => setSelectedClientId(id)}
              selectedClientId={selectedClientId}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <ClientsTable 
              clients={sortedClients}
              onSelectClient={(id) => setSelectedClientId(id)}
              selectedClientId={selectedClientId}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>

        {selectedClientId && (
          <ClientDetails 
            client={mockClients.find(c => c.id === selectedClientId)!}
            purchaseHistory={mockPurchaseHistory[selectedClientId] || []}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            onClose={() => setSelectedClientId(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

interface ClientsTableProps {
  clients: typeof mockClients;
  onSelectClient: (id: string) => void;
  selectedClientId: string | null;
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
}

const ClientsTable = ({ clients, onSelectClient, selectedClientId, formatCurrency, formatDate }: ClientsTableProps) => {
  if (clients.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <UserRound className="h-12 w-12 text-gray-400" />
          <p className="mt-2 text-lg font-medium">Nenhum cliente encontrado</p>
          <p className="text-sm text-gray-500">
            Tente ajustar seus filtros ou termos de busca
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead className="hidden md:table-cell">Última Compra</TableHead>
            <TableHead className="hidden lg:table-cell">Total de Compras</TableHead>
            <TableHead className="text-right">Valor Total</TableHead>
            <TableHead className="w-16 text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow 
              key={client.id} 
              className={selectedClientId === client.id ? "bg-muted" : ""}
              onClick={() => onSelectClient(client.id)}
            >
              <TableCell>
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-muted-foreground hidden sm:block">
                  {client.status === 'active' ? 
                    <span className="text-green-600">Ativo</span> : 
                    <span className="text-gray-500">Inativo</span>}
                </div>
              </TableCell>
              <TableCell>
                <div>{client.contactName}</div>
                <div className="text-sm text-muted-foreground hidden sm:block">{client.phone}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(client.lastPurchase)}</TableCell>
              <TableCell className="hidden lg:table-cell">{client.totalPurchases}</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(client.totalSpent)}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectClient(client.id);
                  }}
                >
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

interface ClientDetailsProps {
  client: typeof mockClients[0];
  purchaseHistory: Sale[];
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
  onClose: () => void;
}

const ClientDetails = ({ client, purchaseHistory, formatCurrency, formatDate, onClose }: ClientDetailsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{client.name}</CardTitle>
            <CardDescription>
              {client.status === 'active' ? 
                <span className="text-green-600">Cliente Ativo</span> : 
                <span className="text-gray-500">Cliente Inativo</span>}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>Fechar</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Informações de Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-gray-500" />
                <span>{client.contactName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 13v3a5 5 0 0 1-5 5h-5" />
                </svg>
                <span>{client.email}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Endereço</h3>
            <p>{client.address}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Histórico de Compras</h3>
          {purchaseHistory.length > 0 ? (
            <div className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <Card key={purchase.id}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{formatDate(purchase.createdAt)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Pedido:</span> {purchase.orderNumber}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="space-y-2">
                      {purchase.products.map((product) => (
                        <div key={product.productId} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <div>
                              <div>{product.name}</div>
                              <div className="text-sm text-gray-500">
                                {product.quantity} x {formatCurrency(product.unitPrice)}
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(product.quantity * product.unitPrice)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between border-t mt-4 pt-3">
                      <div>
                        <div className="text-sm text-gray-500">Forma de pagamento</div>
                        <div className="font-medium">
                          {purchase.paymentMethod === 'cash' && 'Dinheiro'}
                          {purchase.paymentMethod === 'credit' && 'Cartão de Crédito'}
                          {purchase.paymentMethod === 'debit' && 'Cartão de Débito'}
                          {purchase.paymentMethod === 'transfer' && 'Transferência'}
                          {purchase.paymentMethod === 'invoice' && 'Boleto'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Data de entrega</div>
                        <div className="font-medium">{formatDate(purchase.deliveryDate)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="font-medium text-lg">{formatCurrency(purchase.totalValue)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md">
              <Package className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600">Nenhum histórico de compra disponível</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalespersonClientsPage;
