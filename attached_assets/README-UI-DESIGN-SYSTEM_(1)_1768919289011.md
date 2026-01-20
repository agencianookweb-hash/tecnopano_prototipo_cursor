# README / UI Design System

> **Versão:** 1.0.0  
> **Stack:** React + TypeScript + Tailwind CSS + shadcn/ui + Lucide Icons

---

## Sobre

Este documento define os padrões de UI para projetos React. Use como referência para manter consistência visual e de código em todas as telas.

---

## 1. Cores

### Cores Semânticas

| Status | Background | Texto | Quando usar |
|--------|------------|-------|-------------|
| **Sucesso / Ativo** | `bg-green-100` | `text-green-600` | Aprovações, estados ativos, confirmações |
| **Pendente / Alerta** | `bg-amber-100` | `text-amber-600` | Aguardando ação, avisos leves |
| **Erro / Inativo** | `bg-red-100` | `text-red-600` | Erros, exclusões, estados inativos |
| **Info / Neutro** | `bg-blue-100` | `text-blue-600` | Informações, links, destaques primários |
| **Premium / Especial** | `bg-purple-100` | `text-purple-600` | Features premium, destaques especiais |

### Hierarquia de Texto

| Tipo | Classe | Uso |
|------|--------|-----|
| Primário | `text-gray-900` | Títulos, texto principal |
| Secundário | `text-gray-700` | Corpo de texto |
| Muted | `text-gray-500` | Descrições, labels secundárias |
| Disabled | `text-gray-400` | Estados desabilitados |

---

## 2. Tipografia

```
Título H1     → text-2xl font-bold text-gray-900
Título H2     → text-xl font-semibold text-gray-900
Título H3     → text-lg font-medium text-gray-900
Corpo         → text-base text-gray-700
Caption       → text-sm text-gray-500
Small         → text-xs text-gray-400
Valor Grande  → text-3xl font-bold
```

---

## 3. Espaçamento

| Token | Pixels | Uso |
|-------|--------|-----|
| `gap-2` | 8px | Entre ícone e texto |
| `gap-3` | 12px | Entre elementos relacionados |
| `gap-4` | 16px | Entre grupos, padding de cards |
| `gap-6` | 24px | Entre seções, padding maior |
| `space-y-4` | 16px | Entre campos de formulário |
| `space-y-6` | 24px | Entre blocos de página |

---

## 4. Componentes

### 4.1 Cabeçalho de Página

```tsx
<div className="flex items-center gap-3">
  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
    <IconName className="h-6 w-6 text-blue-600" />
  </div>
  <div>
    <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">
      Título da Página
    </h1>
    <p className="text-sm text-gray-500">
      Descrição breve
    </p>
  </div>
</div>
```

| Elemento | Especificação |
|----------|---------------|
| Container do ícone | 48x48px, `rounded-full` |
| Ícone | 24x24px |
| Gap | 12px (`gap-3`) |

---

### 4.2 Cards de Estatísticas

