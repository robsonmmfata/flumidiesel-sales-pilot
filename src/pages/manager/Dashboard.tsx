import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp,
  Users,
  ClipboardCheck,
  Calendar,
  Eye
} from 'lucide-react';
import { mockVisits, mockProspects, mockSales, mockScheduledVisits, mockUsers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import { subDays, startOfMonth, endOfMonth, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const ManagerDashboard = () => {
  const { user } = useAuth();
  
  // State for time filter
  const [period, setPeriod] = useState('month');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  
  // Dialog states for details
  const [salesDialogOpen, setSalesDialogOpen] = useState(false);
  const [visitsDialogOpen, setVisitsDialogOpen] = useState(false);
  const [prospectsDialogOpen, setProspectsDialogOpen] = useState(false);
  const [scheduledVisitsDialogOpen, setScheduledVisitsDialogOpen] = useState(false);

  // Calculate date range based on selected period
  const getFilteredDateRange = () => {
    const today = new Date();
    
    switch (period) {
      case 'today':
        return { 
          from: startOfDay(today), 
          to: endOfDay(today) 
        };
      case 'yesterday':
        const yesterday = subDays(today, 1);
        return { 
          from: startOfDay(yesterday), 
          to: endOfDay(yesterday) 
        };
      case 'week':
        return { 
          from: subDays(today, 7), 
          to: today 
        };
      case 'month':
        return { 
          from: startOfMonth(today), 
          to: today 
        };
      case 'lastmonth':
        const firstDayLastMonth = startOfMonth(subDays(startOfMonth(today), 1));
        const lastDayLastMonth = endOfMonth(firstDayLastMonth);
        return { 
          from: firstDayLastMonth, 
          to: lastDayLastMonth 
        };
      case 'custom':
        return dateRange;
      default:
        return { from: undefined, to: undefined };
    }
  };

  const currentDateRange = getFilteredDateRange();
  
  // Filter data based on the selected date range
  const filteredVisits = mockVisits.filter(visit => {
    if (!currentDateRange.from && !currentDateRange.to) return true;
    
    const visitDate = parseISO(visit.date);
    return (
      (!currentDateRange.from || visitDate >= currentDateRange.from) &&
      (!currentDateRange.to || visitDate <= currentDateRange.to)
    );
  });

  const filteredSales = mockSales.filter(sale => {
    if (!currentDateRange.from && !currentDateRange.to) return true;
    
    const saleDate = parseISO(sale.createdAt);
    return (
      (!currentDateRange.from || saleDate >= currentDateRange.from) &&
      (!currentDateRange.to || saleDate <= currentDateRange.to)
    );
  });

  const filteredProspects = mockProspects.filter(prospect => {
    if (!currentDateRange.from && !currentDateRange.to) return true;
    
    const prospectDate = parseISO(prospect.createdAt);
    return (
      (!currentDateRange.from || prospectDate >= currentDateRange.from) &&
      (!currentDateRange.to || prospectDate <= currentDateRange.to)
    );
  });

  const filteredScheduledVisits = mockScheduledVisits.filter(visit => {
    if (!currentDateRange.from && !currentDateRange.to) return visit.completed === false;
    
    const visitDate = parseISO(visit.date);
    return (
      visit.completed === false &&
      (!currentDateRange.from || visitDate >= currentDateRange.from) &&
      (!currentDateRange.to || visitDate <= currentDateRange.to)
    );
  });
  
  // Filter for salespeople that manager manages (for a real app, this would filter by region or team)
  const salespeople = mockUsers.filter(u => u.role === 'salesperson');
  
  // Calculate totals based on filtered data
  const totalVisits = filteredVisits.length;
  const totalProspects = filteredProspects.length;
  const totalSales = filteredSales.length;
  const totalSalesValue = filteredSales.reduce((sum, sale) => sum + sale.totalValue, 0);
  const scheduledVisits = filteredScheduledVisits.length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Dashboard do Gerente</h1>
          <DashboardTimeFilter 
            period={period} 
            onPeriodChange={setPeriod} 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
        
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
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {totalSales} pedidos
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center"
                  onClick={() => setSalesDialogOpen(true)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Realizadas</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisits}</div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {period === 'month' ? 'Este mês' : 'No período selecionado'}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center"
                  onClick={() => setVisitsDialogOpen(true)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProspects}</div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {filteredProspects.filter(p => p.requestedQuote).length} com orçamentos
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center"
                  onClick={() => setProspectsDialogOpen(true)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledVisits}</div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Pendentes
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center"
                  onClick={() => setScheduledVisitsDialogOpen(true)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Visitas da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredScheduledVisits.length > 0 ? (
                <div className="space-y-4">
                  {filteredScheduledVisits
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
                <p className="text-muted-foreground text-sm">Não há visitas agendadas para este período</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sales Details Dialog */}
      <Dialog open={salesDialogOpen} onOpenChange={setSalesDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes de Vendas</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.clientName}</TableCell>
                  <TableCell>{sale.orderNumber}</TableCell>
                  <TableCell>{mockUsers.find(u => u.id === sale.salesPersonId)?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.totalValue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Visits Details Dialog */}
      <Dialog open={visitsDialogOpen} onOpenChange={setVisitsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes de Visitas Realizadas</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.clientName}</TableCell>
                  <TableCell>{visit.city}</TableCell>
                  <TableCell>{mockUsers.find(u => u.id === visit.salesPersonId)?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(visit.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    {visit.result && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        visit.result === 'success' ? 'bg-green-100 text-green-800' : 
                        visit.result === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {visit.result === 'success' ? 'Sucesso' : 
                        visit.result === 'pending' ? 'Pendente' : 'Sem interesse'}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Prospects Details Dialog */}
      <Dialog open={prospectsDialogOpen} onOpenChange={setProspectsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes de Prospectos</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Orçamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>{prospect.name || prospect.clientName}</TableCell>
                  <TableCell>{prospect.company || 'N/A'}</TableCell>
                  <TableCell>{prospect.city || 'N/A'}</TableCell>
                  <TableCell>{mockUsers.find(u => u.id === prospect.salesPersonId)?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {prospect.requestedQuote ? 
                      <span className="text-green-600 font-medium">Solicitado</span> : 
                      <span className="text-gray-500">Não solicitado</span>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Scheduled Visits Details Dialog */}
      <Dialog open={scheduledVisitsDialogOpen} onOpenChange={setScheduledVisitsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes de Visitas Agendadas</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScheduledVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.clientName}</TableCell>
                  <TableCell>{visit.city}</TableCell>
                  <TableCell>{mockUsers.find(u => u.id === visit.salesPersonId)?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(visit.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{visit.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
