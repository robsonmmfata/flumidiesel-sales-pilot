
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

// Mock inventory data com base na imagem enviada pelo usuário
const inventoryData = [
  { 
    id: 1, 
    code: 'PNEU-001', 
    name: '195/75R16C 107/105R TL AGILIS 3 MI', 
    category: 'PNEU', 
    quantity: 24, 
    unitPrice: 750.00, 
    status: 'Em estoque'
  },
  { 
    id: 2, 
    code: 'PNEU-002', 
    name: '205/70 R 15C 106/104R TL AGILIS 3 MI', 
    category: 'PNEU', 
    quantity: 16, 
    unitPrice: 680.00, 
    status: 'Em estoque'
  },
  { 
    id: 3, 
    code: 'PNEU-003', 
    name: '205/75 R16C 113/111R TL AGILIS 3A MI', 
    category: 'PNEU', 
    quantity: 20, 
    unitPrice: 790.00, 
    status: 'Em estoque'
  },
  { 
    id: 4, 
    code: 'PNEU-004', 
    name: '215/75 R 17.5 X INCITY XZU 3 TL 126/124 MI', 
    category: 'PNEU', 
    quantity: 12, 
    unitPrice: 1250.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 5, 
    code: 'PNEU-005', 
    name: '215/75R17.5 S2250 TL 126/124M VM GO', 
    category: 'PNEU', 
    quantity: 10, 
    unitPrice: 1180.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 6, 
    code: 'PNEU-006', 
    name: '215/75R17.5 RT TL 126/124M VU RO', 
    category: 'PNEU', 
    quantity: 0, 
    unitPrice: 1150.00, 
    status: 'Sem estoque'
  },
  { 
    id: 7, 
    code: 'PNEU-007', 
    name: '225/65R16C 112/110R TL AGILIS 3 DT MI', 
    category: 'PNEU', 
    quantity: 18, 
    unitPrice: 720.00, 
    status: 'Em estoque'
  },
  { 
    id: 8, 
    code: 'PNEU-008', 
    name: '225/70 R 15C 112/110R TL AGILIS 3 MI', 
    category: 'PNEU', 
    quantity: 15, 
    unitPrice: 690.00, 
    status: 'Em estoque'
  },
  { 
    id: 9, 
    code: 'PNEU-009', 
    name: '225/75 R 16C 118/116R TL AGILIS 3 MI', 
    category: 'PNEU', 
    quantity: 8, 
    unitPrice: 810.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 10, 
    code: 'PNEU-010', 
    name: '235/75R17.5 XMZ TL 132/130M MI', 
    category: 'PNEU', 
    quantity: 6, 
    unitPrice: 1320.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 11, 
    code: 'PNEU-011', 
    name: '275/70R22.5 X MULTI D TL 152/148 VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 14, 
    unitPrice: 1650.00, 
    status: 'Em estoque'
  },
  { 
    id: 12, 
    code: 'PNEU-012', 
    name: '275/80R22.5 ST250 TL 149/146L VG GO', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 12, 
    unitPrice: 1580.00, 
    status: 'Em estoque'
  },
  { 
    id: 13, 
    code: 'PNEU-013', 
    name: '275/80R22.5 X INCITY Z TL 149/146 VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 10, 
    unitPrice: 1620.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 14, 
    code: 'PNEU-014', 
    name: '275/80R22.5 X MULTI Z TL 149/146L VM MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 5, 
    unitPrice: 1640.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 15, 
    code: 'PNEU-015', 
    name: '275/80R22.5 X MULTI Z TL 149/146L VM MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 3, 
    unitPrice: 1640.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 16, 
    code: 'PNEU-016', 
    name: '295/80R22.5 DR550 TL 152/148L VG GO', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 7, 
    unitPrice: 1720.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 17, 
    code: 'PNEU-017', 
    name: '295/80R22.5 X MULTI D TL 152/148L VG GO', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 0, 
    unitPrice: 1750.00, 
    status: 'Sem estoque'
  },
  { 
    id: 18, 
    code: 'PNEU-018', 
    name: '295/80R22.5 X MULTI D2 TL 152/148L VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 9, 
    unitPrice: 1780.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 19, 
    code: 'PNEU-019', 
    name: '295/80R22.5 X MULTI T TL 152/148L VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 11, 
    unitPrice: 1760.00, 
    status: 'Em estoque'
  },
  { 
    id: 20, 
    code: 'PNEU-020', 
    name: '295/80R22.5 X MULTI Z2 TL 154/150L VG MI', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 8, 
    unitPrice: 1790.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 21, 
    code: 'PNEU-021', 
    name: '295/80R22.5 X MULTIWAY XZE', 
    category: 'PNEU RECAUCHUTADO', 
    quantity: 6, 
    unitPrice: 1850.00, 
    status: 'Estoque baixo'
  },
  { 
    id: 22, 
    code: 'ACESS-001', 
    name: 'JUEGO 5 - 11.00R20 XEZ', 
    category: 'ACESSORIOS', 
    quantity: 15, 
    unitPrice: 90.00, 
    status: 'Em estoque'
  },
  { 
    id: 23, 
    code: 'ACESS-002', 
    name: 'SEAU 3,600 KG LUBRIFIANT R5085', 
    category: 'ACESSORIOS', 
    quantity: 20, 
    unitPrice: 150.00, 
    status: 'Em estoque'
  },
];

// Lista de vendedores
const vendedores = [
  { id: 1, nome: 'BALCAO PEÇAS - ATACADO' },
  { id: 2, nome: 'DAIANE ARANTES' },
  { id: 3, nome: 'ESCRITÓRIO DE PEÇAS' },
  { id: 4, nome: 'WAGNER COSTA BATISTA' }
];

// Lista de categorias de produtos
const categoriasProdutos = [
  'ACESSORIOS',
  'PNEU',
  'PNEU RECAUCHUTADO'
];

const ManagerInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Apply filters to inventory data
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
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
      case 'PNEU': return <Filter className="h-5 w-5" />;
      case 'PNEU RECAUCHUTADO': return <Settings className="h-5 w-5" />;
      case 'ACESSORIOS': return <Wrench className="h-5 w-5" />;
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
                    <SelectItem value="all">Todas as categorias</SelectItem>
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
                    <SelectItem value="all">Todos os status</SelectItem>
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
