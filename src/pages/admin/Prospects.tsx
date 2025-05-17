
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminProspectsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Prospecção (Admin)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <Users className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Gerenciamento de Prospecção</h2>
            <p className="text-gray-500 text-center max-w-md">
              Visualize todos os leads e prospecções em andamento pela equipe de vendas.
              Monitore conversões e efetividade das estratégias comerciais.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminProspectsPage;
