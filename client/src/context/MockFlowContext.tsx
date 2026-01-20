import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types based on the PRD
export type LoteStatus = 'ENTRADA' | 'SEPARACAO' | 'COSTUREIRA' | 'REPANOL' | 'PRODUCAO' | 'ESTOQUE' | 'RESIDUO';

export interface Lote {
  id: string;
  numero: number;
  fornecedor: string;
  pesoNF: number;
  pesoAtual: number;
  dataEntrada: string;
  status: LoteStatus;
  qrCodeData: string;
  // Data added during processes
  tipoMaterial?: string;
  cor?: string;
  destino?: string;
  produtos?: { produto: string; quantidade: number }[];
}

interface MockFlowContextType {
  lotes: Lote[];
  addLote: (lote: Omit<Lote, 'id' | 'status' | 'qrCodeData'>) => void;
  updateLoteStatus: (id: string, status: LoteStatus, data?: Partial<Lote>) => void;
  getLoteByQR: (qrData: string) => Lote | undefined;
}

const MockFlowContext = createContext<MockFlowContextType | undefined>(undefined);

export function MockFlowProvider({ children }: { children: ReactNode }) {
  const [lotes, setLotes] = useState<Lote[]>([
    {
      id: 'mock-1',
      numero: 248,
      fornecedor: 'ATMOSFERA GESTÃO',
      pesoNF: 555,
      pesoAtual: 550,
      dataEntrada: new Date().toISOString(),
      status: 'ENTRADA',
      qrCodeData: JSON.stringify({t:'LOTE', n:248, e:'ATMOSFERA'}),
    },
    {
      id: 'mock-2',
      numero: 247,
      fornecedor: 'SUL AMERICANA',
      pesoNF: 300,
      pesoAtual: 300,
      dataEntrada: new Date(Date.now() - 86400000).toISOString(),
      status: 'SEPARACAO',
      qrCodeData: JSON.stringify({t:'LOTE', n:247, e:'SUL'}),
    }
  ]);

  const addLote = (loteData: Omit<Lote, 'id' | 'status' | 'qrCodeData'>) => {
    const newLote: Lote = {
      ...loteData,
      id: `lote-${Date.now()}`,
      status: 'ENTRADA',
      qrCodeData: JSON.stringify({
        t: 'LOTE',
        n: loteData.numero,
        e: loteData.fornecedor,
        d: loteData.dataEntrada
      })
    };
    setLotes(prev => [...prev, newLote]);
  };

  const updateLoteStatus = (id: string, status: LoteStatus, data?: Partial<Lote>) => {
    setLotes(prev => prev.map(lote => {
      if (lote.id === id) {
        return { ...lote, status, ...data };
      }
      return lote;
    }));
  };

  const getLoteByQR = (qrData: string) => {
    // In a real app, we'd parse the QR. Here we simulate finding by ID or loosely matching
    return lotes.find(l => l.qrCodeData === qrData || l.id === qrData);
  };

  return (
    <MockFlowContext.Provider value={{ lotes, addLote, updateLoteStatus, getLoteByQR }}>
      {children}
    </MockFlowContext.Provider>
  );
}

export function useMockFlow() {
  const context = useContext(MockFlowContext);
  if (context === undefined) {
    throw new Error('useMockFlow must be used within a MockFlowProvider');
  }
  return context;
}
