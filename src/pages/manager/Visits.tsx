
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

const ManagerVisitsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Visitas (Gerente)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <ClipboardCheck className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Acompanhamento de Visitas</h2>
            <p className="text-gray-500 text-center max-w-md">
              Visualize e monitore todas as visitas realizadas pelos vendedores da sua região.
              Analise desempenho e otimize a distribuição de rotas.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerVisitsPage;
