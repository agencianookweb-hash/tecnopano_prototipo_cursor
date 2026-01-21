import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==================== USERS ====================
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  nome: text("nome"),
  email: text("email"),
  role: text("role").default("operador"), // admin, gerente, operador
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  nome: true,
  email: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ==================== FORNECEDORES ====================
export const fornecedores = pgTable("fornecedores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  razaoSocial: text("razao_social"),
  cnpj: text("cnpj"),
  endereco: text("endereco"),
  cidade: text("cidade"),
  estado: text("estado"),
  cep: text("cep"),
  telefone: text("telefone"),
  email: text("email"),
  contato: text("contato"),
  ativo: boolean("ativo").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFornecedorSchema = createInsertSchema(fornecedores).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertFornecedor = z.infer<typeof insertFornecedorSchema>;
export type Fornecedor = typeof fornecedores.$inferSelect;

// ==================== COLETAS ====================
export const coletas = pgTable("coletas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fornecedorId: varchar("fornecedor_id").notNull().references(() => fornecedores.id),
  dataAgendada: timestamp("data_agendada").notNull(),
  dataRealizada: timestamp("data_realizada"),
  status: text("status").notNull().default("pendente"), // pendente, agendado, em_rota, realizado, cancelado
  motorista: text("motorista"),
  veiculo: text("veiculo"),
  observacoes: text("observacoes"),
  pesoTotal: decimal("peso_total", { precision: 10, scale: 2 }),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertColetaSchema = createInsertSchema(coletas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertColeta = z.infer<typeof insertColetaSchema>;
export type Coleta = typeof coletas.$inferSelect;

// ==================== LOTES ====================
export const lotes = pgTable("lotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  coletaId: varchar("coleta_id").notNull().references(() => coletas.id),
  qrCode: text("qr_code").notNull().unique(),
  fornecedorId: varchar("fornecedor_id").notNull().references(() => fornecedores.id),
  dataEntrada: timestamp("data_entrada").defaultNow(),
  pesoInicial: decimal("peso_inicial", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("recebido"), // recebido, em_separacao, separado, em_producao, finalizado
  localizacao: text("localizacao").default("galpao"),
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLoteSchema = createInsertSchema(lotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLote = z.infer<typeof insertLoteSchema>;
export type Lote = typeof lotes.$inferSelect;

// ==================== SEPARAÇÃO (TRIAGEM) ====================
export const separacao = pgTable("separacao", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  loteId: varchar("lote_id").notNull().references(() => lotes.id),
  tipoMaterial: text("tipo_material").notNull(), // algodao, poliester, mistos, tnt
  cor: text("cor").notNull(), // branco, colorido, escuro
  pesoTriado: decimal("peso_triado", { precision: 10, scale: 2 }).notNull(),
  destino: text("destino").notNull(), // producao, costureira, repanol
  residuo: decimal("residuo", { precision: 10, scale: 2 }),
  operadorId: varchar("operador_id").references(() => users.id),
  dataProcessamento: timestamp("data_processamento").defaultNow(),
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSeparacaoSchema = createInsertSchema(separacao).omit({
  id: true,
  createdAt: true,
});

export type InsertSeparacao = z.infer<typeof insertSeparacaoSchema>;
export type Separacao = typeof separacao.$inferSelect;

// ==================== PRODUÇÃO ====================
export const producao = pgTable("producao", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  separacaoId: varchar("separacao_id").notNull().references(() => separacao.id),
  loteId: varchar("lote_id").notNull().references(() => lotes.id),
  tipoProcesso: text("tipo_processo").notNull(), // corte, costura, prensagem, acabamento
  pesoEntrada: decimal("peso_entrada", { precision: 10, scale: 2 }).notNull(),
  pesoSaida: decimal("peso_saida", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("em_andamento"), // em_andamento, concluido, pausado
  operadorId: varchar("operador_id").references(() => users.id),
  dataInicio: timestamp("data_inicio").defaultNow(),
  dataConclusao: timestamp("data_conclusao"),
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProducaoSchema = createInsertSchema(producao).omit({
  id: true,
  createdAt: true,
});

export type InsertProducao = z.infer<typeof insertProducaoSchema>;
export type Producao = typeof producao.$inferSelect;

// ==================== PRODUTOS ====================
export const produtos = pgTable("produtos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  codigo: text("codigo").notNull().unique(),
  nome: text("nome").notNull(),
  descricao: text("descricao"),
  acabamento: text("acabamento"), // Corte-Reto, Zig-Zag, Overlock, etc
  cor: text("cor"), // Branco, Variado, Verde, etc
  medida: text("medida"), // 20x20 Cm, 30x30 Cm, etc
  foto: text("foto"), // URL da foto
  notaFiscal: text("nota_fiscal"), // Número da nota fiscal
  categoria: text("categoria"), // panos, toalhas, lencois, etc
  unidadeMedida: text("unidade_medida").default("unidade"), // unidade, kg, m2
  precoVenda: decimal("preco_venda", { precision: 10, scale: 2 }),
  precoCusto: decimal("preco_custo", { precision: 10, scale: 2 }),
  pesoMedio: decimal("peso_medio", { precision: 10, scale: 2 }), // peso médio por unidade
  estoqueMinimo: integer("estoque_minimo").default(0),
  ativo: boolean("ativo").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProdutoSchema = createInsertSchema(produtos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProduto = z.infer<typeof insertProdutoSchema>;
export type Produto = typeof produtos.$inferSelect;

// ==================== ESTOQUE ====================
export const estoque = pgTable("estoque", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  produtoId: varchar("produto_id").references(() => produtos.id), // Referência ao produto
  producaoId: varchar("producao_id").references(() => producao.id),
  loteId: varchar("lote_id").notNull().references(() => lotes.id),
  tipoProduto: text("tipo_produto").notNull(), // Mantido para compatibilidade
  quantidade: integer("quantidade").notNull(),
  peso: decimal("peso", { precision: 10, scale: 2 }).notNull(),
  localizacao: text("localizacao").notNull(),
  dataEntrada: timestamp("data_entrada").defaultNow(),
  status: text("status").default("disponivel"), // disponivel, reservado, expedido
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEstoqueSchema = createInsertSchema(estoque).omit({
  id: true,
  createdAt: true,
});

export type InsertEstoque = z.infer<typeof insertEstoqueSchema>;
export type Estoque = typeof estoque.$inferSelect;

// ==================== CLIENTES ====================
export const clientes = pgTable("clientes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  razaoSocial: text("razao_social"),
  cnpj: text("cnpj"),
  cpf: text("cpf"),
  tipo: text("tipo").notNull().default("fisica"), // fisica, juridica
  endereco: text("endereco"),
  cidade: text("cidade"),
  estado: text("estado"),
  cep: text("cep"),
  telefone: text("telefone"),
  email: text("email"),
  contato: text("contato"),
  observacoes: text("observacoes"),
  ativo: boolean("ativo").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertClienteSchema = createInsertSchema(clientes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCliente = z.infer<typeof insertClienteSchema>;
export type Cliente = typeof clientes.$inferSelect;

// ==================== VENDAS/PEDIDOS ====================
export const vendas = pgTable("vendas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: varchar("cliente_id").notNull().references(() => clientes.id),
  numeroPedido: text("numero_pedido").notNull().unique(),
  dataVenda: timestamp("data_venda").defaultNow(),
  dataEntrega: timestamp("data_entrega"),
  status: text("status").notNull().default("pendente"), // pendente, confirmado, em_producao, pronto, entregue, cancelado
  valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).notNull(),
  desconto: decimal("desconto", { precision: 10, scale: 2 }).default("0"),
  valorFinal: decimal("valor_final", { precision: 10, scale: 2 }).notNull(),
  observacoes: text("observacoes"),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVendaSchema = createInsertSchema(vendas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVenda = z.infer<typeof insertVendaSchema>;
export type Venda = typeof vendas.$inferSelect;

// ==================== ITENS DE VENDA ====================
export const itensVenda = pgTable("itens_venda", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vendaId: varchar("venda_id").notNull().references(() => vendas.id, { onDelete: 'cascade' }),
  produtoId: varchar("produto_id").notNull().references(() => produtos.id),
  quantidade: integer("quantidade").notNull(),
  precoUnitario: decimal("preco_unitario", { precision: 10, scale: 2 }).notNull(),
  desconto: decimal("desconto", { precision: 10, scale: 2 }).default("0"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertItemVendaSchema = createInsertSchema(itensVenda).omit({
  id: true,
  createdAt: true,
});

export type InsertItemVenda = z.infer<typeof insertItemVendaSchema>;
export type ItemVenda = typeof itensVenda.$inferSelect;