```tsx
const stats = [
  { title: "Total", value: 150, icon: Building2, color: "text-blue-600", bgColor: "bg-blue-100" },
  { title: "Ativas", value: 120, icon: Activity, color: "text-green-600", bgColor: "bg-green-100" },
  { title: "Pendentes", value: 25, icon: Clock, color: "text-amber-600", bgColor: "bg-amber-100" },
  { title: "Críticas", value: 5, icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
];

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((stat) => (
    <Card key={stat.title} data-testid={`card-stat-${stat.title.toLowerCase()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
          <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

| Elemento | Especificação |
|----------|---------------|
| Grid | 1 col → 2 cols (md) → 4 cols (lg) |
| Padding | 24px (`p-6`) |
| Valor | `text-3xl font-bold` |
| Label | `text-sm text-gray-500` |

---

### 4.3 Barra de Filtros

```tsx
import { Filter, Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Card>
  <CardContent className="p-4">
    <div className="flex flex-wrap items-center gap-4">
      {/* Label de Filtro */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Filter className="h-4 w-4" />
        <span>Filtro:</span>
      </div>

      {/* Date Pickers */}
      <Input
        type="date"
        className="w-40"
        placeholder="dd/mm/aaaa"
        data-testid="filter-date-start"
      />
      <Input
        type="date"
        className="w-40"
        placeholder="dd/mm/aaaa"
        data-testid="filter-date-end"
      />

      {/* Search Inputs */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar membro"
          className="pl-9"
          data-testid="filter-search-member"
        />
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por Cargo"
          className="pl-9"
          data-testid="filter-search-role"
        />
      </div>

      {/* Select Filter */}
      <Select data-testid="filter-status">
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="inactive">Inativo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </CardContent>
</Card>
```

| Elemento | Especificação |
|----------|---------------|
| Container | `p-4`, flex wrap com `gap-4` |
| Date inputs | `w-40` (160px) |
| Search inputs | `flex-1 min-w-[200px]`, ícone à esquerda com `pl-9` |
| Select | `w-32` (128px) |
| Ícone search | `absolute left-3`, `text-gray-400` |

**Variações de filtro:**

```tsx
// Filtro simples (apenas busca + status)
<div className="flex items-center gap-4">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <Input placeholder="Buscar..." className="pl-9" />
  </div>
  <Select>
    <SelectTrigger className="w-32">
      <SelectValue placeholder="Status" />
    </SelectTrigger>
    <SelectContent>...</SelectContent>
  </Select>
</div>

// Filtro com botão de ação
<div className="flex items-center gap-4">
  {/* ...filtros... */}
  <Button variant="outline" size="sm">
    <Filter className="h-4 w-4 mr-2" />
    Limpar Filtros
  </Button>
</div>
```

---

### 4.4 Tabela de Dados Completa

Tabela com avatar, múltiplas colunas, ações e paginação.

```tsx
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Pencil, Copy, Trash2, ChevronLeft, ChevronRight, Mail, UserPlus } from "lucide-react";

// Estado de paginação
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

<Card>
  {/* Header da Tabela com Título e Ação */}
  <CardHeader>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <CardTitle>Controle da Equipe</CardTitle>
          <CardDescription>Gerencie membros, envie credenciais e acompanhe status</CardDescription>
        </div>
      </div>
      <Button data-testid="button-add">
        <UserPlus className="h-4 w-4 mr-2" />
        Adicionar
      </Button>
    </div>
  </CardHeader>

  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Membro</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>WhatsApp</TableHead>
          <TableHead>Data Admissão</TableHead>
          <TableHead>Credenciais</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} data-testid={`row-member-${item.id}`}>
            {/* Coluna com Avatar */}
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-amber-100">
                  <AvatarFallback className="bg-amber-100 text-amber-700 font-medium">
                    {item.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>
            </TableCell>
            
            <TableCell>{item.role}</TableCell>
            <TableCell>{item.whatsapp}</TableCell>
            <TableCell>{new Date(item.admissionDate).toLocaleDateString('pt-BR')}</TableCell>
            
            {/* Coluna de Status com Ícone */}
            <TableCell>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>Não enviado</span>
              </div>
            </TableCell>
            
            {/* Badge de Status */}
            <TableCell>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                Pendente
              </Badge>
            </TableCell>
            
            {/* Ações Múltiplas */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-message-${item.id}`}>
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-edit-${item.id}`}>
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-copy-${item.id}`}>
                  <Copy className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-delete-${item.id}`}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {/* Paginação */}
    <div className="flex items-center justify-between mt-4 pt-4 border-t">
      {/* Items por página */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Exibir:</span>
        <Select 
          value={String(itemsPerPage)} 
          onValueChange={(v) => setItemsPerPage(Number(v))}
        >
          <SelectTrigger className="w-16 h-8" data-testid="select-page-size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Info e Navegação */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          pág. {currentPage}-{Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            data-testid="button-next-page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
```

