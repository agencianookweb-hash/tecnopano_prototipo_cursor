import { useMockFlow, Lote } from "@/context/MockFlowContext";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, QrCode, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Helper to filter lotes by status
const getLotesByStatus = (lotes: Lote[], status: string) => lotes.filter(l => l.status === status);

export default function GalpaoPainel() {
  const { lotes, updateLoteStatus } = useMockFlow();
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [selectedLote, setSelectedLote] = useState<Lote | null>(null);

  const simulateScan = () => {
    // For demo, we just pick the first 'ENTRADA' lote to move to 'SEPARACAO'
    // or 'SEPARACAO' to 'PRODUCAO' etc.
    // In a real app this would open a camera or wait for input.
    
    // Let's find a lote that is in ENTRADA for the demo
    const loteToProcess = lotes.find(l => l.status === 'ENTRADA') || lotes[0];
    
    if (loteToProcess) {
      setSelectedLote(loteToProcess);
      setScanModalOpen(true);
    } else {
      toast.error("Nenhum lote disponível para escanear na simulação.");
    }
  };

  const processLote = () => {
    if (selectedLote) {
      // Simulate moving to next stage based on current stage
      let nextStage: any = 'SEPARACAO';
      if (selectedLote.status === 'SEPARACAO') nextStage = 'PRODUCAO';
      if (selectedLote.status === 'PRODUCAO') nextStage = 'ESTOQUE';
      
      updateLoteStatus(selectedLote.id, nextStage);
      toast.success(`Lote #${selectedLote.numero} movido para ${nextStage}`);
      setScanModalOpen(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <PageHeader 
          title="Painel do Galpão (Kanban)" 
          description="Visualização em tempo real do fluxo de lotes." 
          icon={LayoutDashboard} 
        />
        <Button onClick={simulateScan} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-md">
          <QrCode className="h-4 w-4" />
          Simular Scanner
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-[1200px] h-full">
          {/* Columns */}
          <KanbanColumn title="📥 Entrada" color="bg-blue-50 border-blue-100" lotes={getLotesByStatus(lotes, 'ENTRADA')} />
          <KanbanColumn title="🔄 Separação" color="bg-amber-50 border-amber-100" lotes={getLotesByStatus(lotes, 'SEPARACAO')} />
          <KanbanColumn title="✂️ Costureira" color="bg-purple-50 border-purple-100" lotes={getLotesByStatus(lotes, 'COSTUREIRA')} />
          <KanbanColumn title="🏭 Produção" color="bg-indigo-50 border-indigo-100" lotes={getLotesByStatus(lotes, 'PRODUCAO')} />
          <KanbanColumn title="📦 Estoque" color="bg-green-50 border-green-100" lotes={getLotesByStatus(lotes, 'ESTOQUE')} />
        </div>
      </div>

      {/* Scan Simulation Modal */}
      <Dialog open={scanModalOpen} onOpenChange={setScanModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scanner de QR Code</DialogTitle>
            <DialogDescription>
              Simulando leitura do código do lote...
            </DialogDescription>
          </DialogHeader>
          
          {selectedLote && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <QrCode className="h-16 w-16" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Lote #{selectedLote.numero}</h3>
                <p className="text-muted-foreground">{selectedLote.fornecedor}</p>
                <Badge className="mt-2">{selectedLote.status}</Badge>
              </div>
              
              <Button onClick={processLote} className="w-full mt-4">
                Processar Lote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function KanbanColumn({ title, color, lotes }: { title: string, color: string, lotes: Lote[] }) {
  return (
    <div className={`flex-1 rounded-xl border flex flex-col ${color}`}>
      <div className="p-4 border-b bg-white/50 backdrop-blur-sm rounded-t-xl">
        <h3 className="font-bold text-slate-700 flex justify-between items-center">
          {title}
          <Badge variant="secondary" className="bg-white">{lotes.length}</Badge>
        </h3>
      </div>
      <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
        {lotes.map(lote => (
          <Card key={lote.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="font-mono">#{lote.numero}</Badge>
                <span className="text-xs font-medium text-slate-500">{new Date(lote.dataEntrada).toLocaleDateString()}</span>
              </div>
              <p className="text-sm font-medium line-clamp-1 mb-1">{lote.fornecedor}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold">{lote.pesoAtual} kg</span>
                {lote.tipoMaterial && <span>• {lote.tipoMaterial}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
        {lotes.length === 0 && (
          <div className="h-24 flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
            Vazio
          </div>
        )}
      </div>
    </div>
  );
}
