
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInventoryItems } from '@/data/mockData';
import { Search, Tag, Package, AlertCircle, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SalespersonInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

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

  // Function to determine stock level badge color
  const getStockLevelBadge = (quantity: number) => {
    if (quantity <= 5) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" /> Baixo
        </Badge>
      );
    } else if (quantity <= 20) {
      return (
        <Badge variant="warning" className="gap-1 bg-yellow-500 hover:bg-yellow-600">
          <AlertCircle className="h-3 w-3" /> Médio
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

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Consulta de Estoque</h1>
        </div>

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

        {/* Inventory Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {getStockLevelBadge(item.quantity)}
                  </div>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </CardHeader>
                <CardContent className="p-4 pt-3 space-y-2">
                  <div className="text-sm">{item.description}</div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="outline" className="bg-gray-100">
                      <Tag className="h-3 w-3 mr-1" /> {item.category}
                    </Badge>
                    <p className="font-medium text-lg">{formatCurrency(item.price)}</p>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Quantidade disponível:</span>
                      <span className="font-medium">{item.quantity} unidades</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center">
                <Package className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 font-medium">Nenhum produto encontrado</p>
                <p className="text-sm text-gray-500">
                  Tente ajustar seus filtros ou termos de busca.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonInventoryPage;
