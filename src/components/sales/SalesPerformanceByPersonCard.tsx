
import React from 'react';
import { SalesDashboardCard } from './SalesDashboardCard';
import { BarChart } from 'lucide-react';

export const SalesPerformanceByPersonCard: React.FC = () => {
  return (
    <SalesDashboardCard title="Desempenho por Vendedor">
      <div className="flex flex-col items-center justify-center text-muted-foreground">
        <BarChart className="h-16 w-16 mb-2 text-primary/60" />
        <p>Gráfico de vendas por vendedor</p>
      </div>
    </SalesDashboardCard>
  );
};
