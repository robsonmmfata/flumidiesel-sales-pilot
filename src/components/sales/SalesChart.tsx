
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

export const SalesChart: React.FC<SalesChartProps> = ({ sales, title }) => {
  // Group sales by salesperson
  const salesByPerson = sales.reduce((acc: Record<string, { total: number, name: string }>, sale) => {
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

  // Sort data by value in descending order for better visualization
  chartData.sort((a, b) => b.value - a.value);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
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
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  padding={{ left: 10, right: 10 }}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => 
                    `R$ ${(value / 1000).toLocaleString('pt-BR')} mil`
                  }
                  tick={{ fontSize: 12 }}
                  domain={[0, 'dataMax + 10000']}
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
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Valor de Vendas"
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
