import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/lib/api';
import type {
  Fornecedor,
  Coleta,
  Lote,
  Separacao,
  Producao,
  Estoque,
  Produto,
  Cliente,
  InsertFornecedor,
  InsertColeta,
  InsertLote,
  InsertSeparacao,
  InsertProducao,
  InsertEstoque,
  InsertProduto,
  InsertCliente,
} from '@shared/schema';

// ==================== FORNECEDORES ====================
export function useFornecedores() {
  return useQuery({
    queryKey: ['fornecedores'],
    queryFn: api.getFornecedores,
  });
}

export function useFornecedor(id: string) {
  return useQuery({
    queryKey: ['fornecedores', id],
    queryFn: () => api.getFornecedor(id),
    enabled: !!id,
  });
}

export function useCreateFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createFornecedor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fornecedores'] });
    },
  });
}

export function useUpdateFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertFornecedor> }) =>
      api.updateFornecedor(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['fornecedores'] });
      queryClient.invalidateQueries({ queryKey: ['fornecedores', variables.id] });
    },
  });
}

export function useDeleteFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteFornecedor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fornecedores'] });
    },
  });
}

// ==================== COLETAS ====================
export function useColetas() {
  return useQuery({
    queryKey: ['coletas'],
    queryFn: api.getColetas,
  });
}

export function useColeta(id: string) {
  return useQuery({
    queryKey: ['coletas', id],
    queryFn: () => api.getColeta(id),
    enabled: !!id,
  });
}

export function useCreateColeta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createColeta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coletas'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

export function useUpdateColeta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertColeta> }) =>
      api.updateColeta(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['coletas'] });
      queryClient.invalidateQueries({ queryKey: ['coletas', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

export function useDeleteColeta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteColeta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coletas'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

// ==================== LOTES ====================
export function useLotes() {
  return useQuery({
    queryKey: ['lotes'],
    queryFn: api.getLotes,
  });
}

export function useLote(id: string) {
  return useQuery({
    queryKey: ['lotes', id],
    queryFn: () => api.getLote(id),
    enabled: !!id,
  });
}

export function useLoteByQRCode(qrCode: string) {
  return useQuery({
    queryKey: ['lotes', 'qrcode', qrCode],
    queryFn: () => api.getLoteByQRCode(qrCode),
    enabled: !!qrCode,
  });
}

export function useCreateLote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lotes'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

export function useUpdateLote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertLote> }) =>
      api.updateLote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lotes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

// ==================== SEPARAÇÃO ====================
export function useSeparacoes() {
  return useQuery({
    queryKey: ['separacoes'],
    queryFn: api.getSeparacoes,
  });
}

export function useSeparacoesByLote(loteId: string) {
  return useQuery({
    queryKey: ['separacoes', 'lote', loteId],
    queryFn: () => api.getSeparacoesByLote(loteId),
    enabled: !!loteId,
  });
}

export function useCreateSeparacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createSeparacao,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['separacoes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes', data.loteId] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

// ==================== PRODUÇÃO ====================
export function useProducoes() {
  return useQuery({
    queryKey: ['producoes'],
    queryFn: api.getProducoes,
  });
}

export function useProducoesByLote(loteId: string) {
  return useQuery({
    queryKey: ['producoes', 'lote', loteId],
    queryFn: () => api.getProducoesByLote(loteId),
    enabled: !!loteId,
  });
}

export function useCreateProducao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createProducao,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['producoes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes', data.loteId] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

export function useUpdateProducao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertProducao> }) =>
      api.updateProducao(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['producoes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes'] });
      queryClient.invalidateQueries({ queryKey: ['lotes', data.loteId] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

// ==================== ESTOQUE ====================
export function useEstoques() {
  return useQuery({
    queryKey: ['estoques'],
    queryFn: api.getEstoques,
  });
}

export function useCreateEstoque() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createEstoque,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estoques'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'dashboard'] });
    },
  });
}

// ==================== PRODUTOS ====================
export function useProdutos() {
  return useQuery({
    queryKey: ['produtos'],
    queryFn: api.getProdutos,
  });
}

export function useProduto(id: string) {
  return useQuery({
    queryKey: ['produtos', id],
    queryFn: () => api.getProduto(id),
    enabled: !!id,
  });
}

export function useProdutoByCodigo(codigo: string) {
  return useQuery({
    queryKey: ['produtos', 'codigo', codigo],
    queryFn: () => api.getProdutoByCodigo(codigo),
    enabled: !!codigo,
  });
}

export function useCreateProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createProduto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
    },
  });
}

export function useUpdateProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertProduto> }) =>
      api.updateProduto(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      queryClient.invalidateQueries({ queryKey: ['produtos', variables.id] });
    },
  });
}

export function useDeleteProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteProduto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
    },
  });
}

// ==================== CLIENTES ====================
export function useClientes() {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: api.getClientes,
  });
}

export function useCliente(id: string) {
  return useQuery({
    queryKey: ['clientes', id],
    queryFn: () => api.getCliente(id),
    enabled: !!id,
  });
}

export function useCreateCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}

export function useUpdateCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertCliente> }) =>
      api.updateCliente(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      queryClient.invalidateQueries({ queryKey: ['clientes', variables.id] });
    },
  });
}

export function useDeleteCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}

// ==================== DASHBOARD STATS ====================
export function useDashboardStats() {
  return useQuery({
    queryKey: ['stats', 'dashboard'],
    queryFn: api.getDashboardStats,
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });
}
