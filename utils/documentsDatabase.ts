import { DocumentTemplate, CATEGORIES } from '../types';

export const standardFields = [
    { id: 'full_name', label: 'Nome Completo', placeholder: 'Conforme documento de identificação', type: 'text' },
    { id: 'nationality', label: 'Nacionalidade', placeholder: 'País de origem', type: 'text' },
    { id: 'passport_num', label: 'N.º de Passaporte / ID', placeholder: 'Número oficial do documento', type: 'text' },
    { id: 'nif', label: 'NIF (Opcional)', placeholder: 'Número de Identificação Fiscal', type: 'text' },
    { id: 'niss', label: 'NISS (Opcional)', placeholder: 'Segurança Social', type: 'text' },
    { id: 'address', label: 'Morada de Residência', placeholder: 'Rua, n.º, CP e Localidade', type: 'text' },
    { id: 'city', label: 'Localidade de Assinatura', placeholder: 'Ex: Lisboa', type: 'text' }
];

export const templates: DocumentTemplate[] = [
    // --- LEGALIZAÇÃO (AIMA, IRN, CNAIM) ---
    {
        id: 'aima_prorrogacao', title: 'Pedido de Prorrogação de Permanência', category: CATEGORIES.IMMIGRATION, complexity: 'Medium', authority: 'AIMA', location: 'Balcão AIMA',
        description: 'Requerimento oficial para estender a validade de um visto de curta duração ou estada temporária.',
        tips: 'Ver mais info em aima.gov.pt/pt/impressos-e-minutas',
        requirements: ['Seguro Saúde', 'Prova Meios'],
        fields: [...standardFields, { id: 'reason_extension', label: 'Motivo da Prorrogação', placeholder: 'Ex: Tratamento médico, turismo prolongado', type: 'text' }]
    },
    {
        id: 'aima_reagrupamento', title: 'Requerimento de Reagrupamento Familiar', category: CATEGORIES.IMMIGRATION, complexity: 'Hard', authority: 'AIMA', location: 'Portal/Balcão AIMA',
        description: 'Formulário para trazer familiares diretos para viver legalmente consigo em Portugal. Atualizado conforme aima.gov.pt',
        tips: 'A morada declarada deve ter espaço suficiente para o agregado.',
        requirements: ['Prova Parentesco', 'Meios Subsistência'],
        fields: [...standardFields, { id: 'family_member_name', label: 'Nome do Familiar a Reagrupar', placeholder: 'Nome completo do familiar', type: 'text' }, { id: 'kinship_degree', label: 'Grau de Parentesco', placeholder: 'Cônjuge, filho, etc.', type: 'text' }]
    },
    {
        id: 'cnaim_ap', title: 'Ficha de Registo - Atendimento CNAIM', category: CATEGORIES.IMMIGRATION, complexity: 'Easy', authority: 'CNAIM', location: 'CNAIM',
        description: 'Documento inicial para marcação e ficha de triagem nos Centros Nacionais de Apoio à Integração de Migrantes.',
        tips: 'Para mais informações ligue para a Linha de Apoio a Migrantes (gov.pt).',
        requirements: ['Identificação'],
        fields: [...standardFields]
    },
    {
        id: 'irn_nacionalidade_art6', title: 'Pedido de Nacionalidade Portuguesa (Tempo de Residência)', category: CATEGORIES.RIGHTS, complexity: 'Hard', authority: 'IRN', location: 'Conservatória IRN',
        description: 'Processo de naturalização ao fim de 5 anos de residência legal (Art. 6º da Lei da Nacionalidade).',
        tips: 'Verificar lista atualizada no portal irn.justica.gov.pt.',
        requirements: ['Certificado Registo Criminal', 'Prova de Conhecimentos da Língua', 'ID/Passaporte'],
        fields: [...standardFields]
    },
    // --- EDUCAÇÃO E ESTUDO (DGES, Passaporte Qualifica) ---
    {
        id: 'dges_reconhecimento', title: 'Formulário de Reconhecimento de Grau Académico', category: CATEGORIES.EDUCATION, complexity: 'Hard', authority: 'DGES', location: 'Portal DGES',
        description: 'Pedido oficial para reconhecimento de habilitações obtidas no estrangeiro (Mestrado, Licenciatura, etc).',
        tips: 'Certifique-se de preencher através do portal de serviços da DGES (dges.gov.pt). Todos os documentos do estrangeiro necessitam de Apostila.',
        requirements: ['Diploma Apostilado', 'Histórico Escolar', 'Tese (se aplicável)'],
        fields: [...standardFields, { id: 'degree_name', label: 'Nome do Grau Académico Estrangeiro', placeholder: 'Ex: Bacharel em Engenharia', type: 'text' }]
    },
    {
        id: 'qualifica_rvcc', title: 'Ficha de Inscrição Centro Qualifica (RVCC)', category: CATEGORIES.EDUCATION, complexity: 'Medium', authority: 'Passaporte Qualifica', location: 'Centros Qualifica',
        description: 'Inscrição para o processo de Reconhecimento, Validação e Certificação de Competências (escolares ou profissionais).',
        tips: 'Registe-se em passaportequalifica.gov.pt antes de avançar.',
        requirements: ['Documento ID', 'Currículo', 'Certificados Adicionais'],
        fields: [...standardFields, { id: 'scholarity', label: 'Nível de Escolaridade Atual', placeholder: 'Ex: Ensino Médio Completo', type: 'text' }]
    },
    // --- TRABALHO E FINANÇAS (IEFP, Finanças, SS) ---
    {
        id: 'iefp_inscricao', title: 'Inscrição para Oferta de Emprego IEFP', category: CATEGORIES.WORK, complexity: 'Easy', authority: 'IEFP', location: 'iefponline.iefp.pt',
        description: 'Ficha de candidatura para resposta imediata a vagas (Pesquisa categoria: OfertaEmprego).',
        tips: 'Ter o CV sempre atualizado e o NISS pronto (iefp.pt).',
        requirements: ['Currículo Vitae Europass', 'Autorização de Residência (CPLP ou AR)'],
        fields: [...standardFields, { id: 'job_ref', label: 'Referência da Oferta', placeholder: 'Ex: 588961726', type: 'text' }]
    },
    {
        id: 'ss_niss', title: 'Mod. RV 1000 - Inscrição na Segurança Social (NISS)', category: CATEGORIES.FINANCE, complexity: 'Medium', authority: 'Segurança Social', location: 'seg-social.pt',
        description: 'Pedido oficial através de formulário para obtenção do Número de Segurança Social para cidadão estrangeiro sem NAI.',
        tips: 'Consulte seg-social.pt/formularios para aceder a versões mais atuais se necessário.',
        requirements: ['Passaporte/ID', 'NIF'],
        fields: [...standardFields]
    },
    {
        id: 'ss_nib', title: 'Mod. MG 2 - Alteração de IBAN (Segurança Social)', category: CATEGORIES.FINANCE, complexity: 'Easy', authority: 'Segurança Social', location: 'seg-social.pt',
        description: 'Documento para registar ou alterar a conta bancária para recebimento de apoios sociais ou baixa médica.',
        tips: 'O IBAN tem de pertencer ao mesmo NIF da inscrição de segurança social.',
        requirements: ['Comprovativo IBAN Autorizado'],
        fields: [...standardFields, { id: 'iban', label: 'Novo IBAN', placeholder: 'PT50 0000...', type: 'text' }]
    },
    {
        id: 'at_rep_fiscal', title: 'Nomeação de Representante Fiscal', category: CATEGORIES.FINANCE, complexity: 'Medium', authority: 'Autoridade Tributária', location: 'Portal das Finanças',
        description: 'Obrigatório para estrangeiros residentes fora da UE que desejem obter NIF ou manter património em Portugal.',
        tips: 'Aceda a portaldasfinancas.gov.pt para confirmar e aceitar.',
        requirements: ['ID do Representado', 'NIF e ID do Representante'],
        fields: [...standardFields, { id: 'rep_nif', label: 'NIF do Representante Fiscal', placeholder: '9 algarismos', type: 'text' }]
    },
    // --- SAÚDE (SNS) ---
    {
        id: 'sns_inscricao', title: 'Ficha de Inscrição RNUT (Registo Nacional Utentes)', category: CATEGORIES.HEALTH, complexity: 'Medium', authority: 'SNS', location: 'sns.gov.pt',
        description: 'Pedido de inscrição no Centro de Saúde e emissão do número de utente provisório ou definitivo.',
        tips: 'Veja a área informativa em sns.gov.pt/infos/sns/. Requer morada comprovada.',
        requirements: ['Passaporte', 'Atestado de Morada', 'Visto/Autorização de Residência'],
        fields: [...standardFields]
    },
    {
        id: 'sns24_isencao', title: 'Pedido de Isenção de Taxas Moderadoras', category: CATEGORIES.HEALTH, complexity: 'Medium', authority: 'SNS', location: 'sns24.gov.pt',
        description: 'Requerimento para cidadãos em situação de insuficiência económica acederem à saúde sem pagamento de taxas extra.',
        tips: 'Com base na documentação presente em sns24.gov.pt/documentos.',
        requirements: ['Atestado de Junta de Freguesia ou SS', 'Comprovativo de Rendimentos'],
        fields: [...standardFields, { id: 'household_size', label: 'Tamanho do Agregado Familiar', placeholder: 'Ex: 4', type: 'number' }]
    },
    // --- OUTROS DOCUMENTOS ÚTEIS ---
    {
        id: 'junta_morada', title: 'Atestado de Residência (Junta de Freguesia)', category: CATEGORIES.COMMUNITY, complexity: 'Easy', authority: 'Junta de Freguesia', location: 'Junta Local',
        description: 'Prova oficial de domicílio.', tips: 'Consulte a sua junta de freguesia para requerimentos atualizados.', requirements: ['ID', 'Contrato Arrendamento'], fields: [...standardFields]
    },
    {
        id: 'prop_auth', title: 'Autorização do Proprietário (Alojamento)', category: CATEGORIES.HOUSING, complexity: 'Easy', authority: 'Proprietário', location: 'Privado',
        description: 'Declaração onde o dono do imóvel autoriza a residência.', tips: 'Assegure-se de que a assinatura do proprietário é reconhecida ou igual ao CC.', requirements: ['ID Proprietário'], fields: [...standardFields, { id: 'owner_name', label: 'Nome do Proprietário', placeholder: '', type: 'text' }]
    }
];

