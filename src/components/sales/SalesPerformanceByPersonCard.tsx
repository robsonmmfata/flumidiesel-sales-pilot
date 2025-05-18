
import React from 'react';
import { SalesDashboardCard } from './SalesDashboardCard';
import { BarChart } from 'lucide-react';
import { mockSales } from '@/data/mockData';

export const SalesPerformanceByPersonCard: React.FC = () => {
  // Calculate total sales by person
  const salesByPerson = mockSales.reduce((acc: Record<string, { total: number, name: string }>, sale) => {
    const id = sale.salesPersonId;
    const name = sale.salesPersonName || `Vendedor ${id}`;
    
    if (!acc[id]) {
      acc[id] = { total: 0, name };
    }
    acc[id].total += sale.totalValue;
    return acc;
  }, {});

  // Convert to array and sort by total sales
  const topSellers = Object.values(salesByPerson)
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <SalesDashboardCard title="Desempenho por Vendedor">
      {topSellers.length > 0 ? (
        <div className="w-full space-y-3">
          {topSellers.map((seller, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium truncate max-w-[70%]">{seller.name}</span>
              <span className="text-sm font-bold">
                {new Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL',
                  maximumFractionDigits: 0 
                }).format(seller.total)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <BarChart className="h-16 w-16 mb-2 text-primary/60" />
          <p>Sem dados de vendas</p>
        </div>
      )}
    </SalesDashboardCard>
  );
};
