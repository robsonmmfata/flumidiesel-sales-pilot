
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const SalespersonSalesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Vendas</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <TrendingUp className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Funcionalidade em Desenvolvimento</h2>
            <p className="text-gray-500 text-center max-w-md">
              A funcionalidade de registro de vendas está sendo implementada e estará disponível em breve. 
              Aqui você poderá registrar suas vendas, emitir pedidos e acompanhar o status das entregas.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonSalesPage;
