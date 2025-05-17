
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const AdminPromotionsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Promoções (Admin)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <TrendingUp className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Gerenciamento de Promoções</h2>
            <p className="text-gray-500 text-center max-w-md">
              Crie e gerencie campanhas promocionais para toda a equipe de vendas.
              Configure descontos, períodos de validade e produtos em promoção.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPromotionsPage;
