
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockSales, mockInventory } from '@/data/mockData';
import { PlusCircle, TrendingUp, Calendar, User, Package, CreditCard, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Sale } from '@/models/types';

interface ProductItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface SaleFormData {
  clientName: string;
  products: ProductItem[];
  paymentMethod: 'cash' | 'credit' | 'debit' | 'transfer' | 'invoice';
  deliveryDate: string;
  orderNumber: string;
}

const initialFormData: SaleFormData = {
  clientName: '',
  products: [],
  paymentMethod: 'invoice',
  deliveryDate: '',
  orderNumber: '',
};

const SalespersonSalesPage = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [formData, setFormData] = useState<SaleFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Current product being added
  const [currentProduct, setCurrentProduct] = useState({
    productId: '',
    name: '',
    quantity: 1,
    unitPrice: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId: string) => {
    const product = mockInventory.find(p => p.id === productId);
    if (product) {
      setCurrentProduct({
        productId: product.id,
        name: product.name,
        quantity: 1,
        unitPrice: product.price
      });
    }
  };

  const handleAddProduct = () => {
    if (currentProduct.productId && currentProduct.quantity > 0) {
      setFormData(prev => ({
        ...prev,
        products: [...prev.products, currentProduct]
      }));
      
      // Reset current product
      setCurrentProduct({
        productId: '',
        name: '',
        quantity: 1,
        unitPrice: 0
      });
    }
  };

  const handleRemoveProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = (): number => {
    return formData.products.reduce((sum, product) => sum + (product.quantity * product.unitPrice), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.products.length === 0) {
      toast.error('Adicione pelo menos um produto');
      return;
    }
    
    const newSale: Sale = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      products: formData.products,
      totalValue: calculateTotal(),
      paymentMethod: formData.paymentMethod,
      deliveryDate: formData.deliveryDate,
      orderNumber: formData.orderNumber || `PED-${Date.now().toString().slice(-6)}`,
      salesPersonId: user?.id || '',
      createdAt: new Date().toISOString(),
    };
    
    setSales(prev => [...prev, newSale]);
    setFormData(initialFormData);
    setIsDialogOpen(false);
    toast.success('Venda registrada com sucesso!');
  };

  // Filter sales for current user
  const userSales = sales.filter(sale => sale.salesPersonId === user?.id);

  const paymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return 'Dinheiro';
      case 'credit': return 'Cartão de Crédito';
      case 'debit': return 'Cartão de Débito';
      case 'transfer': return 'Transferência Bancária';
      case 'invoice': return 'Boleto';
      default: return method;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Registro de Vendas</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Venda
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Nova Venda</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome do Cliente</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Produtos</Label>
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5">
                          <Label htmlFor="product">Produto</Label>
                          <Select 
                            value={currentProduct.productId}
                            onValueChange={(value) => handleProductSelect(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              {mockInventory.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-3">
                          <Label htmlFor="quantity">Quantidade</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={currentProduct.quantity}
                            onChange={(e) => setCurrentProduct({
                              ...currentProduct,
                              quantity: parseInt(e.target.value)
                            })}
                          />
                        </div>
                        
                        <div className="col-span-3">
                          <Label htmlFor="unitPrice">Preço Unit.</Label>
                          <Input
                            id="unitPrice"
                            type="number"
                            step="0.01"
                            min="0"
                            value={currentProduct.unitPrice}
                            onChange={(e) => setCurrentProduct({
                              ...currentProduct,
                              unitPrice: parseFloat(e.target.value)
                            })}
                          />
                        </div>
                        
                        <div className="col-span-1 flex items-end">
                          <Button 
                            type="button" 
                            size="sm" 
                            onClick={handleAddProduct}
                            className="w-full"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      {formData.products.length > 0 ? (
                        <div className="mt-4">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b text-sm">
                                <th className="text-left py-2">Produto</th>
                                <th className="text-right py-2">Qtd</th>
                                <th className="text-right py-2">Preço Unit.</th>
                                <th className="text-right py-2">Total</th>
                                <th className="py-2"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.products.map((product, index) => (
                                <tr key={index} className="border-b text-sm">
                                  <td className="py-2">{product.name}</td>
                                  <td className="text-right py-2">{product.quantity}</td>
                                  <td className="text-right py-2">
                                    {product.unitPrice.toLocaleString('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    })}
                                  </td>
                                  <td className="text-right py-2">
                                    {(product.quantity * product.unitPrice).toLocaleString('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    })}
                                  </td>
                                  <td className="py-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveProduct(index)}
                                    >
                                      <Trash className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td colSpan={3} className="text-right font-bold py-2">Total:</td>
                                <td className="text-right font-bold py-2">
                                  {calculateTotal().toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                  })}
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-sm text-center text-gray-500 py-2">
                          Nenhum produto adicionado
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                      <Select 
                        value={formData.paymentMethod}
                        onValueChange={(value: any) => handleSelectChange(value, 'paymentMethod')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Dinheiro</SelectItem>
                          <SelectItem value="credit">Cartão de Crédito</SelectItem>
                          <SelectItem value="debit">Cartão de Débito</SelectItem>
                          <SelectItem value="transfer">Transferência</SelectItem>
                          <SelectItem value="invoice">Boleto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Data de Entrega</Label>
                      <Input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Número do Pedido (opcional)</Label>
                      <Input
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        placeholder="Gerado automaticamente se vazio"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Registrar Venda</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {userSales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userSales.map((sale) => (
              <Card key={sale.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Pedido #{sale.orderNumber}
                  </CardTitle>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm">{sale.clientName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Produtos:</p>
                    <div className="space-y-1 mt-1">
                      {sale.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <Package className="w-3 h-3 mr-1 text-gray-500" />
                            {product.name} x{product.quantity}
                          </span>
                          <span>
                            {(product.quantity * product.unitPrice).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                      <p className="text-sm">{paymentMethodLabel(sale.paymentMethod)}</p>
                    </div>
                    <p className="font-bold">
                      {sale.totalValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <p>Entrega: {new Date(sale.deliveryDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 font-medium">Nenhuma venda registrada</p>
              <p className="text-sm text-gray-500">
                Clique em "Nova Venda" para começar a registrar suas vendas.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SalespersonSalesPage;