export const serviceGuides = [
    // --- GUIAS AIMA & LEGALIZAÇÃO ---
    {
        id: 'g_manifestacao_cima', category: CATEGORIES.IMMIGRATION, title: 'Nova Autorização de Residência (Pós-MI)', authority: 'AIMA',
        description: 'Como transitar da antiga Manifestação de Interesse para os novos fluxos CPLP/Vistos em 2026.',
        explanation: 'Para quem deu entrada antes das alterações governamentais e deve agora atualizar documentação nos balcões ou services.aima.gov.pt.',
        steps: [
            { docName: 'Agendamento Prévio', whereToGet: 'Via call center CNAIM (Contactar a Linha de Apoio a Migrantes) ou site AIMA.' },
            { docName: 'SS e Finanças', whereToGet: 'Cadastros sem dívidas.' }
        ],
        faq: [{ q: 'O portal SAPA continua?', a: 'Siga sempre as orientações do portal oficial aima.gov.pt para a transição dos antigos Arts 88 e 89.' }]
    },
    {
        id: 'g_cnaim_triagem', category: CATEGORIES.IMMIGRATION, title: 'Agendamento Diário no CNAIM', authority: 'CNAIM (gov.pt)',
        description: 'O processo passo a passo para ser atendido presencialmente.',
        explanation: 'Devido à alta afluência, o agendamento através da Linha de Apoio a Migrantes (218 106 191) é obrigatório.',
        steps: [
            { docName: 'Ligar para a Linha', whereToGet: 'Via telefone.' },
            { docName: 'Registo Prévio', whereToGet: 'Identificação básica e motivo da ida ao CNAIM.' }
        ],
        faq: [{ q: 'Posso ir sem marcação?', a: 'Normalmente não, salvo emergências documentadas.' }]
    },
    {
        id: 'g_irn_cidadania', category: CATEGORIES.RIGHTS, title: 'Nacionalidade Portuguesa Online', authority: 'IRN / gov.pt',
        description: 'Guia de submissão de Nacionalidade por Tempo de Residência via online.',
        explanation: 'O IRN modernizou o sistema. Agora os advogados podem submeter no portal, poupando meses de filas e papéis.',
        steps: [
            { docName: 'Passaporte', whereToGet: 'Cópia integral e traduzida se aplicável.' },
            { docName: 'Certificado de Nível A2 de Português', whereToGet: 'CIPLE ou escola oficial certificada.' },
            { docName: 'Registo Criminal', whereToGet: 'País de origem e países onde habitou mais de 1 ano.' }
        ],
        faq: [{ q: 'Onde encontro as leis base?', a: 'Toda a jurisprudência está em diariodarepublica.pt ou eur-lex.europa.eu para diretivas europeias.' }]
    },
    // --- ESTUDOS & QUALIFICAÇÕES ---
    {
        id: 'g_dges_reconhecimento', category: CATEGORIES.EDUCATION, title: 'Reconhecimento de Graus Estrangeiros', authority: 'DGES',
        description: 'Como usar a plataforma de Reconhecimento de Qualificações Estrangeiras.',
        explanation: 'A DGES facilita o reconhecimento automático, de nível ou específico dependendo da sua faculdade de origem.',
        steps: [
            { docName: 'Criar conta na DGES', whereToGet: 'Em dges.gov.pt/pt' },
            { docName: 'Preparar Diploma com Apostila de Haia', whereToGet: 'Emitido no país onde estudou.' },
            { docName: 'Pagar a Taxa de Serviço', whereToGet: 'Referência Multibanco gerada na plataforma.' }
        ],
        faq: [{ q: 'É imediato?', a: 'O Reconhecimento Automático leva até 30 dias; os específicos podem levar vários meses.' }]
    },
    {
        id: 'g_passaporte_qualifica', category: CATEGORIES.EDUCATION, title: 'Concluir Escola/Acreditação de Competências', authority: 'Passaporte Qualifica',
        description: 'Sistema nacional para valorizar a experiência profissional num diploma de ensino ou nível técnico.',
        explanation: 'Óptimo para imigrantes que têm experiência profunda numa área, mas não têm o certificado letivo concluído no país de origem.',
        steps: [
            { docName: 'Registo Centro Qualifica', whereToGet: 'No portal qualifica.gov.pt' },
            { docName: 'Sessão de Triagem (Análise de CV)', whereToGet: 'Online ou em escolas públicas.' }
        ],
        faq: [{ q: 'Há limites de idade?', a: 'É direcionado sobretudo para adultos maiores de 18 (RVCC Profissional) e maiores de 23 (Escolar).' }]
    },
    // --- TRABALHO E FINANÇAS ---
    {
        id: 'g_eures', category: CATEGORIES.WORK, title: 'Portal EURES (Emprego na Europa)', authority: 'EURES',
        description: 'Portal Europeu da Mobilidade Profissional com impacto em Portugal.',
        explanation: 'Para quem já detém Cidadania Portuguesa ou Visto que permita trabalhar em outros países, o EURES é a plataforma unida (eures.europa.eu).',
        steps: [
            { docName: 'Registo Europass', whereToGet: 'Fazer um CV em formato europeu (obrigatório para vagas da UE).' },
            { docName: 'Candidatura no Portal EURES', whereToGet: 'Plataforma oficial da UE.' }
        ],
        faq: [{ q: 'IEFP e EURES estão ligados?', a: 'Sim, o IEFP (Rede EURES Portugal) é a ponte nacional para todas as oportunidades lá publicadas.' }]
    },
    {
        id: 'g_ss_direta', category: CATEGORIES.FINANCE, title: 'Guia SS Direta: Apoios', authority: 'Segurança Social',
        description: 'Navegar no portal Segurança Social (seg-social.pt) de forma simples.',
        explanation: 'Desde solicitar abonos a Subsídios Familiares, a SS Direta é onde o migrante controla as suas contribuições.',
        steps: [
            { docName: 'Chave Móvel Digital ou Senha SS', whereToGet: 'gov.pt (Chave Móvel) ou no balcão físico da SS.' },
            { docName: 'IBAN na plataforma', whereToGet: 'Obrigatório para receber qualquer valor (ver formularios no portal SS).' }
        ],
        faq: [{ q: 'Como sei se os descontos estão registados?', a: 'Na SS Direta, vá a Remunerações > Conta-Corrente para verificar se o seu patrão declarou os honorários do seu último recibo de vencimento.' }]
    },
    // --- SAÚDE ---
    {
        id: 'g_sns_24', category: CATEGORIES.HEALTH, title: 'Como utilizar o portal SNS 24', authority: 'Ministério da Saúde (SNS)',
        description: 'Gestão de saúde online para o imigrante residente.',
        explanation: 'Em sns24.gov.pt, pode marcar consultas, pedir receitas e aceder a atestados médicos.',
        steps: [
            { docName: 'Ter Número de Utente e Chave Móvel Digital', whereToGet: 'A inscrição pode iniciar-se fisicamente no seu Centro de Saúde e consolidar-se online.' }
        ],
        faq: [{ q: 'Onde consulto a política de saúde governamental?', a: 'Veja sempre na área da Saúde do portal do Governo em portugal.gov.pt/pt/gc23/area-de-governo/saude para ficar atualizado das vacinas gratuitas ou planos de atendimento para migrantes.' }]
    },
    // --- ESTATUTOS ESPECÍFICOS & ACORDOS BILATERAIS ---
    {
        id: 'g_estatuto_igualdade', category: CATEGORIES.RIGHTS, title: 'Como Tirar o Cartão de Cidadão (Estatuto de Igualdade - Brasileiros)', authority: 'IRN / AIMA',
        description: 'Como obter a Igualdade de Direitos Civis e emitir o Cartão de Cidadão português.',
        explanation: 'O Tratado de Porto Seguro permite que cidadãos brasileiros com residência legal obtenham os mesmos direitos civis que os portugueses. Com isso aprovado, é possível solicitar a emissão do Cartão de Cidadão Português que atesta esse estatuto e substitui o uso diário do Título de Residência e passaporte dentro do país.',
        steps: [
            { docName: 'Certificado de Nacionalidade', whereToGet: 'Solicitado no Consulado-Geral do Brasil em Portugal atestando que não lhe foi retirada a nacionalidade.' },
            { docName: 'Cópia do Título de Residência', whereToGet: 'Válido (em formato físico ou CPLP digital dependendo das aceitações recentes da AIMA).' },
            { docName: 'Formulário ou Pedido Online', whereToGet: 'Através da plataforma e-Portugal ou formulários presenciais sob tutela da AIMA transferidos ao IRN (irn.justica.gov.pt).' }
        ],
        faq: [
            { q: 'O Cartão de Cidadão serve para viajar pela Europa toda?', a: 'Não. O Cartão emitido ao abrigo deste Estatuto traz menção à nacionalidade brasileira e não confere passaporte europeu livre. Tem validade identificativa fundamentalmente no território português.' },
            { q: 'Demora muito?', a: 'Os processos ganharam um formato mais digitalizado, mas podem demorar de 3 a 6 meses sob análise e posterior agendamento no IRN.' }
        ]
    },
    {
        id: 'g_direitos_politicos', category: CATEGORIES.RIGHTS, title: 'Direitos Iguais e Direitos Políticos', authority: 'IRN / Comissão Nacional de Eleições',
        description: 'Como obter direito de voto e elegibilidade política em Portugal.',
        explanation: 'Imigrantes com o Estatuto de Igualdade podem alargar os seus direitos civis para os Direitos Políticos, permitindo votar e ser votado em eleições num quadro similar aos portugueses. É necessário estar há pelo menos 3 anos documentado e legalizado (para votar) e mais tempo para certas elegibilidades.',
        steps: [
            { docName: 'Pedido de Igualdade de Direitos Políticos', whereToGet: 'Pode ser submetido em simultâneo ou após obter o Estatuto de Direitos Civis no portal da Justiça.' },
            { docName: 'Comprovativo de Residência Prolongada', whereToGet: 'Baseado no seu registo de Títulos de Residência emitidos ao longo dos anos.' }
        ],
        faq: [
            { q: 'Se eu votar em Portugal, continuo a votar no Brasil?', a: 'Segundo o acordo, é aplicável a suspensão do exercício destes direitos no país de origem enquanto os exercer ativamente no outro Estado.' },
            { q: 'Qualquer imigrante pode pedir os Direitos Políticos?', a: 'Os Direitos Políticos plenos através do Tratado de Amizade são exclusivos para brasileiros. Contudo, outros estrangeiros têm direitos cívicos limitados nas Eleições Autárquicas (locais) se forem de países com reciprocidade ou longa permanência.' }
        ]
    }
];
