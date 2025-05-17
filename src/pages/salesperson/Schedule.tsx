
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockScheduledVisits } from '@/data/mockData';
import { PlusCircle, Calendar, Clock, User, MapPin, Building, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ScheduledVisit } from '@/models/types';

interface ScheduleFormData {
  clientName: string;
  contactName: string;
  contactInfo: string;
  address: string;
  city: string;
  date: string;
  time: string;
  purpose: string;
}

const initialFormData: ScheduleFormData = {
  clientName: '',
  contactName: '',
  contactInfo: '',
  address: '',
  city: '',
  date: '',
  time: '',
  purpose: '',
};

const SalespersonSchedulePage = () => {
  const { user } = useAuth();
  const [scheduledVisits, setScheduledVisits] = useState<ScheduledVisit[]>(mockScheduledVisits);
  const [formData, setFormData] = useState<ScheduleFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newScheduledVisit: ScheduledVisit = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      contactName: formData.contactName,
      contactInfo: formData.contactInfo,
      address: formData.address,
      city: formData.city,
      date: formData.date,
      time: formData.time,
      purpose: formData.purpose,
      salesPersonId: user?.id || '',
      createdAt: new Date().toISOString(),
      completed: false,
    };
    
    setScheduledVisits(prev => [...prev, newScheduledVisit]);
    setFormData(initialFormData);
    setIsDialogOpen(false);
    toast.success('Visita agendada com sucesso!');
  };

  const handleMarkAsCompleted = (id: string) => {
    setScheduledVisits(prev => prev.map(visit => 
      visit.id === id ? { ...visit, completed: true } : visit
    ));
    toast.success('Visita marcada como concluída');
  };

  // Filter scheduled visits for current user
  const userScheduledVisits = scheduledVisits.filter(visit => visit.salesPersonId === user?.id);
  
  // Split visits into upcoming and completed
  const upcomingVisits = userScheduledVisits.filter(visit => !visit.completed);
  const completedVisits = userScheduledVisits.filter(visit => visit.completed);

  // Sort upcoming visits by date
  const sortedUpcomingVisits = [...upcomingVisits].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group visits by date
  const groupVisitsByDate = (visits: ScheduledVisit[]) => {
    const grouped: { [date: string]: ScheduledVisit[] } = {};
    
    visits.forEach(visit => {
      if (!grouped[visit.date]) {
        grouped[visit.date] = [];
      }
      grouped[visit.date].push(visit);
    });
    
    return Object.entries(grouped).sort(([dateA], [dateB]) => 
      new Date(dateA).getTime() - new Date(dateB).getTime()
    );
  };

  const groupedUpcomingVisits = groupVisitsByDate(sortedUpcomingVisits);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agenda de Visitas</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agendar Visita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Agendar Nova Visita</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome da Empresa/Cliente</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      required
                    />
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
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="purpose">Objetivo da Visita</Label>
                    <Textarea
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Agendar Visita</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Próximas Visitas</TabsTrigger>
            <TabsTrigger value="completed">Visitas Concluídas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {groupedUpcomingVisits.length > 0 ? (
              <div className="space-y-6">
                {groupedUpcomingVisits.map(([date, visits]) => (
                  <div key={date} className="space-y-3">
                    <h3 className="font-medium text-lg capitalize border-b pb-2">
                      {formatDate(date)}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visits.map((visit) => (
                        <Card key={visit.id}>
                          <CardHeader className="pb-2 flex flex-row items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{visit.clientName}</CardTitle>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {visit.time}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleMarkAsCompleted(visit.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
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
                            
                            <div>
                              <p className="text-sm font-medium mt-2">Objetivo:</p>
                              <p className="text-sm text-gray-600">{visit.purpose}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 font-medium">Nenhuma visita agendada</p>
                  <p className="text-sm text-gray-500">
                    Clique em "Agendar Visita" para adicionar um compromisso à sua agenda.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedVisits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedVisits.map((visit) => (
                  <Card key={visit.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{visit.clientName}</CardTitle>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
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
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-sm">{visit.time}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mt-2">Objetivo:</p>
                        <p className="text-sm text-gray-600">{visit.purpose}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <XCircle className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 font-medium">Nenhuma visita concluída</p>
                  <p className="text-sm text-gray-500">
                    As visitas marcadas como concluídas aparecerão aqui.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SalespersonSchedulePage;
