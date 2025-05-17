
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from 'lucide-react';

const SalespersonPromotionsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Promoções</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <Tag className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Funcionalidade em Desenvolvimento</h2>
            <p className="text-gray-500 text-center max-w-md">
              A funcionalidade de promoções está sendo implementada e estará disponível em breve. 
              Aqui você poderá visualizar as promoções ativas e ofertas especiais para oferecer aos seus clientes.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonPromotionsPage;