| Elemento | Especificação |
|----------|---------------|
| Avatar | `h-10 w-10`, fundo colorido por status/tipo |
| Avatar Fallback | Primeira letra maiúscula, `font-medium` |
| Botões de ação | `variant="ghost" size="icon"`, `h-8 w-8` |
| Ícones de ação | `h-4 w-4 text-gray-500` (exceto delete: `text-red-500`) |
| Paginação | `border-t mt-4 pt-4` |
| Select page size | `w-16 h-8` |
| Botões navegação | `variant="outline" size="icon"`, `h-8 w-8` |

**Cores de Avatar por tipo:**

| Tipo | Background | Texto |
|------|------------|-------|
| Padrão | `bg-amber-100` | `text-amber-700` |
| Admin | `bg-blue-100` | `text-blue-700` |
| Premium | `bg-purple-100` | `text-purple-700` |
| Inativo | `bg-gray-100` | `text-gray-700` |

---

### 4.5 Tabela Simples

Versão reduzida para listagens básicas.

```tsx
<Card>
  <CardHeader>
    <div className="flex justify-between items-center">
      <CardTitle>Lista de Items</CardTitle>
      <Button data-testid="button-new-item">
        <Plus className="h-4 w-4 mr-2" /> Novo Item
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} data-testid={`row-item-${item.id}`}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>
              <Badge variant={item.active ? "default" : "secondary"}>
                {item.active ? "Ativo" : "Inativo"}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" data-testid={`button-edit-${item.id}`}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" data-testid={`button-delete-${item.id}`}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

| Regra | Especificação |
|-------|---------------|
| Coluna de ações | Sempre `text-right` |
| Botões de ação | `variant="ghost" size="sm"` |
| Ícone deletar | Sempre `text-red-500` |
| Formato de data | `pt-BR` |

---

### 4.6 Formulários

> **Regra de Ouro:**  
> 📝 **CRUD (Create/Update)** → Sempre **Tela Dedicada**  
> ✅ **Confirmação / Informação / Ação rápida** → **Modal**

---

#### 4.6.1 Modal (Confirmação / Informação / Ação)

Para confirmações, alertas, informações e ações que não são CRUD.

**Tipos de Modal:**

| Tipo | Uso | Exemplo |
|------|-----|---------|
| **Confirmação** | Validar ação destrutiva ou importante | "Deseja excluir este membro?" |
| **Informação** | Exibir detalhes ou sucesso | "Membro adicionado com sucesso!" |
| **Ação rápida** | Ação simples com 1-2 campos | Alterar status, adicionar nota |
| **Seleção** | Escolher item de uma lista | Selecionar template, filtro avançado |

```tsx
// ════════════════════════════════════════════════════════════
// MODAL DE CONFIRMAÇÃO (Exclusão)
// ════════════════════════════════════════════════════════════
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <DialogTitle>Excluir Membro</DialogTitle>
          <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
        </div>
      </div>
    </DialogHeader>
    
    <p className="text-sm text-gray-600 py-2">
      Tem certeza que deseja excluir <strong>João Silva</strong>? 
      Todos os dados associados serão removidos permanentemente.
    </p>
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        Excluir
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// ════════════════════════════════════════════════════════════
// MODAL DE SUCESSO / INFORMAÇÃO
// ════════════════════════════════════════════════════════════
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <div className="flex flex-col items-center text-center gap-3 py-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <DialogTitle>Membro Adicionado!</DialogTitle>
          <DialogDescription>
            O convite foi enviado para o e-mail cadastrado.
          </DialogDescription>
        </div>
      </div>
    </DialogHeader>
    
    <DialogFooter className="sm:justify-center">
      <Button onClick={() => setIsOpen(false)}>
        Entendido
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// ════════════════════════════════════════════════════════════
// MODAL DE AÇÃO RÁPIDA (Alterar Status)
// ════════════════════════════════════════════════════════════
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <DialogTitle>Alterar Status</DialogTitle>
      <DialogDescription>Selecione o novo status do membro</DialogDescription>
    </DialogHeader>
    
    <div className="py-4">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ativo">🟢 Ativo</SelectItem>
          <SelectItem value="inativo">🔴 Inativo</SelectItem>
          <SelectItem value="ferias">🟡 Em Férias</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleSave}>
        Salvar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Especificações de Modal

