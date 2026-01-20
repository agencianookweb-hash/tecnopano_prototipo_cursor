# Tecnopano 4.0 - Sistema de Gestão Industrial

Sistema completo de gestão para a Tecnopano, cobrindo todo o fluxo desde coleta de matéria-prima até estoque final.

## 🚀 Tecnologias

### Frontend
- **React 19** com TypeScript
- **TailwindCSS 4** para estilização
- **shadcn/ui** componentes (Radix UI)
- **React Query** para gerenciamento de estado
- **Wouter** para roteamento
- **Framer Motion** para animações

### Backend
- **Express 5** com TypeScript
- **PostgreSQL** com Drizzle ORM
- **Zod** para validação
- **Passport.js** para autenticação

## 📦 Instalação

```bash
npm install
```

## 🔧 Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
npm run dev

# Iniciar apenas o client
npm run dev:client

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 📊 Estrutura do Banco de Dados

### Tabelas

#### `users`
- Usuários do sistema
- Roles: admin, gerente, operador

#### `fornecedores`
- Fornecedores de matéria-prima
- Dados cadastrais completos

#### `coletas`
- Agendamentos e registros de coleta
- Status: pendente, agendado, em_rota, realizado, cancelado

#### `lotes`
- Lotes de material recebido
- QR Code único para rastreamento
- Status: recebido, em_separacao, separado, em_producao, finalizado

#### `separacao`
- Processo de triagem
- Classificação por tipo de material e cor
- Cálculo de resíduo/descarte

#### `producao`
- Processos de produção
- Status: em_andamento, concluido, pausado

#### `estoque`
- Entrada de estoque
- Controle de localização e disponibilidade

## 🛣️ API Endpoints

### Fornecedores

```
GET    /api/fornecedores           - Lista todos os fornecedores
GET    /api/fornecedores/:id       - Busca fornecedor por ID
POST   /api/fornecedores           - Cria novo fornecedor
PUT    /api/fornecedores/:id       - Atualiza fornecedor
DELETE /api/fornecedores/:id       - Remove fornecedor
```

### Coletas

```
GET    /api/coletas                - Lista todas as coletas
GET    /api/coletas/:id            - Busca coleta por ID
POST   /api/coletas                - Cria nova coleta
PUT    /api/coletas/:id            - Atualiza coleta
DELETE /api/coletas/:id            - Remove coleta
```

### Lotes

```
GET    /api/lotes                  - Lista todos os lotes
GET    /api/lotes/:id              - Busca lote por ID
GET    /api/lotes/qrcode/:qrCode   - Busca lote por QR Code
POST   /api/lotes                  - Cria novo lote
PUT    /api/lotes/:id              - Atualiza lote
```

### Separação

```
GET    /api/separacoes             - Lista todas as separações
GET    /api/separacoes/:id         - Busca separação por ID
GET    /api/separacoes/lote/:id    - Lista separações de um lote
POST   /api/separacoes             - Registra nova separação
```

### Produção

```
GET    /api/producoes              - Lista todas as produções
GET    /api/producoes/:id          - Busca produção por ID
GET    /api/producoes/lote/:id     - Lista produções de um lote
POST   /api/producoes              - Registra nova produção
PUT    /api/producoes/:id          - Atualiza produção
```

### Estoque

```
GET    /api/estoques               - Lista todo o estoque
GET    /api/estoques/:id           - Busca item por ID
POST   /api/estoques               - Registra entrada no estoque
```

### Dashboard

```
GET    /api/stats/dashboard        - Estatísticas para o dashboard
```

## 📱 Módulos do Sistema

### 1. Coleta
- **Solicitação de Coleta**: Agendamento de retiradas
- **Entrada de Coleta**: Registro de material recebido

### 2. Galpão
- Visão geral do galpão
- Status de lotes

### 3. Separação (Triagem)
- Leitura de QR Code
- Classificação de material
- Pesagem e registro de resíduo

### 4. Produção
- Processos de produção
- Controle de status

### 5. Estoque
- Entrada de material processado
- Controle de localização

### 6. Dashboard
- Estatísticas em tempo real
- Gráficos de fluxo

## 🔐 Autenticação

Sistema usa autenticação via Passport.js.

**Usuário padrão:**
- Username: `admin`
- Password: `admin123`

## 🎨 Design System

O sistema utiliza um design system baseado em TailwindCSS com componentes do shadcn/ui:

- ✅ Design moderno e responsivo
- ✅ Animações fluidas
- ✅ Tema customizado Tecnopano
- ✅ Componentes reutilizáveis

## 📝 Exemplos de Uso da API

### Criar um Fornecedor

```json
POST /api/fornecedores
{
  "nome": "Fornecedor Exemplo",
  "razaoSocial": "Fornecedor Exemplo Ltda",
  "cnpj": "12.345.678/0001-90",
  "endereco": "Rua Exemplo, 123",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone": "(11) 1234-5678",
  "email": "contato@exemplo.com"
}
```

### Criar uma Coleta

```json
POST /api/coletas
{
  "fornecedorId": "uuid-do-fornecedor",
  "dataAgendada": "2024-02-01T10:00:00Z",
  "motorista": "João Silva",
  "veiculo": "Caminhão ABC-1234",
  "observacoes": "Material volumoso"
}
```

### Criar um Lote

```json
POST /api/lotes
{
  "coletaId": "uuid-da-coleta",
  "qrCode": "LOTE-20240201-001",
  "fornecedorId": "uuid-do-fornecedor",
  "pesoInicial": "1500.50"
}
```

### Registrar Separação

```json
POST /api/separacoes
{
  "loteId": "uuid-do-lote",
  "tipoMaterial": "algodao",
  "cor": "branco",
  "pesoTriado": "1400.00",
  "destino": "producao",
  "residuo": "100.50",
  "operadorId": "uuid-do-operador"
}
```

## 🚀 Deploy

### Replit

O projeto está configurado para deploy no Replit:

```bash
# O .replit já está configurado
# Basta clicar em "Run"
```

### Produção

```bash
npm run build
npm start
```

## 📂 Estrutura de Pastas

```
tecnopano_cursor/
├── client/              # Frontend React
│   ├── src/
│   │   ├── pages/       # Páginas do sistema
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── hooks/       # Custom hooks
│   │   └── context/     # Context providers
├── server/              # Backend Express
│   ├── index.ts         # Entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data layer
├── shared/              # Código compartilhado
│   └── schema.ts        # Database schema e types
└── README.md            # Este arquivo
```

## 🐛 Troubleshooting

### Port já em uso
```bash
# Matar processo na porta 5000
lsof -ti:5000 | xargs kill -9
```

### Erro de TypeScript
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licença

© 2024 Tecnopano. Todos os direitos reservados.
