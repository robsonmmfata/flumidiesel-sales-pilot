
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const ManagerProspectsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Prospecção (Gerente)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <Users className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Gerenciamento de Prospecção Regional</h2>
            <p className="text-gray-500 text-center max-w-md">
              Acompanhe e gerencie as atividades de prospecção dos vendedores da sua região.
              Analise conversões e desenvolvimento de novos negócios.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerProspectsPage;
