
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InventoryItem {
  id?: number;
  name: string;
  category: string;
  description: string;
  sku: string;
  stock: number;
  price: number;
  minimumStock: number;
}

interface InventoryDialogsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  selectedItem: InventoryItem | null;
  newItem: InventoryItem;
  categoriesList: string[];
  handleSaveItem: () => void;
  handleConfirmDelete: () => void;
}

const InventoryDialogs: React.FC<InventoryDialogsProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedItem,
  newItem,
  categoriesList,
  handleSaveItem,
  handleConfirmDelete
}) => {
  return (
    <>
      {/* Edit/Add Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedItem ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="name" className="text-sm font-medium">Nome do Produto</label>
              <Input 
                id="name" 
                defaultValue={selectedItem ? selectedItem.name : newItem.name}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input 
                id="description" 
                defaultValue={selectedItem ? selectedItem.description : newItem.description}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="sku" className="text-sm font-medium">SKU</label>
                <Input 
                  id="sku" 
                  defaultValue={selectedItem ? selectedItem.sku : newItem.sku}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="category" className="text-sm font-medium">Categoria</label>
                <Select defaultValue={selectedItem ? selectedItem.category : newItem.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesList.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="price" className="text-sm font-medium">Preço (R$)</label>
                <Input 
                  id="price" 
                  type="number" 
                  defaultValue={selectedItem ? selectedItem.price : newItem.price}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="stock" className="text-sm font-medium">Estoque</label>
                <Input 
                  id="stock" 
                  type="number" 
                  defaultValue={selectedItem ? selectedItem.stock : newItem.stock}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="minStock" className="text-sm font-medium">Estoque Mín.</label>
                <Input 
                  id="minStock" 
                  type="number" 
                  defaultValue={selectedItem ? selectedItem.minimumStock : newItem.minimumStock}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveItem}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza que deseja excluir o produto "{selectedItem?.name}"? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryDialogs;
