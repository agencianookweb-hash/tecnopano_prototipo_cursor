import { useState } from "react";
import { 
  Users, UserPlus, MessageCircle, Pencil, Copy, Trash2, 
  ChevronLeft, ChevronRight, Mail, Filter, Search 
} from "lucide-react";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data
const members = [
  { id: 1, name: "Maria Silva", email: "maria@tecnopano.com.br", role: "Costureira", whatsapp: "(11) 99999-1234", admission: "2023-01-15", status: "Ativo" },
  { id: 2, name: "João Santos", email: "joao@tecnopano.com.br", role: "Motorista", whatsapp: "(11) 98888-5678", admission: "2023-03-10", status: "Pendente" },
  { id: 3, name: "Ana Costa", email: "ana@tecnopano.com.br", role: "Expedição", whatsapp: "(11) 97777-9012", admission: "2023-05-20", status: "Ativo" },
  { id: 4, name: "Pedro Oliveira", email: "pedro@tecnopano.com.br", role: "Galpão", whatsapp: "(11) 96666-3456", admission: "2023-06-01", status: "Inativo" },
  { id: 5, name: "Carla Souza", email: "carla@tecnopano.com.br", role: "Financeiro", whatsapp: "(11) 95555-7890", admission: "2023-07-15", status: "Ativo" },
  { id: 6, name: "Lucas Ferreira", email: "lucas@tecnopano.com.br", role: "Produção", whatsapp: "(11) 94444-1234", admission: "2023-08-01", status: "Ativo" },
];

export default function Team() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Controle da Equipe" 
        description="Gerencie membros, envie credenciais e acompanhe status." 
        icon={Users} 
      />

      {/* Filter Bar */}
      <Card className="mb-6 shadow-sm border-none">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtro:</span>
            </div>

            <Input type="date" className="w-40 bg-muted/30 border-muted" />
            <Input type="date" className="w-40 bg-muted/30 border-muted" />

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar membro..." className="pl-9 bg-muted/30 border-muted" />
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por Cargo" className="pl-9 bg-muted/30 border-muted" />
            </div>

            <Select>
              <SelectTrigger className="w-32 bg-muted/30 border-muted">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card className="shadow-sm border-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Membros da Equipe</CardTitle>
              <CardDescription>Total de {members.length} colaboradores cadastrados</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-6">Membro</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Data Admissão</TableHead>
                <TableHead>Credenciais</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/10 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${item.id}`} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {item.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{item.whatsapp}</TableCell>
                  <TableCell>{new Date(item.admission).toLocaleDateString('pt-BR')}</TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>Não enviado</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      className={
                        item.status === 'Ativo' ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none" :
                        item.status === 'Pendente' ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 shadow-none" :
                        "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t bg-muted/10">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Exibir:</span>
              <Select 
                value={String(itemsPerPage)} 
                onValueChange={(v) => setItemsPerPage(Number(v))}
              >
                <SelectTrigger className="w-16 h-8 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                pág. {currentPage}-{Math.min(currentPage * itemsPerPage, members.length)} de {members.length}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage * itemsPerPage >= members.length}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
