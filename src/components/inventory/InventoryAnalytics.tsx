
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  description: string;
  sku: string;
  stock: number;
  price: number;
  minimumStock: number;
}

interface InventoryAnalyticsProps {
  inventoryData: InventoryItem[];
  formatCurrency: (value: number) => string;
}

const InventoryAnalytics: React.FC<InventoryAnalyticsProps> = ({
  inventoryData,
  formatCurrency
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor total em estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(inventoryData.reduce((sum, item) => sum + (item.price * item.stock), 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              {inventoryData.length} produtos diferentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Itens sem estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.filter(item => item.stock === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Produtos que precisam ser repostos imediatamente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Itens com estoque baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.filter(item => item.stock > 0 && item.stock <= item.minimumStock).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Produtos abaixo do nível mínimo de estoque
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Itens com Estoque Crítico</CardTitle>
        </CardHeader>
        <CardContent>
          {inventoryData.filter(item => item.stock <= item.minimumStock).length > 0 ? (
            <div className="space-y-4">
              {inventoryData
                .filter(item => item.stock <= item.minimumStock)
                .map(item => (
                  <div key={item.id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${item.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                        {item.stock} em estoque
                      </p>
                      <p className="text-sm text-muted-foreground">Mínimo: {item.minimumStock}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Não há itens com estoque crítico</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Gerar Relatório de Estoque</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InventoryAnalytics;
