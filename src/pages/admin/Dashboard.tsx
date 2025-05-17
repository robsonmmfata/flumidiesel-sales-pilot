
import React from 'react';
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
  MapPin
} from 'lucide-react';
import { 
  mockVisits, 
  mockProspects, 
  mockSales, 
  mockScheduledVisits, 
  mockUsers,
  mockInventoryItems
} from '@/data/mockData';

const AdminDashboard = () => {
  // Calculate totals
  const totalSalesValue = mockSales.reduce((sum, sale) => sum + sale.totalValue, 0);
  const totalInventoryValue = mockInventoryItems.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const totalUsers = mockUsers.length;
  
  // Calculate low stock items
  const lowStockItems = mockInventoryItems.filter(item => item.stock <= item.minimumStock);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSalesValue)}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockSales.length} pedidos realizados
              </p>
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
              <p className="text-xs text-muted-foreground">
                {mockInventoryItems.length} produtos diferentes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Equipe</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {mockUsers.filter(u => u.role === 'salesperson').length} vendedores
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProspects.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockProspects.filter(p => p.interestLevel === 'high').length} com alto interesse
              </p>
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
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
