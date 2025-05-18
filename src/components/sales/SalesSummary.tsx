
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ClipboardCheck, Calendar } from 'lucide-react';
import { Sale } from '@/models/types';

interface SalesSummaryProps {
  sales: Sale[];
}

export const SalesSummary: React.FC<SalesSummaryProps> = ({ sales }) => {
  // Calculate summary metrics
  const totalSales = sales.length;
  const totalValue = sales.reduce((sum, sale) => sum + sale.totalValue, 0);
  
  // Count unique clients
  const uniqueClients = new Set(sales.map(sale => sale.clientName)).size;
  
  // Count unique sales people
  const uniqueSalesPeople = new Set(sales.map(sale => sale.salesPersonId)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalSales} pedidos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueClients}</div>
          <p className="text-xs text-muted-foreground">
            Clientes distintos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Vendedores</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueSalesPeople}</div>
          <p className="text-xs text-muted-foreground">
            Com vendas registradas
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Média por Venda</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue / (totalSales || 1))}
          </div>
          <p className="text-xs text-muted-foreground">
            Por pedido
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
