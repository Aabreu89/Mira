# Plano de Schema Banco de Dados Supabase - Mira

Este documento detalha o mapeamento das entidades do projeto Mira para o Supabase, organizado por blocos de implementação.

## Mapeamento de Entidades

### Bloco 1: Identidade e Perfis (Core)
Responsável pelo gerenciamento de usuários e suas configurações básicas.

- **`profiles`**: Extensão da tabela `auth.users`.
  - `id`: uuid (PK, references auth.users)
  - `name`: text
  - `avatar_url`: text
  - `bio`: text
  - `nationality`: text
  - `age_range`: text
  - `location`: text
  - `main_challenge`: text
  - `reputation`: integer (default 0)
  - `trust_level`: enum (`Observador`, `Colaborador`, `Curador Comunitário`)
  - `role`: enum (`member`, `mentor`, `admin`)
  - `is_verified`: boolean
  - `is_muted`: boolean
  - `updated_at`: timestamp
- **`user_preferences`**: Configurações de notificação.
  - `user_id`: uuid (PK, references profiles)
  - `official_aima`: boolean
  - `legal_changes`: boolean
  - `doc_expiration`: boolean
  - `job_matches`: boolean
  - `community_reputation`: boolean
  - `map_urgency`: boolean
  - `mira_insights`: boolean
  - `social_connect`: boolean

### Bloco 2: Comunidade e Conteúdo
Interações entre usuários, postagens e comentários.

- **`posts`**: Publicações no fórum/comunidade.
  - `id`: uuid (PK)
  - `author_id`: uuid (references profiles)
  - `title`: text
  - `content`: text
  - `category`: text (ou FK para `categories`)
  - `work_topic`: text
  - `geo_tag`: text
  - `background_image`: text
  - `tags`: text[]
  - `is_verified`: boolean
  - `is_fraud_warning`: boolean
  - `urgency`: integer (0-5)
  - `validation_status`: enum (`pending`, `validated`, `under_review`, `hidden`)
  - `created_at`: timestamp
- **`comments`**: Comentários em postagens.
  - `id`: uuid (PK)
  - `post_id`: uuid (references posts)
  - `author_id`: uuid (references profiles)
  - `content`: text
  - `is_validated`: boolean
  - `created_at`: timestamp
- **`post_votes`**: Votos de utilidade/fake nas postagens.
  - `id`: uuid (PK)
  - `post_id`: uuid (references posts)
  - `user_id`: uuid (references profiles)
  - `vote_type`: enum (`useful`, `fake`, `review`, `like`)

### Bloco 3: Gamificação (Conquistas)
- **`badges`**: Catálogo de medalhas.
  - `id`: uuid (PK)
  - `name`: text
  - `description`: text
  - `icon`: text
  - `category`: enum (`social`, `legal`, `trust`, `help`)
- **`user_badges`**: Medalhas conquistadas pelos usuários.
  - `user_id`: uuid (references profiles)
  - `badge_id`: uuid (references badges)
  - `unlocked_at`: timestamp

### Bloco 4: Conteúdo Externo e Serviços
- **`job_posts`**: Vagas de emprego.
  - `id`: uuid (PK)
  - `title`: text
  - `location`: text
  - `source_name`: text
  - `source_url`: text
  - `tags`: text[]
  - `category`: text
  - `work_topic`: text
  - `created_at`: timestamp
- **`courses`**: Cursos e formações.
  - `id`: uuid (PK)
  - `title`: text
  - `description`: text
  - `category`: text
  - `type`: text
  - `duration`: text
  - `image_url`: text
  - `link`: text
  - `is_iefp_synced`: boolean
- **`map_alerts`**: Alertas e serviços no mapa.
  - `id`: uuid (PK)
  - `title`: text
  - `category`: text
  - `location`: geography(POINT)
  - `address`: text
  - `city`: text
  - `image_url`: text
  - `contact_info`: jsonb (phone, email)

### Bloco 5: Assistente AI e Documentos
- **`chat_sessions`**: Sessões de chat com o assistente.
  - `id`: uuid (PK)
  - `user_id`: uuid (references profiles)
  - `title`: text
  - `created_at`: timestamp
- **`chat_messages`**: Histórico de mensagens.
  - `id`: uuid (PK)
  - `session_id`: uuid (references chat_sessions)
  - `role`: enum (`user`, `assistant`)
  - `content`: text
  - `created_at`: timestamp
- **`document_templates`**: Modelos de documentos legais.
  - `id`: uuid (PK)
  - `title`: text
  - `category`: text
  - `complexity`: text
  - `description`: text
  - `requirements`: text[]
  - `fields`: jsonb (lista de campos necessários)
- **`user_documents`**: Documentos gerados ou em progresso.
  - `id`: uuid (PK)
  - `user_id`: uuid (references profiles)
  - `template_id`: uuid (references document_templates)
  - `title`: text
  - `form_data`: jsonb
  - `file_url`: text
  - `is_draft`: boolean

### Bloco 6: Logs e Auditoria
- **`activity_logs`**: Telemetria do app.
  - `id`: uuid (PK)
  - `user_id`: uuid (references profiles)
  - `action`: text
  - `category`: text
  - `metadata`: jsonb
  - `created_at`: timestamp

---

## Próximos Passos
1. Validar este mapeamento.
2. Implementar o Bloco 1 (Perfis e Preferências) via Migrations SQL.
3. Configurar RLS (Row Level Security) para cada tabela.
4. Implementar Triggers para criação automática de perfil ao registrar no Auth.
