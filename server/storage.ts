import {
  type User, type InsertUser,
  type Fornecedor, type InsertFornecedor,
  type Coleta, type InsertColeta,
  type Lote, type InsertLote,
  type Separacao, type InsertSeparacao,
  type Producao, type InsertProducao,
  type Estoque, type InsertEstoque,
  type Produto, type InsertProduto,
  type Cliente, type InsertCliente,
  type Venda, type InsertVenda,
  type ItemVenda, type InsertItemVenda
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;

  // Fornecedores
  getFornecedor(id: string): Promise<Fornecedor | undefined>;
  getFornecedores(): Promise<Fornecedor[]>;
  createFornecedor(fornecedor: InsertFornecedor): Promise<Fornecedor>;
  updateFornecedor(id: string, fornecedor: Partial<InsertFornecedor>): Promise<Fornecedor | undefined>;
  deleteFornecedor(id: string): Promise<boolean>;

  // Coletas
  getColeta(id: string): Promise<Coleta | undefined>;
  getColetas(): Promise<Coleta[]>;
  createColeta(coleta: InsertColeta): Promise<Coleta>;
  updateColeta(id: string, coleta: Partial<InsertColeta>): Promise<Coleta | undefined>;
  deleteColeta(id: string): Promise<boolean>;

  // Lotes
  getLote(id: string): Promise<Lote | undefined>;
  getLoteByQRCode(qrCode: string): Promise<Lote | undefined>;
  getLotes(): Promise<Lote[]>;
  createLote(lote: InsertLote): Promise<Lote>;
  updateLote(id: string, lote: Partial<InsertLote>): Promise<Lote | undefined>;

  // Separação
  getSeparacao(id: string): Promise<Separacao | undefined>;
  getSeparacoes(): Promise<Separacao[]>;
  getSeparacoesByLote(loteId: string): Promise<Separacao[]>;
  createSeparacao(separacao: InsertSeparacao): Promise<Separacao>;

  // Produção
  getProducao(id: string): Promise<Producao | undefined>;
  getProducoes(): Promise<Producao[]>;
  getProducoesByLote(loteId: string): Promise<Producao[]>;
  createProducao(producao: InsertProducao): Promise<Producao>;
  updateProducao(id: string, producao: Partial<InsertProducao>): Promise<Producao | undefined>;

  // Estoque
  getEstoque(id: string): Promise<Estoque | undefined>;
  getEstoques(): Promise<Estoque[]>;
  createEstoque(estoque: InsertEstoque): Promise<Estoque>;

  // Produtos
  getProduto(id: string): Promise<Produto | undefined>;
  getProdutoByCodigo(codigo: string): Promise<Produto | undefined>;
  getProdutos(): Promise<Produto[]>;
  createProduto(produto: InsertProduto): Promise<Produto>;
  updateProduto(id: string, produto: Partial<InsertProduto>): Promise<Produto | undefined>;
  deleteProduto(id: string): Promise<boolean>;

  // Clientes
  getCliente(id: string): Promise<Cliente | undefined>;
  getClientes(): Promise<Cliente[]>;
  createCliente(cliente: InsertCliente): Promise<Cliente>;
  updateCliente(id: string, cliente: Partial<InsertCliente>): Promise<Cliente | undefined>;
  deleteCliente(id: string): Promise<boolean>;

  // Vendas
  getVenda(id: string): Promise<Venda | undefined>;
  getVendas(): Promise<Venda[]>;
  getVendasByCliente(clienteId: string): Promise<Venda[]>;
  createVenda(venda: InsertVenda): Promise<Venda>;
  updateVenda(id: string, venda: Partial<InsertVenda>): Promise<Venda | undefined>;
  deleteVenda(id: string): Promise<boolean>;

  // Itens de Venda
  getItensVenda(vendaId: string): Promise<ItemVenda[]>;
  createItemVenda(item: InsertItemVenda): Promise<ItemVenda>;
  deleteItemVenda(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private fornecedores: Map<string, Fornecedor>;
  private coletas: Map<string, Coleta>;
  private lotes: Map<string, Lote>;
  private separacoes: Map<string, Separacao>;
  private producoes: Map<string, Producao>;
  private estoques: Map<string, Estoque>;
  private produtos: Map<string, Produto>;
  private clientes: Map<string, Cliente>;
  private vendas: Map<string, Venda>;
  private itensVenda: Map<string, ItemVenda>;

  constructor() {
    this.users = new Map();
    this.fornecedores = new Map();
    this.coletas = new Map();
    this.lotes = new Map();
    this.separacoes = new Map();
    this.producoes = new Map();
    this.estoques = new Map();
    this.produtos = new Map();
    this.clientes = new Map();
    this.vendas = new Map();
    this.itensVenda = new Map();
    this.seedData();
  }

  // ==================== USERS ====================
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // ==================== FORNECEDORES ====================
  async getFornecedor(id: string): Promise<Fornecedor | undefined> {
    return this.fornecedores.get(id);
  }

  async getFornecedores(): Promise<Fornecedor[]> {
    return Array.from(this.fornecedores.values());
  }

  async createFornecedor(insertFornecedor: InsertFornecedor): Promise<Fornecedor> {
    const id = randomUUID();
    const fornecedor: Fornecedor = {
      ...insertFornecedor,
      id,
      ativo: insertFornecedor.ativo ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.fornecedores.set(id, fornecedor);
    return fornecedor;
  }

  async updateFornecedor(id: string, data: Partial<InsertFornecedor>): Promise<Fornecedor | undefined> {
    const fornecedor = this.fornecedores.get(id);
    if (!fornecedor) return undefined;

    const updated: Fornecedor = {
      ...fornecedor,
      ...data,
      updatedAt: new Date(),
    };
    this.fornecedores.set(id, updated);
    return updated;
  }

  async deleteFornecedor(id: string): Promise<boolean> {
    return this.fornecedores.delete(id);
  }

  // ==================== COLETAS ====================
  async getColeta(id: string): Promise<Coleta | undefined> {
    return this.coletas.get(id);
  }

  async getColetas(): Promise<Coleta[]> {
    return Array.from(this.coletas.values());
  }

  async createColeta(insertColeta: InsertColeta): Promise<Coleta> {
    const id = randomUUID();
    const coleta: Coleta = {
      ...insertColeta,
      id,
      status: insertColeta.status ?? "pendente",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.coletas.set(id, coleta);
    return coleta;
  }

  async updateColeta(id: string, data: Partial<InsertColeta>): Promise<Coleta | undefined> {
    const coleta = this.coletas.get(id);
    if (!coleta) return undefined;

    const updated: Coleta = {
      ...coleta,
      ...data,
      updatedAt: new Date(),
    };
    this.coletas.set(id, updated);
    return updated;
  }

  async deleteColeta(id: string): Promise<boolean> {
    return this.coletas.delete(id);
  }

  // ==================== LOTES ====================
  async getLote(id: string): Promise<Lote | undefined> {
    return this.lotes.get(id);
  }

  async getLoteByQRCode(qrCode: string): Promise<Lote | undefined> {
    return Array.from(this.lotes.values()).find(lote => lote.qrCode === qrCode);
  }

  async getLotes(): Promise<Lote[]> {
    return Array.from(this.lotes.values());
  }

  async createLote(insertLote: InsertLote): Promise<Lote> {
    const id = randomUUID();
    const lote: Lote = {
      ...insertLote,
      id,
      status: insertLote.status ?? "recebido",
      localizacao: insertLote.localizacao ?? "galpao",
      dataEntrada: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.lotes.set(id, lote);
    return lote;
  }

  async updateLote(id: string, data: Partial<InsertLote>): Promise<Lote | undefined> {
    const lote = this.lotes.get(id);
    if (!lote) return undefined;

    const updated: Lote = {
      ...lote,
      ...data,
      updatedAt: new Date(),
    };
    this.lotes.set(id, updated);
    return updated;
  }

  // ==================== SEPARAÇÃO ====================
  async getSeparacao(id: string): Promise<Separacao | undefined> {
    return this.separacoes.get(id);
  }

  async getSeparacoes(): Promise<Separacao[]> {
    return Array.from(this.separacoes.values());
  }

  async getSeparacoesByLote(loteId: string): Promise<Separacao[]> {
    return Array.from(this.separacoes.values()).filter(s => s.loteId === loteId);
  }

  async createSeparacao(insertSeparacao: InsertSeparacao): Promise<Separacao> {
    const id = randomUUID();
    const separacao: Separacao = {
      ...insertSeparacao,
      id,
      dataProcessamento: new Date(),
      createdAt: new Date(),
    };
    this.separacoes.set(id, separacao);

    // Atualizar status do lote para "em_separacao"
    const lote = this.lotes.get(insertSeparacao.loteId);
    if (lote) {
      await this.updateLote(lote.id, { status: "em_separacao" });
    }

    return separacao;
  }

  // ==================== PRODUÇÃO ====================
  async getProducao(id: string): Promise<Producao | undefined> {
    return this.producoes.get(id);
  }

  async getProducoes(): Promise<Producao[]> {
    return Array.from(this.producoes.values());
  }

  async getProducoesByLote(loteId: string): Promise<Producao[]> {
    return Array.from(this.producoes.values()).filter(p => p.loteId === loteId);
  }

  async createProducao(insertProducao: InsertProducao): Promise<Producao> {
    const id = randomUUID();
    const producao: Producao = {
      ...insertProducao,
      id,
      status: insertProducao.status ?? "em_andamento",
      dataInicio: new Date(),
      createdAt: new Date(),
    };
    this.producoes.set(id, producao);

    // Atualizar status do lote para "em_producao"
    const lote = this.lotes.get(insertProducao.loteId);
    if (lote) {
      await this.updateLote(lote.id, { status: "em_producao" });
    }

    return producao;
  }

  async updateProducao(id: string, data: Partial<InsertProducao>): Promise<Producao | undefined> {
    const producao = this.producoes.get(id);
    if (!producao) return undefined;

    const updated: Producao = {
      ...producao,
      ...data,
    };

    // Se status mudou para "concluido", definir data de conclusão
    if (data.status === "concluido" && !updated.dataConclusao) {
      updated.dataConclusao = new Date();
    }

    this.producoes.set(id, updated);
    return updated;
  }

  // ==================== ESTOQUE ====================
  async getEstoque(id: string): Promise<Estoque | undefined> {
    return this.estoques.get(id);
  }

  async getEstoques(): Promise<Estoque[]> {
    return Array.from(this.estoques.values());
  }

  async createEstoque(insertEstoque: InsertEstoque): Promise<Estoque> {
    const id = randomUUID();
    const estoque: Estoque = {
      ...insertEstoque,
      id,
      status: insertEstoque.status ?? "disponivel",
      dataEntrada: new Date(),
      createdAt: new Date(),
    };
    this.estoques.set(id, estoque);

    // Atualizar status do lote para "finalizado"
    const lote = this.lotes.get(insertEstoque.loteId);
    if (lote) {
      await this.updateLote(lote.id, { status: "finalizado" });
    }

    return estoque;
  }

  // ==================== SEED DATA ====================
  private seedData() {
    // Importar dados do seed.ts dinamicamente
    try {
      const seedModule = require('./seed');
      const fornecedoresSeed = seedModule.fornecedoresSeed || [];
      
      // Criar todos os fornecedores do seed
      for (const fornecedorData of fornecedoresSeed) {
        const id = randomUUID();
        const fornecedor: Fornecedor = {
          ...fornecedorData,
          id,
          ativo: fornecedorData.ativo ?? true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.fornecedores.set(id, fornecedor);
      }
      
      console.log(`✅ ${fornecedoresSeed.length} fornecedores carregados no MemStorage`);
    } catch (error) {
      // Se falhar, usar dados padrão (3 fornecedores)
      console.warn('⚠️ Erro ao carregar seed completo, usando dados padrão:', error);
      
      // Seed fornecedores padrão (3)
      const fornecedor1Id = randomUUID();
      const fornecedor2Id = randomUUID();
      const fornecedor3Id = randomUUID();

      this.fornecedores.set(fornecedor1Id, {
        id: fornecedor1Id,
        nome: "ATMOSFERA GESTÃO E HIGIENIZAÇÃO",
        razaoSocial: "Atmosfera Gestão e Higienização Ltda",
        cnpj: "12.345.678/0001-90",
        endereco: "Rua das Indústrias, 100",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567",
        telefone: "(11) 3333-4444",
        email: "contato@atmosfera.com.br",
        contato: "Maria Silva",
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.fornecedores.set(fornecedor2Id, {
        id: fornecedor2Id,
        nome: "SUL AMERICANA",
        razaoSocial: "Sul Americana Têxtil S.A.",
        cnpj: "23.456.789/0001-01",
        endereco: "Av. do Estado, 500",
        cidade: "São Paulo",
        estado: "SP",
        cep: "02345-678",
        telefone: "(11) 5555-6666",
        email: "comercial@sulamericana.com.br",
        contato: "João Santos",
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.fornecedores.set(fornecedor3Id, {
        id: fornecedor3Id,
        nome: "ECO TÊXTIL LTDA",
        razaoSocial: "Eco Têxtil Ltda",
        cnpj: "34.567.890/0001-12",
        endereco: "Rod. Anchieta, Km 12",
        cidade: "São Bernardo do Campo",
        estado: "SP",
        cep: "09876-543",
        telefone: "(11) 7777-8888",
        email: "atendimento@ecotextil.com.br",
        contato: "Pedro Oliveira",
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Seed usuário admin
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "admin123", // Em produção, use hash
      nome: "Administrador",
      email: "admin@tecnopano.com.br",
      role: "admin",
      createdAt: new Date(),
    });
  }

  // ==================== PRODUTOS ====================
  async getProduto(id: string): Promise<Produto | undefined> {
    return this.produtos.get(id);
  }

  async getProdutoByCodigo(codigo: string): Promise<Produto | undefined> {
    return Array.from(this.produtos.values()).find(p => p.codigo === codigo);
  }

  async getProdutos(): Promise<Produto[]> {
    return Array.from(this.produtos.values());
  }

  async createProduto(insertProduto: InsertProduto): Promise<Produto> {
    const id = randomUUID();
    const produto: Produto = {
      ...insertProduto,
      id,
      ativo: insertProduto.ativo ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.produtos.set(id, produto);
    return produto;
  }

  async updateProduto(id: string, data: Partial<InsertProduto>): Promise<Produto | undefined> {
    const produto = this.produtos.get(id);
    if (!produto) return undefined;

    const updated: Produto = {
      ...produto,
      ...data,
      updatedAt: new Date(),
    };
    this.produtos.set(id, updated);
    return updated;
  }

  async deleteProduto(id: string): Promise<boolean> {
    return this.produtos.delete(id);
  }

  // ==================== CLIENTES ====================
  async getCliente(id: string): Promise<Cliente | undefined> {
    return this.clientes.get(id);
  }

  async getClientes(): Promise<Cliente[]> {
    return Array.from(this.clientes.values());
  }

  async createCliente(insertCliente: InsertCliente): Promise<Cliente> {
    const id = randomUUID();
    const cliente: Cliente = {
      ...insertCliente,
      id,
      tipo: insertCliente.tipo ?? 'fisica',
      ativo: insertCliente.ativo ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.clientes.set(id, cliente);
    return cliente;
  }

  async updateCliente(id: string, data: Partial<InsertCliente>): Promise<Cliente | undefined> {
    const cliente = this.clientes.get(id);
    if (!cliente) return undefined;

    const updated: Cliente = {
      ...cliente,
      ...data,
      updatedAt: new Date(),
    };
    this.clientes.set(id, updated);
    return updated;
  }

  async deleteCliente(id: string): Promise<boolean> {
    return this.clientes.delete(id);
  }

  // ==================== VENDAS ====================
  async getVenda(id: string): Promise<Venda | undefined> {
    return this.vendas.get(id);
  }

  async getVendas(): Promise<Venda[]> {
    return Array.from(this.vendas.values());
  }

  async getVendasByCliente(clienteId: string): Promise<Venda[]> {
    return Array.from(this.vendas.values()).filter(v => v.clienteId === clienteId);
  }

  async createVenda(insertVenda: InsertVenda): Promise<Venda> {
    const id = randomUUID();
    const venda: Venda = {
      ...insertVenda,
      id,
      status: insertVenda.status ?? 'pendente',
      desconto: insertVenda.desconto ?? '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.vendas.set(id, venda);
    return venda;
  }

  async updateVenda(id: string, data: Partial<InsertVenda>): Promise<Venda | undefined> {
    const venda = this.vendas.get(id);
    if (!venda) return undefined;

    const updated: Venda = {
      ...venda,
      ...data,
      updatedAt: new Date(),
    };
    this.vendas.set(id, updated);
    return updated;
  }

  async deleteVenda(id: string): Promise<boolean> {
    // Deletar itens da venda também
    Array.from(this.itensVenda.entries())
      .filter(([_, item]) => item.vendaId === id)
      .forEach(([itemId]) => this.itensVenda.delete(itemId));
    
    return this.vendas.delete(id);
  }

  // ==================== ITENS DE VENDA ====================
  async getItensVenda(vendaId: string): Promise<ItemVenda[]> {
    return Array.from(this.itensVenda.values()).filter(item => item.vendaId === vendaId);
  }

  async createItemVenda(insertItemVenda: InsertItemVenda): Promise<ItemVenda> {
    const id = randomUUID();
    const item: ItemVenda = {
      ...insertItemVenda,
      id,
      desconto: insertItemVenda.desconto ?? '0',
      createdAt: new Date(),
    };
    this.itensVenda.set(id, item);
    return item;
  }

  async deleteItemVenda(id: string): Promise<boolean> {
    return this.itensVenda.delete(id);
  }
}

// Usar PostgreSQL se DATABASE_URL estiver configurada, senão usar MemStorage
let storageInstance: IStorage;

if (process.env.DATABASE_URL) {
  try {
    console.log('🗄️  Usando PostgreSQL como storage');
    const { PostgresStorage } = require('./postgres-storage');
    storageInstance = new PostgresStorage();
  } catch (error) {
    console.error('❌ Erro ao carregar PostgreSQL, usando MemStorage:', error);
    storageInstance = new MemStorage();
  }
} else {
  console.log('💾 Usando MemStorage (desenvolvimento)');
  storageInstance = new MemStorage();
}

export const storage = storageInstance;
