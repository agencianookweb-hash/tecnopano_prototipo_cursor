import { useState } from "react";
import { useMockFlow, Lote } from "@/context/MockFlowContext";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Box, Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function EstoqueEntrada() {
  const { lotes, updateLoteStatus } = useMockFlow();
  const [activeLote, setActiveLote] = useState<Lote | null>(null);

  const handleScan = () => {
    const pending = lotes.find(l => l.status === 'ESTOQUE' && !l.produtos); // Just a mock check, usually status 'ESTOQUE' implies it IS in stock, but let's say 'TRANSITO_ESTOQUE' in real app
    // For this mock, we'll pick the one we just finished in production
    const readyForStock = lotes.find(l => l.status === 'ESTOQUE'); // In our simplified mock, finishing production puts it in ESTOQUE status immediately.
    
    // To make this screen useful, let's assume we are scanning to CONFIRM shelf location
    if (readyForStock) {
      setActiveLote(readyForStock);
      toast.success(`Lote #${readyForStock.numero} recebido no estoque.`);
    } else {
      toast.warning("Nenhum item aguardando alocação.");
    }
  };

  const handleConfirm = () => {
    if (activeLote) {
      toast.success(`Lote #${activeLote.numero} alocado na Rua B, Prateleira 4.`);
      setActiveLote(null);
    }
  };

  if (!activeLote) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <Box className="h-12 w-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Entrada de Estoque</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Escaneie os produtos finalizados para definir a localização de armazenagem.
          </p>
        </div>
        <Button size="lg" className="h-14 px-8 text-lg bg-green-600 hover:bg-green-700" onClick={handleScan}>
          <QrCode className="mr-2 h-5 w-5" /> Receber Produção
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4">
      <PageHeader 
        title="Alocação de Estoque" 
        description={`Definir local para Lote #${activeLote.numero}`} 
        icon={Box} 
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold">Conteúdo do Lote</h3>
              <p className="text-slate-500">{activeLote.tipoMaterial} - {activeLote.cor}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Pronto para Alocação</Badge>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase">Sugestão de Endereçamento</h4>
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-black text-slate-900">RUA B - 04 - A</p>
                <p className="text-sm text-slate-500">Zona de Panos Prontos</p>
              </div>
            </div>
          </div>

          {activeLote.produtos && (
             <div className="space-y-2 mb-6">
               <h4 className="text-sm font-semibold text-slate-500">Itens:</h4>
               {activeLote.produtos.map((p, i) => (
                 <div key={i} className="flex justify-between border-b pb-2">
                   <span>{p.produto}</span>
                   <span className="font-bold">{p.quantidade} un</span>
                 </div>
               ))}
             </div>
          )}

          <Button className="w-full h-14 text-lg bg-slate-900 text-white" onClick={handleConfirm}>
            <Check className="mr-2 h-5 w-5" /> Confirmar Alocação
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
