
import React from 'react';
import { SalesDashboardCard } from './SalesDashboardCard';
import { LineChart } from 'lucide-react';
import { mockSales } from '@/data/mockData';

export const SalesTrendCard: React.FC = () => {
  // Group sales by month and calculate total
  const monthlySales = mockSales.reduce((acc: Record<string, number>, sale) => {
    const date = new Date(sale.createdAt);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = 0;
    }
    
    acc[monthKey] += sale.totalValue;
    return acc;
  }, {});
  
  // Get total sales value
  const totalSales = Object.values(monthlySales).reduce((sum, val) => sum + val, 0);
  
  // Calculate growth
  const months = Object.keys(monthlySales).sort();
  const growth = months.length >= 2 ? 
    ((monthlySales[months[months.length-1]] / monthlySales[months[0]]) - 1) * 100 : 0;
  
  const isPositiveGrowth = growth >= 0;
  
  return (
    <SalesDashboardCard title="Desempenho de Vendas">
      {totalSales > 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <LineChart className="h-12 w-12 mb-2 text-primary/60" />
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL',
              maximumFractionDigits: 0 
            }).format(totalSales)}
          </div>
          {months.length >= 2 && (
            <div className={`text-sm font-medium mt-2 ${isPositiveGrowth ? 'text-green-500' : 'text-red-500'}`}>
              {isPositiveGrowth ? '+' : ''}{growth.toFixed(1)}% 
              <span className="text-muted-foreground ml-1">desde {months[0]}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <LineChart className="h-16 w-16 mb-2 text-primary/60" />
          <p>Gráfico de tendência de vendas</p>
        </div>
      )}
    </SalesDashboardCard>
  );
};
