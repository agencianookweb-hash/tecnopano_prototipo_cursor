import { useState } from "react";
import { 
  Truck, TruckIcon, Pencil, Trash2, Search, Filter
} from "lucide-react";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFornecedores, useDeleteFornecedor } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Fornecedores() {
  const { data: fornecedores, isLoading } = useFornecedores();
  const deleteFornecedor = useDeleteFornecedor();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await deleteFornecedor.mutateAsync(id);
        toast.success("Fornecedor excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir fornecedor");
      }
    }
  };

  const filteredFornecedores = fornecedores?.filter(f => 
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.razaoSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cnpj?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Fornecedores" 
        description="Gerencie fornecedores, contatos e informações comerciais." 
        icon={Truck} 
      />

      {/* Filter Bar */}
      <Card className="mb-6 shadow-sm border-none">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtro:</span>
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, razão social, CNPJ ou email..." 
                className="pl-9 bg-muted/30 border-muted"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
              <TruckIcon className="h-4 w-4 mr-2" />
              Adicionar Fornecedor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card className="shadow-sm border-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Fornecedores</CardTitle>
              <CardDescription>
                {isLoading ? "Carregando..." : `Total de ${filteredFornecedores.length} fornecedores cadastrados`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">Nome</TableHead>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFornecedores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      Nenhum fornecedor encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="pl-6 py-4 font-medium">{fornecedor.nome}</TableCell>
                      <TableCell>{fornecedor.razaoSocial || "-"}</TableCell>
                      <TableCell className="font-mono text-sm">{fornecedor.cnpj || "-"}</TableCell>
                      <TableCell>{fornecedor.email || "-"}</TableCell>
                      <TableCell>{fornecedor.telefone || "-"}</TableCell>
                      <TableCell>{fornecedor.contato || "-"}</TableCell>
                      <TableCell>{fornecedor.cidade || "-"}</TableCell>
                      <TableCell>{fornecedor.estado || "-"}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            fornecedor.ativo 
                              ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none"
                              : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none"
                          }
                        >
                          {fornecedor.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:text-destructive"
                            onClick={() => handleDelete(fornecedor.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
