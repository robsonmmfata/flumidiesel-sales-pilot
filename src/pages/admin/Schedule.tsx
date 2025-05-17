
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const AdminSchedulePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Agenda (Admin)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <Calendar className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Gerenciamento de Agendas</h2>
            <p className="text-gray-500 text-center max-w-md">
              Aqui você pode visualizar e gerenciar as agendas de todos os vendedores.
              Monitore compromissos e otimize a distribuição de tarefas da equipe.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSchedulePage;
