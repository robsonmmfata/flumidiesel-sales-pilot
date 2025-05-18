
import React from 'react';
import { SalesDashboardCard } from './SalesDashboardCard';
import { ChartLineUp } from 'lucide-react';

export const SalesTrendCard: React.FC = () => {
  return (
    <SalesDashboardCard title="Desempenho de Vendas">
      <div className="flex flex-col items-center justify-center text-muted-foreground">
        <ChartLineUp className="h-16 w-16 mb-2 text-primary/60" />
        <p>Gráfico de tendência de vendas</p>
      </div>
    </SalesDashboardCard>
  );
};
