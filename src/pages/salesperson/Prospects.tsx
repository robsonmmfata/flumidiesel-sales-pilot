
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { mockProspects } from '@/data/mockData';
import { PlusCircle, Users, Phone, Building, FileText, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Prospect } from '@/models/types';

interface ProspectFormData {
  clientName: string;
  clientType: 'company' | 'fleet' | 'autonomous' | 'other';
  contactName: string;
  contactInfo: string;
  interestLevel: 'low' | 'medium' | 'high';
  requestedQuote: boolean;
  requestedFollowUp: boolean;
  notes: string;
}

const initialFormData: ProspectFormData = {
  clientName: '',
  clientType: 'company',
  contactName: '',
  contactInfo: '',
  interestLevel: 'medium',
  requestedQuote: false,
  requestedFollowUp: false,
  notes: '',
};

const SalespersonProspectsPage = () => {
  const { user } = useAuth();
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects);
  const [formData, setFormData] = useState<ProspectFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProspect: Prospect = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      clientType: formData.clientType,
      contactName: formData.contactName,
      contactInfo: formData.contactInfo,
      interestLevel: formData.interestLevel,
      requestedQuote: formData.requestedQuote,
      requestedFollowUp: formData.requestedFollowUp,
      notes: formData.notes,
      salesPersonId: user?.id || '',
      createdAt: new Date().toISOString(),
    };
    
    setProspects(prev => [...prev, newProspect]);
    setFormData(initialFormData);
    setIsDialogOpen(false);
    toast.success('Prospecto registrado com sucesso!');
  };

  // Filter prospects for current user
  const userProspects = prospects.filter(prospect => prospect.salesPersonId === user?.id);
  
  const interestLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const clientTypeLabel = (type: string) => {
    switch (type) {
      case 'company': return 'Empresa';
      case 'fleet': return 'Frota';
      case 'autonomous': return 'Autônomo';
      case 'other': return 'Outro';
      default: return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Prospecção de Clientes</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Prospecto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Novo Prospecto</DialogTitle>
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
                    <Label htmlFor="clientType">Tipo de Cliente</Label>
                    <Select 
                      value={formData.clientType}
                      onValueChange={(value) => handleSelectChange(value, 'clientType')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Empresa</SelectItem>
                        <SelectItem value="fleet">Frota</SelectItem>
                        <SelectItem value="autonomous">Autônomo</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="contactInfo">Telefone/Email</Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      required
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
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requestedQuote">Solicitou Orçamento</Label>
                      <Switch
                        id="requestedQuote"
                        checked={formData.requestedQuote}
                        onCheckedChange={(checked) => handleSwitchChange(checked, 'requestedQuote')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requestedFollowUp">Solicitou Retorno</Label>
                      <Switch
                        id="requestedFollowUp"
                        checked={formData.requestedFollowUp}
                        onCheckedChange={(checked) => handleSwitchChange(checked, 'requestedFollowUp')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Registrar Prospecto</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {userProspects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProspects.map((prospect) => (
              <Card key={prospect.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{prospect.clientName}</CardTitle>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{clientTypeLabel(prospect.clientType)}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm">{prospect.contactName}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm">{prospect.contactInfo}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mt-2">Nível de interesse:</p>
                    <p className={`text-sm font-medium ${interestLevelColor(prospect.interestLevel)}`}>
                      {prospect.interestLevel === 'low' ? 'Baixo' : 
                        prospect.interestLevel === 'medium' ? 'Médio' : 'Alto'}
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gray-500" />
                      <p className="text-sm">{prospect.requestedQuote ? 'Orçamento' : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p className="text-sm">{prospect.requestedFollowUp ? 'Retorno' : ''}</p>
                    </div>
                  </div>
                  
                  {prospect.notes && (
                    <div>
                      <p className="text-sm font-medium mt-1">Observações:</p>
                      <p className="text-sm text-gray-600">{prospect.notes}</p>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400 mt-2">
                    Criado em: {new Date(prospect.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 font-medium">Nenhum prospecto registrado</p>
              <p className="text-sm text-gray-500">
                Clique em "Novo Prospecto" para começar a registrar novos potenciais clientes.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SalespersonProspectsPage;
