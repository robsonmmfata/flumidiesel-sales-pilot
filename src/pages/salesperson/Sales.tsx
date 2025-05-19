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
import { PlusCircle, FileText, Calendar, DollarSign, Package, Truck, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Sale } from '@/models/types';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';

interface SaleProduct {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface SaleFormData {
  clientName: string;
  products: SaleProduct[];
  paymentMethod: 'cash' | 'credit' | 'debit' | 'transfer' | 'invoice';
  deliveryDate: string;
  orderNumber: string;
}

const initialFormData: SaleFormData = {
  clientName: '',
  products: [{ productId: '', name: '', quantity: 1, unitPrice: 0 }],
  paymentMethod: 'invoice',
  deliveryDate: '',
  orderNumber: '',
};

const SalespersonSalesPage = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [formData, setFormData] = useState<SaleFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [period, setPeriod] = useState<string>('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, field: keyof SaleProduct, value: string | number) => {
    setFormData((prev) => {
      const newProducts = [...prev.products];
      newProducts[index] = {
        ...newProducts[index],
        [field]: value,
      };

      // If changing the product, update name and price automatically
      if (field === 'productId' && typeof value === 'string') {
        const selectedProduct = mockInventory.find(product => product.id === value);
        if (selectedProduct) {
          newProducts[index].name = selectedProduct.name;
          newProducts[index].unitPrice = selectedProduct.price;
        }
      }

      return { ...prev, products: newProducts };
    });
  };

  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: '', name: '', quantity: 1, unitPrice: 0 }],
    }));
  };

  const removeProductRow = (index: number) => {
    if (formData.products.length > 1) {
      setFormData((prev) => ({
        ...prev,
        products: prev.products.filter((_, i) => i !== index),
      }));
    }
  };

  const calculateTotal = () => {
    return formData.products.reduce((total, product) => {
      return total + (product.quantity * product.unitPrice);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new order number if not provided
    const orderNumber = formData.orderNumber || `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const newSale: Sale = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      products: formData.products,
      totalValue: calculateTotal(),
      paymentMethod: formData.paymentMethod,
      deliveryDate: formData.deliveryDate,
      date: new Date().toISOString(), // Make sure date property is included
      orderNumber: orderNumber,
      salesPersonId: user?.id || '',
      salesPersonName: user?.name || '', // Add salesPersonName
      status: 'pending', // Make sure status is included
      createdAt: new Date().toISOString(),
    };
    
    setSales(prev => [...prev, newSale]);
    setFormData(initialFormData);
    setIsDialogOpen(false);
    toast.success('Venda registrada com sucesso!');
  };

  // Filter data based on selected period or date range
  const filterByDate = (date: string) => {
    const itemDate = new Date(date);
    
    if (period !== 'all' && period !== 'custom') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (period === 'today') {
        return itemDate >= today;
      } else if (period === 'yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return itemDate >= yesterday && itemDate < today;
      } else if (period === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return itemDate >= weekAgo;
      } else if (period === 'month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return itemDate >= monthStart;
      } else if (period === 'lastmonth') {
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return itemDate >= lastMonthStart && itemDate < thisMonthStart;
      }
    } else if (dateRange.from || dateRange.to) {
      if (dateRange.from && dateRange.to) {
        return itemDate >= dateRange.from && itemDate <= dateRange.to;
      } else if (dateRange.from) {
        return itemDate >= dateRange.from;
      } else if (dateRange.to) {
        return itemDate <= dateRange.to;
      }
    }
    
    return true;
  };

  // Filter sales for current user and apply time filters
  const userSales = sales
    .filter(sale => sale.salesPersonId === user?.id)
    .filter(sale => filterByDate(sale.createdAt));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return 'Dinheiro';
      case 'credit': return 'Cartão de Crédito';
      case 'debit': return 'Cartão de Débito';
      case 'transfer': return 'Transferência';
      case 'invoice': return 'Boleto';
      default: return method;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Registro de Vendas</h1>
          <div className="flex flex-wrap gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Venda
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Registrar Nova Venda</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Nome do Cliente/Empresa</Label>
                      <Input
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Produtos</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addProductRow}>
                          <PlusCircle className="h-4 w-4 mr-1" /> Adicionar Produto
                        </Button>
                      </div>
                      {formData.products.map((product, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4">
                            <Select 
                              value={product.productId}
                              onValueChange={(value) => handleProductChange(index, 'productId', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um produto" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockInventory.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10) || 1)}
                              placeholder="Qtd."
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={product.unitPrice}
                              onChange={(e) => handleProductChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                              placeholder="Valor unit."
                            />
                          </div>
                          <div className="col-span-2">
                            <p className="text-right font-medium">
                              {formatCurrency(product.quantity * product.unitPrice)}
                            </p>
                          </div>
                          <div className="col-span-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-red-500"
                              onClick={() => removeProductRow(index)}
                              disabled={formData.products.length <= 1}
                            >
                              &times;
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <p className="font-bold">Total: {formatCurrency(calculateTotal())}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                        <Select 
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleSelectChange(value, 'paymentMethod')}
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
                        <Label htmlFor="orderNumber">Número do Pedido (Opcional)</Label>
                        <Input
                          id="orderNumber"
                          name="orderNumber"
                          value={formData.orderNumber}
                          onChange={handleInputChange}
                          placeholder="Gerado automaticamente se não informado"
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
        </div>

        <DashboardTimeFilter
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          period={period}
          onPeriodChange={setPeriod}
        />

        {userSales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userSales.map((sale) => (
              <Card key={sale.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{sale.clientName}</CardTitle>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm">Pedido: {sale.orderNumber}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm font-medium">{formatCurrency(sale.totalValue)}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm">{getPaymentMethodLabel(sale.paymentMethod)}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm">Entrega: {new Date(sale.deliveryDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mt-1">Produtos:</p>
                    <div className="mt-1 space-y-1">
                      {sale.products.map((product, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {product.quantity}x {product.name}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(product.quantity * product.unitPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
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
