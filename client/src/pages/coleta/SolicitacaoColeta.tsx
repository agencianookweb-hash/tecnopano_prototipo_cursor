import { useState } from "react";
import { useMockFlow, Lote } from "@/context/MockFlowContext";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Truck, Calendar as CalendarIcon, MapPin, Phone, Plus, Filter, Search, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock Data for Suppliers/Companies
const suppliers = [
  { id: 1, name: "ATMOSFERA GESTÃO E HIGIENIZAÇÃO", address: "Rua das Indústrias, 100", phone: "(11) 3333-4444" },
  { id: 2, name: "SUL AMERICANA", address: "Av. do Estado, 500", phone: "(11) 5555-6666" },
  { id: 3, name: "ECO TÊXTIL LTDA", address: "Rod. Anchieta, Km 12", phone: "(11) 7777-8888" },
];

// Mock Data for Collection Requests
const mockColetas = [
  { id: 101, supplier: "ATMOSFERA GESTÃO", date: new Date(), status: "Agendado", driver: "João Santos", vehicle: "Van Ducato" },
  { id: 102, supplier: "SUL AMERICANA", date: new Date(Date.now() + 86400000), status: "Pendente", driver: "Não atribuído", vehicle: "-" },
  { id: 103, supplier: "ECO TÊXTIL LTDA", date: new Date(Date.now() - 86400000), status: "Realizado", driver: "Pedro Oliveira", vehicle: "Caminhão Toco" },
];

export default function SolicitacaoColeta() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [requests, setRequests] = useState(mockColetas);

  const handleCreateRequest = () => {
    if (!selectedSupplier || !date) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const supplierName = suppliers.find(s => s.id.toString() === selectedSupplier)?.name || "Fornecedor";
    
    const newRequest = {
      id: Math.floor(Math.random() * 1000) + 1000,
      supplier: supplierName,
      date: date,
      status: "Pendente",
      driver: "Não atribuído",
      vehicle: "-"
    };

    setRequests([newRequest, ...requests]);
    toast.success("Solicitação de coleta criada com sucesso!");
    setIsNewRequestOpen(false);
    setSelectedSupplier("");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <PageHeader 
          title="Solicitação de Coleta" 
          description="Gestão de agendamentos e retirada de matéria-prima nos fornecedores." 
          icon={Truck} 
        />
        <Button onClick={() => setIsNewRequestOpen(true)} className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar & Filters */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Calendário de Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
                locale={ptBR}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Filtros Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Filter className="mr-2 h-4 w-4" /> Pendentes
              </Button>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Truck className="mr-2 h-4 w-4" /> Em Rota
              </Button>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Check className="mr-2 h-4 w-4" /> Realizados
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Coletas Programadas</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar fornecedor..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Data Agendada</TableHead>
                    <TableHead>Motorista</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{req.supplier}</span>
                          <span className="text-xs text-muted-foreground">ID: #{req.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{format(req.date, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                      <TableCell>{req.driver}</TableCell>
                      <TableCell>
                        <Badge 
                          className={cn(
                            req.status === "Realizado" ? "bg-green-100 text-green-700 hover:bg-green-200" : 
                            req.status === "Agendado" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" :
                            "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          )}
                        >
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detalhes <ArrowRight className="ml-1 h-3 w-3" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Request Modal */}
      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Coleta</DialogTitle>
            <DialogDescription>
              Agende uma retirada de material com um fornecedor cadastrado.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Select onValueChange={setSelectedSupplier} value={selectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor..." />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(s => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Data Preferencial</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Input id="notes" placeholder="Ex: Material volumoso, precisa de caminhão grande" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateRequest}>Confirmar Agendamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
