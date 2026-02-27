import React, { useState, useEffect } from 'react';
import { MapAlert, CATEGORIES, UNIFIED_CATEGORIES } from '../types';
import { MapPin, Star, AlertTriangle, X, Building2, Search, ChevronDown, MessageSquare, User, Send, Mail, ChevronUp, Phone, Info, Globe, PhoneCall, HeartPulse, Scale, GraduationCap, Briefcase, Landmark, ExternalLink, Map as MapIcon, List } from 'lucide-react';
import { analytics } from '../services/analyticsService';
import { t } from '../utils/translations';
import { supabase } from '../lib/supabase';

interface LocalServicesMapProps {
  language: string;
}

const CATEGORY_COLORS: Record<string, { bg: string, text: string, pastel: string, icon: any }> = {
  [CATEGORIES.IMMIGRATION]: { bg: 'bg-mira-blue', text: 'text-mira-blue', pastel: 'bg-mira-blue-pastel', icon: Landmark },
  [CATEGORIES.HEALTH]: { bg: 'bg-red-500', text: 'text-red-500', pastel: 'bg-red-50', icon: HeartPulse },
  [CATEGORIES.WORK]: { bg: 'bg-mira-orange', text: 'text-mira-orange', pastel: 'bg-mira-orange-pastel', icon: Briefcase },
  [CATEGORIES.FINANCE]: { bg: 'bg-indigo-500', text: 'text-indigo-500', pastel: 'bg-indigo-50', icon: Scale },
  [CATEGORIES.COMMUNITY]: { bg: 'bg-mira-green', text: 'text-mira-green', pastel: 'bg-mira-green-pastel', icon: Globe },
  [CATEGORIES.EDUCATION]: { bg: 'bg-mira-yellow', text: 'text-mira-yellow', pastel: 'bg-mira-yellow-pastel', icon: GraduationCap },
  "Default": { bg: 'bg-slate-500', text: 'text-slate-500', pastel: 'bg-slate-50', icon: Building2 }
};

