
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp,
  Users,
  ClipboardCheck,
  Calendar,
  BarChart,
  PieChart
} from 'lucide-react';
import { mockVisits, mockProspects, mockSales, mockScheduledVisits, mockUsers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const ManagerDashboard = () => {
  const { user } = useAuth();
  
  // Filter for salespeople that manager manages (for a real app, this would filter by region or team)
  const salespeople = mockUsers.filter(u => u.role === 'salesperson');
  
  // Calculate totals
  const totalVisits = mockVisits.length;
  const totalProspects = mockProspects.length;
  const totalSales = mockSales.length;
  const totalSalesValue = mockSales.reduce((sum, sale) => sum + sale.totalValue, 0);
  const scheduledVisits = mockScheduledVisits.filter(v => !v.completed).length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard do Gerente</h1>
        
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
                {totalSales} pedidos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Realizadas</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisits}</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProspects}</div>
              <p className="text-xs text-muted-foreground">
                {mockProspects.filter(p => p.requestedQuote).length} com orçamentos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledVisits}</div>
              <p className="text-xs text-muted-foreground">
                Pendentes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salespeople.map(salesperson => {
                  const salesCount = mockSales.filter(s => s.salesPersonId === salesperson.id).length;
                  const salesValue = mockSales
                    .filter(s => s.salesPersonId === salesperson.id)
                    .reduce((sum, sale) => sum + sale.totalValue, 0);
                  
                  return (
                    <div key={salesperson.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{salesperson.name}</p>
                        <p className="text-sm text-muted-foreground">{salesCount} vendas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(salesValue)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cidades mais visitadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <BarChart className="h-12 w-12" />
                  <div>Gráfico de visitas por cidade</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Visitas da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              {mockScheduledVisits.filter(v => !v.completed).length > 0 ? (
                <div className="space-y-4">
                  {mockScheduledVisits
                    .filter(v => !v.completed)
                    .slice(0, 5)
                    .map(visit => {
                      const salesperson = mockUsers.find(u => u.id === visit.salesPersonId);
                      
                      return (
                        <div key={visit.id} className="flex justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{visit.clientName}</p>
                            <p className="text-sm text-muted-foreground">{visit.city} - por {salesperson?.name}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(visit.date).toLocaleDateString('pt-BR')} {visit.time}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Não há visitas agendadas</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Prospectos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <PieChart className="h-12 w-12" />
                  <div>Gráfico de prospectos por interesse</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
