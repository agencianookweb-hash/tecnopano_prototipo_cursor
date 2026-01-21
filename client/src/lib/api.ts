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

const API_BASE_URL = '/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch {
        // Se não conseguir parsear JSON, usar mensagem padrão
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Garantir que erros sejam sempre Error objects
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error) || 'Erro desconhecido na requisição');
  }
}

// ==================== FORNECEDORES ====================
export async function getFornecedores(): Promise<Fornecedor[]> {
  return fetchAPI<Fornecedor[]>('/fornecedores');
}

export async function getFornecedor(id: string): Promise<Fornecedor> {
  return fetchAPI<Fornecedor>(`/fornecedores/${id}`);
}

export async function createFornecedor(data: InsertFornecedor): Promise<Fornecedor> {
  return fetchAPI<Fornecedor>('/fornecedores', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateFornecedor(id: string, data: Partial<InsertFornecedor>): Promise<Fornecedor> {
  return fetchAPI<Fornecedor>(`/fornecedores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFornecedor(id: string): Promise<void> {
  return fetchAPI<void>(`/fornecedores/${id}`, {
    method: 'DELETE',
  });
}

// ==================== COLETAS ====================
export async function getColetas(): Promise<Coleta[]> {
  return fetchAPI<Coleta[]>('/coletas');
}

export async function getColeta(id: string): Promise<Coleta> {
  return fetchAPI<Coleta>(`/coletas/${id}`);
}

export async function createColeta(data: InsertColeta): Promise<Coleta> {
  return fetchAPI<Coleta>('/coletas', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateColeta(id: string, data: Partial<InsertColeta>): Promise<Coleta> {
  return fetchAPI<Coleta>(`/coletas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteColeta(id: string): Promise<void> {
  return fetchAPI<void>(`/coletas/${id}`, {
    method: 'DELETE',
  });
}

// ==================== LOTES ====================
export async function getLotes(): Promise<Lote[]> {
  return fetchAPI<Lote[]>('/lotes');
}

export async function getLote(id: string): Promise<Lote> {
  return fetchAPI<Lote>(`/lotes/${id}`);
}

export async function getLoteByQRCode(qrCode: string): Promise<Lote> {
  return fetchAPI<Lote>(`/lotes/qrcode/${encodeURIComponent(qrCode)}`);
}

export async function createLote(data: InsertLote): Promise<Lote> {
  return fetchAPI<Lote>('/lotes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateLote(id: string, data: Partial<InsertLote>): Promise<Lote> {
  return fetchAPI<Lote>(`/lotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ==================== SEPARAÇÃO ====================
export async function getSeparacoes(): Promise<Separacao[]> {
  return fetchAPI<Separacao[]>('/separacoes');
}

export async function getSeparacoesByLote(loteId: string): Promise<Separacao[]> {
  return fetchAPI<Separacao[]>(`/separacoes/lote/${loteId}`);
}

export async function createSeparacao(data: InsertSeparacao): Promise<Separacao> {
  return fetchAPI<Separacao>('/separacoes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== PRODUÇÃO ====================
export async function getProducoes(): Promise<Producao[]> {
  return fetchAPI<Producao[]>('/producoes');
}

export async function getProducoesByLote(loteId: string): Promise<Producao[]> {
  return fetchAPI<Producao[]>(`/producoes/lote/${loteId}`);
}

export async function createProducao(data: InsertProducao): Promise<Producao> {
  return fetchAPI<Producao>('/producoes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProducao(id: string, data: Partial<InsertProducao>): Promise<Producao> {
  return fetchAPI<Producao>(`/producoes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ==================== ESTOQUE ====================
export async function getEstoques(): Promise<Estoque[]> {
  return fetchAPI<Estoque[]>('/estoques');
}

export async function createEstoque(data: InsertEstoque): Promise<Estoque> {
  return fetchAPI<Estoque>('/estoques', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== PRODUTOS ====================
export async function getProdutos(): Promise<Produto[]> {
  return fetchAPI<Produto[]>('/produtos');
}

export async function getProduto(id: string): Promise<Produto> {
  return fetchAPI<Produto>(`/produtos/${id}`);
}

export async function getProdutoByCodigo(codigo: string): Promise<Produto> {
  return fetchAPI<Produto>(`/produtos/codigo/${encodeURIComponent(codigo)}`);
}

export async function createProduto(data: InsertProduto): Promise<Produto> {
  return fetchAPI<Produto>('/produtos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduto(id: string, data: Partial<InsertProduto>): Promise<Produto> {
  return fetchAPI<Produto>(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProduto(id: string): Promise<void> {
  return fetchAPI<void>(`/produtos/${id}`, {
    method: 'DELETE',
  });
}

// ==================== CLIENTES ====================
export async function getClientes(): Promise<Cliente[]> {
  return fetchAPI<Cliente[]>('/clientes');
}

export async function getCliente(id: string): Promise<Cliente> {
  return fetchAPI<Cliente>(`/clientes/${id}`);
}

export async function createCliente(data: InsertCliente): Promise<Cliente> {
  return fetchAPI<Cliente>('/clientes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCliente(id: string, data: Partial<InsertCliente>): Promise<Cliente> {
  return fetchAPI<Cliente>(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCliente(id: string): Promise<void> {
  return fetchAPI<void>(`/clientes/${id}`, {
    method: 'DELETE',
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

export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchAPI<DashboardStats>('/stats/dashboard');
}
