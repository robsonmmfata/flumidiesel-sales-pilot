
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp,
  Users,
  ClipboardCheck,
  Calendar,
  Package,
  BarChart,
  LineChart,
  MapPin,
  Eye
} from 'lucide-react';
import { 
  mockVisits, 
  mockProspects, 
  mockSales, 
  mockScheduledVisits, 
  mockUsers,
  mockInventoryItems
} from '@/data/mockData';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AdminDashboard = () => {
  // Time filter state
  const [period, setPeriod] = useState('month');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  // Dialog states for details
  const [salesDialogOpen, setSalesDialogOpen] = useState(false);
  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);
  const [usersDialogOpen, setUsersDialogOpen] = useState(false);
  const [prospectsDialogOpen, setProspectsDialogOpen] = useState(false);

  // Calculate totals
  const totalSalesValue = mockSales.reduce((sum, sale) => sum + sale.totalValue, 0);
  const totalInventoryValue = mockInventoryItems.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const totalUsers = mockUsers.length;
  
  // Calculate low stock items
  const lowStockItems = mockInventoryItems.filter(item => item.stock <= item.minimumStock);

  // Filter data based on selected period
  const getFilteredData = () => {
    const now = new Date();
    let filterDate = new Date();
    
    switch (period) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'yesterday':
        filterDate.setDate(filterDate.getDate() - 1);
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        filterDate.setDate(filterDate.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(filterDate.getMonth() - 1);
        break;
      case 'lastmonth':
        filterDate.setMonth(filterDate.getMonth() - 1);
        filterDate = new Date(filterDate.getFullYear(), filterDate.getMonth(), 1);
        now.setDate(0); // Last day of previous month
        break;
      case 'custom':
        return {
          sales: mockSales.filter(sale => {
            const saleDate = new Date(sale.date);
            return (!dateRange.from || saleDate >= dateRange.from) && 
                   (!dateRange.to || saleDate <= dateRange.to);
          }),
          prospects: mockProspects.filter(prospect => {
            const createdDate = new Date(prospect.createdAt);
            return (!dateRange.from || createdDate >= dateRange.from) && 
                   (!dateRange.to || createdDate <= dateRange.to);
          }),
          lowStockItems: lowStockItems
        };
      case 'all':
      default:
        return {
          sales: mockSales,
          prospects: mockProspects,
          lowStockItems: lowStockItems
        };
    }

    // For non-custom periods
    if (period === 'lastmonth') {
      return {
        sales: mockSales.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate >= filterDate && saleDate <= now;
        }),
        prospects: mockProspects.filter(prospect => {
          const createdDate = new Date(prospect.createdAt);
          return createdDate >= filterDate && createdDate <= now;
        }),
        lowStockItems: lowStockItems
      };
    } else {
      return {
        sales: mockSales.filter(sale => new Date(sale.date) >= filterDate),
        prospects: mockProspects.filter(prospect => new Date(prospect.createdAt) >= filterDate),
        lowStockItems: lowStockItems
      };
    }
  };

  const filteredData = getFilteredData();

  // Calculate filtered totals
  const filteredSalesTotal = filteredData.sales.reduce((sum, sale) => sum + sale.totalValue, 0);
  const filteredProspectsCount = filteredData.prospects.length;
  const highInterestProspects = filteredData.prospects.filter(p => p.interestLevel === 'high').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        
        {/* Time Filter */}
        <DashboardTimeFilter
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          period={period}
          onPeriodChange={setPeriod}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filteredSalesTotal)}
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {filteredData.sales.length} pedidos realizados
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setSalesDialogOpen(true)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Valor do Estoque</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalInventoryValue)}
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {mockInventoryItems.length} produtos diferentes
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setInventoryDialogOpen(true)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Equipe</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {mockUsers.filter(u => u.role === 'salesperson').length} vendedores
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setUsersDialogOpen(true)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredProspectsCount}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {highInterestProspects} com alto interesse
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setProspectsDialogOpen(true)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[250px] items-center justify-center">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <LineChart className="h-12 w-12" />
                  <div>Gráfico de tendência de vendas</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribuição Geográfica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[250px] items-center justify-center">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-12 w-12" />
                  <div>Mapa de calor de clientes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Itens com Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockItems.length > 0 ? (
                <div className="space-y-4">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${item.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                          {item.stock} em estoque
                        </p>
                        <p className="text-sm text-muted-foreground">Mínimo: {item.minimumStock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Não há itens com estoque baixo</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[250px] items-center justify-center">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <BarChart className="h-12 w-12" />
                  <div>Gráfico de vendas por vendedor</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Dialogs */}
        <Dialog open={salesDialogOpen} onOpenChange={setSalesDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes das Vendas</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Cliente</th>
                      <th className="py-2 text-left font-medium">Data</th>
                      <th className="py-2 text-left font-medium">Vendedor</th>
                      <th className="py-2 text-right font-medium">Valor</th>
                      <th className="py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.sales.map((sale) => (
                      <tr key={sale.id} className="border-b">
                        <td className="py-2">{sale.clientName}</td>
                        <td className="py-2">{format(new Date(sale.date), 'dd/MM/yyyy', { locale: ptBR })}</td>
                        <td className="py-2">{sale.salespersonName}</td>
                        <td className="py-2 text-right">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.totalValue)}
                        </td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            sale.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {sale.status === 'completed' ? 'Concluída' : 
                             sale.status === 'pending' ? 'Pendente' : sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={inventoryDialogOpen} onOpenChange={setInventoryDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Estoque</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Produto</th>
                      <th className="py-2 text-left font-medium">SKU</th>
                      <th className="py-2 text-center font-medium">Estoque</th>
                      <th className="py-2 text-center font-medium">Mínimo</th>
                      <th className="py-2 text-right font-medium">Preço Unit.</th>
                      <th className="py-2 text-right font-medium">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInventoryItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.sku}</td>
                        <td className={`py-2 text-center ${item.stock <= item.minimumStock ? 'text-red-600 font-medium' : ''}`}>
                          {item.stock}
                        </td>
                        <td className="py-2 text-center">{item.minimumStock}</td>
                        <td className="py-2 text-right">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                        </td>
                        <td className="py-2 text-right">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.stock)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={usersDialogOpen} onOpenChange={setUsersDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da Equipe</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Nome</th>
                      <th className="py-2 text-left font-medium">Email</th>
                      <th className="py-2 text-left font-medium">Função</th>
                      <th className="py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-2">{user.name}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2">
                          {user.role === 'admin' ? 'Administrador' : 
                           user.role === 'manager' ? 'Gerente' : 'Vendedor'}
                        </td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={prospectsDialogOpen} onOpenChange={setProspectsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes dos Prospectos</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Nome</th>
                      <th className="py-2 text-left font-medium">Empresa</th>
                      <th className="py-2 text-left font-medium">Cidade</th>
                      <th className="py-2 text-left font-medium">Interesse</th>
                      <th className="py-2 text-left font-medium">Vendedor</th>
                      <th className="py-2 text-left font-medium">Data de Criação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.prospects.map((prospect) => (
                      <tr key={prospect.id} className="border-b">
                        <td className="py-2">{prospect.name}</td>
                        <td className="py-2">{prospect.company}</td>
                        <td className="py-2">{prospect.city}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            prospect.interestLevel === 'high' ? 'bg-green-100 text-green-800' : 
                            prospect.interestLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {prospect.interestLevel === 'high' ? 'Alto' : 
                             prospect.interestLevel === 'medium' ? 'Médio' : 'Baixo'}
                          </span>
                        </td>
                        <td className="py-2">{prospect.salespersonName}</td>
                        <td className="py-2">{format(new Date(prospect.createdAt), 'dd/MM/yyyy', { locale: ptBR })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
