
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const ManagerSalesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Vendas (Gerente)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <TrendingUp className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Acompanhamento de Vendas Regional</h2>
            <p className="text-gray-500 text-center max-w-md">
              Acompanhe todas as vendas realizadas pela sua equipe.
              Analise desempenho, estabeleça metas e monitore resultados.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerSalesPage;