| Tipo | Largura | Ícone | Botão Principal |
|------|---------|-------|-----------------|
| **Confirmação Exclusão** | `max-w-sm` | `AlertTriangle` em `bg-red-100` | `variant="destructive"` |
| **Confirmação Ação** | `max-w-sm` | `AlertCircle` em `bg-amber-100` | `default` |
| **Sucesso** | `max-w-sm` | `Check` em `bg-green-100` | `default` centralizado |
| **Informação** | `max-w-md` | `Info` em `bg-blue-100` | `default` |
| **Ação Rápida** | `max-w-sm` | Opcional | `default` |
| **Seleção/Filtro** | `max-w-md` | Não usa | `default` |

---

#### 4.6.2 Formulário CRUD (Tela Dedicada)

**Sempre usar tela dedicada para:**
- ➕ Criar novo registro
- ✏️ Editar registro existente
- 📋 Formulários com mais de 2 campos

```tsx
export default function AdicionarEquipeVendas() {
  return (
    <div className="space-y-6">
      
      {/* ═══════════════════════════════════════════════════════════
          CABEÇALHO DA PÁGINA
      ═══════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Adicionar Equipe de Vendas</h1>
            <p className="text-sm text-gray-500">
              Adicione vendedores para cobrir mais territórios e oportunidades
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SEÇÃO DO FORMULÁRIO
      ═══════════════════════════════════════════════════════════ */}
      <div className="space-y-6">
        {/* Título da Seção */}
        <div>
          <h2 className="text-lg font-medium text-gray-900">Informações do Novo Membro</h2>
          <p className="text-sm text-gray-500">Preencha os dados completos do novo membro da equipe</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* LINHA COM AVATAR + CAMPOS */}
            <div className="flex gap-6">
              {/* Avatar com upload */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <button 
                    type="button"
                    className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
                  >
                    <Pencil className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Grid de campos - 5 colunas */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" placeholder="Nome completo" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" placeholder="Cargo" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" placeholder="(00) 00000-0000" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dataAdmissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Admissão</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" type="date" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" type="email" placeholder="email@exemplo.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* LINHA 2 - Grid 2 colunas (Perfil + Status) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="perfil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Selecione o perfil" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vendedor">Vendedor</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="diretor">Diretor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <Circle className="h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Selecione o status" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                        <SelectItem value="ferias">Em Férias</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CAMPO LARGURA TOTAL - Endereço */}
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input className="pl-10" placeholder="Endereço completo" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TEXTAREA - Observação */}
            <FormField
              control={form.control}
              name="observacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea 
                        className="pl-10 min-h-[80px]" 
                        placeholder="Observações sobre o membro" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BOTÕES DE AÇÃO */}
            <div className="flex items-center gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => form.reset()}
              >
                Limpar Formulário
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Adicionar Membro
              </Button>
            </div>
            
          </form>
        </Form>
      </div>
    </div>
  );
}
```

#### Especificações do Formulário Complexo

| Elemento | Classe/Especificação |
|----------|----------------------|
| **Espaçamento página** | `space-y-6` |
| **Título seção** | `text-lg font-medium text-gray-900` |
| **Subtítulo seção** | `text-sm text-gray-500` |
| **Avatar grande** | `w-20 h-20` com botão `w-7 h-7` |
| **Avatar médio** | `w-14 h-14` com botão `w-6 h-6` |
| **Grid 5 colunas** | `grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4` |
| **Grid 4 colunas** | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4` |
| **Grid 2 colunas** | `grid-cols-1 md:grid-cols-2 gap-4` |
| **Avatar + campos** | `flex gap-6` com avatar `flex-shrink-0` |
| **Botão limpar** | `variant="outline"` à esquerda |
| **Botão submit** | `flex-1 bg-green-500` (ocupa resto do espaço) |

---

#### Variações de Layout

**Layout 1: Avatar no cabeçalho** (formulário de perfil)
```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <Avatar />
    <div>Título + Descrição</div>
  </div>
  <Button>Voltar</Button>
