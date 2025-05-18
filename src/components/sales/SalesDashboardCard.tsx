
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SalesDashboardCardProps {
  title: string;
  children: ReactNode;
}

export const SalesDashboardCard: React.FC<SalesDashboardCardProps> = ({ 
  title, 
  children 
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        {children}
      </CardContent>
    </Card>
  );
};
