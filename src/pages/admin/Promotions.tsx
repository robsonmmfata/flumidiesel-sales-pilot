
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, Calendar, Tag, Percent, Edit, Trash, Plus, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Lista de produtos correspondente ao inventário atualizado
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
const productCategories = ['PNEU', 'PNEU RECAUCHUTADO', 'ACESSORIOS'];

// Mock promotions data, atualizada para os novos produtos
const mockPromotions = [
  {
    id: 1,
    name: "Promoção Pneus Michelin",
    description: "Descontos especiais em pneus Michelin para vans e utilitários",
    discountPercentage: 15,
    startDate: "2025-06-01",
    endDate: "2025-07-31",
    categories: ["PNEU"],
    active: true,
    productIds: [1, 2, 3, 7, 8, 9]
  },
  {
    id: 2,
    name: "Black Friday 2025",
    description: "Ofertas especiais para a Black Friday com descontos imperdíveis em todas as categorias",
    discountPercentage: 25,
    startDate: "2025-11-20",
    endDate: "2025-11-30",
    categories: ["PNEU", "PNEU RECAUCHUTADO", "ACESSORIOS"],
    active: false,
    productIds: [1, 2, 3, 4, 5, 11, 12, 13, 22, 23]
  },
  {
    id: 3,
    name: "Lançamento Linha Recauchutados",
    description: "Promoção especial para o lançamento da nova linha de pneus recauchutados premium",
    discountPercentage: 10,
    startDate: "2025-08-15",
    endDate: "2025-09-15",
    categories: ["PNEU RECAUCHUTADO"],
    active: true,
    productIds: [11, 12, 13, 14, 18, 19, 20, 21]
  },
  {
    id: 4,
    name: "Cliente Fidelidade",
    description: "Descontos exclusivos para clientes do programa de fidelidade",
    discountPercentage: 8,
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    categories: ["PNEU", "PNEU RECAUCHUTADO", "ACESSORIOS"],
    active: true,
    productIds: []
  }
];

const AdminPromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter promotions based on search term and status
  const filteredPromotions = mockPromotions.filter(promotion => {
    const matchesSearch = 
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && promotion.active) || 
      (statusFilter === 'inactive' && !promotion.active);
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleEditPromotion = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsEditDialogOpen(true);
  };

  const handleDeletePromotion = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsDeleteDialogOpen(true);
  };

  const handleSavePromotion = () => {
    toast.success(`Promoção ${selectedPromotion ? 'atualizada' : 'criada'} com sucesso!`);
    setIsEditDialogOpen(false);
    setSelectedPromotion(null);
  };

  const handleConfirmDelete = () => {
    toast.success(`Promoção "${selectedPromotion.name}" removida com sucesso!`);
    setIsDeleteDialogOpen(false);
    setSelectedPromotion(null);
  };

  const handleAddNewPromotion = () => {
    setSelectedPromotion({
      id: Date.now(),
      name: '',
      description: '',
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      categories: [],
      active: false,
      productIds: []
    });
    setIsEditDialogOpen(true);
  };

  // Função para obter produtos por categoria
  const getProductsByCategory = (category: string) => {
    if (!category) return [];
    return inventoryData.filter(item => item.category === category);
  };

  // Função para verificar se um produto está selecionado na promoção atual
  const isProductSelected = (productId: number) => {
    return selectedPromotion?.productIds?.includes(productId) || false;
  };

  // Função para obter nomes de produtos por IDs
  const getProductNamesByIds = (productIds = []) => {
    if (!productIds.length) return "Nenhum produto selecionado";
    
    const selectedProducts = inventoryData.filter(item => productIds.includes(item.id));
    if (selectedProducts.length <= 2) {
      return selectedProducts.map(p => p.name).join(", ");
    }
    return `${selectedProducts[0].name}, ${selectedProducts[1].name} e mais ${selectedProducts.length - 2} produto(s)`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciamento de Promoções</h1>
          <Button onClick={handleAddNewPromotion} className="gap-1">
            <Plus size={16} /> Nova Promoção
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
            <TabsTrigger value="active">Promoções</TabsTrigger>
            <TabsTrigger value="analytics">Análise de Impacto</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 pt-4">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Buscar promoções..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-64">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativas</SelectItem>
                    <SelectItem value="inactive">Inativas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Promotions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPromotions.length > 0 ? (
                filteredPromotions.map((promotion) => (
                  <Card key={promotion.id} className={`overflow-hidden ${!promotion.active ? 'opacity-75' : ''}`}>
                    <CardHeader className="pb-2 flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {promotion.name}
                          {promotion.active ? (
                            <Badge className="bg-green-500 hover:bg-green-600 text-white">Ativa</Badge>
                          ) : (
                            <Badge variant="outline">Inativa</Badge>
                          )}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700">
                        <Percent className="h-3 w-3" /> {promotion.discountPercentage}%
                      </Badge>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 mb-2">{promotion.description}</p>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {promotion.categories.map((category, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              <Tag className="h-3 w-3 mr-1" /> {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 line-clamp-1">
                            <Package className="h-3 w-3 inline mr-1" />
                            {getProductNamesByIds(promotion.productIds)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleEditPromotion(promotion)}>
                        <Edit size={16} className="mr-1" /> Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500 hover:text-red-700" onClick={() => handleDeletePromotion(promotion)}>
                        <Trash size={16} className="mr-1" /> Excluir
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="py-8 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 font-medium">Nenhuma promoção encontrada</p>
                    <p className="text-sm text-gray-500">
                      Tente ajustar seus filtros ou termos de busca.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Promoções Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockPromotions.filter(promo => promo.active).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    De um total de {mockPromotions.length} promoções
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Média de Desconto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(mockPromotions.reduce((sum, promo) => sum + promo.discountPercentage, 0) / mockPromotions.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Considerando todas as promoções
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Produtos em Promoção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Array.from(new Set(mockPromotions.flatMap(promo => promo.productIds))).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Produtos com algum tipo de desconto ativo
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Próximas Promoções</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPromotions
                    .filter(promo => !promo.active && new Date(promo.startDate) > new Date())
                    .map(promo => (
                      <div key={promo.id} className="flex justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{promo.name}</p>
                          <p className="text-sm text-muted-foreground">Começa em {formatDate(promo.startDate)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">{promo.discountPercentage}% de desconto</p>
                          <p className="text-sm text-muted-foreground">{promo.categories.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Gerar Relatório de Promoções</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit/Add Promotion Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{selectedPromotion?.id ? 'Editar Promoção' : 'Criar Nova Promoção'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="name" className="text-sm font-medium">Nome da Promoção</label>
              <Input 
                id="name" 
                defaultValue={selectedPromotion?.name || ''}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input 
                id="description" 
                defaultValue={selectedPromotion?.description || ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="startDate" className="text-sm font-medium">Data de Início</label>
                <Input 
                  id="startDate" 
                  type="date"
                  defaultValue={selectedPromotion?.startDate || ''}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="endDate" className="text-sm font-medium">Data de Término</label>
                <Input 
                  id="endDate" 
                  type="date"
                  defaultValue={selectedPromotion?.endDate || ''}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="discount" className="text-sm font-medium">Percentual de Desconto</label>
                <div className="relative">
                  <Input 
                    id="discount" 
                    type="number"
                    defaultValue={selectedPromotion?.discountPercentage || ''}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedPromotion?.active ? "active" : "inactive"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativa</SelectItem>
                    <SelectItem value="inactive">Inativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">Categorias</label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {productCategories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      className="mr-1"
                      defaultChecked={selectedPromotion?.categories?.includes(category) || false}
                    />
                    <label htmlFor={`category-${index}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2 mt-2">
              <label className="text-sm font-medium">Produtos da Promoção</label>
              <div className="max-h-64 overflow-y-auto border p-2 rounded-md">
                {selectedPromotion?.categories?.length > 0 ? (
                  inventoryData
                    .filter(product => selectedPromotion.categories.includes(product.category))
                    .map((product) => (
                      <div key={product.id} className="flex items-center mb-2 pb-2 border-b last:border-0 last:pb-0 last:mb-0">
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={isProductSelected(product.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`product-${product.id}`} className="flex-1 text-sm">
                          <div>{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku} | R$ {product.price.toFixed(2)}</div>
                        </label>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">Selecione pelo menos uma categoria para ver os produtos disponíveis</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSavePromotion}>
              {selectedPromotion?.id ? 'Salvar Alterações' : 'Criar Promoção'}
            </Button>
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
            Tem certeza que deseja excluir a promoção "{selectedPromotion?.name}"? Esta ação não pode ser desfeita.
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

export default AdminPromotionsPage;
