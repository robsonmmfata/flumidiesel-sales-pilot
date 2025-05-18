
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { mockSales } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { SalesTable } from '@/components/sales/SalesTable';
import { SalesChart } from '@/components/sales/SalesChart';
import { SalesSummary } from '@/components/sales/SalesSummary';
import { SalesDateFilter } from '@/components/sales/SalesDateFilter';

const AdminSalesPage = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [period, setPeriod] = useState<string>('all');
  
  // Filter sales based on selected date range or period
  const filteredSales = mockSales.filter(sale => {
    const saleDate = new Date(sale.createdAt);
    
    if (period !== 'all') {
      const today = new Date();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0));
      
      if (period === 'today') {
        return saleDate >= startOfToday;
      } else if (period === 'week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        return saleDate >= weekStart;
      } else if (period === 'month') {
        const monthStart = new Date(today);
        monthStart.setMonth(today.getMonth() - 1);
        return saleDate >= monthStart;
      } else if (period === 'year') {
        const yearStart = new Date(today);
        yearStart.setFullYear(today.getFullYear() - 1);
        return saleDate >= yearStart;
      }
    } else if (dateRange.from || dateRange.to) {
      if (dateRange.from && dateRange.to) {
        return saleDate >= dateRange.from && saleDate <= dateRange.to;
      } else if (dateRange.from) {
        return saleDate >= dateRange.from;
      } else if (dateRange.to) {
        return saleDate <= dateRange.to;
      }
    }
    
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vendas (Admin)</h1>
          <SalesDateFilter 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>
        
        <SalesSummary sales={filteredSales} />
        
        <div className="grid grid-cols-1 gap-6">
          <SalesChart 
            sales={filteredSales}
            title="Vendas por Vendedor"
          />
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <SalesTable sales={filteredSales} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSalesPage;
