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

## 📄 MÓDULO DOCUMENTOS — TEMPLATES OFICIAIS
### Ficheiro: `utils/documentsDatabase.ts` → `templates`

| ID | Título | Entidade | Categoria |
|---|---|---|---|
| aima_ar_temp | Requerimento de AR Temporária (Modelo AIMA) | AIMA | Residência e Legalização |
| aima_ar_renovacao | Requerimento de Renovação de AR | AIMA | Residência e Legalização |
| aima_dec_alojamento | Declaração de Alojamento / Hospitalidade | AIMA | Residência e Legalização |
| aima_dec_responsabilidade | Declaração de Responsabilidade (Reagrupamento) | AIMA | Residência e Legalização |
| aima_dec_sustento | Declaração de Sustento / Garantia Financeira | AIMA | Residência e Legalização |
| aima_ar_humanitaria | AR por Razões Humanitárias (Proteção) | AIMA | Residência e Legalização |
| crue_req | Certificado de Registo de Cidadão da UE | Câmara Municipal | Residência e Legalização |
| irn_nacionalidade_casamento | Pedido de Nacionalidade (Casamento/União) | IRN | Registos e Nacionalidade |
| irn_nacionalidade_residencia | Pedido de Nacionalidade (Residência) | IRN | Registos e Nacionalidade |
| certidao_civil_req | Requerimento de Certidão (Nascimento/Casamento) | IRN | Registos e Nacionalidade |
| nacionalidade_filhos | Nacionalidade para Filhos de Estrangeiros | IRN | Registos e Nacionalidade |
| procuracao_registo | Formulário de Procuração (Conservatória) | IRN | Registos e Nacionalidade |
| irn_cc_resident | Requerimento de Cartão de Cidadão (Residentes) | IRN | Registos e Nacionalidade |
| iefp_inscricao | Inscrição para Oferta de Emprego IEFP | IEFP | Emprego e Formação |
| iefp_reembolso_formacao | Pedido de Reembolso de Despesas (IEFP) | IEFP | Emprego e Formação |
| ss_dec_desemprego | Declaração de Situação de Desemprego (RP 5044) | Segurança Social | Emprego e Formação |
| ss_abono_familia | Requerimento de Abono de Família / RSI | Segurança Social | Segurança Social |
| ss_dec_situacao_economica | Declaração de Situação Económica | Segurança Social | Segurança Social |
| ss_niss | Inscrição na Segurança Social (Atribuição NISS) | Segurança Social | Segurança Social |
| sns_inscricao | Inscrição no Centro de Saúde (N.º Utente) | SNS | Saúde (SNS) |
| sns_alteracao_dados | Alteração de Morada ou Contacto no SNS | SNS | Saúde (SNS) |
| sns_reembolso_despesas | Pedido de Reembolso de Despesas de Saúde | SNS | Saúde (SNS) |
| nif_req | Pedido de Número de Identificação Fiscal (NIF) | AT | Finanças |
| at_rep_fiscal | Declaração de Representante Fiscal | AT | Finanças |
| at_alteracao_morada | Alteração de Morada Fiscal | AT | Finanças |
| dges_reconhecimento | Reconhecimento de Habilitações Académicas | DGES | Educação e Reconhecimento |
| dge_secundario_equivalencia | Equivalência de Estudos do Ensino Secundário | DGE | Educação e Reconhecimento |
| denuncia_discriminacao | Denúncia de Discriminação Racial | CICDR | Direitos e Apoios Sociais |
| dec_violencia_domestica | Estatuto de Vítima de Violência Doméstica | PSP / GNR | Direitos e Apoios Sociais |
| apoio_arrendamento | Pedido de Apoio ao Arrendamento (Porta Entrada) | IHRU | Habitação |
| junta_morada | Atestado de Residência (Junta de Freguesia) | Junta Freguesia | Habitação |

### Ficheiro: `utils/documentsDatabase.ts` → `serviceGuides` (Guias)

