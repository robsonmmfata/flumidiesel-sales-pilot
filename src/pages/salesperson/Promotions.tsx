
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInventoryItems } from '@/data/mockData';
import { Tag, Calendar, Percent, Search, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Define promotion types for the page
interface Promotion {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  productIds: string[];
  isActive: boolean;
  conditions?: string;
}

// Mock promotions data
const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Promoção de Inverno',
    description: 'Descontos especiais para a temporada de inverno em toda a linha de injetores.',
    discountType: 'percentage',
    discountValue: 15,
    startDate: '2025-06-01',
    endDate: '2025-07-31',
    productIds: ['1', '3', '5'],
    isActive: true,
  },
  {
    id: '2',
    title: 'Compre 5, Leve 6',
    description: 'Na compra de 5 filtros de combustível, o sexto sai grátis.',
    discountType: 'fixed',
    discountValue: 0,
    startDate: '2025-05-15',
    endDate: '2025-06-15',
    productIds: ['2', '4'],
    isActive: true,
    conditions: 'Válido para compras acima de 5 unidades do mesmo produto.'
  },
  {
    id: '3',
    title: 'Desconto para Oficinas',
    description: 'Desconto especial para oficinas mecânicas em bombas de combustível.',
    discountType: 'percentage',
    discountValue: 10,
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    productIds: ['6', '7'],
    isActive: true,
    conditions: 'Cliente deve comprovar que é uma oficina mecânica credenciada.'
  },
  {
    id: '4',
    title: 'Liquidação de Estoque',
    description: 'Descontos especiais em produtos selecionados para renovação de estoque.',
    discountType: 'percentage',
    discountValue: 25,
    startDate: '2025-06-10',
    endDate: '2025-06-20',
    productIds: ['8', '9', '10'],
    isActive: false,
  }
];

const SalespersonPromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);

  // Filter promotions based on search term and active status
  const filteredPromotions = mockPromotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActive = activeOnly ? promo.isActive : true;
    
    return matchesSearch && matchesActive;
  });

  // Function to get product names by IDs
  const getProductNamesByIds = (ids: string[]) => {
    return ids.map(id => {
      const product = mockInventoryItems.find(item => item.id === id);
      return product ? product.name : 'Produto não encontrado';
    });
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Check if a promotion is active based on current date and isActive flag
  const isPromotionActive = (promo: Promotion) => {
    if (!promo.isActive) return false;
    
    const currentDate = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);
    
    return currentDate >= startDate && currentDate <= endDate;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Promoções Ativas</h1>
        </div>

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
          <div>
            <Button 
              variant={activeOnly ? "default" : "outline"}
              onClick={() => setActiveOnly(!activeOnly)}
            >
              {activeOnly ? "Mostrando Ativas" : "Mostrar Todas"}
            </Button>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPromotions.length > 0 ? (
            filteredPromotions.map((promo) => {
              const isActive = isPromotionActive(promo);
              
              return (
                <Card key={promo.id} className={!isActive ? "opacity-75" : undefined}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{promo.title}</CardTitle>
                      {isActive ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Ativa</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-200">Inativa</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{promo.description}</p>
                    
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 mr-2 text-gray-500" />
                      <p className="text-sm font-medium">
                        {promo.discountType === 'percentage' 
                          ? `${promo.discountValue}% de desconto` 
                          : promo.conditions}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <p className="text-sm">
                        Válido de {formatDate(promo.startDate)} até {formatDate(promo.endDate)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Produtos em promoção:</p>
                      <div className="flex flex-wrap gap-1">
                        {getProductNamesByIds(promo.productIds).map((name, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            <Tag className="h-3 w-3 mr-1" /> {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {promo.conditions && (
                      <div className="flex items-start mt-2">
                        <AlertCircle className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-600">{promo.conditions}</p>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center">
                <Tag className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 font-medium">Nenhuma promoção encontrada</p>
                <p className="text-sm text-gray-500">
                  Não existem promoções ativas no momento ou que correspondam à sua busca.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonPromotionsPage;
