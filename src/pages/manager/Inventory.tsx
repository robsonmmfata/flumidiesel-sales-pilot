import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Filter, Settings, Droplet, Wrench } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock inventory data
const inventoryData = [
  { 
    id: 1, 
    code: 'FLU-9001', 
    name: 'Filtro de Combustível Diesel', 
    category: 'Filtros', 
    quantity: 156, 
    unitPrice: 85.90, 
    status: 'Em estoque'
  },
  { 
    id: 2, 
    code: 'FLU-9002', 
    name: 'Filtro de Ar Motor', 
    category: 'Filtros', 
    quantity: 89, 
    unitPrice: 120.50, 
    status: 'Em estoque'
  },
  { 
    id: 3, 
    code: 'FLU-5001', 
    name: 'Bico Injetor Eletrônico', 
    category: 'Injetores', 
    quantity: 45, 
    unitPrice: 320.00, 
    status: 'Em estoque'
  },
  { 
    id: 4, 
    code: 'FLU-5002', 
    name: 'Bico Injetor Mecânico', 
    category: 'Injetores', 
    quantity: 18, 
    unitPrice: 280.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 5, 
    code: 'FLU-7001', 
    name: 'Bomba de Combustível Elétrica', 
    category: 'Bombas', 
    quantity: 12, 
    unitPrice: 450.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 6, 
    code: 'FLU-7002', 
    name: 'Bomba de Combustível Mecânica', 
    category: 'Bombas', 
    quantity: 0, 
    unitPrice: 380.00, 
    status: 'Sem estoque'
  },
  { 
    id: 7, 
    code: 'FLU-3001', 
    name: 'Óleo Lubrificante Motor 15W40', 
    category: 'Lubrificantes', 
    quantity: 210, 
    unitPrice: 32.90, 
    status: 'Em estoque'
  },
  { 
    id: 8, 
    code: 'FLU-3002', 
    name: 'Aditivo para Diesel', 
    category: 'Lubrificantes', 
    quantity: 85, 
    unitPrice: 45.50, 
    status: 'Em estoque'
  },
  { 
    id: 9, 
    code: 'FLU-2001', 
    name: 'Kit Manutenção Preventiva', 
    category: 'Kits', 
    quantity: 6, 
    unitPrice: 690.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 10, 
    code: 'FLU-2002', 
    name: 'Kit Manutenção Completa', 
    category: 'Kits', 
    quantity: 3, 
    unitPrice: 1250.00, 
    status: 'Estoque baixo'
  },
];

const ManagerInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Apply filters to inventory data
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Get unique categories and statuses for filters
  const categories = [...new Set(inventoryData.map(item => item.category))];
  const statuses = [...new Set(inventoryData.map(item => item.status))];
  
  // Calculate inventory stats
  const totalProducts = inventoryData.length;
  const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = inventoryData.filter(item => item.status === 'Estoque baixo').length;
  const outOfStockCount = inventoryData.filter(item => item.status === 'Sem estoque').length;

  const getStockIcon = (category) => {
    switch (category) {
      case 'Filtros': return <Filter className="h-5 w-5" />;
      case 'Injetores': return <Settings className="h-5 w-5" />;
      case 'Bombas': return <Package className="h-5 w-5" />;
      case 'Lubrificantes': return <Droplet className="h-5 w-5" />;
      case 'Kits': return <Wrench className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Em estoque': 
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Em estoque</Badge>;
      case 'Estoque baixo': 
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Estoque baixo</Badge>;
      case 'Sem estoque': 
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Sem estoque</Badge>;
      default: 
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Visualização de Estoque</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                SKUs cadastrados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Itens em Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Unidades disponíveis
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockCount}</div>
              <p className="text-xs text-muted-foreground">
                Produtos para repor
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sem Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outOfStockCount}</div>
              <p className="text-xs text-muted-foreground">
                Produtos esgotados
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produtos em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nome ou código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Preço Unit.</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStockIcon(item.category)}
                            <span>{item.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(item.unitPrice)}
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(item.status)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum produto encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerInventoryPage;