| ID | Título | Entidade | Categoria |
|---|---|---|---|
| g_manifestacao_cima | Nova AR (Pós-Manifestação de Interesse) | AIMA | Residência e Legalização |
| g_cnaim_triagem | Agendamento Diário no CNAIM | CNAIM | Residência e Legalização |
| g_irn_cidadania | Nacionalidade Portuguesa Online | IRN | Registos e Nacionalidade |
| g_dges_reconhecimento | Reconhecimento de Graus Estrangeiros | DGES | Educação e Reconhecimento |
| g_ss_direta | Guia SS Direta: Apoios | Segurança Social | Segurança Social |
| g_sns_24 | Como utilizar o portal SNS 24 | SNS | Saúde (SNS) |
| g_estatuto_igualdade | CC (Estatuto de Igualdade - Brasileiros) | IRN / AIMA | Registos e Nacionalidade |
| g_direitos_politicos | Direitos Iguais e Direitos Políticos | IRN / CNE | Registos e Nacionalidade |

---

## 🏛️ MÓDULO SERVIÇOS — Entidades Oficiais

### Ficheiro: `constants.tsx` → `OFFICIAL_SOURCES`

| Nome | URL | Categoria |
|---|---|---|
| AIMA | https://aima.gov.pt | Residência e Legalização |
| IEFP | https://iefp.pt | Emprego e Formação |
| ACT | https://act.gov.pt | Emprego e Formação |
| Segurança Social | https://seg-social.pt | Segurança Social |
| IHRU | https://ihru.pt | Habitação |
| Portal das Finanças | https://portaldasfinancas.gov.pt | Finanças |
| SNS | https://sns.gov.pt | Saúde (SNS) |
| DGES | https://dges.gov.pt | Educação e Reconhecimento |
| IRN | https://irn.justica.gov.pt | Registos e Nacionalidade |
| ACM | https://acm.gov.pt | Direitos e Apoios Sociais |
| IOM Portugal | https://portugal.iom.int | Direitos e Apoios Sociais |
| UNHCR Portugal | https://help.unhcr.org/portugal | Direitos e Apoios Sociais |
| DRE | https://dre.pt | Direitos e Apoios Sociais |
| dados.gov.pt | https://dados.gov.pt | Tecnologia & Ética Digital |
| ANQEP | https://anqep.gov.pt | Educação e Reconhecimento |
| justica.gov.pt | https://justica.gov.pt | Registos e Nacionalidade |
| Casa do Brasil de Lisboa | https://casadobrasildelisboa.pt | Direitos e Apoios Sociais |

> ⚠️ O mapa Leaflet foi **removido** do LocalServicesMap.tsx. Módulo mostra lista diretamente. NÃO READICIONAR MAPA.

---

## 🗺️ MÓDULO SERVIÇOS — Lista de Serviços Locais (`map_alerts` no Supabase)

> ⚠️ NUNCA apagar estes registos da base de dados. São a base do módulo Serviços.

### 🔵 NORTE

| Nome | Morada | Cidade | Website | Categoria BD |
|---|---|---|---|---|
| Cruz Vermelha Portuguesa – Delegação de Braga | Rua Bernardo Sequeira, 247, 4715-017 Braga | Braga | https://www.cruzvermelha.pt | Comunidade & Solidariedade |
| SEIVA – Associação ao Serviço da Vida | Rua de Vilar, 130, 4050-625 Porto | Porto | https://seiva.co.pt | Comunidade & Solidariedade |
| ASI – Associação Solidariedade Internacional | Rua das Pedras nº 307 e Rua Diogo Cão nº 257 | Vila Nova de Gaia | https://www.asigv.org | Comunidade & Solidariedade |

### 🟨 CENTRO

| Nome | Morada | Cidade | Website | Categoria BD |
|---|---|---|---|---|
| UNIVERA – Centro Social e Paroquial da Vera Cruz | Rua Campeão das Províncias, 1º andar, 3800-124 Aveiro | Aveiro | https://www.cspveracruz.pt | Comunidade & Solidariedade |
| Casa Lusófona ONGD | Avenida Sá da Bandeira 115, 4º piso, Loja 37/38, 3004-515 Coimbra | Coimbra | — | Comunidade & Solidariedade |
| InPulsar – Associação para o Desenvolvimento Comunitário | Rua Dr. José Gonçalves, nº 55, Loja 3, Piso -1, 2410-121 Leiria | Leiria | http://www.inpulsar.pt | Comunidade & Solidariedade |

