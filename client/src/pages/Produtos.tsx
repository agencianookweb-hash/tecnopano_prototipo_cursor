import { useState } from "react";
import { 
  Package, PackagePlus, Pencil, Trash2, Search, Filter
} from "lucide-react";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useProdutos, useDeleteProduto } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Produtos() {
  const { data: produtos, isLoading } = useProdutos();
  const deleteProduto = useDeleteProduto();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduto.mutateAsync(id);
        toast.success("Produto excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir produto");
      }
    }
  };

  const filteredProdutos = produtos?.filter(p => 
    p.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.acabamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cor?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Produtos" 
        description="Gerencie produtos, preços e estoque mínimo." 
        icon={Package} 
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
                placeholder="Buscar por descrição, acabamento, cor ou ID..." 
                className="pl-9 bg-muted/30 border-muted"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
              <PackagePlus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card className="shadow-sm border-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Produtos</CardTitle>
              <CardDescription>
                {isLoading ? "Carregando..." : `Total de ${filteredProdutos.length} produtos cadastrados`}
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
                  <TableHead>Descrição do Produto</TableHead>
                  <TableHead>Acabamento</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead>Medida</TableHead>
                  <TableHead>Nota Fiscal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProdutos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProdutos.map((produto) => (
                    <TableRow key={produto.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="pl-6 py-4 font-mono text-sm">{produto.codigo || produto.id.substring(0, 8)}</TableCell>
                      <TableCell className="font-medium">{produto.nome || produto.descricao || "-"}</TableCell>
                      <TableCell>{produto.acabamento || "-"}</TableCell>
                      <TableCell>{produto.cor || "-"}</TableCell>
                      <TableCell>{produto.medida || produto.unidadeMedida || "-"}</TableCell>
                      <TableCell>{produto.notaFiscal || "-"}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            produto.ativo 
                              ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none"
                              : "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none"
                          }
                        >
                          {produto.ativo ? "Ativo" : "Inativo"}
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
                            onClick={() => handleDelete(produto.id)}
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
