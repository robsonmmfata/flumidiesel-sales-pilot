import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockVisits as initialMockVisits } from '@/data/mockData'; // Renomeado para evitar conflito com o estado
import { PlusCircle, MapPin, Calendar, Clock, User, Building, Phone, FileText, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Visit } from '@/models/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import MapVisits from '@/components/MapVisits';
import VisitRouteOptimizer from '@/components/VisitRouteOptimizer';

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

// Definindo a interface VisitFormData para o formulário
interface VisitFormData {
  id?: string; // Adicionado para edição
  clientName: string;
  address: string;
  city: string;
  contactName: string;
  contactInfo: string; // Pode ser telefone ou email
  arrivalTime: string;
  departureTime: string;
  subject: string;
  interestLevel: 'low' | 'medium' | 'high';
  productsPresented: string; // String separada por vírgulas
  date: string; // Adicionado para o formulário
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
  date: new Date().toISOString().split('T')[0], // Data atual padrão
};

const SalespersonVisitsPage = () => {
  const { user } = useAuth();
  // Usar um estado para as visitas para que possam ser modificadas
  const [visits, setVisits] = useState<Visit[]>(initialMockVisits); // Usando initialMockVisits
  const [formData, setFormData] = useState<VisitFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Estado para o diálogo de exclusão
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null); // Estado para a visita selecionada para edição/exclusão

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value })); // Usar ! para afirmar que prev não é nulo
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev!, [name]: value })); // Usar ! para afirmar que prev não é nulo
  };

  const handleClientSelection = (clientId: string) => {
    const client = mockClients.find(client => client.id === clientId);
    if (client) {
      setSelectedClientId(clientId);
      setFormData(prev => ({
        ...prev!,
        clientName: client.name,
        address: client.address,
        city: client.city,
        contactName: client.contactName,
        contactInfo: client.phone,
      }));
      setOpenCombobox(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert products presented from comma-separated string to array
    const productsArray = formData.productsPresented 
      ? formData.productsPresented.split(',').map(product => product.trim()) 
      : [];
    
    // Se selectedVisit existe e tem um ID, estamos editando
    if (selectedVisit && selectedVisit.id) {
      setVisits(prevVisits => prevVisits.map(visit => 
        visit.id === selectedVisit.id 
          ? { 
              ...visit, 
              clientName: formData.clientName,
              address: formData.address,
              city: formData.city,
              contactName: formData.contactName,
              contactInfo: formData.contactInfo,
              arrivalTime: formData.arrivalTime,
              departureTime: formData.departureTime,
              subject: formData.subject,
              interestLevel: formData.interestLevel,
              productsPresented: productsArray,
              date: formData.date,
            }
          : visit
      ));
      toast.success('Visita atualizada com sucesso!');
    } else {
      // Caso contrário, criando uma nova visita
      const newVisit: Visit = {
        id: Date.now().toString(), // Gerar um ID único para nova visita
        date: formData.date,
        salesPersonId: user?.id || 'mock_salesperson_id', // Usar um ID de vendedor mock se user.id for nulo
        clientName: formData.clientName,
        address: formData.address,
        city: formData.city,
        contactName: formData.contactName,
        contactInfo: formData.contactInfo,
        arrivalTime: formData.arrivalTime,
        departureTime: formData.departureTime,
        subject: formData.subject,
        interestLevel: formData.interestLevel,
        productsPresented: productsArray,
        location: {
          latitude: -23.5505, // Mock location for demo
          longitude: -46.6333,
        },
      };
      setVisits(prev => [...prev, newVisit]);
      toast.success('Visita registrada com sucesso!');
    }

    setFormData(initialFormData); // Resetar formulário
    setSelectedClientId(null);
    setIsDialogOpen(false);
    setSelectedVisit(null); // Limpar visita selecionada após salvar
  };

  // Função para abrir o diálogo de edição
  const handleEditVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    setFormData({
      id: visit.id,
      clientName: visit.clientName,
      address: visit.address,
      city: visit.city,
      contactName: visit.contactName,
      contactInfo: visit.contactInfo,
      arrivalTime: visit.arrivalTime,
      departureTime: visit.departureTime,
      subject: visit.subject || '', // Assunto pode ser opcional
      interestLevel: visit.interestLevel,
      productsPresented: visit.productsPresented.join(', '), // Converter array para string
      date: visit.date,
    });
    setIsDialogOpen(true);
  };

  // Função para abrir o diálogo de exclusão
  const handleDeleteVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDeleteDialogOpen(true);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = () => {
    setVisits(prevVisits => prevVisits.filter(visit => visit.id !== selectedVisit?.id));
    toast.success(`Visita para "${selectedVisit?.clientName}" removida com sucesso!`);
    setIsDeleteDialogOpen(false);
    setSelectedVisit(null);
  };

  // Filter visits for current user (mocked salesPersonId for demo)
  // Em um cenário real, user.id viria do contexto de autenticação
  const userVisits = visits.filter(visit => visit.salesPersonId === (user?.id || 'mock_salesperson_id')); 
  
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
      <div className="space-y-4 p-6 bg-black text-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Registro de Visitas</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setSelectedVisit(null); setFormData(initialFormData); }} className="bg-blue-600 hover:bg-blue-700 text-white gap-1">
                <PlusCircle size={18} /> Nova Visita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">{selectedVisit ? 'Editar Visita' : 'Registrar Nova Visita'}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedVisit ? 'Edite as informações da visita.' : 'Registre informações sobre sua visita a um cliente.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientNameCombobox" className="text-gray-300">Nome da Empresa/Cliente</Label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                        >
                          {formData.clientName || "Selecione ou digite um cliente..."}
                          <Building className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0 bg-gray-800 border-gray-700 text-white" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Buscar cliente..." 
                            onValueChange={(search) => {
                              if (!openCombobox) setOpenCombobox(true);
                              setFormData(prev => ({ ...prev!, clientName: search }));
                            }} 
                            value={formData.clientName} // Controlar o valor do input da CommandInput
                            className="bg-gray-700 text-white placeholder-gray-500 border-gray-600"
                          />
                          <CommandEmpty className="text-gray-400">Nenhum cliente encontrado. Continue digitando para registrar um novo.</CommandEmpty>
                          <CommandList>
                            <CommandGroup heading="Clientes" className="text-gray-300">
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
                                      "cursor-pointer hover:bg-gray-700 text-white",
                                      selectedClientId === client.id ? "bg-gray-700" : ""
                                    )}
                                  >
                                    <Building className="mr-2 h-4 w-4 text-gray-400" />
                                    {client.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-sm text-gray-400">
                      Digite para buscar ou cadastrar um novo cliente
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-gray-300">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-gray-300">Nome do Contato</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo" className="text-gray-300">Telefone/Email do Contato</Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime" className="text-gray-300">Horário de Chegada</Label>
                    <Input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="time"
                      value={formData.arrivalTime}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="departureTime" className="text-gray-300">Horário de Saída</Label>
                    <Input
                      id="departureTime"
                      name="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="subject" className="text-gray-300">Assunto Tratado</Label>
                    <Textarea
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="min-h-[100px] bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestLevel" className="text-gray-300">Nível de Interesse</Label>
                    <Select 
                      value={formData.interestLevel}
                      onValueChange={(value) => handleSelectChange(value, 'interestLevel')}
                    >
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                        <SelectValue placeholder="Selecione..." className="text-gray-500" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
                        <SelectItem value="low">Baixo</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="high">Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="productsPresented" className="text-gray-300">Produtos Apresentados (separados por vírgula)</Label>
                    <Input
                      id="productsPresented"
                      name="productsPresented"
                      value={formData.productsPresented}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    {selectedVisit ? 'Salvar Alterações' : 'Registrar Visita'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs para Lista, Mapa e Roteirização */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="route">Roteirização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4 pt-4">
            {userVisits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userVisits.map((visit) => (
                  <Card key={visit.id} className="bg-gray-900 border-gray-700 text-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{visit.clientName}</CardTitle>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar size={16} /> {new Date(visit.date).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="flex items-center gap-1">
                        <MapPin size={16} /> {visit.address}, {visit.city}
                      </p>
                      <p className="flex items-center gap-1">
                        <User size={16} /> {visit.contactName}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone size={16} /> {visit.contactInfo}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock size={16} /> {visit.arrivalTime} às {visit.departureTime}
                      </p>
                      <p>
                        Nível de interesse: <span className={`font-semibold ${interestLevelColor(visit.interestLevel)}`}>
                          {visit.interestLevel === 'low' ? 'Baixo' : 
                            visit.interestLevel === 'medium' ? 'Médio' : 'Alto'}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">Produtos apresentados: {visit.productsPresented.join(', ')}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => handleEditVisit(visit)}
                      >
                        <Edit size={16} className="mr-1" /> Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="h-8 px-3 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleDeleteVisit(visit)}
                      >
                        <Trash size={16} className="mr-1" /> Excluir
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center bg-gray-900 border-gray-700 text-white">
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
            <Card className="bg-gray-900 border-gray-700 text-white shadow-lg">
              <CardHeader>
                <CardTitle>Mapa de Visitas</CardTitle>
              </CardHeader>
              <CardContent>
                <MapVisits visits={userVisits} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="route">
            <Card className="bg-gray-900 border-gray-700 text-white shadow-lg">
              <CardHeader>
                <CardTitle>Otimização de Rotas</CardTitle>
              </CardHeader>
              <CardContent>
                <VisitRouteOptimizer visits={userVisits} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonVisitsPage;