### 🟧 LISBOA E VALE DO TEJO

| Nome | Morada | Cidade | Website | Categoria BD |
|---|---|---|---|---|
| Centro Social e Paroquial Costa da Caparica | Avenida 1º de Maio, nº 4, R/C, 2825-395 Costa da Caparica | Almada | https://www.cspcostacap.org | Comunidade & Solidariedade |
| Centro Cultural Moldavo | Rua José Malhoa, nº 11, Trajouce, 2785-657 São Domingos de Rana | Cascais | — | Comunidade & Solidariedade |
| BYP – Batoto Yetu Portugal | Avenida João de Freitas Branco, nº 12, 2760-073 Caxias | Oeiras | https://batotoyetu.org | Comunidade & Solidariedade |
| AGUINENSO – Associação Guineense de Solidariedade Social | Avenida João Paulo II, Lote 528, 2A, Bairro do Condado, 1950-430 Lisboa | Lisboa | — | Comunidade & Solidariedade |
| Município de Odivelas – Serviço de Apoio ao Imigrante | Rua Alfredo Roque Gameiro, nº 18B, 2675-277 Odivelas | Odivelas | https://www.cm-odivelas.pt | Documentos & Regularização |
| Associação ProAbraçar | Praceta do Chapim, nº 26, R/C, 2080-048 Almeirim | Almeirim | — | Comunidade & Solidariedade |
| Fábrica da Igreja de Nossa Senhora da Conceição | Avenida Bento de Jesus Caraça, nº 77, 2910-430 Setúbal | Setúbal | — | Comunidade & Solidariedade |

### 🟥 ALENTEJO

| Nome | Morada | Cidade | Website | Categoria BD |
|---|---|---|---|---|
| Câmara Municipal de Beja – Divisão de Desenvolvimento Social | Rua de Angola, nº 5, 7800-468 Beja | Beja | https://www.cm-beja.pt | Documentos & Regularização |
| Associação Caboverdiana de Sines e Santiago do Cacém | Rua João Doroteia, Lote LE1, 7520-109 Sines | Sines | — | Comunidade & Solidariedade |

### 🟦 ALGARVE

| Nome | Morada | Cidade | Website | Categoria BD |
|---|---|---|---|---|
| DOINA – Associação de Imigrantes Romenos e Moldavos do Algarve | Avenida 5 de Outubro, Porta 76, 8135-100 Almancil | Loulé | — | Comunidade & Solidariedade |
| GRATO – Grupo de Apoio a Toxicodependentes | Avenida Guanaré (Pavilhão), 8500-507 Portimão | Portimão | — | Comunidade & Solidariedade |

### 🤝 ORGANIZAÇÕES DE APOIO NACIONAL / ONGs

| Nome | Morada | Cidade | Website | Categoria BD |
|---|---|---|---|---|
| JRS Portugal – Serviço Jesuíta aos Refugiados | Lisboa (sede nacional) | Lisboa | https://www.jrsportugal.pt | Comunidade & Solidariedade |
| Conselho Português para os Refugiados (CPR) | Estrada da Costa, nº 1359, 2750-642 Cascais | Cascais | https://www.cpr.pt | Documentos & Regularização |
| Solidariedade Imigrante (SOLIM) | Rua do Benformoso, 289, 1100-085 Lisboa | Lisboa | https://www.solim.org | Comunidade & Solidariedade |
| Casa do Brasil de Lisboa | Rua Luz Soriano, nº 42, 1200-246 Lisboa | Lisboa | https://www.casadobrasil.pt | Comunidade & Solidariedade |
| Refugees Welcome Portugal | Lisboa | Lisboa | https://refugeeswelcomepor.org | Comunidade & Solidariedade |
| APIRP – Associação de Apoio a Imigrantes e Refugiados em Portugal | Lisboa | Lisboa | https://apirp.pt | Comunidade & Solidariedade |
| FEMAFRO – Associação de Mulheres Negras, Africanas e Afrodescendentes | Lisboa | Lisboa | https://femafro.org | Comunidade & Solidariedade |
| Médicos do Mundo Portugal | Rua dos Lusíadas, 64 A, 1300-366 Lisboa | Lisboa | https://www.medicosdomundo.pt | Saúde & Bem-Estar |
| Cáritas Portuguesa | Av. Marechal Craveiro Lopes, nº 165, 1749-009 Lisboa | Lisboa | https://www.caritas.pt | Comunidade & Solidariedade |
| Open Gate Portugal | Lisboa | Lisboa | https://opengateportugal.org | Comunidade & Solidariedade |
| ADIP – Associação Despertar Imigrantes em Portugal | Lisboa | Lisboa | https://adip.pt | Comunidade & Solidariedade |
| CNAIM Lisboa | Lisboa | Lisboa | https://aima.gov.pt | Documentos & Regularização |
| CNAIM Porto | Porto | Porto | https://aima.gov.pt | Documentos & Regularização |
| CNAIM Faro | Faro | Faro | https://aima.gov.pt | Documentos & Regularização |
| CLAIM – Centros Locais de Apoio à Integração de Migrantes | Rede nacional | Nacional | https://aima.gov.pt | Documentos & Regularização |

