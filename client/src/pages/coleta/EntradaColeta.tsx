import { useState } from "react";
import { useMockFlow } from "@/context/MockFlowContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/domain/PageHeader";
import { Truck, Printer, CheckCircle, AlertTriangle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

export default function EntradaColeta() {
  const { addLote } = useMockFlow();
  const [step, setStep] = useState<'form' | 'qr'>('form');
  const [formData, setFormData] = useState({
    fornecedor: "ATMOSFERA GESTÃO E HIGIENIZAÇÃO",
    numeroNF: "",
    valorNF: "",
    pesoNF: "",
    pesoAtual: ""
  });
  const [generatedLote, setGeneratedLote] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pesoNF = parseFloat(formData.pesoNF);
    const pesoAtual = parseFloat(formData.pesoAtual);
    
    // Simulate generation
    const novoLote = {
      numero: Math.floor(Math.random() * 1000) + 1000, // Random sequencial
      fornecedor: formData.fornecedor,
      pesoNF,
      pesoAtual,
      dataEntrada: new Date().toISOString()
    };
    
    setGeneratedLote(novoLote);
    setStep('qr');
  };

  const confirmEntrada = () => {
    if (generatedLote) {
      addLote(generatedLote);
      toast.success(`Lote #${generatedLote.numero} registrado com sucesso!`);
      setStep('form');
      setFormData({
        fornecedor: "ATMOSFERA GESTÃO E HIGIENIZAÇÃO",
        numeroNF: "",
        valorNF: "",
        pesoNF: "",
        pesoAtual: ""
      });
      setGeneratedLote(null);
    }
  };

  const pesoDiference = generatedLote ? generatedLote.pesoAtual - generatedLote.pesoNF : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <PageHeader 
        title="Entrada de Coleta" 
        description="Registro de nova carga e geração de etiqueta QR Code." 
        icon={Truck} 
      />

      {step === 'form' ? (
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle>Dados da Nota Fiscal</CardTitle>
            <CardDescription>Preencha os dados da carga recebida para gerar a etiqueta.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor / Coleta</Label>
                <Input 
                  id="fornecedor" 
                  name="fornecedor" 
                  value={formData.fornecedor} 
                  onChange={handleInputChange} 
                  className="bg-muted/30" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroNF">Número NF</Label>
                  <Input 
                    id="numeroNF" 
                    name="numeroNF" 
                    placeholder="Ex: 7777" 
                    value={formData.numeroNF}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorNF">Valor NF (R$)</Label>
                  <Input 
                    id="valorNF" 
                    name="valorNF" 
                    placeholder="0,00" 
                    value={formData.valorNF}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="pesoNF">Peso na NF (kg)</Label>
                  <Input 
                    id="pesoNF" 
                    name="pesoNF" 
                    type="number" 
                    placeholder="0" 
                    className="text-lg font-bold"
                    value={formData.pesoNF}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pesoAtual">Pesagem Atual (kg)</Label>
                  <Input 
                    id="pesoAtual" 
                    name="pesoAtual" 
                    type="number" 
                    placeholder="0" 
                    className="text-lg font-bold bg-blue-50 border-blue-200 text-blue-700"
                    value={formData.pesoAtual}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-medium">
                Gerar Etiqueta QR Code
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg border-none bg-slate-50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-green-700 flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Lote Criado com Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center">
              <div className="mb-4">
                <QRCodeSVG 
                  value={JSON.stringify({t:'LOTE', n:generatedLote?.numero})} 
                  size={200}
                  level="H"
                />
              </div>
              <h2 className="text-3xl font-black text-slate-900">LOTE #{generatedLote?.numero}</h2>
              <p className="text-lg font-medium text-slate-600">{generatedLote?.fornecedor}</p>
              <div className="mt-4 flex gap-4 text-sm font-mono text-slate-500">
                <span>{generatedLote?.pesoAtual} kg</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {pesoDiference !== 0 && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${pesoDiference < 0 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-bold">Divergência de Peso Identificada</p>
                  <p className="text-sm">
                    Diferença de {pesoDiference > 0 ? '+' : ''}{pesoDiference} kg em relação à Nota Fiscal.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 gap-2" onClick={() => toast.info("Enviando para impressora...")}>
                <Printer className="h-4 w-4" />
                Imprimir Etiqueta
              </Button>
              <Button className="h-12 bg-green-600 hover:bg-green-700 text-white gap-2" onClick={confirmEntrada}>
                <CheckCircle className="h-4 w-4" />
                Confirmar Entrada
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
