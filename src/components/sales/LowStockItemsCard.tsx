
import React from 'react';
import { SalesDashboardCard } from './SalesDashboardCard';
import { mockInventory } from '@/data/mockData';

export const LowStockItemsCard: React.FC = () => {
  const lowStockItems = mockInventory.filter(item => item.stock <= item.minimumStock);
  
  return (
    <SalesDashboardCard title="Itens com Estoque Baixo">
      {lowStockItems.length > 0 ? (
        <div className="w-full">
          <ul className="space-y-2">
            {lowStockItems.slice(0, 5).map(item => (
              <li key={item.id} className="flex justify-between">
                <span className="text-sm truncate max-w-[70%]">{item.name}</span>
                <span className="text-sm font-medium text-amber-600">
                  {item.stock} / {item.minimumStock}
                </span>
              </li>
            ))}
            {lowStockItems.length > 5 && (
              <li className="text-sm text-muted-foreground text-center pt-2">
                + {lowStockItems.length - 5} outros itens
              </li>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-muted-foreground">Não há itens com estoque baixo</p>
      )}
    </SalesDashboardCard>
  );
};