### 💼 Centros de Emprego (IEFP)

#### 🟦 NORTE
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Centro de Emprego de Braga | Rua de São Marcos, 126 | Braga | https://www.iefp.pt |
| Centro de Emprego do Porto | Rua de Entre Quintas, 4440-213 Alfena | Porto | https://www.iefp.pt |
| Centro de Emprego de Guimarães | Rua da Rainha D. Mafalda | Guimarães | https://www.iefp.pt |
| Centro de Emprego de Viana do Castelo | Largo de Camões | Viana do Castelo | https://www.iefp.pt |

#### 🟩 CENTRO
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Centro de Emprego de Aveiro | Rua do Comércio | Aveiro | https://www.iefp.pt |
| Centro de Emprego de Coimbra | Rua Visconde da Luz | Coimbra | https://www.iefp.pt |
| Centro de Emprego de Leiria | Rua Carreira dos Rapazes | Leiria | https://www.iefp.pt |
| Centro de Emprego de Viseu | Rua do Comércio | Viseu | https://www.iefp.pt |

#### 🟨 LISBOA E VALE DO TEJO
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Centro de Emprego de Lisboa — Picoas | Av. Fontes Pereira de Melo, 14 | Lisboa | https://www.iefp.pt |
| Centro de Emprego Almada / Seixal | Rua de Queluz, Lt. 54 A | Almada | https://www.iefp.pt |
| Centro de Emprego de Oeiras | Rua Manuel da Maia, 2 | Oeiras | https://www.iefp.pt |
| Centro de Emprego de Sintra | Estrada de Mem Martins | Sintra | https://www.iefp.pt |

#### 🟥 ALENTEJO
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Centro de Emprego de Évora | Rua do Cardeal D. Alexandre | Évora | https://www.iefp.pt |
| Centro de Emprego de Beja | Rua do Pará | Beja | https://www.iefp.pt |
| Centro de Emprego de Portalegre | Rua de Santo António | Portalegre | https://www.iefp.pt |

#### 🟧 ALGARVE
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Centro de Emprego de Faro | Rua Conselheiro Bivar | Faro | https://www.iefp.pt |
| Centro de Emprego de Loulé | Av. 5 de Outubro, 3 | Loulé | https://www.iefp.pt |
| Centro de Emprego de Portimão | Rua dos Campeões Olímpicos | Portimão | https://www.iefp.pt |

### 🟠 AIMA / ACM — Agência para a Integração, Migrações e Asilo

| Nome | Morada | Cidade | Website |
|---|---|---|---|
| AIMA – Unidade de Lisboa (CNAIM) | Rua Álvaro Coutinho, 14–16 | Lisboa | https://aima.gov.pt |
| AIMA – Unidade do Porto (Norte) | Avenida de França, 316, Edifício Capitólio | Porto | https://aima.gov.pt |
| AIMA – Unidade de Faro (Algarve) | Loja do Cidadão de Faro, Mercado Municipal | Faro | https://aima.gov.pt |
| ACM — Apoio ao Migrante | — | Nacional | https://www.gov.pt/pt/servicos/centros-nacionais-de-apoio-a-integracao-de-migrantes-cnaim |

