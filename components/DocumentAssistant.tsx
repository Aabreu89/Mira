
import React, { useState, useMemo } from 'react';
import { 
  DocumentTask, DocumentTemplate, ChatSession, GeneratedDocument, CATEGORIES, UNIFIED_CATEGORIES, UnifiedCategory
} from '../types';
import { 
  CheckCircle2, FileText, ChevronRight, ArrowLeft, Loader2, 
  Search, X, Download, FileSignature, 
  RefreshCcw, Lightbulb, Filter, ChevronDown, PenTool, Info, Landmark, Scale, Briefcase
} from 'lucide-react';
import { generateOfficialPDF } from '../utils/pdfGenerator';
import { analytics } from '../services/analyticsService';
import { t } from '../utils/translations';

interface DocumentAssistantProps {
  tasks: DocumentTask[];
  chatSessions: ChatSession[];
  drafts: any[];
  setDrafts: (drafts: any[]) => void;
  history: GeneratedDocument[];
  addToHistory: (doc: GeneratedDocument) => void;
  onOpenSession: (sessionId: string) => void;
  onToggleTask: (id: string) => void;
  onEarnPoints: (points: number, badgeId?: string) => void;
  onViewChange: (view: ViewType) => void;
  language: string;
}

export const DocumentAssistant: React.FC<DocumentAssistantProps> = ({ 
    onEarnPoints,
    onViewChange,
    language 
}) => {
  const [activeTab, setActiveTab] = useState<'docs' | 'guides'>('docs');
  const [activeScreen, setActiveScreen] = useState<'gallery' | 'form' | 'success' | 'guide_view'>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<any | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todos');
  const [entityFilter, setEntityFilter] = useState<string>('Todos');

  const standardFields = [
    { id: 'full_name', label: 'Nome Completo', placeholder: 'Conforme documento de identificação', type: 'text' },
    { id: 'nationality', label: 'Nacionalidade', placeholder: 'País de origem', type: 'text' },
    { id: 'passport_num', label: 'N.º de Passaporte / ID', placeholder: 'Número oficial do documento', type: 'text' },
    { id: 'nif', label: 'NIF (Opcional)', placeholder: 'Número de Identificação Fiscal', type: 'text' },
    { id: 'niss', label: 'NISS (Opcional)', placeholder: 'Segurança Social', type: 'text' },
    { id: 'address', label: 'Morada de Residência', placeholder: 'Rua, n.º, CP e Localidade', type: 'text' },
    { id: 'city', label: 'Localidade de Assinatura', placeholder: 'Ex: Lisboa', type: 'text' }
  ];

  const templates: DocumentTemplate[] = [
    {
        id: 'aima_prorrogacao', title: 'Pedido de Prorrogação de Permanência', category: CATEGORIES.IMMIGRATION, complexity: 'Medium', authority: 'AIMA', location: 'Balcão AIMA', 
        description: 'Requerimento oficial para estender a validade de um visto de curta duração ou estada temporária.', 
        tips: 'Anexe prova de meios de subsistência e alojamento.', 
        requirements: ['Seguro Saúde', 'Prova Meios'],
        fields: [
            ...standardFields,
            { id: 'reason_extension', label: 'Motivo da Prorrogação', placeholder: 'Ex: Tratamento médico, turismo prolongado', type: 'text' }
        ]
    },
    {
        id: 'aima_reagrupamento', title: 'Requerimento de Reagrupamento Familiar', category: CATEGORIES.IMMIGRATION, complexity: 'Hard', authority: 'AIMA', location: 'Portal/Balcão AIMA', 
        description: 'Formulário para trazer familiares diretos para viver legalmente consigo em Portugal.', 
        tips: 'A morada declarada deve ter espaço suficiente para o agregado.', 
        requirements: ['Prova Parentesco', 'Meios Subsistência'],
        fields: [
            ...standardFields,
            { id: 'family_member_name', label: 'Nome do Familiar a Reagrupar', placeholder: 'Nome completo do familiar', type: 'text' },
            { id: 'kinship_degree', label: 'Grau de Parentesco', placeholder: 'Cônjuge, filho, etc.', type: 'text' }
        ]
    },
    {
        id: 'aima_cartao_ue', title: 'Pedido de Cartão de Residência (Familiar UE)', category: CATEGORIES.IMMIGRATION, complexity: 'Medium', authority: 'AIMA/Câmara', location: 'AIMA', 
        description: 'Destinado a familiares de cidadãos da UE/EEE/Suíça que não possuam nacionalidade europeia.', 
        tips: 'Deve ser solicitado após os primeiros 3 meses de entrada.', 
        requirements: ['Certificado Registo UE', 'Passaporte'],
        fields: [
            ...standardFields,
            { id: 'eu_citizen_name', label: 'Nome do Cidadão Europeu', placeholder: 'Familiar que dá o direito', type: 'text' }
        ]
    },
    {
        id: 'aima_art122', title: 'Pedido de Título de Residência (Regimes Especiais)', category: CATEGORIES.IMMIGRATION, complexity: 'Hard', authority: 'AIMA', location: 'Portal SAPA', 
        description: 'Solicitação para casos de crianças nascidas em Portugal, doenças graves ou situações humanitárias específicas.', 
        tips: 'Consulte o Art. 122 da Lei de Estrangeiros para o seu enquadramento.', 
        requirements: ['Prova da Situação Especial'],
        fields: [
            ...standardFields,
            { id: 'legal_ground', label: 'Alínea do Art. 122 invocada', placeholder: 'Ex: Alínea m) - Filhos menores', type: 'text' }
        ]
    },
    {
        id: 'nif_at', title: 'Pedido de Atribuição de NIF', category: CATEGORIES.FINANCE, complexity: 'Easy', authority: 'Finanças (AT)', location: 'Repartição Finanças', 
        description: 'Documento base para solicitar o Número de Identificação Fiscal para cidadão estrangeiro.', 
        tips: 'Se for residente fora da UE, precisará de um representante fiscal.', 
        requirements: ['Passaporte'],
        fields: [ ...standardFields ]
    },
    {
        id: 'niss_ss', title: 'Pedido de NISS para Estrangeiro', category: CATEGORIES.FINANCE, complexity: 'Easy', authority: 'Segurança Social', location: 'Balcão SS', 
        description: 'Formulário para obtenção do Número de Identificação da Segurança Social (NISS NA HORA).', 
        tips: 'Útil para quem vai iniciar atividade profissional brevemente.', 
        requirements: ['NIF', 'Passaporte'],
        fields: [
            ...standardFields,
            { id: 'employer_info', label: 'Empresa Contratante (Se aplicável)', placeholder: 'Nome da empresa ou NIPC', type: 'text' }
        ]
    },
    {
        id: 'aima_ar', title: 'Pedido de Autorização de Residência (AIMA)', category: CATEGORIES.IMMIGRATION, complexity: 'Hard', authority: 'AIMA', location: 'Portal/Balcão AIMA', 
        description: 'Requerimento principal para obtenção do título de residência em Portugal.', 
        tips: 'Certifique-se de que todos os documentos estão traduzidos e apostilados.', 
        requirements: ['Visto Válido', 'NIF', 'NISS', 'Contrato de Trabalho'],
        fields: [ ...standardFields ]
    },
    {
        id: 'junta_morada', title: 'Declaração de Morada (Junta)', category: CATEGORIES.COMMUNITY, complexity: 'Easy', authority: 'Junta de Freguesia', location: 'Junta Local', 
        description: 'Atestado oficial de residência emitido pela freguesia onde habita.', 
        tips: 'Pode precisar de 2 testemunhas que votem na mesma freguesia.', 
        requirements: ['ID', 'Contrato Arrendamento'],
        fields: [ ...standardFields ]
    },
    {
        id: 'prop_auth', title: 'Autorização do Proprietário', category: CATEGORIES.HOUSING, complexity: 'Easy', authority: 'Proprietário / Senhorio', location: 'Privado', 
        description: 'Declaração onde o dono do imóvel autoriza a sua residência para fins legais.', 
        tips: 'Deve ser acompanhada da cópia do ID do proprietário.', 
        requirements: ['ID Proprietário', 'Caderneta Predial'],
        fields: [
            ...standardFields,
            { id: 'owner_name', label: 'Nome do Proprietário', placeholder: 'Nome completo do dono da casa', type: 'text' }
        ]
    },
    {
        id: 'decl_resp_reag', title: 'Declaração de Responsabilidade (Reagrupamento)', category: CATEGORIES.IMMIGRATION, complexity: 'Medium', authority: 'AIMA', location: 'AIMA', 
        description: 'Onde o residente se responsabiliza pelo familiar que deseja trazer.', 
        tips: 'Essencial para processos de Reagrupamento Familiar.', 
        requirements: ['Título de Residência'],
        fields: [
            ...standardFields,
            { id: 'family_member', label: 'Familiar Beneficiário', placeholder: 'Nome do familiar', type: 'text' }
        ]
    },
    {
        id: 'decl_sustento', title: 'Declaração de Sustento / Apoio Financeiro', category: CATEGORIES.FINANCE, complexity: 'Medium', authority: 'Notário / Advogado', location: 'Cartório', 
        description: 'Comprova que uma pessoa possui meios para sustentar outra em Portugal.', 
        tips: 'Geralmente usada para estudantes ou familiares sem rendimentos próprios.', 
        requirements: ['Prova de Rendimentos'],
        fields: [
            ...standardFields,
            { id: 'beneficiary_name', label: 'Nome do Beneficiário', placeholder: 'Quem recebe o apoio', type: 'text' },
            { id: 'monthly_amount', label: 'Valor Mensal (Opcional)', placeholder: 'Ex: 800€', type: 'text' }
        ]
    },
    {
        id: 'procuracao_simples', title: 'Procuração Simples', category: CATEGORIES.LEGAL, complexity: 'Medium', authority: 'Notário / Advogado', location: 'Cartório', 
        description: 'Dá poderes a outra pessoa para tratar de assuntos em seu nome.', 
        tips: 'Especifique claramente quais os poderes que está a delegar.', 
        requirements: ['ID Mandatário'],
        fields: [
            ...standardFields,
            { id: 'proxy_name', label: 'Nome do Procurador', placeholder: 'Quem recebe os poderes', type: 'text' },
            { id: 'powers_desc', label: 'Poderes Delegados', placeholder: 'Ex: Tratar de assuntos nas Finanças', type: 'text' }
        ]
    },
    {
        id: 'decl_alojamento', title: 'Declaração de Alojamento', category: CATEGORIES.HOUSING, complexity: 'Easy', authority: 'AIMA / SEF', location: 'AIMA', 
        description: 'Comunica à autoridade migratória onde o estrangeiro está hospedado.', 
        tips: 'Obrigatória para quem entra com visto e não fica em hotel.', 
        requirements: ['ID Anfitrião'],
        fields: [
            ...standardFields,
            { id: 'host_name', label: 'Nome do Anfitrião', placeholder: 'Quem o recebe em casa', type: 'text' }
        ]
    },
    {
        id: 'decl_empregador', title: 'Declaração do Empregador', category: CATEGORIES.WORK, complexity: 'Easy', authority: 'Empresa / Empregador', location: 'Empresa', 
        description: 'Confirma o vínculo laboral ou promessa de trabalho.', 
        tips: 'Deve conter o NIPC da empresa e data de início.', 
        requirements: ['Contrato ou Promessa'],
        fields: [
            ...standardFields,
            { id: 'company_name', label: 'Nome da Empresa', placeholder: 'Designação social', type: 'text' },
            { id: 'job_position', label: 'Cargo / Função', placeholder: 'Ex: Cozinheiro', type: 'text' }
        ]
    },
    {
        id: 'sns_inscricao', title: 'Pedido de Inscrição no SNS (Número de Utente)', category: CATEGORIES.HEALTH, complexity: 'Medium', authority: 'Centro de Saúde', location: 'Centro de Saúde', 
        description: 'Solicitação para atribuição do número de utente do Serviço Nacional de Saúde.', 
        tips: 'Leve o seu comprovativo de morada e NIF.', 
        requirements: ['ID', 'NIF', 'Atestado Morada'],
        fields: [ ...standardFields ]
    },
    {
        id: 'niss_decl', title: 'Declaração para Obtenção do NISS', category: CATEGORIES.FINANCE, complexity: 'Easy', authority: 'Segurança Social', location: 'Segurança Social', 
        description: 'Requerimento para atribuição do Número de Identificação da Segurança Social.', 
        tips: 'Pode ser feito online ou presencialmente.', 
        requirements: ['Passaporte', 'NIF'],
        fields: [ ...standardFields ]
    },
    {
        id: 'iefp_inscricao', title: 'Pedido de Inscrição no IEFP / Situação Laboral', category: CATEGORIES.WORK, complexity: 'Medium', authority: 'IEFP', location: 'Centro Emprego', 
        description: 'Inscrição como candidato a emprego ou para cursos de formação.', 
        tips: 'Necessário para aceder a subsídios ou cursos financiados.', 
        requirements: ['Título Residência', 'NIF', 'NISS'],
        fields: [ ...standardFields ]
    },
    {
        id: 'reconhecimento_hab', title: 'Pedido de Reconhecimento de Habilitações Estrangeiras', category: CATEGORIES.EDUCATION, complexity: 'Hard', authority: 'DGES / Escolas', location: 'Online/Escola', 
        description: 'Processo para tornar válido o seu diploma estrangeiro em Portugal.', 
        tips: 'Os diplomas devem estar legalizados com a Apostila de Haia.', 
        requirements: ['Diploma Original', 'Histórico Escolar'],
        fields: [
            ...standardFields,
            { id: 'degree_name', label: 'Nome do Curso / Grau', placeholder: 'Ex: Bacharelado em Direito', type: 'text' },
            { id: 'origin_university', label: 'Instituição de Origem', placeholder: 'Nome da Universidade/Escola', type: 'text' }
        ]
    }
  ];

  const serviceGuides = [
      { 
        id: 'g_nif', 
        category: CATEGORIES.FINANCE, 
        title: 'Como tirar o NIF (Número de Identificação Fiscal)', 
        authority: 'Finanças (AT)', 
        description: 'O primeiro passo para qualquer imigrante em Portugal.', 
        explanation: 'O NIF é essencial para trabalhar, alugar casa, abrir conta bancária e até comprar um cartão SIM.', 
        steps: [
          { docName: 'Passaporte Válido', whereToGet: 'Original e cópia.' },
          { docName: 'Comprovativo de Morada', whereToGet: 'Do país de origem (se for o primeiro NIF) ou de Portugal.' },
          { docName: 'Representante Fiscal', whereToGet: 'Obrigatório para residentes fora da UE/EEE.' }
        ],
        faq: [
          { q: 'Quanto custa?', a: 'O pedido de NIF é gratuito.' },
          { q: 'Quanto tempo demora?', a: 'Geralmente é atribuído na hora se for presencial.' }
        ]
      },
      { 
        id: 'g_niss', 
        category: CATEGORIES.FINANCE, 
        title: 'Como tirar o NISS (Segurança Social)', 
        authority: 'Segurança Social', 
        description: 'Essencial para trabalhar e descontar em Portugal.', 
        explanation: 'O NISS permite o acesso a benefícios sociais e é obrigatório para contratos de trabalho.', 
        steps: [
          { docName: 'NIF', whereToGet: 'Já deve ter o seu NIF atribuído.' },
          { docName: 'Passaporte', whereToGet: 'Original e cópia.' },
          { docName: 'Contrato de Trabalho ou Promessa', whereToGet: 'Se já tiver uma oferta laboral.' }
        ],
        faq: [
          { q: 'Posso tirar o NISS sozinho?', a: 'Sim, através do portal Segurança Social Direta ou presencialmente.' }
        ]
      },
      { 
        id: 'g_utente', 
        category: CATEGORIES.HEALTH, 
        title: 'Como tirar o Número de Utente (Saúde)', 
        authority: 'Centro de Saúde (SNS)', 
        description: 'Acesso ao sistema público de saúde português.', 
        explanation: 'Com o número de utente, pode marcar consultas e ter acesso a medicamentos com desconto.', 
        steps: [
          { docName: 'Passaporte', whereToGet: 'Original e cópia.' },
          { docName: 'NIF', whereToGet: 'Número de Identificação Fiscal.' },
          { docName: 'Atestado de Residência', whereToGet: 'Emitido pela Junta de Freguesia da sua morada.' }
        ],
        faq: [
          { q: 'Tenho que pagar?', a: 'A inscrição é gratuita, mas pode haver taxas moderadoras nas consultas.' }
        ]
      },
      { 
        id: 'g_manifestacao', 
        category: CATEGORIES.IMMIGRATION, 
        title: 'Manifestação de Interesse (Art. 88/89)', 
        authority: 'AIMA', 
        description: 'O caminho para a residência através do trabalho.', 
        explanation: 'Este é o processo para quem entrou legalmente e está a trabalhar mas não tem visto de residência.', 
        steps: [
          { docName: 'Contrato de Trabalho', whereToGet: 'Registado na Segurança Social.' },
          { docName: 'NIF e NISS', whereToGet: 'Ambos regularizados.' },
          { docName: 'Entrada Legal', whereToGet: 'Carimbo no passaporte ou declaração de entrada.' }
        ],
        faq: [
          { q: 'Ainda é possível em 2026?', a: 'Sim, mas verifique sempre as atualizações mais recentes no portal MIRA.' }
        ]
      },
      {
        id: 'g_atestado',
        category: CATEGORIES.COMMUNITY,
        title: 'Atestado de Residência (Junta de Freguesia)',
        authority: 'Junta de Freguesia',
        description: 'Prova oficial de onde vive em Portugal.',
        explanation: 'Este documento é necessário para o Número de Utente, Manifestação de Interesse e abertura de conta bancária.',
        steps: [
          { docName: 'Formulário da Junta', whereToGet: 'No balcão ou site da sua Junta de Freguesia.' },
          { docName: 'Duas Testemunhas', whereToGet: 'Eleitores recenseados na mesma freguesia (algumas juntas dispensam se tiver contrato de arrendamento).' },
          { docName: 'Contrato de Arrendamento ou Escritura', whereToGet: 'Registado nas Finanças.' }
        ],
        faq: [
          { q: 'Quanto custa?', a: 'Varia entre 5€ a 15€ dependendo da freguesia.' }
        ]
      },
      {
        id: 'g_conducao',
        category: CATEGORIES.TEC,
        title: 'Troca de Carta de Condução Estrangeira',
        authority: 'IMT',
        description: 'Como legalizar a sua habilitação para conduzir em Portugal.',
        explanation: 'Dependendo do país de origem, pode ter de trocar a carta num prazo de 90 dias após a residência.',
        steps: [
          { docName: 'Certificado de Autenticidade', whereToGet: 'Emitido pelo órgão de trânsito do seu país.' },
          { docName: 'Atestado Médico Eletrónico', whereToGet: 'Obtido em qualquer clínica médica em Portugal.' },
          { docName: 'Título de Residência', whereToGet: 'Válido ou CPLP.' }
        ],
        faq: [
          { q: 'Preciso fazer exame?', a: 'Geralmente não para países da CPLP e OCDE se solicitado no prazo.' }
        ]
      }
  ];

  const entities = useMemo(() => {
    const all = [...templates, ...serviceGuides].map(t => t.authority);
    return Array.from(new Set(all));
  }, []);

  const filteredItems = useMemo(() => {
    const list = activeTab === 'guides' ? serviceGuides : templates;
    const term = searchFilter.toLowerCase();
    return list.filter((item: any) => {
        const matchesSearch = item.title.toLowerCase().includes(term);
        const matchesCategory = categoryFilter === 'Todos' || item.category === categoryFilter;
        const matchesEntity = entityFilter === 'Todos' || item.authority === entityFilter;
        return matchesSearch && matchesCategory && matchesEntity;
    });
  }, [activeTab, searchFilter, categoryFilter, entityFilter]);

  const generatePDF = async () => {
      if (!selectedTemplate) return;
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      const pdfResult = await generateOfficialPDF(selectedTemplate.title, formData);
      setGeneratedFile({ save: (n: string) => { const l = document.createElement('a'); l.href = pdfResult.pdfUrl; l.download = n; l.click(); }, url: pdfResult.pdfUrl, filename: pdfResult.filename });
      setIsGenerating(false);
      setActiveScreen('success');
      onEarnPoints(50);
  };

  return (
    <div className="h-full bg-white overflow-hidden flex flex-col no-scrollbar">
        {activeScreen === 'gallery' && (
            <div className="flex flex-col h-full">
                <div className="bg-white p-6 space-y-6 border-b border-slate-100">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{t('docs_title', language)}</h2>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        {[{ id: 'docs', label: t('docs_tab_docs', language) }, { id: 'guides', label: t('docs_tab_guides', language) }].map(tab => (
                          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{tab.label}</button>
                        ))}
                    </div>
                    <div className="space-y-3">
                      <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input type="text" placeholder={t('docs_search_placeholder', language)} value={searchFilter} onChange={e => setSearchFilter(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-mira-orange-pastel transition-all" />
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <select 
                            value={entityFilter} 
                            onChange={e => setEntityFilter(e.target.value)} 
                            className="w-full pl-4 pr-10 py-3 bg-slate-100 border-none rounded-xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-mira-orange-pastel"
                          >
                            <option value="Todos">Todas as Entidades</option>
                            {entities.map(e => <option key={e} value={e}>{e}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-1">
                          <select 
                            value={categoryFilter} 
                            onChange={e => setCategoryFilter(e.target.value)} 
                            className="w-full pl-4 pr-10 py-3 bg-slate-100 border-none rounded-xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-mira-orange-pastel"
                          >
                            <option value="Todos">Categorias</option>
                            {UNIFIED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar pb-32">
                    {filteredItems.length > 0 ? filteredItems.map((item: any) => (
                        <div key={item.id} onClick={() => { if (activeTab === 'guides') { setSelectedGuide(item); setActiveScreen('guide_view'); } else { setSelectedTemplate(item); setFormData({}); setActiveScreen('form'); }}} className="bg-white p-7 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/20 hover:border-mira-orange transition-all group cursor-pointer active:scale-[0.98] flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-wrap gap-2">
                                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${item.category === CATEGORIES.IMMIGRATION ? 'bg-mira-blue' : 'bg-indigo-500'} text-white`}>
                                      {item.category}
                                  </span>
                                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-slate-100 text-slate-400">
                                      {item.authority || 'MIRA'}
                                  </span>
                                </div>
                                <div className={`p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-mira-orange-pastel group-hover:text-mira-orange transition-colors`}>
                                  <FileText size={20} />
                                </div>
                            </div>
                            
                            <div>
                              <h3 className="font-black text-slate-900 text-xl uppercase tracking-tight leading-tight group-hover:text-mira-orange transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                               <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <Scale size={12} className="text-slate-300" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        {t(`complexity_${(item.complexity || 'Easy').toLowerCase()}`, language)}
                                    </span>
                                  </div>
                               </div>
                               <ChevronRight className="text-slate-300 group-hover:text-mira-orange group-hover:translate-x-1 transition-all" size={20} />
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
                            <FileText size={64} className="mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest">Nenhum documento encontrado</p>
                        </div>
                    )}
                </div>
            </div>
        )}
        
        {activeScreen === 'form' && (
            <div className="flex flex-col h-full animate-in slide-in-from-right duration-500 relative">
                <div className="p-5 border-b flex items-center justify-between bg-white z-10">
                    <button onClick={() => setActiveScreen('gallery')} className="p-3 bg-slate-50 rounded-2xl shrink-0"><ArrowLeft size={20}/></button>
                    {/* Título com quebra de linha permitida e removido truncate */}
                    <h2 className="font-black text-sm uppercase tracking-tighter text-slate-800 text-center px-4 leading-tight break-words flex-1">
                        {selectedTemplate?.title}
                    </h2>
                    <div className="w-10 shrink-0"></div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar pb-64">
                    <div className="bg-indigo-900 text-white p-6 rounded-[2rem] flex items-start gap-4 shadow-xl">
                        <FileSignature className="text-mira-yellow shrink-0 mt-1" size={24}/>
                        <p className="text-[10px] font-bold uppercase leading-relaxed">{t('docs_filling_tip', language)}</p>
                    </div>
                    <div className="space-y-6">
                        {selectedTemplate?.fields.map(f => (
                            <div key={f.id} className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{f.label}</label>
                                <input type={f.type} placeholder={f.placeholder} value={formData[f.id] || ''} onChange={e => setFormData({...formData, [f.id]: e.target.value})} className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-mira-orange transition-all shadow-inner" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Botão posicionado acima da barra de navegação com margem de segurança */}
                <div className="absolute bottom-24 left-0 right-0 p-6 bg-white/95 backdrop-blur-xl border-t z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                    <button onClick={generatePDF} disabled={isGenerating} className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
                        {isGenerating ? <Loader2 className="animate-spin" size={20}/> : <Download size={24} strokeWidth={3}/>}
                        {isGenerating ? t('docs_loading_pdf', language) : t('docs_generate_btn', language)}
                    </button>
                </div>
            </div>
        )}

        {activeScreen === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-fade-in">
                <div className="w-24 h-24 bg-mira-green text-white rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce"><CheckCircle2 size={56} /></div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{t('docs_ready', language)}</h2>
                <p className="text-sm text-slate-500 font-bold mb-10 max-w-xs leading-relaxed uppercase">O seu documento oficial foi formatado respeitando as normas da AIMA.</p>
                <div className="w-full max-w-xs space-y-4">
                    <button onClick={() => generatedFile.save(generatedFile.filename)} className="w-full bg-slate-900 text-white py-5 rounded-[2.5rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl"><Download size={20} /> {t('docs_download', language)}</button>
                    <button onClick={() => setActiveScreen('gallery')} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">{t('docs_back', language)}</button>
                </div>
            </div>
        )}

        {activeScreen === 'guide_view' && selectedGuide && (
            <div className="flex flex-col h-full animate-in slide-in-from-right duration-500 bg-white">
                <div className="p-5 border-b flex items-center justify-between bg-white sticky top-0 z-10">
                    <button onClick={() => setActiveScreen('gallery')} className="p-3 bg-slate-50 rounded-2xl shrink-0"><ArrowLeft size={20}/></button>
                    <h2 className="font-black text-sm uppercase tracking-tighter text-slate-800 text-center px-4 leading-tight break-words flex-1">
                        {selectedGuide.title}
                    </h2>
                    <div className="w-10 shrink-0"></div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar pb-32">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-mira-blue text-white text-[8px] font-black uppercase tracking-widest rounded-md">{selectedGuide.category}</span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-md">{selectedGuide.authority}</span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{selectedGuide.explanation}</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-l-4 border-mira-orange pl-3">Documentos Necessários</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {selectedGuide.steps.map((step: any, idx: number) => (
                                <div key={idx} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex gap-4 items-start">
                                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-mira-orange shadow-sm shrink-0 font-black text-xs">{idx + 1}</div>
                                    <div>
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{step.docName}</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1">{step.whereToGet}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedGuide.faq && (
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-l-4 border-mira-blue pl-3">Perguntas Frequentes</h3>
                            <div className="space-y-4">
                                {selectedGuide.faq.map((item: any, idx: number) => (
                                    <div key={idx} className="p-6 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
                                        <p className="text-[11px] font-black text-blue-900 uppercase tracking-tight mb-2">P: {item.q}</p>
                                        <p className="text-[11px] text-blue-700 font-medium leading-relaxed">R: {item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 bg-mira-orange rounded-2xl flex items-center justify-center shadow-lg"><Bot size={24} /></div>
                            <p className="text-xs font-black uppercase tracking-widest">Ainda tem dúvidas?</p>
                        </div>
                        <p className="text-[11px] text-slate-300 font-medium leading-relaxed relative z-10">
                            A burocracia pode ser complexa, mas o MIRA está aqui para ajudar a responder todas as suas dúvidas em tempo real.
                        </p>
                        <button 
                            onClick={() => onViewChange(ViewType.ASSISTANT)} 
                            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all relative z-10"
                        >
                            Falar com o MIRA agora
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
