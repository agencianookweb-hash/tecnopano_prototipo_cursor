import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertFornecedorSchema,
  insertColetaSchema,
  insertLoteSchema,
  insertSeparacaoSchema,
  insertProducaoSchema,
  insertEstoqueSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ==================== FORNECEDORES ====================
  app.get("/api/fornecedores", async (_req, res) => {
    try {
      const fornecedores = await storage.getFornecedores();
      res.json(fornecedores);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar fornecedores" });
    }
  });

  app.get("/api/fornecedores/:id", async (req, res) => {
    try {
      const fornecedor = await storage.getFornecedor(req.params.id);
      if (!fornecedor) {
        return res.status(404).json({ message: "Fornecedor não encontrado" });
      }
      res.json(fornecedor);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar fornecedor" });
    }
  });

  app.post("/api/fornecedores", async (req, res) => {
    try {
      const data = insertFornecedorSchema.parse(req.body);
      const fornecedor = await storage.createFornecedor(data);
      res.status(201).json(fornecedor);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Dados inválidos" });
    }
  });

  app.put("/api/fornecedores/:id", async (req, res) => {
    try {
      const fornecedor = await storage.updateFornecedor(req.params.id, req.body);
      if (!fornecedor) {
        return res.status(404).json({ message: "Fornecedor não encontrado" });
      }
      res.json(fornecedor);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao atualizar fornecedor" });
    }
  });

  app.delete("/api/fornecedores/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFornecedor(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Fornecedor não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar fornecedor" });
    }
  });

  // ==================== COLETAS ====================
  app.get("/api/coletas", async (_req, res) => {
    try {
      const coletas = await storage.getColetas();
      res.json(coletas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar coletas" });
    }
  });

  app.get("/api/coletas/:id", async (req, res) => {
    try {
      const coleta = await storage.getColeta(req.params.id);
      if (!coleta) {
        return res.status(404).json({ message: "Coleta não encontrada" });
      }
      res.json(coleta);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar coleta" });
    }
  });

  app.post("/api/coletas", async (req, res) => {
    try {
      const data = insertColetaSchema.parse(req.body);
      const coleta = await storage.createColeta(data);
      res.status(201).json(coleta);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Dados inválidos" });
    }
  });

  app.put("/api/coletas/:id", async (req, res) => {
    try {
      const coleta = await storage.updateColeta(req.params.id, req.body);
      if (!coleta) {
        return res.status(404).json({ message: "Coleta não encontrada" });
      }
      res.json(coleta);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao atualizar coleta" });
    }
  });

  app.delete("/api/coletas/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteColeta(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Coleta não encontrada" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar coleta" });
    }
  });

  // ==================== LOTES ====================
  app.get("/api/lotes", async (_req, res) => {
    try {
      const lotes = await storage.getLotes();
      res.json(lotes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar lotes" });
    }
  });

  app.get("/api/lotes/:id", async (req, res) => {
    try {
      const lote = await storage.getLote(req.params.id);
      if (!lote) {
        return res.status(404).json({ message: "Lote não encontrado" });
      }
      res.json(lote);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar lote" });
    }
  });

  app.get("/api/lotes/qrcode/:qrCode", async (req, res) => {
    try {
      const lote = await storage.getLoteByQRCode(req.params.qrCode);
      if (!lote) {
        return res.status(404).json({ message: "Lote não encontrado" });
      }
      res.json(lote);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar lote por QR Code" });
    }
  });

  app.post("/api/lotes", async (req, res) => {
    try {
      const data = insertLoteSchema.parse(req.body);
      const lote = await storage.createLote(data);
      res.status(201).json(lote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Dados inválidos" });
    }
  });

  app.put("/api/lotes/:id", async (req, res) => {
    try {
      const lote = await storage.updateLote(req.params.id, req.body);
      if (!lote) {
        return res.status(404).json({ message: "Lote não encontrado" });
      }
      res.json(lote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao atualizar lote" });
    }
  });

  // ==================== SEPARAÇÃO ====================
  app.get("/api/separacoes", async (_req, res) => {
    try {
      const separacoes = await storage.getSeparacoes();
      res.json(separacoes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar separações" });
    }
  });

  app.get("/api/separacoes/:id", async (req, res) => {
    try {
      const separacao = await storage.getSeparacao(req.params.id);
      if (!separacao) {
        return res.status(404).json({ message: "Separação não encontrada" });
      }
      res.json(separacao);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar separação" });
    }
  });

  app.get("/api/separacoes/lote/:loteId", async (req, res) => {
    try {
      const separacoes = await storage.getSeparacoesByLote(req.params.loteId);
      res.json(separacoes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar separações do lote" });
    }
  });

  app.post("/api/separacoes", async (req, res) => {
    try {
      const data = insertSeparacaoSchema.parse(req.body);
      const separacao = await storage.createSeparacao(data);
      res.status(201).json(separacao);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Dados inválidos" });
    }
  });

  // ==================== PRODUÇÃO ====================
  app.get("/api/producoes", async (_req, res) => {
    try {
      const producoes = await storage.getProducoes();
      res.json(producoes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produções" });
    }
  });

  app.get("/api/producoes/:id", async (req, res) => {
    try {
      const producao = await storage.getProducao(req.params.id);
      if (!producao) {
        return res.status(404).json({ message: "Produção não encontrada" });
      }
      res.json(producao);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produção" });
    }
  });

  app.get("/api/producoes/lote/:loteId", async (req, res) => {
    try {
      const producoes = await storage.getProducoesByLote(req.params.loteId);
      res.json(producoes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produções do lote" });
    }
  });

  app.post("/api/producoes", async (req, res) => {
    try {
      const data = insertProducaoSchema.parse(req.body);
      const producao = await storage.createProducao(data);
      res.status(201).json(producao);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Dados inválidos" });
    }
  });

  app.put("/api/producoes/:id", async (req, res) => {
    try {
      const producao = await storage.updateProducao(req.params.id, req.body);
      if (!producao) {
        return res.status(404).json({ message: "Produção não encontrada" });
      }
      res.json(producao);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao atualizar produção" });
    }
  });

  // ==================== ESTOQUE ====================
  app.get("/api/estoques", async (_req, res) => {
    try {
      const estoques = await storage.getEstoques();
      res.json(estoques);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar estoques" });
    }
  });

  app.get("/api/estoques/:id", async (req, res) => {
    try {
      const estoque = await storage.getEstoque(req.params.id);
      if (!estoque) {
        return res.status(404).json({ message: "Estoque não encontrado" });
      }
      res.json(estoque);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar estoque" });
    }
  });

  app.post("/api/estoques", async (req, res) => {
    try {
      const data = insertEstoqueSchema.parse(req.body);
      const estoque = await storage.createEstoque(data);
      res.status(201).json(estoque);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Dados inválidos" });
    }
  });

  // ==================== USERS ====================
  app.get("/api/users", async (_req, res) => {
    try {
      const users = await storage.getUsers();
      // Remove passwords from response
      const sanitized = users.map(({ password, ...user }) => user);
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  });

  // ==================== DASHBOARD STATS ====================
  app.get("/api/stats/dashboard", async (_req, res) => {
    try {
      const coletas = await storage.getColetas();
      const lotes = await storage.getLotes();
      const producoes = await storage.getProducoes();

      const totalColetas = coletas.length;
      const coletasPendentes = coletas.filter(c => c.status === "pendente").length;
      const coletasRealizadas = coletas.filter(c => c.status === "realizado").length;

      const lotesEmProcessamento = lotes.filter(l =>
        l.status === "em_separacao" || l.status === "em_producao"
      ).length;

      const producoesEmAndamento = producoes.filter(p => p.status === "em_andamento").length;

      res.json({
        totalColetas,
        coletasPendentes,
        coletasRealizadas,
        lotesEmProcessamento,
        producoesEmAndamento,
        lotesCriticos: Math.floor(totalColetas * 0.1), // 10% considered critical
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar estatísticas" });
    }
  });

  return httpServer;
}