### 🔵 IRN — Instituto dos Registos e Notariado (Centrais)

| Nome | Morada | Cidade | Website |
|---|---|---|---|
| IRN – Conservatória Central de Lisboa | Rua de São Bento, 148 | Lisboa | https://irn.justica.gov.pt |
| IRN – Conservatória Central do Porto | Praça de Gomes Teixeira | Porto | https://irn.justica.gov.pt |
| IRN – Conservatória Central de Coimbra | Praça 8 de Maio | Coimbra | https://irn.justica.gov.pt |
| IRN – Conservatória Central de Évora | Praça do Sertório | Évora | https://irn.justica.gov.pt |
| IRN – Conservatória Central de Faro | Avenida da República, n.º 286 | Faro | https://irn.justica.gov.pt |

### 🟡 Conservatórias do Registo Civil – por Região

#### 🟦 NORTE
| Nome | Morada | Cidade |
|---|---|---|
| Conservatória do Registo Civil de Braga | Rua de São Victor | Braga |
| Conservatória do Registo Civil de Guimarães | Largo Oliveira Martins | Guimarães |
| Conservatória do Registo Civil de Viana do Castelo | Av. dos Combatentes | Viana do Castelo |
| Conservatória do Registo Civil de Vila Nova de Gaia | Rua de Santos Pousada | Vila Nova de Gaia |
| Conservatória do Registo Civil de Matosinhos | Rua de Brito Capelo | Matosinhos |

#### 🟩 CENTRO
| Nome | Morada | Cidade |
|---|---|---|
| Conservatória do Registo Civil de Aveiro | Largo da Praça do Peixe | Aveiro |
| Conservatória do Registo Civil de Leiria | Praça Rodrigues Lobo | Leiria |
| Conservatória do Registo Civil de Viseu | Largo da Sé | Viseu |

#### 🟨 LISBOA E VALE DO TEJO
| Nome | Morada | Cidade |
|---|---|---|
| Conservatória do Registo Civil de Lisboa (Douradores) | Rua dos Douradores, 109 | Lisboa |
| Conservatória do Registo Civil de Almada | Avenida Alfredo da Silva | Almada |
| Conservatória do Registo Civil de Sintra | Rua Dr. Alfredo da Costa | Sintra |
| Conservatória do Registo Civil de Cascais | Avenida Valbom | Cascais |

#### 🟥 ALENTEJO
| Nome | Morada | Cidade |
|---|---|---|
| Conservatória do Registo Civil de Évora – Central | Praça do Sertório | Évora |
| Conservatória do Registo Civil de Beja | Rua D. Pedro V | Beja |

#### 🟧 ALGARVE
| Nome | Morada | Cidade |
|---|---|---|
| Conservatória do Registo Civil de Faro – Central | Avenida da República, 286 | Faro |
| Conservatória do Registo Civil de Portimão | Rua do Comércio | Portimão |

### 🟢 Lojas do Cidadão (Atendimento Integrado)

#### 🟨 LISBOA E VALE DO TEJO
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Loja do Cidadão de Lisboa – Picoas | Av. Fontes Pereira de Melo, 34 B | Lisboa | https://www.portaldocidadao.pt |
| Loja do Cidadão de Almada | Av. Dom João II, nº 18 | Almada | https://www.portaldocidadao.pt |
| Loja do Cidadão de Sintra | Rua Dr. Alfredo da Costa, nº 2 | Sintra | https://www.portaldocidadao.pt |
| Loja do Cidadão de Cascais | Largo da República, nº 1 | Cascais | https://www.portaldocidadao.pt |

#### 🟦 NORTE
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Loja do Cidadão do Porto – Aliados | Avenida dos Aliados, 11 | Porto | https://www.portaldocidadao.pt |
| Loja do Cidadão de Braga | Largo São João do Souto | Braga | https://www.portaldocidadao.pt |
| Loja do Cidadão de Guimarães | Rua D. João I | Guimarães | https://www.portaldocidadao.pt |

