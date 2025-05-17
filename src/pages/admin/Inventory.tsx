
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

const AdminInventoryPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Estoque (Admin)</h1>
        
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <Package className="h-16 w-16 text-flumi-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Gerenciamento de Estoque</h2>
            <p className="text-gray-500 text-center max-w-md">
              Controle completo do estoque da empresa. Cadastre produtos, 
              monitore níveis de estoque e gerencie entradas e saídas.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminInventoryPage;
