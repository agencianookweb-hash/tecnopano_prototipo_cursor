import { useState, useMemo, useEffect } from "react";
import { 
  Users, UserPlus, Pencil, Trash2, Search, Filter, ChevronLeft, ChevronRight
} from "lucide-react";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useClientes, useDeleteCliente } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Clientes() {
  const { data: clientes, isLoading } = useClientes();
  const deleteCliente = useDeleteCliente();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await deleteCliente.mutateAsync(id);
        toast.success("Cliente excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir cliente");
      }
    }
  };

  // Filtrar e ordenar clientes (completos primeiro)
  const filteredClientesMemo = useMemo(() => {
    const filtered = clientes?.filter(c => 
      c.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.razaoSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnpj?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cpf?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contato?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Ordenar: clientes completos primeiro (com razão social E contato)
    return filtered.sort((a, b) => {
      const aCompleto = a.razaoSocial && a.contato && a.telefone && a.cidade;
      const bCompleto = b.razaoSocial && b.contato && b.telefone && b.cidade;
      
      if (aCompleto && !bCompleto) return -1;
      if (!aCompleto && bCompleto) return 1;
      return 0; // Mantém ordem original se ambos completos ou incompletos
    });
  }, [clientes, searchTerm]);

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filteredClientesMemo.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClientes = useMemo(() => 
    filteredClientesMemo.slice(startIndex, endIndex),
    [filteredClientesMemo, startIndex, endIndex]
  );

  // Resetar para primeira página quando mudar filtro ou items per page
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Clientes" 
        description="Gerencie clientes, contatos e informações comerciais." 
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

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome fantasia, razão social, CPF/CNPJ, contato ou ID..." 
                className="pl-9 bg-muted/30 border-muted"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Cliente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card className="shadow-sm border-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {isLoading ? "Carregando..." : `Total de ${filteredClientesMemo.length} clientes cadastrados${filteredClientesMemo.length > itemsPerPage ? ` - Página ${currentPage} de ${totalPages}` : ''}`}
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
                  <TableHead className="pl-6">ID</TableHead>
                  <TableHead>Nome Fantasia</TableHead>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>CPF/CNPJ</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedClientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedClientes.map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="pl-6 py-4 font-mono text-xs text-muted-foreground">
                        {cliente.id.substring(0, 8)}
                      </TableCell>
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell>{cliente.razaoSocial || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {cliente.tipo === "fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {cliente.cpfCnpj || cliente.cpf || cliente.cnpj || "-"}
                      </TableCell>
                      <TableCell>{cliente.contato || "-"}</TableCell>
                      <TableCell>{cliente.telefone || "-"}</TableCell>
                      <TableCell>{cliente.cidade || "-"}</TableCell>
                      <TableCell>{cliente.estado || "-"}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            cliente.ativo 
                              ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none"
                              : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none"
                          }
                        >
                          {cliente.ativo ? "Ativo" : "Inativo"}
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
                            onClick={() => handleDelete(cliente.id)}
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

        {/* Paginação */}
        {!isLoading && filteredClientesMemo.length > 0 && (
          <div className="border-t border-border p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Itens por página:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>

              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredClientesMemo.length)} de {filteredClientesMemo.length} clientes
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