</div>
```

**Layout 2: Avatar ao lado dos campos** (cadastro de membro)
```tsx
<div className="flex gap-6">
  <Avatar className="flex-shrink-0" />
  <div className="flex-1 grid grid-cols-5 gap-4">
    {/* campos */}
  </div>
</div>
```

---

#### Seções de Formulário

Quando o formulário tem múltiplas seções:

```tsx
<div className="space-y-8">
  {/* Seção 1 */}
  <div className="space-y-4">
    <div>
      <h2 className="text-lg font-medium text-gray-900">Dados Pessoais</h2>
      <p className="text-sm text-gray-500">Informações básicas do membro</p>
    </div>
    <div className="grid grid-cols-4 gap-4">
      {/* campos */}
    </div>
  </div>

  {/* Separador opcional */}
  <Separator />

  {/* Seção 2 */}
  <div className="space-y-4">
    <div>
      <h2 className="text-lg font-medium text-gray-900">Dados Profissionais</h2>
      <p className="text-sm text-gray-500">Informações de cargo e departamento</p>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {/* campos */}
    </div>
  </div>
</div>
```

---

#### Botões de Ação - Variações

**Padrão: Limpar + Submit (largura total)**
```tsx
<div className="flex items-center gap-3 pt-4">
  <Button type="button" variant="outline" onClick={() => form.reset()}>
    Limpar Formulário
  </Button>
  <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
    Adicionar Membro
  </Button>
</div>
```

**Alternativa: Cancelar + Submit (alinhado direita)**
```tsx
<div className="flex justify-end gap-3 pt-4">
  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
    Cancelar
  </Button>
  <Button type="submit" className="bg-green-500 hover:bg-green-600">
    Salvar
  </Button>
</div>
```

**Com 3 botões: Limpar + Cancelar + Submit**
```tsx
<div className="flex items-center justify-between pt-4">
  <Button type="button" variant="ghost" onClick={() => form.reset()}>
    Limpar
  </Button>
  <div className="flex gap-3">
    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
      Cancelar
    </Button>
    <Button type="submit" className="bg-green-500 hover:bg-green-600">
      Salvar
    </Button>
  </div>
</div>
```

---

#### Ícones por Tipo de Campo

| Campo | Ícone Lucide |
|-------|--------------|
| Nome / Usuário | `User` |
| Email | `Mail` |
| Telefone / WhatsApp | `Phone` |
| Cargo | `Briefcase` |
| Data | `Calendar` |
| Endereço | `MapPin` |
| Matrícula / ID | `Hash` |
| Observação | `FileText` |
| Busca | `Search` |
| Senha | `Lock` |
| Link / URL | `Link` |
| Empresa | `Building2` |

---

#### Resumo: Modal vs Tela

| Critério | Modal | Tela CRUD |
|----------|-------|-----------|
| **Quando usar** | Confirmação, Info, Ação rápida | Create, Update, Delete form |
| **Qtd. campos** | 0-2 campos | Qualquer quantidade |
| **Largura** | `max-w-sm` ou `max-w-md` | Tela completa |
| **Navegação** | Fecha o modal | Botão "Voltar" |
| **Botões** | `<DialogFooter>` | `flex justify-end gap-3` |
| **Exemplos** | Excluir, Sucesso, Alterar status | Novo Membro, Editar Lead, Nova Empresa |

**Fluxo típico:**
1. Usuário clica "Novo Membro" → **Tela CRUD**
2. Usuário preenche e salva → **Modal Sucesso**
3. Usuário clica "Excluir" → **Modal Confirmação**
4. Usuário confirma → Ação executada

---

```tsx
<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="grid w-full grid-cols-3" data-testid="tabs-list">
    <TabsTrigger value="tab1" data-testid="tab-tab1">
      <Icon1 className="h-4 w-4 mr-2" />
      Aba 1
    </TabsTrigger>
    <TabsTrigger value="tab2" data-testid="tab-tab2">
      <Icon2 className="h-4 w-4 mr-2" />
      Aba 2
    </TabsTrigger>
    <TabsTrigger value="tab3" data-testid="tab-tab3">
      <Icon3 className="h-4 w-4 mr-2" />
      Aba 3
    </TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1" className="mt-6">
    {/* Conteúdo */}
  </TabsContent>
