
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  Cell,
  Legend,
  Tooltip
} from 'recharts';
import { Sale } from '@/models/types';

interface SalesByRegionChartProps {
  sales: Sale[];
}

export const SalesByRegionChart: React.FC<SalesByRegionChartProps> = ({ sales }) => {
  // For demo purposes, create some mock regions
  const regions = [
    { name: "Sul", color: "#60a5fa" },
    { name: "Sudeste", color: "#34d399" },
    { name: "Centro-Oeste", color: "#fbbf24" },
    { name: "Norte", color: "#f87171" },
    { name: "Nordeste", color: "#a78bfa" }
  ];
  
  // Group sales by a mock region for demo
  const salesByRegion = sales.reduce((acc: Record<string, number>, sale, index) => {
    // Assign each sale to a region based on index for demo
    const regionIndex = index % regions.length;
    const regionName = regions[regionIndex].name;
    
    if (!acc[regionName]) {
      acc[regionName] = 0;
    }
    
    acc[regionName] += sale.totalValue;
    return acc;
  }, {});
  
  // Transform to chart data format
  const chartData = Object.entries(salesByRegion).map(([region, value]) => ({
    name: region,
    value: value
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por Região</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              sales: {
                label: "Vendas",
                theme: {
                  light: "#3b82f6",
                  dark: "#60a5fa"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => {
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }}
                >
                  {chartData.map((entry, index) => {
                    const regionColor = regions.find(r => r.name === entry.name)?.color || "#8884d8";
                    return <Cell key={`cell-${index}`} fill={regionColor} />;
                  })}
                </Pie>
                <Tooltip
                  formatter={(value) => 
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(value as number)
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
