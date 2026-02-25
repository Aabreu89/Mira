
import React, { useState, useEffect } from 'react';
import { JobPost, WORK_TOPICS, CATEGORIES } from '../types';
import { Search, Briefcase, ExternalLink, MapPin, Building2, TrendingUp, ChevronDown, Filter, X, SlidersHorizontal, Map as MapIcon, Globe } from 'lucide-react';
import { analytics } from '../services/analyticsService';
import { t } from '../utils/translations';

interface JobBoardProps {
  language: string;
  isAdmin?: boolean;
}

const JOB_TRENDS = [
  { id: 1, name: 'Turismo & Hotelaria', demandLevel: 'Muito Alta', averageSalary: '850 - 1.200', growth: '+15%' },
  { id: 2, name: 'Tecnologia (TI)', demandLevel: 'Alta', averageSalary: '1.200 - 3.500', growth: '+22%' },
  { id: 3, name: 'Construção Civil', demandLevel: 'Muito Alta', averageSalary: '900 - 1.500', growth: '+10%' },
  { id: 4, name: 'Energias Renováveis', demandLevel: 'Média', averageSalary: '1.100 - 2.000', growth: '+30%' },
  { id: 5, name: 'Saúde & Cuidados', demandLevel: 'Alta', averageSalary: '1.000 - 1.800', growth: '+12%' },
];

const PT_LOCATIONS = [
    "Todos", "Lisboa", "Porto", "Braga", "Setúbal", "Faro", "Coimbra", "Aveiro", "Remoto", "Leiria", "Santarém", "Viseu", "Évora"
];

const JOB_SOURCES = [
  "www.alertaemprego.pt",
  "http://cantinhodoemprego.pt/",
  "https://www.emprego.pt/",
  "https://emprego.sapo.pt/",
  "https://emprego.trovit.pt/",
  "https://www.empregoestagios.com/",
  "https://emprego.rumos.pt/",
  "https://expressoemprego.pt/",
  "https://pt.jobrapido.com/",
  "https://twitter.com/ofertasemprego",
  "https://www.bep.gov.pt",
  "https://www.bonsempregos.com/",
  "https://www.careerjet.pt/",
  "http://www.cargadetrabalhos.net/",
  "https://www.custojusto.pt/portugal/emprego-oferta",
  "http://www.empregosonline.pt/",
  "https://www.formacao20.com/",
  "http://www.gepe.pt/",
  "https://www.hays.pt/",
  "http://www.icote.pt/",
  "https://pt.indeed.com/",
  "https://www.itjobs.pt/",
  "https://www.net-empregos.com/",
  "https://www.olx.pt/emprego/",
  "https://www.ofertas-emprego.net/",
  "https://www.gruporhmais.pt/",
  "https://www.ofertasdeemprego.pt/",
  "https://www.turijobs.pt/",
  "https://www.web-emprego.com/",
  "https://pt.linkedin.com/",
  "https://www.glassdoor.com/Job/portugal",
  "https://www.empregoxl.com/",
  "http://www.empregosaude.pt/",
  "https://jobtide.com",
  "https://pt.jooble.org/",
  "https://www.jobatus.pt/i",
  "https://www.feedempregos.pt/search/label/Emprego",
  "https://www.adecco.pt/",
  "https://www.cnorey.com/",
  "https://www.eurofirms.pt/",
  "https://flexiplan.eulen.com/pt/",
  "https://www.gowork.pt/pt/",
  "http://greatjob.pt/",
  "http://hospedeiras-portugal.pt",
  "https://www.manpowergroup.pt",
  "https://www.michaelpage.pt/",
  "https://multipessoal.pt/",
  "http://www.multitempo.pt/",
  "http://outplex.pt/",
  "http://www.psicotempos.pt/",
  "https://www.randstad.pt/",
  "https://slot.pt/",
  "https://www.vertentehumana.pt/",
  "https://www.talenter.com/",
  "https://bolsadeempregabilidade.pt/",
  "Recrutamento.trivalor.pt/",
  "www.timing.pt/",
  "www.triangulu.pt/ofertas/",
];

