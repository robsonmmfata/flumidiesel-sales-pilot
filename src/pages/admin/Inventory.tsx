import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import InventoryTable from '@/components/inventory/InventoryTable';
import InventoryAnalytics from '@/components/inventory/InventoryAnalytics';
import InventoryDialogs from '@/components/inventory/InventoryDialogs';
import { useInventory } from '@/hooks/use-inventory';

// Lista de produtos atualizada
const inventoryData = [
  { 
    id: 1, 
    name: '195/75R16C 107/105R TL AGILIS 3 MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin Agilis 3 para vans e utilitários leves',
    sku: 'PNEU-001', 
    stock: 24, 
    price: 750.00,
    minimumStock: 10
  },
  { 
    id: 2, 
    name: '205/70 R 15C 106/104R TL AGILIS 3 MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin Agilis 3 para vans e utilitários',
    sku: 'PNEU-002', 
    stock: 16, 
    price: 680.00,
    minimumStock: 10
  },
  { 
    id: 3, 
    name: '205/75 R16C 113/111R TL AGILIS 3A MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin Agilis 3A para vans e furgões',
    sku: 'PNEU-003', 
    stock: 20, 
    price: 790.00,
    minimumStock: 10
  },
  { 
    id: 4, 
    name: '215/75 R 17.5 X INCITY XZU 3 TL 126/124 MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin X Incity para ônibus urbanos',
    sku: 'PNEU-004', 
    stock: 12, 
    price: 1250.00,
    minimumStock: 15
  },
  { 
    id: 5, 
    name: '215/75R17.5 S2250 TL 126/124M VM GO', 
    category: 'PNEU', 
    description: 'Pneu Goodyear para veículos de carga leves',
    sku: 'PNEU-005', 
    stock: 10, 
    price: 1180.00,
    minimumStock: 15
  },
  { 
    id: 6, 
    name: '215/75R17.5 RT TL 126/124M VU RO', 
    category: 'PNEU', 
    description: 'Pneu Roadone para veículos utilitários',
    sku: 'PNEU-006', 
    stock: 0, 
    price: 1150.00,
    minimumStock: 15
  },
  { 
    id: 7, 
    name: '225/65R16C 112/110R TL AGILIS 3 DT MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin Agilis 3 para vans comerciais',
    sku: 'PNEU-007', 
    stock: 18, 
    price: 720.00,
    minimumStock: 10
  },
  { 
    id: 8, 
    name: '225/70 R 15C 112/110R TL AGILIS 3 MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin Agilis 3 para vans de carga',
    sku: 'PNEU-008', 
    stock: 15, 
    price: 690.00,
    minimumStock: 10
  },
  { 
    id: 9, 
    name: '225/75 R 16C 118/116R TL AGILIS 3 MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin Agilis 3 para veículos comerciais',
    sku: 'PNEU-009', 
    stock: 8, 
    price: 810.00,
    minimumStock: 10
  },
  { 
    id: 10, 
    name: '235/75R17.5 XMZ TL 132/130M MI', 
    category: 'PNEU', 
    description: 'Pneu Michelin XMZ para caminhões médios',
    sku: 'PNEU-010', 
    stock: 6, 
    price: 1320.00,
    minimumStock: 8
  },
  { 
    id: 11, 
    name: '275/70R22.5 X MULTI D TL 152/148 VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multi D para eixo motriz',
    sku: 'PNEU-011', 
    stock: 14, 
    price: 1650.00,
    minimumStock: 8
  },
  { 
    id: 12, 
    name: '275/80R22.5 ST250 TL 149/146L VG GO', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Goodyear para caminhões pesados',
    sku: 'PNEU-012', 
    stock: 12, 
    price: 1580.00,
    minimumStock: 8
  },
  { 
    id: 13, 
    name: '275/80R22.5 X INCITY Z TL 149/146 VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Incity Z para ônibus urbanos',
    sku: 'PNEU-013', 
    stock: 10, 
    price: 1620.00,
    minimumStock: 8
  },
  { 
    id: 14, 
    name: '275/80R22.5 X MULTI Z TL 149/146L VM MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multi Z para uso misto',
    sku: 'PNEU-014', 
    stock: 5, 
    price: 1640.00,
    minimumStock: 8
  },
  { 
    id: 15, 
    name: '275/80R22.5 X MULTI Z TL 149/146L VM MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multi Z para uso misto',
    sku: 'PNEU-015', 
    stock: 3, 
    price: 1640.00,
    minimumStock: 8
  },
  { 
    id: 16, 
    name: '295/80R22.5 DR550 TL 152/148L VG GO', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Goodyear DR550 para longas distâncias',
    sku: 'PNEU-016', 
    stock: 7, 
    price: 1720.00,
    minimumStock: 6
  },
  { 
    id: 17, 
    name: '295/80R22.5 X MULTI D TL 152/148L VG GO', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Goodyear X Multi D para eixo de tração',
    sku: 'PNEU-017', 
    stock: 0, 
    price: 1750.00,
    minimumStock: 6
  },
  { 
    id: 18, 
    name: '295/80R22.5 X MULTI D2 TL 152/148L VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multi D2 para eixo motriz',
    sku: 'PNEU-018', 
    stock: 9, 
    price: 1780.00,
    minimumStock: 6
  },
  { 
    id: 19, 
    name: '295/80R22.5 X MULTI T TL 152/148L VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multi T para eixo de reboque',
    sku: 'PNEU-019', 
    stock: 11, 
    price: 1760.00,
    minimumStock: 6
  },
  { 
    id: 20, 
    name: '295/80R22.5 X MULTI Z2 TL 154/150L VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multi Z2 para uso misto',
    sku: 'PNEU-020', 
    stock: 8, 
    price: 1790.00,
    minimumStock: 6
  },
  { 
    id: 21, 
    name: '295/80R22.5 X MULTIWAY XZE', 
    category: 'PNEU RECAUCHUTADO', 
    description: 'Pneu recauchutado Michelin X Multiway XZE para eixo direcional',
    sku: 'PNEU-021', 
    stock: 6, 
    price: 1850.00,
    minimumStock: 6
  },
  { 
    id: 22, 
    name: 'JUEGO 5 - 11.00R20 XEZ', 
    category: 'ACESSORIOS', 
    description: 'Kit com 5 peças para pneus 11.00R20 XEZ',
    sku: 'ACESS-001', 
    stock: 15, 
    price: 90.00,
    minimumStock: 10
  },
  { 
    id: 23, 
    name: 'SEAU 3,600 KG LUBRIFIANT R5085', 
    category: 'ACESSORIOS', 
    description: 'Lubrificante para montagem de pneus, balde de 3,6kg',
    sku: 'ACESS-002', 
    stock: 20, 
    price: 150.00,
    minimumStock: 10
  },
];

