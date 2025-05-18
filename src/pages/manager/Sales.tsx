
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { mockSales } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { SalesTable } from '@/components/sales/SalesTable';
import { SalesChart } from '@/components/sales/SalesChart';
import { SalesSummary } from '@/components/sales/SalesSummary';
import { useAuth } from '@/contexts/AuthContext';
import { SalesTrendCard } from '@/components/sales/SalesTrendCard';

const ManagerSalesPage = () => {
  const { user } = useAuth();
  // In a real application, we would filter sales based on the manager's region or team
  // For now, we're using all sales from mockData
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Vendas (Gerente)</h1>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalesTrendCard />
        </div>
        
        <SalesSummary sales={mockSales} />
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <SalesChart 
            sales={mockSales}
            title="Desempenho da Equipe"
          />
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

export default ManagerSalesPage;
