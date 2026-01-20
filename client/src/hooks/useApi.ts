import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Fornecedor,
  InsertFornecedor,
  Coleta,
  InsertColeta,
  Lote,
  InsertLote,
  Separacao,
  InsertSeparacao,
  Producao,
  InsertProducao,
  Estoque,
  InsertEstoque,
} from "@shared/schema";

const API_BASE = "/api";

// ==================== FETCH HELPERS ====================
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

async function postApi<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

async function putApi<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

async function deleteApi(endpoint: string): Promise<void> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
}

// ==================== FORNECEDORES ====================
export function useFornecedores() {
  return useQuery({
    queryKey: ["fornecedores"],
    queryFn: () => fetchApi<Fornecedor[]>("/fornecedores"),
  });
}

export function useFornecedor(id: string) {
  return useQuery({
    queryKey: ["fornecedores", id],
    queryFn: () => fetchApi<Fornecedor>(`/fornecedores/${id}`),
    enabled: !!id,
  });
}

export function useCreateFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertFornecedor) =>
      postApi<Fornecedor>("/fornecedores", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
    },
  });
}

export function useUpdateFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertFornecedor> }) =>
      putApi<Fornecedor>(`/fornecedores/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
    },
  });
}

export function useDeleteFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteApi(`/fornecedores/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
    },
  });
}

// ==================== COLETAS ====================
export function useColetas() {
  return useQuery({
    queryKey: ["coletas"],
    queryFn: () => fetchApi<Coleta[]>("/coletas"),
  });
}

export function useColeta(id: string) {
  return useQuery({
    queryKey: ["coletas", id],
    queryFn: () => fetchApi<Coleta>(`/coletas/${id}`),
    enabled: !!id,
  });
}

export function useCreateColeta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertColeta) => postApi<Coleta>("/coletas", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coletas"] });
    },
  });
}

export function useUpdateColeta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertColeta> }) =>
      putApi<Coleta>(`/coletas/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coletas"] });
    },
  });
}

export function useDeleteColeta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteApi(`/coletas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coletas"] });
    },
  });
}

// ==================== LOTES ====================
export function useLotes() {
  return useQuery({
    queryKey: ["lotes"],
    queryFn: () => fetchApi<Lote[]>("/lotes"),
  });
}

export function useLote(id: string) {
  return useQuery({
    queryKey: ["lotes", id],
    queryFn: () => fetchApi<Lote>(`/lotes/${id}`),
    enabled: !!id,
  });
}

export function useLoteByQRCode(qrCode: string) {
  return useQuery({
    queryKey: ["lotes", "qrcode", qrCode],
    queryFn: () => fetchApi<Lote>(`/lotes/qrcode/${qrCode}`),
    enabled: !!qrCode,
  });
}

export function useCreateLote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertLote) => postApi<Lote>("/lotes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
    },
  });
}

export function useUpdateLote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertLote> }) =>
      putApi<Lote>(`/lotes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
    },
  });
}

// ==================== SEPARAÇÃO ====================
export function useSeparacoes() {
  return useQuery({
    queryKey: ["separacoes"],
    queryFn: () => fetchApi<Separacao[]>("/separacoes"),
  });
}

export function useSeparacao(id: string) {
  return useQuery({
    queryKey: ["separacoes", id],
    queryFn: () => fetchApi<Separacao>(`/separacoes/${id}`),
    enabled: !!id,
  });
}

export function useSeparacoesByLote(loteId: string) {
  return useQuery({
    queryKey: ["separacoes", "lote", loteId],
    queryFn: () => fetchApi<Separacao[]>(`/separacoes/lote/${loteId}`),
    enabled: !!loteId,
  });
}

export function useCreateSeparacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertSeparacao) =>
      postApi<Separacao>("/separacoes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["separacoes"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
    },
  });
}

// ==================== PRODUÇÃO ====================
export function useProducoes() {
  return useQuery({
    queryKey: ["producoes"],
    queryFn: () => fetchApi<Producao[]>("/producoes"),
  });
}

export function useProducao(id: string) {
  return useQuery({
    queryKey: ["producoes", id],
    queryFn: () => fetchApi<Producao>(`/producoes/${id}`),
    enabled: !!id,
  });
}

export function useProducoesByLote(loteId: string) {
  return useQuery({
    queryKey: ["producoes", "lote", loteId],
    queryFn: () => fetchApi<Producao[]>(`/producoes/lote/${loteId}`),
    enabled: !!loteId,
  });
}

export function useCreateProducao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertProducao) => postApi<Producao>("/producoes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producoes"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
    },
  });
}

export function useUpdateProducao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertProducao> }) =>
      putApi<Producao>(`/producoes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producoes"] });
    },
  });
}

// ==================== ESTOQUE ====================
export function useEstoques() {
  return useQuery({
    queryKey: ["estoques"],
    queryFn: () => fetchApi<Estoque[]>("/estoques"),
  });
}

export function useEstoque(id: string) {
  return useQuery({
    queryKey: ["estoques", id],
    queryFn: () => fetchApi<Estoque>(`/estoques/${id}`),
    enabled: !!id,
  });
}

export function useCreateEstoque() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertEstoque) => postApi<Estoque>("/estoques", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estoques"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
    },
  });
}

// ==================== DASHBOARD STATS ====================
export interface DashboardStats {
  totalColetas: number;
  coletasPendentes: number;
  coletasRealizadas: number;
  lotesEmProcessamento: number;
  producoesEmAndamento: number;
  lotesCriticos: number;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["stats", "dashboard"],
    queryFn: () => fetchApi<DashboardStats>("/stats/dashboard"),
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });
}