const getSourceName = (url: string) => {
    try {
        const domain = url.replace('https://', '').replace('http://', '').replace('www.', '').split(/[/?#]/)[0];
        const parts = domain.split('.');
        const name = parts.length >= 2 ? parts[0] : domain;
        return name.charAt(0).toUpperCase() + name.slice(1);
    } catch {
        return "Fonte Externa";
    }
};

const generateMockJobs = (): JobPost[] => {
  const titlesByCategory: Record<string, string[]> = {
    "Tecnologia, Dados & IA": ["Engenheiro de Dados", "Fullstack Developer", "Especialista em Cibersegurança", "Analista de Sistemas", "Prompt Engineer"],
    "Saúde & Cuidados Continuados": ["Enfermeiro de Urgência", "Técnico de Auxiliar de Saúde", "Fisioterapeuta", "Médico Dentista", "Assistente de Apoio Domiciliário"],
    "Construção Civil & Engenharia": ["Chefe de Equipa de Pedreiros", "Engenheiro Eletrotécnico", "Operador de Grua", "Encarregado de Obra", "Técnico de AVAC"],
    "Turismo, Hotelaria & Restauração": ["Recepcionista Bilíngue", "Sub-chefe de Cozinha", "Empregado de Andares", "Barman", "Gestor de Alojamento Local"],
    "Indústria, Production & Manufatura": ["Operador de Linha de Produção", "Técnico de Manutenção", "Soldador Certificado", "Operador de CNC", "Responsável de Turno"],
    "Logística, Transportes & Armazém": ["Motorista de Pesados C+E", "Fiel de Armazém", "Gestor de Operações Logísticas", "Operador de Empilhador", "Estafeta de Logística Urbana"],
    "Comércio, Vendas & Retalho": ["Store Manager", "Assistente de Vendas", "Caixa de Supermercado", "Promotor Comercial", "Merchandiser"],
    "Administrativo, Gestão & RH": ["Técnico Administrativo", "Contabilista Junior", "Recrutador Especializado", "Secretariado de Direção", "Gestor de Projetos"],
    "Limpeza, Segurança & Serviços": ["Técnico de Limpeza Especializada", "Vigilante Certificado", "Jardineiro", "Auxiliar de Manutenção Predial", "Pest Control Specialist"],
    "Educação & Formação Profissional": ["Formador de Línguas", "Educador de Infância", "Tutor Académico", "Coordenador Pedagógico"],
    "Artes, Design & Multimédia": ["Graphic Designer", "Video Editor", "Content Creator", "UX Designer"],
    "Agricultura, Pesca & Pecuária": ["Trabalhador Agrícola", "Técnico Agrícola", "Operador de Máquinas Florestais"],
    "Apoio Social & Terceiro Setor": ["Assistente Social", "Mediador Intercultural", "Técnico de ONGs"],
    "Energia & Sustentabilidade": ["Técnico de Painéis Solares", "Gestor de Eficiência Energética", "Técnico Ambiental"],
    "Trabalho Remoto & Freelancing": ["Virtual Assistant", "Customer Success Representative", "Tradutor Freelance"]
  };
  
  const allJobs: JobPost[] = [];
  
  WORK_TOPICS.forEach((topic) => {
    const titles = titlesByCategory[topic] || ["Profissional Qualificado", "Colaborador Operacional", "Especialista Setorial"];
    
    for(let i = 0; i < 6; i++) {
        const sourceUrl = JOB_SOURCES[Math.floor(Math.random() * JOB_SOURCES.length)];
        allJobs.push({
            id: `job-${topic.substring(0,3)}-${i}-${Math.random().toString(36).substr(2, 5)}`,
            title: titles[i % titles.length],
            location: PT_LOCATIONS[Math.floor(Math.random() * (PT_LOCATIONS.length - 1)) + 1],
            sourceName: getSourceName(sourceUrl),
            sourceUrl: sourceUrl.startsWith('http') ? sourceUrl : `https://${sourceUrl}`,
            datePosted: `${Math.floor(Math.random() * 5) + 1}d`,
            tags: i === 0 ? ["Urgente"] : i === 5 ? ["Remoto"] : [],
            category: CATEGORIES.WORK,
            workTopic: topic
        });
    }
  });
  
  return allJobs.sort(() => Math.random() - 0.5);
};

export const JobBoard: React.FC<JobBoardProps> = ({ language, isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'trends'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todos');
  const [selectedWorkTopic, setSelectedWorkTopic] = useState('Todos');
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setJobs(generateMockJobs());
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.sourceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'Todos' || job.location === selectedCity;
    const matchesTopic = selectedWorkTopic === 'Todos' || job.workTopic === selectedWorkTopic; 
    return matchesSearch && matchesCity && matchesTopic;
  });

  return (
    <div className="h-full bg-white flex flex-col pb-24 overflow-hidden">
      {/* Header Sticky Section */}
      <div className="bg-white px-6 pt-8 pb-4 space-y-6 z-30 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">{t('jobs_title', language)}</h2>
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-mira-green animate-pulse"></div>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{t('jobs_subtitle', language)}</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('jobs')} 
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'jobs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                {t('nav_vagas', language)}
              </button>
              <button 
                onClick={() => setActiveTab('trends')} 
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'trends' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                Insights
              </button>
          </div>
        </div>

        {activeTab === 'jobs' && (
            <div className="space-y-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-mira-orange transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder={t('jobs_search_placeholder', language)}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-mira-orange outline-none transition-all shadow-sm"
                    />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <select 
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-mira-orange-pastel border border-transparent transition-all"
                        >
                            {PT_LOCATIONS.map(city => (
                                <option key={city} value={city}>{city === 'Todos' ? t('jobs_all_districts', language) : city}</option>
                            ))}
                        </select>
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                    </div>
                    
                    <div className="relative flex-1">
                        <select 
                            value={selectedWorkTopic}
                            onChange={(e) => setSelectedWorkTopic(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-mira-orange-pastel border border-transparent transition-all"
                        >
                            <option value="Todos">{t('jobs_all_areas', language)}</option>
                            {WORK_TOPICS.map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 no-scrollbar pb-10 mt-4">
          {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
                  <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                    <Briefcase size={40} />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">{t('jobs_loading', language)}</p>
                    <p className="text-xs font-bold text-slate-400">{t('jobs_loading_desc', language)}</p>
                  </div>
              </div>
          ) : activeTab === 'jobs' ? (
              filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5">
                      {filteredJobs.map(job => (
                          <div 
                            key={job.id} 
                            onClick={() => {
                                analytics.track('job_click', 'u1', job.category, job);
                                window.open(job.sourceUrl, '_blank');
                            }} 
                            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-mira-orange hover:shadow-xl hover:shadow-orange-100/30 transition-all cursor-pointer group active:scale-[0.98] relative overflow-hidden"
                          >
                              {job.tags.includes('Urgente') && (
                                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-[1.5rem] shadow-sm">
                                      {t('jobs_urgent', language)}
                                  </div>
                              )}
                              <div className="flex justify-between items-start mb-4">
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest bg-mira-blue px-2 py-1 rounded-md">{job.workTopic}</span>
                                  </div>
                                  <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-mira-orange transition-colors line-clamp-2 uppercase tracking-tight">{job.title}</h3>
                                  <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 bg-slate-50 rounded-lg flex items-center justify-center">
                                            <Building2 size={12} className="text-slate-400"/>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate max-w-[100px]">{job.sourceName}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 bg-slate-50 rounded-lg flex items-center justify-center">
                                            <MapPin size={12} className="text-slate-400"/>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{job.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-2">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                    {t('jobs_published_ago', language)} {job.datePosted}
                                </span>
                                <div className="bg-slate-900 text-white p-2.5 rounded-xl group-hover:bg-mira-orange transition-colors">
                                    <ExternalLink size={16} />
                                </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200">
                        <Search size={48} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nenhuma vaga encontrada</p>
                        <p className="text-sm font-medium text-slate-400 px-10 leading-relaxed">Tente ajustar os filtros de área profissional ou distrito.</p>
                      </div>
                      <button 
                        onClick={() => { setSelectedCity('Todos'); setSelectedWorkTopic('Todos'); setSearchQuery(''); }}
                        className="px-8 py-3 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                        Limpar Todos os Filtros
                      </button>
                  </div>
              )
          ) : (
              <div className="space-y-6">
                  <div className="p-10 bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-48 h-48 bg-mira-blue rounded-full blur-[80px] opacity-40"></div>
                      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-mira-orange rounded-full blur-[80px] opacity-20"></div>
                      
                      <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                              <TrendingUp size={24} className="text-mira-yellow" />
                              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">{t('jobs_insight_title', language)}</h4>
                          </div>
                          <p className="text-xl font-black tracking-tight leading-tight mb-4">
                              {t('jobs_growth_desc', language)}
                          </p>
                          <div className="flex gap-4">
                              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                                  <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{t('jobs_avg_salary', language)}</p>
                                  <p className="text-md font-black">1.450€</p>
                              </div>
                              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                                  <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{t('jobs_active_offers', language)}</p>
                                  <p className="text-md font-black">+4.200</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                      {JOB_TRENDS.map(trend => (
                          <div key={trend.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-mira-blue hover:shadow-lg transition-all">
                              <div className="space-y-2">
                                  <h4 className="font-black text-slate-900 text-lg tracking-tight uppercase">{trend.name}</h4>
                                  <div className="flex items-center gap-4">
                                      <div className="flex flex-col">
                                          <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{t('jobs_avg_salary', language)}</span>
                                          <span className="text-xs font-black text-slate-600">{trend.averageSalary}€</span>
                                      </div>
                                      <div className="w-px h-6 bg-slate-100"></div>
                                      <div className="flex flex-col">
                                          <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Crescimento</span>
                                          <span className="text-xs font-black text-mira-green">{trend.growth}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="text-right shrink-0">
                                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm ${trend.demandLevel === 'Muito Alta' ? 'bg-red-50 text-red-500' : 'bg-mira-orange-pastel text-mira-orange'}`}>
                                      {trend.demandLevel}
                                  </span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
