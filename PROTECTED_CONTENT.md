# 🔒 PROTECTED_CONTENT.md — MIRA APP
# Proprietária: Amanda Silva Abreu
# REGRA: NUNCA apagar conteúdo deste ficheiro. Apenas ADICIONAR.

---

## ⚠️ REGRAS ABSOLUTAS DO AGENTE

1. **NUNCA reescrever ficheiros inteiros** com `write_to_file Overwrite:true` em ficheiros de dados
2. **NUNCA remover itens de arrays** — apenas adicionar
3. **NUNCA remover funcionalidades** sem aprovação explícita
4. **SEMPRE usar edições cirúrgicas** (`replace_file_content` ou `multi_replace_file_content`)
5. **Login é SEMPRE email + password** — nunca OTP, magic link ou passwordless
6. O **mapa Leaflet** foi removido do módulo Serviços a pedido — NÃO VOLTAR A ADICIONAR
7. A aba **Notificações** foi removida do Perfil — a gestão é APENAS no sino da HomeView

---

## 📚 MÓDULO ESTUDOS — CURSOS

### Ficheiro: `utils/iefpCoursesDatabase.ts` → `IEFP_MASSIVE_DATABASE`

| ID | Título | Categoria | Duração | Link |
|---|---|---|---|---|
| appr-1 | Técnico de Informática - Instalação e Gestão de Redes | Educação & Qualificação | 3200h | https://www.iefp.pt/cursos-de-aprendizagem1 |
| appr-2 | Técnico de Multimédia | Tecnologia & Inovação | 3700h | https://www.iefp.pt/cursos-de-aprendizagem1 |
| appr-3 | Técnico Administrativo e de Recursos Humanos | Empreendedorismo | 3100h | https://www.iefp.pt/cursos-de-aprendizagem1 |
| appr-4 | Técnico de Cozinha/Pastelaria | Emprego & Negócios | 3000h | https://www.iefp.pt/cursos-de-aprendizagem1 |
| appr-5 | Técnico de Energias Renováveis (Eólica) | Emprego & Negócios | 2800h | https://www.iefp.pt/cursos-de-aprendizagem1 |
| efa-1 | Técnico de Logística - Nível IV | Emprego & Negócios | 1200h | https://www.iefp.pt/cursos-de-educacao-e-formacao-para-adultos |
| efa-2 | Cuidador de Crianças e Jovens | Saúde & Bem-estar | 900h | https://www.iefp.pt/cursos-de-educacao-e-formacao-para-adultos |
| efa-3 | Técnico de Design Gráfico | Tecnologia & Inovação | 850h | https://www.iefp.pt/cursos-de-educacao-e-formacao-para-adultos |
| efa-4 | Operador de Máquinas e CNC | Emprego & Negócios | 1100h | https://www.iefp.pt/cursos-de-educacao-e-formacao-para-adultos |
| efa-5 | Técnico de Instalações Elétricas | Emprego & Negócios | 1500h | https://www.iefp.pt/cursos-de-educacao-e-formacao-para-adultos |
| qual-1 | **Processo RVCC Escolar - 9º Ano** | Educação & Qualificação | 6-12 meses | https://www.passaportequalifica.gov.pt/cicLogin.xhtml |
| qual-2 | Processo RVCC Escolar - 12º Ano | Educação & Qualificação | 6-12 meses | https://www.passaportequalifica.gov.pt/cicLogin.xhtml |
| qual-3 | RVCC Profissional - Geriatria e Saúde | Saúde & Bem-estar | Variável | https://www.passaportequalifica.gov.pt/cicLogin.xhtml |
| mod-1 | Competências Digitais Básicas | Educação & Qualificação | 50h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| mod-2 | Inglês Nível A2-B1 | Educação & Qualificação | 100h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| mod-3 | **Primeiros Socorros e SBV** | Saúde & Bem-estar | 25h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| mod-4 | Programação de Robótica Básica | Tecnologia & Inovação | 150h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| mod-5 | Marketing Digital e E-Commerce | Empreendedorismo | 200h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| adv-1 | Tecnologias de Cloud Computing | Tecnologia & Inovação | 350h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| adv-2 | Gestão Ágil de Projetos (Scrum) | Empreendedorismo | 120h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| adv-3 | Soldadura TIG e MIG/MAG Avançada | Emprego & Negócios | 400h | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| int-1 | Cidadania e Empregabilidade em Portugal | Direitos & Legalização | 50h | https://www.iefp.pt/formacao |
| int-2 | **Higiene e Segurança no Trabalho (HST)** | Emprego & Negócios | 35h | https://www.iefp.pt/formacao |

### Ficheiro: `components/LearningHub.tsx` → `IEFP_SYNCED_COURSES` (Links rápidos)

