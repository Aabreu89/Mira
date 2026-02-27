# MIRA — Plano de Ação

> Criado: 2026-02-25 | Baseado na auditoria completa do projeto

---

## 🔴 Sprint 1 — Fundação (1-2 dias)
*"Ligar o motor"*

Estes passos desbloqueiam tudo o que já existe no app.

### 1.1 Criar `lib/supabase.ts`
- Instanciar o cliente Supabase com `SUPABASE_URL` + `SUPABASE_ANON_KEY`
- Atualizar `.env.local` com as chaves (já obtidas via MCP)
- Configurar `vite.config.ts` para expor as variáveis ao frontend

### 1.2 Substituir login mockado por Supabase Auth
- Trocar `AuthScreen.tsx` (atualmente com senha hardcoded `Britney123`)
- Implementar `supabase.auth.signInWithPassword()` e `signUp()`
- O trigger `on_auth_user_created` já cria o perfil automaticamente no banco
- Adicionar sessão persistente com `onAuthStateChange()`

### 1.3 Conectar dados ao Supabase
- Posts, comentários e votos passam a ler/escrever no banco real
- Substituir estado local do React (`useState`) por queries ao Supabase
- Dados sobrevivem ao recarregar a página

**✅ Resultado: App funcional com login real e dados persistidos.**

---

## 🟡 Sprint 2 — Segurança e Deploy (1 dia)
*"Colocar no ar de forma segura"*

### 2.1 Proteger a API Key do Gemini
- Mover chamadas do `geminiService.ts` para uma **Edge Function** no Supabase
- Remover exposição da `GEMINI_API_KEY` no bundle do cliente (`vite.config.ts`)

### 2.2 Deploy na Vercel
- Criar `vercel.json` com configuração do Vite (SPA rewrite)
- Configurar variáveis de ambiente na Vercel
- Validar `.gitignore` (garantir que `.env.local` não suba)

**✅ Resultado: App online em produção com chaves protegidas.**

---

## 🟢 Sprint 3 — Dados Reais (2-3 dias)
*"Dar vida ao conteúdo"*

### 3.1 Seed de dados iniciais
- Popular `posts`, `courses`, `map_alerts` com informações reais de Portugal
- Migrar os dados mockados do `App.tsx` para o banco

### 3.2 Conectar Analytics ao banco
- `analyticsService.ts` atualmente guarda logs **só em memória**
- Migrar para `INSERT` na tabela `activity_logs` do Supabase

### 3.3 Mapa interativo real
- Substituir o componente `LocalServicesMap` por mapa real com **Leaflet.js** (gratuito)
- Puxar dados da tabela `map_alerts` (já tem suporte PostGIS/geography)

**✅ Resultado: Conteúdo real, analytics persistidos e mapa funcional.**

---

## 🔵 Sprint 4 — Polimento (contínuo)
*"Experiência premium"*

### 4.1 Vagas de emprego reais
- [x] Integrar com db para popular `job_posts`

### 4.2 Supabase Storage
- [x] Criar bucket para PDFs gerados
- [x] Integrar upload no `DocumentAssistant`

### 4.3 2FA real
- [x] Ativar e-mail OTP via Supabase Auth (suporte nativo)
- [x] Substituir a simulação atual no `AuthScreen.tsx`

### 4.4 Notificações push
- [x] Conectar `user_preferences` a um sistema de notificações reais

**✅ Resultado: App completo e premium.**

---

## Resumo Visual

```
Sprint 1 → Login real + dados persistidos       [CRÍTICO]
Sprint 2 → Deploy seguro na Vercel              [IMPORTANTE]
Sprint 3 → Conteúdo real + mapa + analytics     [VALOR]
Sprint 4 → Storage, 2FA, vagas, notificações    [POLIMENTO]
```

## Recursos Disponíveis

| Recurso | Status |
|---------|--------|
| Supabase URL | ✅ `https://ychwhxkxsxmuvabxlyjn.supabase.co` |
| Supabase Anon Key | ✅ Obtida via MCP |
| Banco de dados | ✅ 13 tabelas com RLS criadas |
| Gemini API Key | ✅ Configurada no `.env.local` |
| Supabase MCP | ✅ Conectado e funcional |
