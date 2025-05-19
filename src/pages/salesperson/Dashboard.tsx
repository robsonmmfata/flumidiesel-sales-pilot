
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Users,
  ClipboardCheck,
  Calendar,
} from 'lucide-react';
import { mockVisits, mockProspects, mockSales, mockScheduledVisits } from '@/data/mockData';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';

const SalespersonDashboard = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [period, setPeriod] = useState<string>('all');

  // Filter data for the current salesperson
  const userVisits = mockVisits.filter(
    (visit) => visit.salesPersonId === user?.id
  );
  const userProspects = mockProspects.filter(
    (prospect) => prospect.salesPersonId === user?.id
  );
  const userSales = mockSales.filter(
    (sale) => sale.salesPersonId === user?.id
  );
  const userScheduledVisits = mockScheduledVisits.filter(
    (visit) => visit.salesPersonId === user?.id
  );
  
  // Filter based on selected period or date range
  const filterByDate = (date: string) => {
    const itemDate = new Date(date);
    
    if (period !== 'all' && period !== 'custom') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (period === 'today') {
        return itemDate >= today;
      } else if (period === 'yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return itemDate >= yesterday && itemDate < today;
      } else if (period === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return itemDate >= weekAgo;
      } else if (period === 'month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return itemDate >= monthStart;
      } else if (period === 'lastmonth') {
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return itemDate >= lastMonthStart && itemDate < thisMonthStart;
      }
    } else if (dateRange.from || dateRange.to) {
      if (dateRange.from && dateRange.to) {
        return itemDate >= dateRange.from && itemDate <= dateRange.to;
      } else if (dateRange.from) {
        return itemDate >= dateRange.from;
      } else if (dateRange.to) {
        return itemDate <= dateRange.to;
      }
    }
    
    return true;
  };
  
  // Apply filters to the data
  const filteredSales = userSales.filter(sale => filterByDate(sale.createdAt));
  const filteredVisits = userVisits.filter(visit => filterByDate(visit.date));
  const filteredProspects = userProspects.filter(prospect => filterByDate(prospect.createdAt));
  const filteredScheduledVisits = userScheduledVisits.filter(visit => filterByDate(visit.date));

  // Calculate total sales value
  const totalSalesValue = filteredSales.reduce(
    (total, sale) => total + sale.totalValue,
    0
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard do Vendedor</h1>
        
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
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSalesValue)}
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredSales.length} pedidos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Realizadas</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredVisits.length}</div>
              <p className="text-xs text-muted-foreground">
                {period === 'month' ? 'Este mês' : 'No período'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredProspects.length}</div>
              <p className="text-xs text-muted-foreground">
                {filteredProspects.filter((p) => p.requestedQuote).length} com orçamentos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredScheduledVisits.filter((v) => !v.completed).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Pendentes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Visitas</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredScheduledVisits.filter((v) => !v.completed).length > 0 ? (
                <div className="space-y-4">
                  {filteredScheduledVisits
                    .filter((v) => !v.completed)
                    .slice(0, 5)
                    .map((visit) => (
                      <div key={visit.id} className="flex justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{visit.clientName}</p>
                          <p className="text-sm text-muted-foreground">{visit.city} - {new Date(visit.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{visit.time}</div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Não há visitas agendadas</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Últimas Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSales.length > 0 ? (
                <div className="space-y-4">
                  {filteredSales.slice(0, 5).map((sale) => (
                    <div key={sale.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{sale.clientName}</p>
                        <p className="text-sm text-muted-foreground">Pedido #{sale.orderNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.totalValue)}
                        </p>
                        <p className="text-sm text-muted-foreground">{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Não há vendas registradas</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonDashboard;