| ID | Título | Link |
|---|---|---|
| iefp-link-1 | Pesquisa de Ofertas de Formação (IEFP) | https://iefponline.iefp.pt/IEFP/pesquisas/search.do?cat=ofertaFormacao |
| iefp-link-2 | Portal Passaporte Qualifica | https://www.passaportequalifica.gov.pt/cicLogin.xhtml |
| iefp-link-3 | Formação Geral IEFP | https://www.iefp.pt/formacao |
| iefp-link-4 | Portal IEFP Online | https://iefponline.iefp.pt/IEFP/index2.jsp |
| iefp-link-5 | Cursos de Aprendizagem (IEFP) | https://www.iefp.pt/cursos-de-aprendizagem1 |
| iefp-link-6 | Cursos de Educação e Formação para Adultos (EFA) | https://www.iefp.pt/cursos-de-educacao-e-formacao-para-adultos |

---

## 📄 MÓDULO DOCUMENTOS — MINUTAS / TEMPLATES

### Ficheiro: `utils/documentsDatabase.ts` → `templates`

| ID | Título | Entidade | Categoria |
|---|---|---|---|
| aima_modelo_1 | Modelo 1 - Pedido e Renovação de AR (ARI/Reagrupamento) | AIMA | Imigração |
| aima_modelo_4 | Modelo 4 - Termo de Responsabilidade | AIMA | Imigração |
| aima_modelo_mi | Modelo Manifestação de Interesse (Art 88/89) | AIMA | Imigração |
| aima_dec_alojamento | Minuta - Declaração de Alojamento | AIMA | Imigração |
| aima_dec_patronal | Minuta - Declaração de Entidade Patronal | AIMA | Trabalho |
| aima_dec_rendimentos | Minuta - Declaração de Posse de Rendimentos | AIMA | Finanças |
| aima_igualdade | Modelo Estatuto de Igualdade de Direitos e Deveres | AIMA / IRN | Direitos |
| aima_prorrogacao | Pedido de Prorrogação de Permanência (Modelo 2/3) | AIMA | Imigração |
| aima_reagrupamento | Requerimento de Reagrupamento Familiar | AIMA | Imigração |
| cnaim_ap | Ficha de Registo - Atendimento CNAIM | CNAIM | Imigração |
| irn_nacionalidade_art6 | Pedido de Nacionalidade Portuguesa (Tempo de Residência) | IRN | Direitos |
| dges_reconhecimento | Formulário de Reconhecimento de Grau Académico | DGES | Educação |
| qualifica_rvcc | Ficha de Inscrição Centro Qualifica (RVCC) | Passaporte Qualifica | Educação |
| iefp_inscricao | Inscrição para Oferta de Emprego IEFP | IEFP | Trabalho |
| ss_niss | Mod. RV 1000 - Inscrição na Segurança Social (NISS) | Segurança Social | Finanças |
| ss_nib | Mod. MG 2 - Alteração de IBAN (Segurança Social) | Segurança Social | Finanças |
| at_rep_fiscal | Nomeação de Representante Fiscal | Autoridade Tributária | Finanças |
| sns_inscricao | Ficha de Inscrição RNUT (Registo Nacional Utentes) | SNS | Saúde |
| sns24_isencao | Pedido de Isenção de Taxas Moderadoras | SNS | Saúde |
| junta_morada | Atestado de Residência (Junta de Freguesia) | Junta de Freguesia | Comunidade |
| prop_auth | Autorização do Proprietário (Alojamento) | Proprietário | Habitação |

### Ficheiro: `utils/documentsDatabase.ts` → `serviceGuides` (Guias)

| ID | Título | Entidade |
|---|---|---|
| g_manifestacao_cima | Nova Autorização de Residência (Pós-MI) | AIMA |
| g_cnaim_triagem | Agendamento Diário no CNAIM | CNAIM |
| g_irn_cidadania | Nacionalidade Portuguesa Online | IRN / gov.pt |
| g_dges_reconhecimento | Reconhecimento de Graus Estrangeiros | DGES |
| g_passaporte_qualifica | Concluir Escola/Acreditação de Competências | Passaporte Qualifica |
| g_eures | Portal EURES (Emprego na Europa) | EURES |
| g_ss_direta | Guia SS Direta: Apoios | Segurança Social |
| g_sns_24 | Como utilizar o portal SNS 24 | Ministério da Saúde |
| g_estatuto_igualdade | Cartão de Cidadão (Estatuto de Igualdade - Brasileiros) | IRN / AIMA |
| g_direitos_politicos | Direitos Iguais e Direitos Políticos | IRN / CNE |

---

## 🏛️ MÓDULO SERVIÇOS — Entidades Oficiais

