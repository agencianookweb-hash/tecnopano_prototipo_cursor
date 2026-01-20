import { useState, useEffect } from "react";
import { useMockFlow, Lote } from "@/context/MockFlowContext";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Package, Check, Printer } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Producao() {
  const { lotes, updateLoteStatus } = useMockFlow();
  const [activeLote, setActiveLote] = useState<Lote | null>(null);
  const [productionItems, setProductionItems] = useState<{produto: string, qtd: number}[]>([]);
  const [newItem, setNewItem] = useState({ produto: "", qtd: "" });

  const handleScan = () => {
    const pending = lotes.find(l => l.status === 'PRODUCAO');
    if (pending) {
      setActiveLote(pending);
      toast.success(`Lote #${pending.numero} em produção.`);
    } else {
      toast.warning("Nenhum lote pronto para produção.");
    }
  };

  const handleAddItem = () => {
    if (newItem.produto && newItem.qtd) {
      setProductionItems([...productionItems, { 
        produto: newItem.produto, 
        qtd: Number(newItem.qtd) 
      }]);
      setNewItem({ produto: "", qtd: "" });
    }
  };

  const handleFinish = () => {
    if (activeLote) {
      updateLoteStatus(activeLote.id, 'ESTOQUE', {
        produtos: productionItems.map(item => ({
          produto: item.produto,
          quantidade: item.qtd
        }))
      });
      toast.success("Produção finalizada! Enviado para estoque.");
      setActiveLote(null);
      setProductionItems([]);
    }
  };

  if (!activeLote) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <Package className="h-12 w-12 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Linha de Produção</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Escaneie o lote para registrar a produção de panos e gerar etiquetas finais.
          </p>
        </div>
        <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700" onClick={handleScan}>
          <QrCode className="mr-2 h-5 w-5" /> Iniciar Produção
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4">
      <PageHeader 
        title="Registro de Produção" 
        description={`Lote #${activeLote.numero} - ${activeLote.tipoMaterial} / ${activeLote.cor}`} 
        icon={Package} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="col-span-2 space-y-2">
                  <Label>Produto Produzido</Label>
                  <Input 
                    placeholder="Ex: Pano de Prato 40x60" 
                    value={newItem.produto}
                    onChange={e => setNewItem({...newItem, produto: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newItem.qtd}
                    onChange={e => setNewItem({...newItem, qtd: e.target.value})}
                  />
                </div>
              </div>
              <Button variant="secondary" className="w-full" onClick={handleAddItem}>
                + Adicionar Item
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Qtd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                        Nenhum item adicionado ainda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    productionItems.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.produto}</TableCell>
                        <TableCell className="text-right font-bold">{item.qtd}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-indigo-50 border-indigo-100">
            <CardContent className="p-6">
              <h3 className="font-bold text-indigo-900 mb-2">Total Produzido</h3>
              <p className="text-4xl font-black text-indigo-700">
                {productionItems.reduce((acc, curr) => acc + curr.qtd, 0)} <span className="text-lg font-normal text-indigo-500">un</span>
              </p>
            </CardContent>
          </Card>

          <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 gap-2" onClick={handleFinish} disabled={productionItems.length === 0}>
            <Check className="h-5 w-5" /> Enviar p/ Estoque
          </Button>

          <Button variant="outline" className="w-full gap-2">
            <Printer className="h-4 w-4" /> Imprimir Etiquetas
          </Button>
        </div>
      </div>
    </div>
  );
}
