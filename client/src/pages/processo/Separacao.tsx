import { useState, useEffect } from "react";
import { useMockFlow, Lote } from "@/context/MockFlowContext";
import { PageHeader } from "@/components/domain/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, QrCode, ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";

export default function Separacao() {
  const { lotes, updateLoteStatus } = useMockFlow();
  const [activeLote, setActiveLote] = useState<Lote | null>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    cor: "",
    pesoUtil: "",
    destino: ""
  });

  // Simulator: Auto-select a lote in SEPARACAO state if none active
  useEffect(() => {
    if (!activeLote) {
      const pending = lotes.find(l => l.status === 'SEPARACAO');
      // We don't auto-set to active to simulate "waiting for scan", 
      // but for this mock we'll show a "Scan" button if there are pending items.
    }
  }, [lotes, activeLote]);

  const handleScan = () => {
    const pending = lotes.find(l => l.status === 'SEPARACAO');
    if (pending) {
      setActiveLote(pending);
      setFormData({
        tipo: pending.tipoMaterial || "",
        cor: pending.cor || "",
        pesoUtil: String(pending.pesoAtual), // Default to full weight
        destino: pending.destino || ""
      });
      toast.info(`Lote #${pending.numero} identificado.`);
    } else {
      toast.warning("Nenhum lote aguardando separação.");
    }
  };

  const handleSave = () => {
    if (activeLote) {
      updateLoteStatus(activeLote.id, 'PRODUCAO', {
        tipoMaterial: formData.tipo,
        cor: formData.cor,
        pesoAtual: Number(formData.pesoUtil), // Update weight based on separation
        destino: formData.destino
      });
      toast.success("Separação concluída! Enviado para Produção.");
      setActiveLote(null);
      setFormData({ tipo: "", cor: "", pesoUtil: "", destino: "" });
    }
  };

  if (!activeLote) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <QrCode className="h-12 w-12 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Aguardando Leitura</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Escaneie o QR Code do lote para iniciar o processo de triagem e separação.
          </p>
        </div>
        <Button size="lg" className="h-14 px-8 text-lg" onClick={handleScan}>
          <QrCode className="mr-2 h-5 w-5" /> Escanear Lote
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4">
      <PageHeader 
        title="Triagem & Separação" 
        description={`Processando Lote #${activeLote.numero}`} 
        icon={ClipboardList} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Classificação do Material</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Material</Label>
                  <Select 
                    value={formData.tipo} 
                    onValueChange={(v) => setFormData({...formData, tipo: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="algodao">Algodão</SelectItem>
                      <SelectItem value="poliester">Poliéster</SelectItem>
                      <SelectItem value="mistos">Mistos</SelectItem>
                      <SelectItem value="tnt">TNT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cor Principal</Label>
                  <Select
                    value={formData.cor}
                    onValueChange={(v) => setFormData({...formData, cor: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branco">Branco</SelectItem>
                      <SelectItem value="colorido">Colorido</SelectItem>
                      <SelectItem value="escuro">Escuro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Destino</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Produção', 'Costureira', 'Repanol'].map((dest) => (
                    <div 
                      key={dest}
                      onClick={() => setFormData({...formData, destino: dest})}
                      className={`
                        cursor-pointer border rounded-md p-3 text-center transition-all
                        ${formData.destino === dest 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                          : 'bg-white hover:bg-slate-50 text-slate-600'}
                      `}
                    >
                      {dest}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pesagem Pós-Triagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Peso Original (Lote)</Label>
                  <div className="text-2xl font-mono font-bold text-slate-400">
                    {activeLote.pesoAtual} <span className="text-sm">kg</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Peso Útil (Aproveitado)</Label>
                  <Input 
                    type="number" 
                    value={formData.pesoUtil}
                    onChange={(e) => setFormData({...formData, pesoUtil: e.target.value})}
                    className="text-2xl font-bold text-green-700 bg-green-50 border-green-200"
                  />
                </div>
              </div>
              
              {formData.pesoUtil && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-100 flex justify-between items-center">
                  <span>Resíduo (Descarte):</span>
                  <span className="font-bold">
                    {(activeLote.pesoAtual - Number(formData.pesoUtil)).toFixed(2)} kg
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-50 border-dashed">
            <CardHeader>
              <CardTitle className="text-sm uppercase text-slate-500">Resumo do Lote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs text-slate-400">Número</span>
                <p className="font-mono font-bold text-lg">#{activeLote.numero}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Fornecedor</span>
                <p className="font-medium">{activeLote.fornecedor}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Data Entrada</span>
                <p className="font-medium">{new Date(activeLote.dataEntrada).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700" onClick={handleSave}>
            <Save className="mr-2 h-5 w-5" /> Finalizar Triagem
          </Button>
          
          <Button variant="outline" className="w-full" onClick={() => setActiveLote(null)}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
