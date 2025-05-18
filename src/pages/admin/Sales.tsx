
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { mockSales } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { SalesTable } from '@/components/sales/SalesTable';
import { SalesChart } from '@/components/sales/SalesChart';
import { SalesByRegionChart } from '@/components/sales/SalesByRegionChart';
import { SalesSummary } from '@/components/sales/SalesSummary';
import { SalesTrendCard } from '@/components/sales/SalesTrendCard';
import { ClientHeatmapCard } from '@/components/sales/ClientHeatmapCard';
import { LowStockItemsCard } from '@/components/sales/LowStockItemsCard';
import { SalesPerformanceByPersonCard } from '@/components/sales/SalesPerformanceByPersonCard';

const AdminSalesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Vendas (Admin)</h1>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalesTrendCard />
          <ClientHeatmapCard />
          <LowStockItemsCard />
          <SalesPerformanceByPersonCard />
        </div>
        
        <SalesSummary sales={mockSales} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart 
            sales={mockSales}
            title="Vendas por Vendedor"
          />
          <SalesByRegionChart sales={mockSales} />
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <SalesTable sales={mockSales} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSalesPage;