### Ficheiro: `constants.tsx` → `OFFICIAL_SOURCES`

| Nome | URL | Categoria |
|---|---|---|
| AIMA | https://aima.gov.pt | Imigração e Regularização |
| IEFP | https://iefp.pt | Emprego e Formação |
| ACT | https://act.gov.pt | Condições de Trabalho |
| Segurança Social | https://seg-social.pt | Apoios Sociais |
| IHRU | https://ihru.pt | Habitação |
| Portal das Finanças | https://portaldasfinancas.gov.pt | Finanças e NIF |
| SNS | https://sns.gov.pt | Saúde |
| DGES | https://dges.gov.pt | Educação e Diplomas |
| IRN | https://irn.justica.gov.pt | Registos e Nacionalidade |
| ACM | https://acm.gov.pt | Integração e Direitos Humanos |
| IOM Portugal | https://portugal.iom.int | Refugiados e Migração |
| UNHCR Portugal | https://help.unhcr.org/portugal | Refúgio e Proteção |
| DRE | https://dre.pt | Legislação |
| dados.gov.pt | https://dados.gov.pt | Dados Públicos |
| ANQEP | https://anqep.gov.pt | Formação Profissional |
| justica.gov.pt | https://justica.gov.pt | Serviços Jurídicos |
| Casa do Brasil de Lisboa | https://casadobrasildelisboa.pt | ONGs / Comunidade |

> ⚠️ O mapa Leaflet foi **removido** do LocalServicesMap.tsx. Módulo mostra lista diretamente. NÃO READICIONAR MAPA.

---

## 🖼️ MÓDULO COMUNIDADE — Imagens de Background dos Posts

### Ficheiro: `components/CommunityView.tsx` → `THEMED_IMAGES`

Todas as imagens abaixo devem estar SEMPRE no array (em ordem):

1. `https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80` — Friends integration
2. `https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80` — Diverse community
3. `https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80` — Support/union
4. `https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80` — Happy diverse group
5. `https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=800&q=80` — Journey/Adventure
6. `https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80` — Handshake/Support
7. `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80` — Integration/Education
8. `https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80` — Networking/Team
9. `https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80` — Meeting/Greeting warmly
10. `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80` — Stack of hands / Unity
11. `https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80` — Eating together / Fellowship
12. `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80` — Airplane/Luggage/Journey
13. `https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80` — Group studying / Language barrier
14. `https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80` — Looking at map/city / Discovering
15. `https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80` — Coworking / Professional Integration
16. `https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80` — Diverse people cheering/happy

---

## 👤 FOTOS DE PERFIL — Avatares

### Ficheiro: `constants.tsx` → `PREDEFINED_AVATARS` (48 fotos no total)

**Grupo Original (22 fotos):**
- photo-1534528741775-53994a69daeb, photo-1507003211169-0a1dd7228f2d, photo-1494790108377-be9c29b29330
- photo-1500648767791-00dcc994a43e, photo-1573496359142-b8d87734a5a2, photo-1506794778202-cad84cf45f1d
- photo-1531123897727-8f129e1688ce, photo-1519345182560-3f2917c472ef, photo-1438761681033-6461ffad8d80
- photo-1472099645785-5658abf4ff4e, photo-1544005313-94ddf0286df2, photo-1552058544-f2b08422138a
- photo-1548142813-c348350df52b, photo-1566492031773-4f4e44671857, photo-1554151228-14d9def656e4
- photo-1504257432389-52343af06ae3, photo-1520813792240-56fc4a3765a7, photo-1539571696357-5a69c17a67c6
- photo-1517841905240-472988babdf9, photo-1524504388940-b1c1722653e1, photo-1501196354995-cbb51c65aaea
- photo-1534030347209-467a5b0ad3e6

**Árabes (3):** photo-1576558656222-ba66febe3dec, photo-1603415526960-f7e0328c63b1, photo-1618498082410-b4aa22193b9e

**Asiáticos (5):** photo-1580489944761-15a19d654956, photo-1542206395-9feb3edaa68d, photo-1499952127939-9bbf5af6c51c, photo-1474176857210-7287d38d27c6, photo-1491349174775-aaaefdd81942

**Indígenas / Latino-Americanos (3):** photo-1551836022-d5d88e9218df, photo-1610216705422-caa3fcb6d158, photo-1487412720507-e7ab37603c6f

**Indianos (3):** photo-1506794778202-cad84cf45f1d (seed=ind1), photo-1628157588553-5eeea00af15c, photo-1589156228580-8cf37e2e3237

**Latinos (3):** photo-1595956553066-fe24a8c33395, photo-1488426862026-3ee34a7d66df, photo-1523824921871-d6f1a15151f1

