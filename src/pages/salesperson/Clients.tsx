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
import { Client, Sale } from '@/models/types';
import { Search, UserRound, Package, Calendar, Phone, Mail, MapPin } from 'lucide-react';

// Imported client list from the spreadsheet data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'VALLE SUL INVESTIMENTO E URBANIZAÇÃO LTDA',
    email: 'heraldojoseletobaria@hotmail.com',
    address: 'AV. BELEM N.23 QUADRA07',
    complement: 'AV. BELEM N.23 QUADRA07',
    neighborhood: 'PARQUE BELEM',
    city: 'ANGRA DOS REIS',
    state: 'RJ',
    number: '0',
    phone: '(24)3365-1441',
    cellphone: '23900-000',
    zipCode: '23900-000',
    status: 'active',
    lastPurchase: '2025-05-10',
    totalPurchases: 12,
    totalSpent: 28500.50
  },
  {
    id: '2',
    name: 'TRANSPORTADORA 3D DE SÃO JOÃO LTDA',
    email: 'rodrigotransportadora3d@gmail.com',
    address: 'ROD BR 393 KM 127',
    neighborhood: 'CENTRO',
    city: 'SAPUCAIA',
    state: 'RJ',
    phone: '27711188',
    cellphone: '992634613',
    zipCode: '25880-000',
    status: 'active',
    lastPurchase: '2025-05-05',
    totalPurchases: 8,
    totalSpent: 15780.25
  },
  {
    id: '3',
    name: 'TOP-RIO COM. E SERV. LTDA.',
    email: 'toprio@globo.com',
    address: 'RUA MOIACA',
    neighborhood: 'BRAS DE PINA',
    city: 'RIO DE JANEIRO',
    state: 'RJ',
    phone: '22601026',
    cellphone: '922601026',
    zipCode: '21011-210',
    status: 'active',
    lastPurchase: '2025-04-20',
    totalPurchases: 15,
    totalSpent: 32450.75
  },
  {
    id: '4',
    name: 'VIACAO CIDADE DO ACO LTDA',
    email: 'nfe@cidadedoaco.com.br',
    address: 'RODOVIA PRESIDENTE DUTRA',
    complement: 'ROD PRES DUTRA KM 269',
    neighborhood: 'VILA PRINCIPAL',
    city: 'BARRA MANSA',
    state: 'RJ',
    phone: '21064022',
    cellphone: '974026556',
    zipCode: '27338000',
    status: 'active',
    lastPurchase: '2025-05-12',
    totalPurchases: 10,
    totalSpent: 22450.00
  },
  {
    id: '5',
    name: 'P.S.RECAUCHUTADORA LTDA',
    email: 'psrecauchutadorabm@gmail.com',
    address: 'RUA GUILHERME MARCONDES',
    neighborhood: 'MONTE CRISTO',
    city: 'BARRA MANSA',
    state: 'RJ',
    phone: '33223275',
    zipCode: '27343050',
    status: 'inactive',
    lastPurchase: '2024-12-05',
    totalPurchases: 2,
    totalSpent: 3850.00
  },
  {
    id: '6',
    name: 'SAV RUBBER DA PENHA COM. DE ART.BOR.LTDA',
    email: 'toprio@globo.com',
    address: 'RUA MOIACA',
    neighborhood: 'BRAS DE PINA',
    city: 'RIO DE JANEIRO',
    state: 'RJ',
    phone: '78958454',
    cellphone: '970328955',
    zipCode: '21011-210',
    status: 'active',
    lastPurchase: '2025-05-01',
    totalPurchases: 5,
    totalSpent: 12750.00
  },
  {
    id: '7',
    name: 'VIACAO BARRA DO PIRAI TURISMO EIRELI',
    email: 'manutenoao@vbp.com.br',
    address: 'AV VER CHEQUER EL&S.1.429 0',
    neighborhood: 'STA.HELENA',
    city: 'Barra do Piraí',
    state: 'RJ',
    phone: '99672892',
    cellphone: '999672892',
    zipCode: '27120-271',
    status: 'active',
    lastPurchase: '2025-04-15',
    totalPurchases: 7,
    totalSpent: 18900.00
  },
  {
    id: '8',
    name: 'VIAÇÃO RESENDENSE INTERMUNICIPAL LTDA',
    email: 'almoxarifado@resendense.com.br',
    address: 'RUA TENENTE CORONEL ADALBERTO MENDES',
    neighborhood: 'MANEJO',
    city: 'RESENDE',
    state: 'RJ',
    phone: '33231309',
    cellphone: '998486106',
    zipCode: '27520302',
    status: 'inactive',
    lastPurchase: '2024-11-20',
    totalPurchases: 3,
    totalSpent: 8750.00
  },
  {
    id: '9',
    name: 'TRANSPORTES TONATTO LTDA',
    email: 'donizete@transportetonatto.com.br/angela',
    address: 'RODOVIA PRESIDENTE VARGAS',
    complement: 'ROD. PRESID. VARGAS N. 871, MONTE CRISTO',
    neighborhood: 'MONTE CRISTO',
    city: 'BARRA MANSA',
    state: 'RJ',
    phone: '33233032',
    zipCode: '27343191',
    status: 'active',
    lastPurchase: '2025-05-08',
    totalPurchases: 6,
    totalSpent: 14500.00
  }
];

