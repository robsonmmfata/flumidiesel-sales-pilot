
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

// Mock data for promotions
const initialPromotions = [
  {
    id: 1,
    title: 'Desconto em Filtros de Combustível',
    description: 'Desconto de 15% em compras acima de 10 unidades de filtros da linha FLU-9000.',
    discount: '15%',
    startDate: '2025-05-20',
    endDate: '2025-06-20',
    category: 'Filtros',
    status: 'Ativo'
  },
  {
    id: 2,
    title: 'Promoção de Peças para Manutenção',
    description: 'Na compra de um kit de manutenção completo, ganhe um desconto adicional de 7% no valor total.',
    discount: '7%',
    startDate: '2025-05-15',
    endDate: '2025-07-15',
    category: 'Kit de Manutenção',
    status: 'Ativo'
  },
  {
    id: 3,
    title: 'Desconto por Volume em Injetores',
    description: 'Descontos progressivos na compra de injetores: 5% para 5 unidades, 10% para 10 unidades, 15% para 15 ou mais.',
    discount: '5-15%',
    startDate: '2025-06-01',
    endDate: '2025-08-01',
    category: 'Injetores',
    status: 'Pendente'
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
    status: 'Pendente'
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
      status: 'Pendente'
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
          <DialogContent className="sm:max-w-[550px]">
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
                      <SelectItem value="Filtros">Filtros</SelectItem>
                      <SelectItem value="Kit de Manutenção">Kit de Manutenção</SelectItem>
                      <SelectItem value="Injetores">Injetores</SelectItem>
                      <SelectItem value="Bombas">Bombas</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
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