**Europeus (4):** photo-1566616213894-2d4e1baee5d8, photo-1505033575518-a36ea2ef75ae, photo-1543165365-07232ed12fad, photo-1529626455594-4ff0802cfb7e

**Negros / Africanos (4):** photo-1531746020798-e6953c6e8e04, photo-1574701148212-8518049c7b2c, photo-1589156288859-f0cb0d82b065, photo-1547425260-76bcadfb4f2c

---

## 💬 MÓDULO COMUNIDADE — Funcionalidades Obrigatórias

### Botões e Funcionalidades que DEVEM existir sempre:

| Funcionalidade | Localização | Estado |
|---|---|---|
| ❤️ Curtir post | Barra de ações do post | ✅ Ativo |
| 💬 Comentar post | Barra de ações do post | ✅ Ativo |
| 🔖 Guardar post | Barra de ações do post | ✅ Ativo |
| ⋯ Menu 3 pontos (IG style) | Canto superior direito do post | ✅ Ativo |
| 🗑️ Eliminar o meu post | Dentro do menu 3 pontos (só para o autor) | ✅ Ativo |
| 🚨 Denunciar post | Dentro do menu 3 pontos (para outros utilizadores) | ✅ Ativo |
| 📋 Stories no topo | Scroll horizontal de stories | ✅ Ativo |
| 👤 Ver perfil do autor | Clique na pill do autor no post | ✅ Ativo |
| ✅ Votar útil / ❌ Fake | Botões de validação community | ✅ Ativo |
| ➕ Criar novo post | Botão flutuante | ✅ Ativo |
| 🔍 Pesquisa de posts | Barra de pesquisa no topo | ✅ Ativo |
| 🏷️ Filtro por categoria | Scroll de categorias | ✅ Ativo |

### Verificação de autoria do post:
```ts
// O isAuthor verifica AMBOS o ID e o nome para máxima compatibilidade
const isAuthor = post.authorId === user.id || post.authorName === user.name;
```

---

## 🔔 NOTIFICAÇÕES — Sino da HomeView

### Notificações que devem existir no modal do sino:

| ID | Label | Incluir? |
|---|---|---|
| OFFICIAL_AIMA | Direto da AIMA/Gov | ✅ SIM |
| LEGAL_CHANGES | Leis em Tempo Real | ✅ SIM |
| JOB_MATCHES | Vagas do seu Perfil | ✅ SIM |
| MAP_URGENCY | Urgências nos Balcões | ✅ SIM |
| SOCIAL_CONNECT | Interações Comunitárias | ✅ SIM |
| DOC_EXPIRATION | Validade de Documentos | ❌ NÃO — removido a pedido |

---

## ✉️ EMAIL E CONTACTO

- **Email**: `mira.app@hotmail.com`
- **Onde aparece**: Rodapé da página "Segurança & Direitos" (`PrivacyPage.tsx`)
- **Formato**: Texto simples, não link clicável, letras minúsculas, discreto
- **Texto**: `contacto: mira.app@hotmail.com`

---

## 🎨 CORES DO SISTEMA (Brand MIRA)

| Nome | Hex |
|---|---|
| MIRA Orange | `#f97316` |
| MIRA Blue | `#4A707A` |
| MIRA Yellow | `#eab308` |
| MIRA Green | `#22c55e` |

---

## 🏠 MÓDULO PERFIL DO UTILIZADOR

### Abas disponíveis no perfil (GamificationProfile.tsx):
1. ✅ **Publicações** — Posts criados pelo utilizador
2. ✅ **Meus Selos** — Badges desbloqueados
3. ✅ **Salvos** — Posts guardados
4. ❌ ~~Notificações~~ — REMOVIDA (gestão de notificações só no sino da HomeView)

### Selos / Badges disponíveis:
| ID | Nome | Ícone |
|---|---|---|
| 1 | Pioneiro | Flame |
| 2 | Verificador | UserCheck |
| 4 | Especialista em Documentos | FileText |
| 8 | Estudante | Book |
| 9 | Resiliente | Heart |
| 10 | Chat Expert | CalendarCheck |
| 11 | Guia Local | MapPin |
| 12 | Sentinela | ShieldAlert |

---

## 📝 ARTIGOS MIRA (LearningHub.tsx → MIRA_ARTICLES)

| ID | Título | Categoria |
|---|---|---|
| 401 | Regularização 2026: O Novo Artigo 91 | Educação & Qualificação |
| 402 | Saúde em Portugal: Guia do Utente 2026 | Saúde & Bem-estar |

---

*Última atualização: 2026-02-27*
*Este ficheiro é gerido pela proprietária Amanda Silva Abreu e pelo agente de desenvolvimento.*