const MOCK_SERVICES: MapAlert[] = [
  // AIMA
  { id: 'aima_lis_1', title: "AIMA - Loja de Lisboa", category: CATEGORIES.IMMIGRATION, lat: 38.73, lng: -9.15, distance: '1.2km', ratings: [], avgRating: 4.1, address: "Av. António Augusto de Aguiar 20, Lisboa", city: "Lisboa" },

  // CNAIM
  { id: 'cnaim_lis_1', title: "CNAIM Lisboa", category: CATEGORIES.COMMUNITY, lat: 38.72, lng: -9.13, distance: '1.8km', ratings: [], avgRating: 4.9, address: "Rua Álvaro Coutinho 14, Lisboa", city: "Lisboa" },

  // IEFP - Diversos
  { id: 'iefp_lis_1', title: "IEFP Lisboa - Picoas", category: CATEGORIES.WORK, lat: 38.73, lng: -9.14, distance: '0.8km', ratings: [], avgRating: 4.3, address: "Rua Viriato 7, Lisboa", city: "Lisboa", email: "picoas@iefp.pt" },
  { id: 'iefp_por_1', title: "IEFP Porto - Centro de Emprego", category: CATEGORIES.WORK, lat: 41.15, lng: -8.61, distance: '300km', ratings: [], avgRating: 4.1, address: "Rua do Rosário 135, Porto", city: "Porto" },
  { id: 'iefp_far_1', title: "IEFP Faro - Centro de Emprego", category: CATEGORIES.WORK, lat: 37.02, lng: -7.93, distance: '280km', ratings: [], avgRating: 4.0, address: "Rua de S. Luis, Faro", city: "Faro" },
  { id: 'iefp_coi_1', title: "IEFP Coimbra - Centro de Emprego", category: CATEGORIES.WORK, lat: 40.20, lng: -8.41, distance: '200km', ratings: [], avgRating: 4.2, address: "Rua do Brasil, Coimbra", city: "Coimbra" },
  { id: 'iefp_bra_1', title: "IEFP Braga - Centro de Emprego", category: CATEGORIES.WORK, lat: 41.55, lng: -8.42, distance: '350km', ratings: [], avgRating: 4.4, address: "Rua do Caires, Braga", city: "Braga" },
  { id: 'iefp_ave_1', title: "IEFP Aveiro - Centro de Emprego", category: CATEGORIES.WORK, lat: 40.64, lng: -8.65, distance: '250km', ratings: [], avgRating: 4.1, address: "Rua de Cabo Verde, Aveiro", city: "Aveiro" },

  // HOSPITAIS E CENTROS DE SAÚDE
  { id: 'hosp_st_maria', title: "Hospital de Santa Maria (CHULN)", category: CATEGORIES.HEALTH, lat: 38.74, lng: -9.16, distance: '4.5km', ratings: [], avgRating: 4.2, address: "Av. Prof. Egas Moniz, Lisboa", city: "Lisboa", type: "Hospital" },
  { id: 'hosp_s_joao', title: "Hospital de São João (Porto)", category: CATEGORIES.HEALTH, lat: 41.18, lng: -8.60, distance: '305km', ratings: [], avgRating: 4.5, address: "Alameda Prof. Hernâni Monteiro, Porto", city: "Porto", type: "Hospital" },
  { id: 'cs_arroios', title: "Centro de Saúde de Arroios (SNS)", category: CATEGORIES.HEALTH, lat: 38.73, lng: -9.13, distance: '1.5km', ratings: [], avgRating: 3.5, address: "Rua Ferreira da Silva, Lisboa", city: "Lisboa", type: "Centro de Saúde" },
  { id: 'cs_paranhos', title: "Centro de Saúde de Paranhos (Porto)", category: CATEGORIES.HEALTH, lat: 41.17, lng: -8.60, distance: '304km', ratings: [], avgRating: 3.8, address: "Rua de Paranhos, Porto", city: "Porto", type: "Centro de Saúde" },
  { id: 'hosp_faro', title: "Hospital de Faro (CHUA)", category: CATEGORIES.HEALTH, lat: 37.02, lng: -7.92, distance: '282km', ratings: [], avgRating: 3.9, address: "Rua Leão Penedo, Faro", city: "Faro", type: "Hospital" },

  // ONGS E ASSOCIAÇÕES
  { id: 'casa_brasil', title: "Casa do Brasil de Lisboa", category: CATEGORIES.COMMUNITY, lat: 38.71, lng: -9.14, distance: '2.5km', ratings: [], avgRating: 5.0, address: "Rua da Luz Soriano 42, Lisboa", city: "Lisboa", email: "casadobrasildelisboa@gmail.com" },
  { id: 'aaeif_lis', title: "AAEIF - Apoio ao Imigrante", category: CATEGORIES.COMMUNITY, lat: 38.72, lng: -9.15, distance: '2.0km', ratings: [], avgRating: 4.8, address: "Lisboa Centro", city: "Lisboa" },
  { id: 'jrs_portugal', title: "JRS Portugal - Serviço Jesuíta aos Refugiados", category: CATEGORIES.COMMUNITY, lat: 38.75, lng: -9.16, distance: '5km', ratings: [], avgRating: 4.9, address: "Estrada da Buraca 8-12, Lisboa", city: "Lisboa" },
  { id: 'sol_imi', title: "Solidariedade Imigrante", category: CATEGORIES.COMMUNITY, lat: 38.71, lng: -9.13, distance: '2.5km', ratings: [], avgRating: 4.7, address: "Rua da Madalena 8, Lisboa", city: "Lisboa" },
  // Added services per user request
  { id: 'cruz_vermelha_braga', title: 'Cruz Vermelha Portuguesa – Delegação de Braga', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua Bernardo Sequeira, 247, 4715-017 Braga', city: 'Braga' },
  { id: 'seiva_porto', title: 'SEIVA – Associação ao Serviço da Vida (Porto)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua de Vilar, 130, 4050-625 Porto', city: 'Porto' },
  { id: 'asi_gaia', title: 'ASI – Associação Solidariedade Internacional (Vila Nova de Gaia)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua das Pedras nº 307 e Rua Diogo Cão nº 257, Vila Nova de Gaia', city: 'Vila Nova de Gaia' },
  { id: 'univera_aveiro', title: 'UNIVERA – Centro Social e Paroquial da Vera Cruz (Aveiro)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua Campeão das Províncias, 1º andar, 3800-124 Aveiro', city: 'Aveiro' },
  { id: 'casa_lusofona_coimbra', title: 'Casa Lusófona ONGD (Coimbra)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida Sá da Bandeira 115, 4º piso, Loja 37/38, 3004-515 Coimbra', city: 'Coimbra' },
  { id: 'inpulsar_leiria', title: 'InPulsar – Associação para o Desenvolvimento Comunitário (Leiria)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua Dr. José Gonçalves, nº 55, Loja 3, Piso -1, 2410-121 Leiria', city: 'Leiria' },
  { id: 'csp_costa_caparica', title: 'Centro Social e Paroquial Costa da Caparica (Almada)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida 1º de Maio, nº 4, R/C, 2825-395 Costa da Caparica', city: 'Almada' },
  { id: 'cultural_moldavo_cascais', title: 'Centro Cultural Moldavo (Cascais)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua José Malhoa, nº 11, Trajouce, 2785-657 São Domingos de Rana', city: 'Cascais' },
  { id: 'byp_oeiras', title: 'BYP – Batoto Yetu Portugal (Oeiras)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida João de Freitas Branco, nº 12, 2760-073 Caxias', city: 'Oeiras' },
  { id: 'aguinenso_lisboa', title: 'AGUINENSO – Associação Guineense de Solidariedade Social (Lisboa)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida João Paulo II, Lote 528, 2A, Bairro do Condado, 1950-430 Lisboa', city: 'Lisboa' },
  { id: 'odivelas_servico', title: 'Município de Odivelas – Serviço de Apoio ao Imigrante', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua Alfredo Roque Gameiro, nº 18B, 2675-277 Odivelas', city: 'Odivelas' },
  { id: 'proabrar_almeirim', title: 'Associação ProAbraçar (Almeirim)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Praceta do Chapim, nº 26, R/C, 2080-048 Almeirim', city: 'Almeirim' },
  { id: 'fabrica_setubal', title: 'Fábrica da Igreja de Nossa Senhora da Conceição (Setúbal)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida Bento de Jesus Caraça, nº 77, 2910-430 Setúbal', city: 'Setúbal' },
  { id: 'camara_beja', title: 'Câmara Municipal de Beja – Divisão de Desenvolvimento Social', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua de Angola, nº 5, 7800-468 Beja', city: 'Beja' },
  { id: 'associacao_sines', title: 'Associação Caboverdiana de Sines e Santiago do Cacém', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua João Doroteia, Lote LE1, 7520-109 Sines', city: 'Sines' },
  { id: 'doina_algarve', title: 'DOINA – Associação de Imigrantes Romenos e Moldavos do Algarve (Loulé)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida 5 de Outubro, Porta 76, 8135-100 Almancil', city: 'Almancil' },
  { id: 'grato_portimon', title: 'GRATO – Grupo de Apoio a Toxicodependentes (Portimão)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Avenida Guanaré (Pavilhão), 8500-507 Portimão', city: 'Portimão' },
  { id: 'jrs_portugal', title: 'JRS Portugal – Serviço Jesuíta aos Refugiados', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa (sede nacional)', city: 'Lisboa' },
  { id: 'cpr_cascais', title: 'Conselho Português para os Refugiados (CPR)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Estrada da Costa, nº 1359, 2750-642 Cascais', city: 'Cascais' },
  { id: 'solim_lisboa', title: 'Solidariedade Imigrante (SOLIM)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua do Benformoso, 289, 1100-085 Lisboa', city: 'Lisboa' },
  { id: 'casa_brasil_lisboa', title: 'Casa do Brasil de Lisboa', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua Luz Soriano, nº 42, 1200-246 Lisboa', city: 'Lisboa' },
  { id: 'refugees_welcome', title: 'Refugees Welcome Portugal', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa', city: 'Lisboa' },
  { id: 'apirp', title: 'APIRP – Associação de Apoio a Imigrantes e Refugiados em Portugal', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa', city: 'Lisboa' },
  { id: 'femafro', title: 'FEMAFRO – Associação de Mulheres Negras, Africanas e Afrodescendentes', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa', city: 'Lisboa' },
  { id: 'medicos_mundo', title: 'Médicos do Mundo Portugal', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rua dos Lusíadas, 64 A, 1300-366 Lisboa', city: 'Lisboa' },
  { id: 'caritas', title: 'Cáritas Portuguesa', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Av. Marechal Craveiro Lopes, nº 165, 1749-009 Lisboa', city: 'Lisboa' },
  { id: 'opengate', title: 'Open Gate Portugal', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa', city: 'Lisboa' },
  { id: 'adip', title: 'ADIP – Associação Despertar Imigrantes em Portugal', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa', city: 'Lisboa' },
  { id: 'cnaim_aima', title: 'CNAIM – Centros Nacionais de Apoio à Integração de Migrantes (AIMA)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Lisboa, Porto e Faro', city: 'Portugal' },
  { id: 'claim_aima', title: 'CLAIM – Centros Locais de Apoio à Integração de Migrantes (AIMA)', category: CATEGORIES.COMMUNITY, lat: 0, lng: 0, distance: '', ratings: [], avgRating: 0, address: 'Rede nacional (diversos municípios)', city: 'Portugal' },
];

export const LocalServicesMap: React.FC<LocalServicesMapProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [reportService, setReportService] = useState<MapAlert | null>(null);
  const [reviewService, setReviewService] = useState<MapAlert | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [services, setServices] = useState<MapAlert[]>(MOCK_SERVICES);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from('map_alerts').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          const mappedServices: MapAlert[] = data.map(item => ({
            id: item.id,
            title: item.title,
            category: item.category,
            lat: item.lat || 0,
            lng: item.lng || 0,
            distance: item.distance || 'N/A',
            ratings: item.ratings || [],
            avgRating: item.avg_rating || 0,
            address: item.address || '',
            city: item.city || '',
            image: item.image,
            phone: item.phone,
            email: item.email,
            type: item.type
          }));
          setServices([...MOCK_SERVICES, ...mappedServices]);
        }
      } catch (err) {
        console.error('Error fetching map_alerts from Supabase:', err);
      }
    };

    fetchServices();
  }, []);

  const toggleComments = (id: string) => {
    const newSet = new Set(expandedComments);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedComments(newSet);
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === "Todos" || s.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const getServiceLink = (service: MapAlert) => {
    // Logic simulation for service links
    if (service.title.includes("IEFP")) return "https://www.iefp.pt";
    if (service.title.includes("SNS") || service.title.includes("Hospital") || service.title.includes("Centro de Saúde")) return "https://www.sns.gov.pt";
    if (service.title.includes("AIMA")) return "https://aima.gov.pt";
    if (service.title.includes("Casa do Brasil")) return "https://casadobrasildelisboa.pt";
    return null;
  };

  return (
    <div className="flex flex-col bg-white min-h-screen pb-32 no-scrollbar font-['Plus_Jakarta_Sans']">
      <div className="bg-white p-6 sticky top-0 z-20 border-b border-slate-50 space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">SERVIÇOS</h2>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Base de Dados MIRA: Entidades Oficiais & ONGs</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Pesquisar AIMA, SNS, Porto, Lisboa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[2rem] text-sm font-bold focus:bg-white focus:border-mira-orange transition-all shadow-inner outline-none" />
          </div>
          <div className="relative">
            <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} className="w-full pl-6 pr-10 py-4 bg-slate-50 border-2 border-transparent rounded-[2rem] text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:bg-white focus:border-mira-blue transition-all shadow-inner">
              <option value="Todos">Todas as Áreas de Apoio</option>
              {UNIFIED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col">
        <div className="p-5 space-y-4 pb-24">
          {filteredServices.length > 0 ? filteredServices.map(service => {
            const colors = CATEGORY_COLORS[service.category] || CATEGORY_COLORS["Default"];
            const isExpanded = expandedComments.has(service.id);
            const siteUrl = getServiceLink(service);
            return (
              <div key={service.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col active:scale-[0.98]">
                <div className="p-6">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${colors.bg} text-white`}>{service.category}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-slate-100 text-slate-400">{service.city}</span>
                      {service.type && <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-indigo-50 text-indigo-500">{service.type}</span>}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase group-hover:text-mira-orange transition-colors">{service.title}</h3>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 mb-5 flex items-start gap-3">
                    <MapPin size={18} className="text-slate-300 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed">{service.address}</p>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 bg-mira-yellow-pastel px-3 py-1.5 rounded-xl">
                        <Star size={14} className="text-mira-yellow fill-mira-yellow" />
                        <span className="text-xs font-black text-mira-yellow">{service.avgRating || 'Novo'}</span>
                      </div>
                      <button onClick={() => toggleComments(service.id)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-mira-blue flex items-center gap-2">
                        {service.ratings.length} Relatos {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                    {siteUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(siteUrl, '_blank'); }}
                        className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-mira-orange transition-colors shadow-lg active:scale-95"
                        title="Aceder ao Site Oficial"
                      >
                        <ExternalLink size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-slate-50">
                    <button onClick={() => setReviewService(service)} className="bg-mira-blue text-white py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 hover:bg-mira-blue/90">
                      <Star size={14} /> Avaliar
                    </button>
                    <button onClick={() => setReportService(service)} className="bg-red-50 text-red-500 border border-red-100 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 hover:bg-red-500 hover:text-white transition-all">
                      <AlertTriangle size={14} /> Alerta
                    </button>
                  </div>
                </div>
              </div>
            );
          }) : <div className="flex flex-col items-center justify-center py-24 text-center opacity-30"><MapPin size={48} className="mb-4" /><p className="text-xs font-black uppercase tracking-widest">Sem resultados para estes filtros</p></div>}
        </div>
      </div>
    </div>
  );
};
