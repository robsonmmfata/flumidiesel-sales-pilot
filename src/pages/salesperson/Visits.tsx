
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Visit } from '@/models/types';
import { mockVisits } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Clock, Plus } from 'lucide-react';

const SalespersonVisitsPage = () => {
  const { user } = useAuth();
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    city: '',
    contactName: '',
    contactInfo: '',
    arrivalTime: '',
    departureTime: '',
    subject: '',
    interestLevel: 'medium' as 'low' | 'medium' | 'high',
    productsPresented: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      clientName: '',
      address: '',
      city: '',
      contactName: '',
      contactInfo: '',
      arrivalTime: '',
      departureTime: '',
      subject: '',
      interestLevel: 'medium',
      productsPresented: '',
    });
  };
  
  const handleAddVisit = () => {
    const currentDate = new Date().toISOString();
    
    const newVisit: Visit = {
      id: Date.now().toString(),
      date: currentDate,
      salesPersonId: user?.id || '',
      productsPresented: formData.productsPresented.split(',').map(product => product.trim()),
      location: {
        latitude: -23.5505, // Mock location for demo
        longitude: -46.6333,
      },
      ...formData,
    };
    
    setVisits(prev => [...prev, newVisit]);
    setIsAddDialogOpen(false);
    toast.success('Visita registrada com sucesso!');
    resetForm();
  };
  
  // Filter visits for current user
  const userVisits = visits.filter(visit => visit.salesPersonId === user?.id);
  
  // Group visits by date
  const groupedVisits = userVisits.reduce((acc, visit) => {
    const date = new Date(visit.date).toLocaleDateString('pt-BR');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(visit);
    return acc;
  }, {} as Record<string, Visit[]>);
  
  // Sort dates in descending order
  const sortedDates = Object.keys(groupedVisits).sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('-')).getTime();
    const dateB = new Date(b.split('/').reverse().join('-')).getTime();
    return dateB - dateA;
  });
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Visitas</h1>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Registrar Visita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Nova Visita</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da visita realizada.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="clientName" className="text-right">
                    Cliente
                  </Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Endereço
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    Cidade
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactName" className="text-right">
                    Nome do Contato
                  </Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactInfo" className="text-right">
                    Contato
                  </Label>
                  <Input
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="arrivalTime" className="text-right">
                    Hora de Chegada
                  </Label>
                  <Input
                    id="arrivalTime"
                    name="arrivalTime"
                    type="time"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="departureTime" className="text-right">
                    Hora de Saída
                  </Label>
                  <Input
                    id="departureTime"
                    name="departureTime"
                    type="time"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interestLevel" className="text-right">
                    Nível de Interesse
                  </Label>
                  <Select 
                    value={formData.interestLevel} 
                    onValueChange={(value) => handleSelectChange('interestLevel', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o nível de interesse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixo</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="high">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Assunto Tratado
                  </Label>
                  <Textarea
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productsPresented" className="text-right">
                    Produtos Apresentados
                  </Label>
                  <Textarea
                    id="productsPresented"
                    name="productsPresented"
                    value={formData.productsPresented}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Separe por vírgulas"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddVisit}>Registrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {sortedDates.length > 0 ? (
              sortedDates.map((date) => (
                <div key={date} className="space-y-2">
                  <h2 className="font-semibold text-lg">{date}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedVisits[date].map((visit) => (
                      <Card key={visit.id}>
                        <CardHeader>
                          <CardTitle>{visit.clientName}</CardTitle>
                          <CardDescription className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" /> {visit.city}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-semibold">Contato:</span> {visit.contactName}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Assunto:</span> {visit.subject}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="mr-1 h-3 w-3" /> {visit.arrivalTime} - {visit.departureTime}
                            </div>
                            <div className="mt-2">
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                                {visit.interestLevel === 'high' && 'Alto Interesse'}
                                {visit.interestLevel === 'medium' && 'Interesse Médio'}
                                {visit.interestLevel === 'low' && 'Baixo Interesse'}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Nenhuma visita registrada.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Mapa de Visitas</CardTitle>
                <CardDescription>
                  Visualize suas visitas por localização.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Mapa de visitas será exibido aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonVisitsPage;
