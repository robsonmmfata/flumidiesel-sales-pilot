
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const ManagerSchedulePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Agenda (Gerente)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <Calendar className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Gerenciamento de Agenda Regional</h2>
            <p className="text-gray-500 text-center max-w-md">
              Gerencie as agendas dos vendedores da sua região.
              Planeje visitas, reuniões e otimize a distribuição das atividades da equipe.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerSchedulePage;
