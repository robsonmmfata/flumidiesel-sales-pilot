
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  TrendingUp, 
  Plus, 
  Calendar, 
  Trash2, 
  Edit, 
  Tag, 
  PercentSquare, 
  Package 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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
const categoriasProdutos = [
  'ACESSORIOS',
  'PNEU',
  'PNEU RECAUCHUTADO'
];

// Lista de vendedores
const vendedores = [
  { id: 1, nome: 'BALCAO PEÇAS - ATACADO' },
  { id: 2, nome: 'DAIANE ARANTES' },
  { id: 3, nome: 'ESCRITÓRIO DE PEÇAS' },
  { id: 4, nome: 'WAGNER COSTA BATISTA' }
];

// Mock data para promoções, atualizada para refletir os novos produtos
const initialPromotions = [
  {
    id: 1,
    title: 'Desconto em Pneus Michelin Agilis',
    description: 'Desconto de 15% em compras acima de 5 unidades de pneus da linha Michelin Agilis.',
    discount: '15%',
    startDate: '2025-05-20',
    endDate: '2025-06-20',
    category: 'PNEU',
    status: 'Ativo',
    productIds: [1, 2, 3, 7, 8, 9] // IDs dos produtos Michelin Agilis
  },
  {
    id: 2,
    title: 'Promoção de Acessórios',
    description: 'Na compra de qualquer acessório, ganhe um desconto adicional de 7% no valor total.',
    discount: '7%',
    startDate: '2025-05-15',
    endDate: '2025-07-15',
    category: 'ACESSORIOS',
    status: 'Ativo',
    productIds: [22, 23] // IDs dos acessórios
  },
  {
    id: 3,
    title: 'Desconto por Volume em Pneus Recauchutados',
    description: 'Descontos progressivos na compra de pneus recauchutados: 5% para 5 unidades, 10% para 10 unidades, 15% para 15 ou mais.',
    discount: '5-15%',
    startDate: '2025-06-01',
    endDate: '2025-08-01',
    category: 'PNEU RECAUCHUTADO',
    status: 'Pendente',
    productIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] // IDs dos pneus recauchutados
  },
];

const ManagerPromotionsPage = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState({
    id: 0,
    title: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    category: '',
    status: 'Pendente',
    productIds: []
  });

  const handleCreatePromotion = () => {
    setCurrentPromotion({
      id: Date.now(),
      title: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: '',
      category: '',
      status: 'Pendente',
      productIds: []
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditPromotion = (promotion) => {
    setCurrentPromotion(promotion);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeletePromotion = (id) => {
    setPromotions(promotions.filter(p => p.id !== id));
    toast.success("Promoção excluída com sucesso");
  };

  const handleSavePromotion = () => {
    if (!currentPromotion.title || !currentPromotion.description || !currentPromotion.discount) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (isEditMode) {
      setPromotions(promotions.map(p => 
        p.id === currentPromotion.id ? currentPromotion : p
      ));
      toast.success("Promoção atualizada com sucesso");
    } else {
      setPromotions([...promotions, currentPromotion]);
      toast.success("Nova promoção criada com sucesso");
    }
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPromotion({ ...currentPromotion, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setCurrentPromotion({ ...currentPromotion, [name]: value });
  };

  const handleToggleStatus = (id) => {
    setPromotions(promotions.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'Ativo' ? 'Pendente' : 'Ativo';
        return { ...p, status: newStatus };
      }
      return p;
    }));
    toast.success("Status da promoção alterado com sucesso");
  };

  // Função para obter produtos por categoria
  const getProductsByCategory = (category) => {
    if (category === '') return [];
    return inventoryData.filter(item => item.category === category);
  };

  // Função para verificar se um produto está selecionado na promoção atual
  const isProductSelected = (productId) => {
    return currentPromotion.productIds?.includes(productId) || false;
  };

  // Função para alternar a seleção de um produto
  const toggleProductSelection = (productId) => {
    const currentSelection = [...(currentPromotion.productIds || [])];
    const index = currentSelection.indexOf(productId);
    
    if (index === -1) {
      currentSelection.push(productId);
    } else {
      currentSelection.splice(index, 1);
    }
    
    setCurrentPromotion({
      ...currentPromotion,
      productIds: currentSelection
    });
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciamento de Promoções</h1>
          <Button onClick={handleCreatePromotion}>
            <Plus className="mr-2 h-4 w-4" /> Nova Promoção
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className={
              promotion.status === 'Ativo' ? 'border-green-200' : 'border-gray-200'
            }>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <PercentSquare className="h-5 w-5 text-flumi-500" />
                      <CardTitle className="text-lg">{promotion.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Desconto: {promotion.discount}
                    </p>
                  </div>
                  <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                    promotion.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {promotion.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 mb-4">{promotion.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Início: {new Date(promotion.startDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Fim: {new Date(promotion.endDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Categoria: {promotion.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Produtos: {promotion.productIds?.length || 0}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p className="line-clamp-1">
                    {getProductNamesByIds(promotion.productIds)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleToggleStatus(promotion.id)}
                >
                  {promotion.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditPromotion(promotion)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700" 
                  onClick={() => handleDeletePromotion(promotion.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Editar Promoção' : 'Nova Promoção'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={currentPromotion.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentPromotion.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount">Desconto *</Label>
                  <Input
                    id="discount"
                    name="discount"
                    value={currentPromotion.discount}
                    onChange={handleInputChange}
                    placeholder="Ex: 10%, R$ 50,00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={currentPromotion.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriasProdutos.map((category, index) => (
                        <SelectItem key={index} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={currentPromotion.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Data de Término</Label>
                  <Input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={currentPromotion.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={currentPromotion.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {currentPromotion.category && (
                <div className="grid gap-2 mt-2">
                  <Label>Produtos da Promoção</Label>
                  <div className="max-h-64 overflow-y-auto border p-2 rounded-md">
                    {getProductsByCategory(currentPromotion.category).map((product) => (
                      <div key={product.id} className="flex items-center mb-2 pb-2 border-b last:border-0 last:pb-0 last:mb-0">
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={isProductSelected(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`product-${product.id}`} className="flex-1 text-sm">
                          <div>{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku} | R$ {product.price.toFixed(2)}</div>
                        </label>
                      </div>
                    ))}
                    {getProductsByCategory(currentPromotion.category).length === 0 && (
                      <p className="text-sm text-gray-500 py-2">Selecione uma categoria para ver os produtos disponíveis</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSavePromotion}>
                {isEditMode ? 'Salvar Alterações' : 'Criar Promoção'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </DashboardLayout>
  );
};

export default ManagerPromotionsPage;