// Mock data for purchase history
const mockPurchaseHistory: Record<string, Sale[]> = {
  '1': [
    {
      id: 'p1',
      clientName: 'VALLE SUL INVESTIMENTO E URBANIZAÇÃO LTDA',
      products: [
        { productId: 'prod1', name: 'Bomba de Combustível', quantity: 2, unitPrice: 1200.00 },
        { productId: 'prod2', name: 'Filtro de Combustível', quantity: 5, unitPrice: 150.00 }
      ],
      totalValue: 3150.00,
      paymentMethod: 'invoice',
      deliveryDate: '2025-05-10',
      date: new Date().toISOString(), // Add this line
      orderNumber: 'ORD-2025-0123',
      salesPersonId: 'sp001',
      createdAt: '2025-05-05'
    },
    {
      id: 'p2',
      clientName: 'VALLE SUL INVESTIMENTO E URBANIZAÇÃO LTDA',
      products: [
        { productId: 'prod3', name: 'Kit de Reparo de Motor', quantity: 1, unitPrice: 5000.00 }
      ],
      totalValue: 5000.00,
      paymentMethod: 'credit',
      deliveryDate: '2025-04-15',
      date: new Date().toISOString(), // Add this line
      orderNumber: 'ORD-2025-0098',
      salesPersonId: 'sp001',
      createdAt: '2025-04-10'
    }
  ],
  '2': [
    {
      id: 'p3',
      clientName: 'TRANSPORTADORA 3D DE SÃO JOÃO LTDA',
      products: [
        { productId: 'prod4', name: 'Injetores', quantity: 6, unitPrice: 800.00 },
        { productId: 'prod5', name: 'Óleo de Motor 20L', quantity: 3, unitPrice: 350.00 }
      ],
      totalValue: 6050.00,
      paymentMethod: 'transfer',
      deliveryDate: '2025-05-05',
      date: new Date().toISOString(), // Add this line
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
                          (client.contactName && client.contactName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = activeTab === 'all' || client.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });

  // Sort clients based on selected sort option
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
        return new Date(b.lastPurchase || '').getTime() - new Date(a.lastPurchase || '').getTime();
      case 'value':
        return (b.totalSpent || 0) - (a.totalSpent || 0);
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
  clients: Client[];
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
                <div>{client.contactName || client.email.split('@')[0]}</div>
                <div className="text-sm text-muted-foreground hidden sm:block">{client.phone}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{client.lastPurchase ? formatDate(client.lastPurchase) : '-'}</TableCell>
              <TableCell className="hidden lg:table-cell">{client.totalPurchases || 0}</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(client.totalSpent || 0)}</TableCell>
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
  client: Client;
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
              {client.contactName && (
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-gray-500" />
                  <span>{client.contactName}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{client.email}</span>
              </div>
              {client.cellphone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>Celular: {client.cellphone}</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Endereço</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p>{client.address}{client.number ? `, ${client.number}` : ''}</p>
                  {client.complement && <p>{client.complement}</p>}
                  <p>{client.neighborhood}, {client.city} - {client.state}</p>
                  <p>CEP: {client.zipCode}</p>
                </div>
              </div>
            </div>
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
