# DESIGN TOKENS - TECNOPANO
## Valores de Design Padrão (NÃO ALTERAR)

### BORDAS E RADIUS
- **--radius:** `0.5rem` (8px)
- **--radius-sm:** `calc(var(--radius) - 4px)` = 4px
- **--radius-md:** `calc(var(--radius) - 2px)` = 6px
- **--radius-lg:** `var(--radius)` = 8px
- **--radius-xl:** `calc(var(--radius) + 4px)` = 12px

### CARDS
- **Border radius:** `rounded-xl` (12px)
- **Border:** `border`
- **Shadow:** `shadow`
- **CardHeader padding:** `p-6` (24px) com `space-y-1.5` (6px)
- **CardContent padding:** `p-6 pt-0` (24px horizontal, 0 top)
- **CardFooter padding:** `p-6 pt-0` (24px horizontal, 0 top)
- **StatsCard icon wrapper:** `w-12 h-12` (48px × 48px)
- **StatsCard icon size:** `h-6 w-6` (24px × 24px)

### INPUTS
- **Height:** `h-9` (36px)
- **Padding:** `px-3 py-1` (12px horizontal, 4px vertical)
- **Border radius:** `rounded-md` (6px)
- **Border:** `border border-input`
- **Text size:** `text-base` (16px) / `md:text-sm` (14px no desktop)
- **Placeholder:** `text-muted-foreground`

### BOTÕES
- **Default size:**
  - Min height: `min-h-9` (36px)
  - Padding: `px-4 py-2` (16px horizontal, 8px vertical)
  - Border radius: `rounded-md` (6px)
  - Font size: `text-sm` (14px)
  - Font weight: `font-medium`

- **Small size:**
  - Min height: `min-h-8` (32px)
  - Padding: `px-3` (12px horizontal)
  - Border radius: `rounded-md` (6px)
  - Font size: `text-xs` (12px)

- **Large size:**
  - Min height: `min-h-10` (40px)
  - Padding: `px-8` (32px horizontal)
  - Border radius: `rounded-md` (6px)

- **Icon size:**
  - `h-9 w-9` (36px × 36px)

- **SVG icons em botões:**
  - `size-4` (16px × 16px)

### FONTES
- **Font family:** `'Inter', sans-serif`
- **CardTitle:** `font-semibold` + `leading-none` + `tracking-tight`
- **CardDescription:** `text-sm` (14px) + `text-muted-foreground`
- **StatsCard title:** `text-sm` (14px) + `font-medium`
- **StatsCard value:** `text-3xl` (30px) + `font-bold` + `tracking-tight`

### ÍCONES
- **Default em componentes:** `size-4` (16px × 16px)
- **Em botões:** `[&_svg]:size-4` (16px × 16px)
- **StatsCard:** `h-6 w-6` (24px × 24px)
- **Icon wrapper StatsCard:** `w-12 h-12` (48px × 48px) + `rounded-full`

### ESPAÇAMENTOS
- **CardHeader:** `p-6` (24px) + `space-y-1.5` (6px entre elementos)
- **CardContent:** `p-6 pt-0` (24px horizontal/vertical, 0 top)
- **CardFooter:** `p-6 pt-0` (24px horizontal/vertical, 0 top)
- **Input:** `px-3 py-1` (12px horizontal, 4px vertical)
- **Button default:** `px-4 py-2` (16px horizontal, 8px vertical)
- **Button sm:** `px-3` (12px horizontal)
- **Button lg:** `px-8` (32px horizontal)

### SOMBRAS
- **Card:** `shadow`
- **Button default:** Sem shadow (apenas border)
- **Button outline:** `shadow-xs` + `active:shadow-none`
- **Button destructive:** `shadow-sm`

### CORES (Padrão do Git)
- **Primary:** `#FF073A` (HSL: 348 100% 51%)
- **Background:** Branco (Light) / Cinza escuro (Dark)
- **Foreground:** Cinza escuro (Light) / Branco (Dark)

---
**IMPORTANTE:** Estes valores devem ser mantidos conforme especificado acima.
