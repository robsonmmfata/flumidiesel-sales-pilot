
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInventoryItems } from '@/data/mockData';
import { Search, Tag, Package, AlertCircle, Check, Edit, Trash, Plus, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const AdminInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    sku: '',
    price: 0,
    stock: 0,
    minimumStock: 0,
    category: ''
  });

  // Extract unique categories from inventory items
  const categories = ['all', ...Array.from(new Set(mockInventoryItems.map(item => item.category)))];

  // Filter inventory items based on search term and category
  const filteredItems = mockInventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    let compareResult = 0;
    
    if (sortBy === 'name') {
      compareResult = a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      compareResult = a.price - b.price;
    } else if (sortBy === 'stock') {
      compareResult = a.stock - b.stock;
    } else if (sortBy === 'category') {
      compareResult = a.category.localeCompare(b.category);
    }
    
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Function to determine stock level badge color
  const getStockLevelBadge = (stock: number, minimumStock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" /> Sem estoque
        </Badge>
      );
    } else if (stock <= minimumStock) {
      return (
        <Badge variant="secondary" className="gap-1 bg-yellow-500 text-white hover:bg-yellow-600">
          <AlertCircle className="h-3 w-3" /> Baixo
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="gap-1 bg-green-500 text-white hover:bg-green-600">
          <Check className="h-3 w-3" /> Em estoque
        </Badge>
      );
    }
  };

  // Format price function
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Handle item edit
  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  // Handle item delete
  const handleDeleteItem = (item: any) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Handle save item
  const handleSaveItem = () => {
    toast.success(`${selectedItem ? 'Produto atualizado' : 'Produto adicionado'} com sucesso!`);
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    toast.success(`Produto "${selectedItem.name}" removido com sucesso!`);
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  // Handle new item
  const handleAddNewItem = () => {
    setSelectedItem(null);
    setNewItem({
      name: '',
      description: '',
      sku: '',
      price: 0,
      stock: 0,
      minimumStock: 0,
      category: ''
    });
    setIsDialogOpen(true);
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
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Buscar produtos por nome, descrição ou SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-64">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'Todas as categorias' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table View */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center">
                            Produto
                            {sortBy === 'name' && (
                              <ArrowUpDown size={16} className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('category')}
                        >
                          <div className="flex items-center">
                            Categoria
                            {sortBy === 'category' && (
                              <ArrowUpDown size={16} className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('price')}
                        >
                          <div className="flex items-center">
                            Preço
                            {sortBy === 'price' && (
                              <ArrowUpDown size={16} className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('stock')}
                        >
                          <div className="flex items-center">
                            Estoque
                            {sortBy === 'stock' && (
                              <ArrowUpDown size={16} className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="bg-gray-100">
                              <Tag className="h-3 w-3 mr-1" /> {item.category}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.stock} unidades
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStockLevelBadge(item.stock, item.minimumStock)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item)} className="text-red-500 hover:text-red-700">
                              <Trash size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Valor total em estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(mockInventoryItems.reduce((sum, item) => sum + (item.price * item.stock), 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockInventoryItems.length} produtos diferentes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Itens sem estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockInventoryItems.filter(item => item.stock === 0).length}
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
                    {mockInventoryItems.filter(item => item.stock > 0 && item.stock <= item.minimumStock).length}
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
                {mockInventoryItems.filter(item => item.stock <= item.minimumStock).length > 0 ? (
                  <div className="space-y-4">
                    {mockInventoryItems
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
          </TabsContent>
        </Tabs>
      </div>

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
                    {categories
                      .filter(category => category !== 'all')
                      .map(category => (
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
    </DashboardLayout>
  );
};

export default AdminInventoryPage;