#### 🟩 CENTRO
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Loja do Cidadão de Coimbra | Rua do Brasil, nº 55 | Coimbra | https://www.portaldocidadao.pt |
| Loja do Cidadão de Aveiro | Largo da Praça do Peixe | Aveiro | https://www.portaldocidadao.pt |

#### 🟥 ALENTEJO
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Loja do Cidadão de Évora | Rua da República | Évora | https://www.portaldocidadao.pt |

#### 🟧 ALGARVE
| Nome | Morada | Cidade | Website |
|---|---|---|---|
| Loja do Cidadão de Faro – Centro | Avenida da República, nº 286 | Faro | https://www.portaldocidadao.pt |

---


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

### Ficheiro: `constants.tsx` → `PREDEFINED_AVATARS` (58 fotos no total)

**Grupo 1: Diversos (22 originais):**
- https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1763757321162-95c0de309d22?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=400&fit=crop

**Grupo 2: Árabes (3):**
- https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1510832198440-a52376950479?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop

**Grupo 3: Asiáticos (7):**
- https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1621390890561-48f5afc3be21?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1668536681456-817e4a575c6e?w=400&h=400&fit=crop

**Grupo 4: Indígenas / Latino-Americanos (5):**
- https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1563237023-b1e970526dcb?w=400&h=400&fit=crop

**Grupo 5: Indianos (4):**
- https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=400&h=400&fit=crop

**Grupo 6: Latinos (5):**
- https://images.unsplash.com/photo-1657773558233-e7b245d59bf5?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1653129305118-3c5b26df576c?w=400&h=400&fit=crop

**Grupo 7: Europeus (6):**
- https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1543165365-07232ed12fad?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1550525811-e5869dd03032?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=400&h=400&fit=crop

**Grupo 8: Negros / Africanos (6):**
- https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1618559850638-2aed8a8e8cdc?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1589156288859-f0cb0d82b065?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?w=400&h=400&fit=crop
- https://images.unsplash.com/photo-1579420593648-0deba81fd762?w=400&h=400&fit=crop

---

## 🖼️ IMAGENS E RECURSOS ESTÁTICOS

### Diretório: `public/`
- `logo-mira.png`: Logótipo oficial do MIRA (Utilizado em: `constants.tsx`, `App.tsx`)
- `sw.js`: Service Worker para PWA

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

## 🚀 NOVAS FUNCIONALIDADES 2026

### 1. Regularização Personalizada (MIRA Wizard)
- **Ficheiro**: `components/RegularizationWizard.tsx` (Substituiu a aba estática de Guias)
- **Lógica**: Diagnóstico dinâmico (Nacionalidade -> Motivo -> Estado Atual)
- **Resultado**: Golden Checklist personalizada com links diretos para minutas.

### 2. Monitor de Atendimento em Tempo Real (Status da Fila)
- **Tabela Supabase**: `public.service_reports`
- **View Supabase**: `public.latest_service_status`
- **Funcionalidade**: Crowdsourcing de informações sobre lotação de centros (AIMA, IRN, SNS).
- **Status Disponíveis**: `normal` (Verde), `crowded` (Laranja), `no_slots` (Vermelho).

---

---

## 📂 BACKUP DE DADOS — DOCUMENTOS E GUIAS (Full Content)

> [!IMPORTANT]
> Esta seção serve como backup definitivo. Caso o ficheiro `utils/documentsDatabase.ts` seja danificado, utilize os dados abaixo para restaurar as funcionalidades.

### 🛠️ CAMPOS PADRÃO (standardFields)
- **ID: full_name** | Nome Completo (text)
- **ID: nationality** | Nacionalidade (text)
- **ID: passport_num** | N.º de Passaporte / ID (text)
- **ID: nif** | NIF (Opcional) (text)
- **ID: niss** | NISS (Opcional) (text)
- **ID: address** | Morada de Residência (text)
- **ID: city** | Localidade de Assinatura (text)

### 📄 TEMPLATES DE DOCUMENTOS (31 items)

1. **aima_ar_temp**: Requerimento de AR Temporária
   - Requisitos: Passaporte Válido, Visto de Entrada, Meios de Subsistência, Atestado de Morada.
   - Campos Extra: visa_entry (Tipo de Visto).

