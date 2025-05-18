
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Calendar, Percent, Search, AlertCircle, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

// Define promotion types for the page
interface Promotion {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  productIds: number[];
  isActive: boolean;
  conditions?: string;
}

// Mock promotions data, atualizado para os novos produtos
const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Promoção de Pneus Michelin',
    description: 'Descontos especiais em toda a linha de pneus Michelin.',
    discountType: 'percentage',
    discountValue: 15,
    startDate: '2025-06-01',
    endDate: '2025-07-31',
    productIds: [1, 2, 3, 4, 7, 8, 9, 10],
    isActive: true,
  },
  {
    id: '2',
    title: 'Compre 5, Leve 6',
    description: 'Na compra de 5 pneus recauchutados, o sexto sai grátis.',
    discountType: 'fixed',
    discountValue: 0,
    startDate: '2025-05-15',
    endDate: '2025-06-15',
    productIds: [11, 12, 13, 14, 15, 16, 18, 19, 20, 21],
    isActive: true,
    conditions: 'Válido para compras acima de 5 unidades do mesmo produto.'
  },
  {
    id: '3',
    title: 'Desconto para Oficinas',
    description: 'Desconto especial para oficinas mecânicas em acessórios.',
    discountType: 'percentage',
    discountValue: 10,
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    productIds: [22, 23],
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
    productIds: [6, 17],
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
  const getProductNamesByIds = (ids: number[]) => {
    return ids.map(id => {
      const product = inventoryData.find(item => item.id === id);
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
                        {promo.productIds.length > 3 ? (
                          <>
                            {getProductNamesByIds(promo.productIds.slice(0, 2)).map((name, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                <Package className="h-3 w-3 mr-1" /> {name.length > 30 ? name.substring(0, 30) + '...' : name}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="bg-gray-50">
                              <Tag className="h-3 w-3 mr-1" /> + {promo.productIds.length - 2} produtos
                            </Badge>
                          </>
                        ) : (
                          getProductNamesByIds(promo.productIds).map((name, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              <Package className="h-3 w-3 mr-1" /> {name.length > 40 ? name.substring(0, 40) + '...' : name}
                            </Badge>
                          ))
                        )}
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
