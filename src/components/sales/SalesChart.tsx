
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  Bar,
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Sale } from '@/models/types';

interface SalesChartProps {
  sales: Sale[];
  title: string;
}

// Group sales by salesperson
export const SalesChart: React.FC<SalesChartProps> = ({ sales, title }) => {
  const salesByPerson = sales.reduce((acc: Record<string, { total: number, name: string }>, sale) => {
    // Use salesPersonId as key
    const salesPersonId = sale.salesPersonId;
    const salesPersonName = sale.salesPersonName || `Vendedor ${salesPersonId}`;
    
    if (!acc[salesPersonId]) {
      acc[salesPersonId] = { 
        total: 0,
        name: salesPersonName
      };
    }
    
    acc[salesPersonId].total += sale.totalValue;
    return acc;
  }, {});
  
  // Transform to chart data format
  const chartData = Object.entries(salesByPerson).map(([id, data]) => ({
    name: data.name,
    value: data.total,
    salesPersonId: id
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('pt-BR', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      style: 'currency',
                      currency: 'BRL'
                    }).format(value)
                  }
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Vendedor
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Vendas
                              </span>
                              <span className="font-bold">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                }).format(payload[0].value as number)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-sales)" 
                  name="Valor de Vendas" 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
