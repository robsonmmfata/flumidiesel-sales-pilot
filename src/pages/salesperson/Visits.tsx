
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockVisits } from '@/data/mockData';
import { PlusCircle, MapPin, Calendar, Clock, User, Building, Phone, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Visit } from '@/models/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Mock data for client list (reusing the structure from Clients page)
const mockClients = [
  {
    id: '1',
    name: 'Auto Peças Silva',
    contactName: 'Roberto Silva',
    phone: '(11) 98765-4321',
    email: 'roberto@autopecassilva.com.br',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    city: 'São Paulo',
    status: 'active',
  },
  {
    id: '2',
    name: 'Transportes Rápidos',
    contactName: 'Ana Santos',
    phone: '(11) 91234-5678',
    email: 'ana@transportesrapidos.com.br',
    address: 'Rua Augusta, 500, São Paulo - SP',
    city: 'São Paulo',
    status: 'active',
  },
  {
    id: '3',
    name: 'Oficina Mecânica Central',
    contactName: 'Carlos Oliveira',
    phone: '(11) 97890-1234',
    email: 'carlos@mecanicacentral.com.br',
    address: 'Rua Vergueiro, 200, São Paulo - SP',
    city: 'São Paulo',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Frota Express',
    contactName: 'Fernanda Lima',
    phone: '(11) 94567-8901',
    email: 'fernanda@frotaexpress.com.br',
    address: 'Av. Brasil, 1500, São Paulo - SP',
    city: 'São Paulo',
    status: 'active',
  },
  {
    id: '5',
    name: 'Diesel Truck',
    contactName: 'Marcos Souza',
    phone: '(11) 92345-6789',
    email: 'marcos@dieseltruck.com.br',
    address: 'Rua Consolação, 800, São Paulo - SP',
    city: 'São Paulo',
    status: 'inactive',
  }
];

interface VisitFormData {
  clientName: string;
  address: string;
  city: string;
  contactName: string;
  contactInfo: string;
  arrivalTime: string;
  departureTime: string;
  subject: string;
  interestLevel: 'low' | 'medium' | 'high';
  productsPresented: string;
}

const initialFormData: VisitFormData = {
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
};

const SalespersonVisitsPage = () => {
  const { user } = useAuth();
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const [formData, setFormData] = useState<VisitFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientSelection = (clientId: string) => {
    const selectedClient = mockClients.find(client => client.id === clientId);
    if (selectedClient) {
      setSelectedClientId(clientId);
      setFormData(prev => ({
        ...prev,
        clientName: selectedClient.name,
        address: selectedClient.address,
        city: selectedClient.city,
        contactName: selectedClient.contactName,
        contactInfo: selectedClient.phone,
      }));
      setOpenCombobox(false);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert products presented from comma-separated string to array
    const productsArray = formData.productsPresented 
      ? formData.productsPresented.split(',').map(product => product.trim()) 
      : [];
    
    const newVisit: Visit = {
      id: Date.now().toString(),
      date: currentDate,
      salesPersonId: user?.id || '',
      clientName: formData.clientName,
      address: formData.address,
      city: formData.city,
      contactName: formData.contactName,
      contactInfo: formData.contactInfo,
      arrivalTime: formData.arrivalTime,
      departureTime: formData.departureTime,
      subject: formData.subject,
      interestLevel: formData.interestLevel as 'low' | 'medium' | 'high',
      productsPresented: productsArray,
      location: {
        latitude: -23.5505, // Mock location for demo
        longitude: -46.6333,
      },
    };
    
    setVisits(prev => [...prev, newVisit]);
    setFormData(initialFormData);
    setSelectedClientId(null);
    setIsDialogOpen(false);
    toast.success('Visita registrada com sucesso!');
  };

  // Filter visits for current user
  const userVisits = visits.filter(visit => visit.salesPersonId === user?.id);
  
  const interestLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Registro de Visitas</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Visita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Nova Visita</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientNameCombobox">Nome da Empresa/Cliente</Label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className="w-full justify-between"
                        >
                          {formData.clientName || "Selecione ou digite um cliente..."}
                          <Building className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Buscar cliente..." 
                            onValueChange={(search) => {
                              if (!openCombobox) setOpenCombobox(true);
                              // Update clientName when typing to allow for new clients
                              setFormData(prev => ({ ...prev, clientName: search }));
                            }} 
                          />
                          <CommandEmpty>Nenhum cliente encontrado. Continue digitando para registrar um novo.</CommandEmpty>
                          <CommandList>
                            <CommandGroup heading="Clientes">
                              {mockClients
                                .filter(client => 
                                  client.name.toLowerCase().includes(formData.clientName?.toLowerCase() || '')
                                )
                                .map(client => (
                                  <CommandItem
                                    key={client.id}
                                    onSelect={() => {
                                      handleClientSelection(client.id);
                                    }}
                                    className={cn(
                                      "cursor-pointer",
                                      selectedClientId === client.id ? "bg-accent" : ""
                                    )}
                                  >
                                    <Building className="mr-2 h-4 w-4" />
                                    {client.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-sm text-muted-foreground">
                      Digite para buscar ou cadastrar um novo cliente
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nome do Contato</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Telefone/Email do Contato</Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime">Horário de Chegada</Label>
                    <Input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="time"
                      value={formData.arrivalTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">Horário de Saída</Label>
                    <Input
                      id="departureTime"
                      name="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="subject">Assunto Tratado</Label>
                    <Textarea
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestLevel">Nível de Interesse</Label>
                    <Select 
                      value={formData.interestLevel}
                      onValueChange={(value) => handleSelectChange(value, 'interestLevel')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixo</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="high">Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="productsPresented">Produtos Apresentados (separados por vírgula)</Label>
                    <Input
                      id="productsPresented"
                      name="productsPresented"
                      value={formData.productsPresented}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Registrar Visita</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            {userVisits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userVisits.map((visit) => (
                  <Card key={visit.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{visit.clientName}</CardTitle>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(visit.date).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-500" />
                        <div>
                          <p className="text-sm">{visit.address}</p>
                          <p className="text-sm text-gray-500">{visit.city}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-sm">{visit.contactName}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-sm">{visit.contactInfo}</p>
                      </div>
                      
                      <div className="flex">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-sm">
                          {visit.arrivalTime} às {visit.departureTime}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mt-2">Nível de interesse:</p>
                        <p className={`text-sm font-medium ${interestLevelColor(visit.interestLevel)}`}>
                          {visit.interestLevel === 'low' ? 'Baixo' : 
                            visit.interestLevel === 'medium' ? 'Médio' : 'Alto'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mt-1">Produtos apresentados:</p>
                        <p className="text-sm text-gray-600">
                          {visit.productsPresented.join(', ')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 font-medium">Nenhuma visita registrada</p>
                  <p className="text-sm text-gray-500">
                    Clique em "Nova Visita" para começar a registrar suas visitas.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="map">
            <Card>
              <CardContent className="py-8">
                <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Mapa de visitas será implementado em breve</p>
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