// Lista de categorias de produtos
const categoriasProdutos = [
  'ACESSORIOS',
  'PNEU',
  'PNEU RECAUCHUTADO'
];

const AdminInventoryPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    sortOrder,
    selectedItem,
    setSelectedItem,
    isDialogOpen,
    setIsDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    newItem,
    sortedItems,
    handleSort,
    formatCurrency,
    handleEditItem,
    handleDeleteItem,
    handleAddNewItem
  } = useInventory(inventoryData);

  // Handle save item
  const handleSaveItem = () => {
    toast.success(`${selectedItem ? 'Produto atualizado' : 'Produto adicionado'} com sucesso!`);
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    toast.success(`Produto "${selectedItem?.name}" removido com sucesso!`);
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciamento de Estoque</h1>
          <Button onClick={handleAddNewItem} className="gap-1">
            <Plus size={16} /> Adicionar Produto
          </Button>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
            <TabsTrigger value="list">Lista de Produtos</TabsTrigger>
            <TabsTrigger value="analytics">Análise de Estoque</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4 pt-4">
            <InventoryTable 
              items={sortedItems}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortBy={sortBy}
              sortOrder={sortOrder}
              handleSort={handleSort}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <InventoryAnalytics 
              inventoryData={inventoryData}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
        </Tabs>
      </div>

      <InventoryDialogs 
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedItem={selectedItem}
        newItem={newItem}
        categoriesList={categoriasProdutos}
        handleSaveItem={handleSaveItem}
        handleConfirmDelete={handleConfirmDelete}
      />
    </DashboardLayout>
  );
};

export default AdminInventoryPage;