2. **aima_ar_renovacao**: Renovação de AR
   - Requisitos: Título de Residência Atual, Prova de Manutenção de Condições.

3. **aima_dec_alojamento**: Declaração de Alojamento
   - Campos Extra: host_name (Nome de quem aloja).

4. **aima_dec_responsabilidade**: Declaração de Responsabilidade
   - Campos Extra: family_member (Nome do Familiar).

5. **aima_dec_sustento**: Declaração de Sustento
   - Campos Extra: income_val (Valor Mensal € - number).

6. **aima_ar_humanitaria**: AR por Razões Humanitárias
   - Campos Extra: reason_humanitarian (Motivo do Pedido).

7. **crue_req**: Certificado UE (Câmara Municipal)

8. **irn_nacionalidade_casamento**: Nacionalidade (Casamento)
   - Campos Extra: spouse_name (Nome do Cônjuge).

9. **irn_nacionalidade_residencia**: Nacionalidade (Residência 5 anos)

10. **certidao_civil_req**: Certidão Civil Online
    - Campos Extra: cert_type (Tipo de Certidão).

11. **nacionalidade_filhos**: Nacionalidade Jus Soli
    - Campos Extra: child_name (Nome da Criança).

12. **procuracao_registo**: Procuração Conservatória
    - Campos Extra: attorney_name (Nome do Procurador).

13. **irn_cc_resident**: Cartão de Cidadão (Residentes)

14. **iefp_inscricao**: Inscrição no IEFP

15. **iefp_reembolso_formacao**: Reembolso Formação
    - Campos Extra: course_code (Cód. Curso).

16. **ss_dec_desemprego**: Declaração Desemprego (RP 5044)
    - Campos Extra: company_name (Empresa).

17. **ss_abono_familia**: Abono de Família / RSI
    - Campos Extra: num_agregado (N.º Membros - number).

18. **ss_dec_situacao_economica**: Isenção de Taxas / Apoios

19. **ss_niss**: Atribuição de NISS

20. **sns_inscricao**: N.º de Utente SNS

21. **sns_alteracao_dados**: Atualização SNS
    - Campos Extra: phone (Novo Telefone).

22. **sns_reembolso_despesas**: Reembolso Saúde
    - Campos Extra: invoice (N.º Fatura).

23. **nif_req**: Atribuição de NIF

24. **at_rep_fiscal**: Representante Fiscal AT
    - Campos Extra: rep_nif (NIF Representante).

25. **at_alteracao_morada**: Morada Fiscal Online
    - Campos Extra: new_addr (Morada Nova).

26. **dges_reconhecimento**: Reconhecimento Superior (DGES)
    - Campos Extra: course (Curso).

27. **dge_secundario_equivalencia**: Equivalência Secundário (12º ano)

28. **denuncia_discriminacao**: Denúncia CICDR
    - Campos Extra: incident_date (Data - date).

29. **dec_violencia_domestica**: Vítima VD (PSP/GNR)

30. **apoio_arrendamento**: Apoio IHRU (Porta Entrada)
    - Campos Extra: rent (Valor Renda € - number).

31. **junta_morada**: Atestado Junta Freguesia

### 📖 GUIAS DE SERVIÇO (8 items)

1. **g_manifestacao_cima**: Pós-Manifestação de Interesse - Transição AIMA 2026.
2. **g_cnaim_triagem**: Marcação e agendamento CNAIM via Linha de Apoio (218 106 191).
3. **g_irn_cidadania**: Submissão de Nacionalidade Online e Prova de Português (CIPLE).
4. **g_dges_reconhecimento**: Uso da plataforma de Reconhecimento Automático de Graus.
5. **g_ss_direta**: Gestão de descontos e abonos no portal seg-social.pt.
6. **g_sns_24**: Marcação de consultas e teleatendimento via App SNS 24.
7. **g_estatuto_igualdade**: Cartão de Cidadão para brasileiros via Tratado de Porto Seguro.
8. **g_direitos_politicos**: Recenseamento e votação autárquica para residentes estrangeiros.

---

*Última atualização: 2026-02-28*
*Este ficheiro é gerido pela proprietária Amanda Silva Abreu e pelo agente de desenvolvimento.*
