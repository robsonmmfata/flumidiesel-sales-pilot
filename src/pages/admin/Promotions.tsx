
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, Calendar, Tag, Percent, Edit, Trash, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock promotions data
const mockPromotions = [
  {
    id: 1,
    name: "Promoção de Inverno",
    description: "Descontos especiais para a temporada de inverno em produtos selecionados",
    discountPercentage: 15,
    startDate: "2025-06-01",
    endDate: "2025-07-31",
    categories: ["Filtros", "Peças de Motor"],
    active: true,
  },
  {
    id: 2,
    name: "Black Friday 2025",
    description: "Ofertas especiais para a Black Friday com descontos imperdíveis",
    discountPercentage: 25,
    startDate: "2025-11-20",
    endDate: "2025-11-30",
    categories: ["Óleos", "Aditivos", "Filtros"],
    active: false,
  },
  {
    id: 3,
    name: "Lançamento Nova Linha",
    description: "Promoção especial para o lançamento da nova linha de produtos premium",
    discountPercentage: 10,
    startDate: "2025-08-15",
    endDate: "2025-09-15",
    categories: ["Peças de Motor", "Bombas"],
    active: true,
  },
  {
    id: 4,
    name: "Cliente Fidelidade",
    description: "Descontos exclusivos para clientes do programa de fidelidade",
    discountPercentage: 8,
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    categories: ["Todas"],
    active: true,
  }
];

const productCategories = ["Filtros", "Óleos", "Aditivos", "Peças de Motor", "Bombas", "Todas"];

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
    setSelectedPromotion(null);
    setIsEditDialogOpen(true);
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
                  <CardTitle className="text-sm font-medium">Categorias em Promoção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Array.from(new Set(mockPromotions.flatMap(promo => promo.categories))).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Categorias de produtos com desconto ativo
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedPromotion ? 'Editar Promoção' : 'Criar Nova Promoção'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="name" className="text-sm font-medium">Nome da Promoção</label>
              <Input 
                id="name" 
                defaultValue={selectedPromotion ? selectedPromotion.name : ''}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input 
                id="description" 
                defaultValue={selectedPromotion ? selectedPromotion.description : ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="startDate" className="text-sm font-medium">Data de Início</label>
                <Input 
                  id="startDate" 
                  type="date"
                  defaultValue={selectedPromotion ? selectedPromotion.startDate : ''}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="endDate" className="text-sm font-medium">Data de Término</label>
                <Input 
                  id="endDate" 
                  type="date"
                  defaultValue={selectedPromotion ? selectedPromotion.endDate : ''}
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
                    defaultValue={selectedPromotion ? selectedPromotion.discountPercentage : ''}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedPromotion ? (selectedPromotion.active ? "active" : "inactive") : "active"}>
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
                      defaultChecked={selectedPromotion ? selectedPromotion.categories.includes(category) : false}
                    />
                    <label htmlFor={`category-${index}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSavePromotion}>Salvar</Button>
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