</Tabs>
```

| Regra | Especificação |
|-------|---------------|
| Grid | `grid-cols-{n}` onde n = número de tabs |
| Ícone | `h-4 w-4 mr-2` |
| Espaço para conteúdo | `mt-6` |

---

### 4.8 Modal / Dialog

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Título do Modal</DialogTitle>
      <DialogDescription>Descrição opcional</DialogDescription>
    </DialogHeader>
    
    <div className="py-4">
      {/* Conteúdo */}
    </div>
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleSave} data-testid="button-confirm">
        Confirmar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

| Tamanho | Classe | Uso |
|---------|--------|-----|
| Pequeno | `max-w-sm` | Confirmações |
| Médio | `max-w-md` | Formulários curtos |
| Grande | `max-w-lg` | Formulários complexos |
| Extra | `max-w-xl` | Conteúdo extenso |
| Full | `max-w-4xl` | Tabelas, previews |

---

### 4.9 Badges

```tsx
// Variantes shadcn
<Badge variant="default">Ativo</Badge>
<Badge variant="secondary">Inativo</Badge>
<Badge variant="destructive">Erro</Badge>
<Badge variant="outline">Rascunho</Badge>

// Customizados (sem hover effect)
<Badge className="bg-green-100 text-green-600 hover:bg-green-100">Aprovado</Badge>
<Badge className="bg-amber-100 text-amber-600 hover:bg-amber-100">Pendente</Badge>
<Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">Premium</Badge>
```

---

### 4.10 Loading States

```tsx
// Centralizado (página ou seção)
<div className="flex justify-center p-8">
  <Loader2 className="h-8 w-8 animate-spin" />
</div>

// Dentro de botão
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
  Salvar
</Button>

// Skeleton
<div className="animate-pulse space-y-3">
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
</div>
```

---

## 5. Estrutura de Página

```tsx
export default function MinhaPage() {
  return (
    <div className="space-y-6">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <IconName className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">
            Título
          </h1>
          <p className="text-sm text-gray-500">Descrição</p>
        </div>
      </div>

      {/* Conteúdo */}
      ...
      
    </div>
  );
}
```

---

## 6. Convenções de data-testid

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Botão | `button-{ação}` | `button-submit`, `button-add` |
| Botão com ID | `button-{ação}-{id}` | `button-edit-123`, `button-delete-456` |
| Input | `input-{campo}` | `input-nome`, `input-email` |
| Select | `select-{campo}` | `select-tipo`, `select-status` |
| Linha tabela | `row-{tipo}-{id}` | `row-member-456`, `row-item-123` |
| Card | `card-{tipo}-{id}` | `card-stat-total` |
| Tab | `tab-{nome}` | `tab-geral`, `tab-membros` |
| Lista tabs | `tabs-list` | — |
| Título página | `page-title` | — |
| Filtro | `filter-{tipo}` | `filter-search-member`, `filter-date-start` |
| Paginação | `button-{prev/next}-page` | `button-prev-page` |
| Page size | `select-page-size` | — |

---

## 7. Navegação

### Adicionar item no Sidebar

```tsx
// client/src/components/layout/sidebar.tsx
const navigation = [
  // ... existentes
  { name: "Nova Página", href: "/nova-pagina", icon: IconName },
];
```

### Adicionar rota

```tsx
// client/src/App.tsx
<Route path="/nova-pagina" component={NovaPagina} />
```

---

## 8. Imports Padrão

```tsx
// Componentes UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Ícones
import { 
  Loader2, Plus, Edit2, Trash2, Building2, Activity, Clock, AlertCircle,
  Search, Filter, Calendar, ChevronLeft, ChevronRight,
  MessageCircle, Pencil, Copy, Mail, UserPlus, Users
} from "lucide-react";
```

---

**UI Design System v1.0** — Dezembro 2024
