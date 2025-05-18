
import React from 'react';
import { SalesDashboardCard } from './SalesDashboardCard';
import { MapPin } from 'lucide-react';

export const ClientHeatmapCard: React.FC = () => {
  return (
    <SalesDashboardCard title="Distribuição Geográfica">
      <div className="flex flex-col items-center justify-center text-muted-foreground">
        <MapPin className="h-16 w-16 mb-2 text-primary/60" />
        <p>Mapa de calor de clientes</p>
      </div>
    </SalesDashboardCard>
  );
};
