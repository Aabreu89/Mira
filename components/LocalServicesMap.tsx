import React, { useState, useEffect } from 'react';
import { MapAlert, CATEGORIES, UNIFIED_CATEGORIES, MAP_CATEGORIES } from '../types';
import { MapPin, Star, AlertTriangle, X, Building2, Search, ChevronDown, MessageSquare, User, Send, Mail, ChevronUp, Phone, Info, Globe, PhoneCall, HeartPulse, Scale, GraduationCap, Briefcase, Landmark, ExternalLink, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { analytics } from '../services/analyticsService';
import { t } from '../utils/translations';
import { supabase } from '../lib/supabase';
import { mapService } from '../services/mapService';

interface LocalServicesMapProps {
  language: string;
}

const CATEGORY_COLORS: Record<string, { bg: string, text: string, pastel: string, icon: any }> = {
  [CATEGORIES.IMMIGRATION]: { bg: 'bg-mira-blue', text: 'text-mira-blue', pastel: 'bg-mira-blue-pastel', icon: Landmark },
  [CATEGORIES.RIGHTS]: { bg: 'bg-indigo-600', text: 'text-indigo-600', pastel: 'bg-indigo-50', icon: Scale },
  [CATEGORIES.WORK]: { bg: 'bg-mira-orange', text: 'text-mira-orange', pastel: 'bg-mira-orange-pastel', icon: Briefcase },
  [CATEGORIES.SOCIAL_SECURITY]: { bg: 'bg-blue-600', text: 'text-blue-600', pastel: 'bg-blue-50', icon: Building2 },
  [CATEGORIES.HEALTH]: { bg: 'bg-red-500', text: 'text-red-500', pastel: 'bg-red-50', icon: HeartPulse },
  [CATEGORIES.FINANCE]: { bg: 'bg-emerald-600', text: 'text-emerald-600', pastel: 'bg-emerald-50', icon: Scale },
  [CATEGORIES.EDUCATION]: { bg: 'bg-mira-yellow', text: 'text-mira-yellow', pastel: 'bg-mira-yellow-pastel', icon: GraduationCap },
  [CATEGORIES.SOCIAL_SUPPORT]: { bg: 'bg-purple-500', text: 'text-purple-500', pastel: 'bg-purple-50', icon: HeartPulse },
  [CATEGORIES.HOUSING]: { bg: 'bg-amber-600', text: 'text-amber-600', pastel: 'bg-amber-50', icon: Building2 },
  [CATEGORIES.COMMUNITY]: { bg: 'bg-mira-green', text: 'text-mira-green', pastel: 'bg-mira-green-pastel', icon: Globe },
  "Default": { bg: 'bg-slate-500', text: 'text-slate-500', pastel: 'bg-slate-50', icon: Building2 }
};

export const LocalServicesMap: React.FC<LocalServicesMapProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [reportService, setReportService] = useState<MapAlert | null>(null);
  const [reviewService, setReviewService] = useState<MapAlert | null>(null);
  const [monitoringService, setMonitoringService] = useState<MapAlert | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<MapAlert[]>([]);
  const [serviceStatuses, setServiceStatuses] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const { data: sData, error: sError } = await supabase.from('map_alerts').select('*');
        if (sError) throw sError;

        // Fetch latest statuses
        const { data: statusData, error: statusError } = await supabase.from('latest_service_status').select('*');
        if (!statusError && statusData) {
          const statusMap = statusData.reduce((acc: any, curr: any) => {
            acc[curr.service_id] = curr;
            return acc;
          }, {});
          setServiceStatuses(statusMap);
        }

        if (sData && sData.length > 0) {
          const mappedServices: MapAlert[] = sData.map(item => ({
            id: item.id,
            title: item.title,
            category: item.category,
            lat: 0,
            lng: 0,
            distance: item.distance || '1km',
            ratings: item.ratings || [],
            avgRating: item.avg_rating || 0,
            address: item.address || '',
            city: item.city || '',
            image: item.image,
            phone: item.contact_info?.phone,
            email: item.contact_info?.email,
            type: item.contact_info?.type
          }));
          setServices(mappedServices);
        }
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      }
    };
    fetchData();
  }, []);

  const toggleComments = (id: string) => {
    const newSet = new Set(expandedComments);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedComments(newSet);
  };

  const handleSubmitReview = async () => {
    if (!reviewService) return;
    if (rating === 0) {
      alert("Por favor, selecione uma classificação (estrelas).");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Tens de entrar com a tua conta para avaliar.");
        setIsSubmitting(false);
        return;
      }

      await mapService.submitReview(reviewService.id, session.user.id, rating, comment);

      // Update local state
      setServices(prev => prev.map(s => {
        if (s.id === reviewService.id) {
          const newTotal = (s.ratings?.length || 0) + 1;
          const newAvg = Number(((s.avgRating * (s.ratings?.length || 0) + rating) / newTotal).toFixed(1));
          return {
            ...s,
            avgRating: newAvg,
            ratings: [...(s.ratings || []), { stars: rating, comment }]
          };
        }
        return s;
      }));

      setReviewService(null);
      setRating(0);
      setComment("");
      alert("Avaliação enviada com sucesso! Obrigado pelo teu contributo.");
    } catch (err) {
      console.error('Error submitting review:', err);
      alert("Erro ao enviar avaliação. Tenta novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === "Todos" || s.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const getServiceLink = (service: MapAlert) => {
    if (service.title.includes("IEFP")) return "https://www.iefp.pt";
    if (service.title.includes("SNS") || service.title.includes("Hospital") || service.title.includes("Centro de Saúde")) return "https://www.sns.gov.pt";
    if (service.title.includes("AIMA")) return "https://aima.gov.pt";
    if (service.title.includes("Casa do Brasil")) return "https://casadobrasildelisboa.pt";
    return null;
  };

  return (
    <div className="flex flex-col bg-white min-h-[calc(100vh-64px)] font-['Plus_Jakarta_Sans'] overflow-hidden relative pb-20 md:pb-0">
      <div className="bg-white/95 backdrop-blur-3xl p-6 sticky top-0 z-[400] border-b border-slate-50 space-y-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">SERVIÇOS</h2>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Base de Dados MIRA: Entidades Oficiais &amp; ONGs</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="AIMA, SNS, Porto, Lisboa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-[11px] font-bold focus:bg-white focus:border-mira-orange transition-all shadow-inner outline-none" />
          </div>
          <div className="relative w-full sm:w-64">
            <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} className="w-full pl-6 pr-10 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:bg-white focus:border-mira-blue transition-all shadow-inner text-slate-700">
              <option value="Todos">Todas as Áreas</option>
              {MAP_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4 pb-24 overflow-y-auto flex-1 w-full max-w-2xl mx-auto">
        {filteredServices.length > 0 ? filteredServices.map(service => {
          const colors = CATEGORY_COLORS[service.category] || CATEGORY_COLORS["Default"];
          const isExpanded = expandedComments.has(service.id);
          const siteUrl = getServiceLink(service);
          return (
            <div key={service.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              <div className="p-6">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm ${colors.bg} text-white`}>{service.category}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-100">{service.city}</span>
                    {service.type && <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-500 border border-indigo-100">{service.type}</span>}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-tight uppercase group-hover:text-mira-orange transition-colors">{service.title}</h3>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 mb-5 flex items-start gap-3">
                  <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-600 font-bold leading-relaxed">{service.address}</p>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 bg-mira-yellow-pastel/50 px-3 py-1.5 rounded-xl border border-mira-yellow/20">
                        <Star size={14} className="text-mira-yellow fill-mira-yellow" />
                        <span className="text-xs font-black text-yellow-700">{service.avgRating || 'Novo'}</span>
                      </div>
                      <button onClick={() => toggleComments(service.id)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-mira-blue flex items-center gap-2 transition-colors">
                        {service.ratings.length} Relatos {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    {/* Monitor Status em Tempo Real */}
                    {serviceStatuses[service.id] && (
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/50 text-[9px] font-black uppercase tracking-tight shadow-sm animate-pulse ${serviceStatuses[service.id].status === 'crowded' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                        serviceStatuses[service.id].status === 'no_slots' ? 'bg-red-100 text-red-600 border-red-200' :
                          'bg-green-100 text-green-600 border-green-200'
                        }`}>
                        <Users size={12} />
                        {serviceStatuses[service.id].status === 'crowded' ? 'Local Lotado' :
                          serviceStatuses[service.id].status === 'no_slots' ? 'Sem mais Vagas' :
                            'Atendimento Normal'}
                        <span className="opacity-50 ml-1">• {new Date(serviceStatuses[service.id].reported_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>

                  {siteUrl && (
                    <button onClick={(e) => { e.stopPropagation(); window.open(siteUrl, '_blank'); }} className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-mira-orange transition-all shadow-lg active:scale-95 group/btn border border-white/10" title="Aceder ao Site Oficial">
                      <ExternalLink size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8 pt-5 border-t border-slate-100">
                  <button onClick={() => setReviewService(service)} className="bg-mira-blue-pastel text-mira-blue py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-mira-blue hover:text-white">
                    <Star size={14} /> Avaliar
                  </button>
                  <button onClick={() => setMonitoringService(service)} className="bg-slate-900 text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 hover:bg-mira-orange transition-all shadow-lg shadow-black/10">
                    <Users size={14} /> Monitorar Fila
                  </button>
                </div>
              </div>
            </div>
          );
        }) : <div className="flex flex-col items-center justify-center py-24 text-center opacity-40"><MapPin size={48} className="mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">Sem resultados para estes filtros</p></div>}
      </div>

      {/* MODAL DE MONITORAMENTO (FILA EM TEMPO REAL) */}
      {monitoringService && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-8 space-y-8 animate-in slide-in-from-bottom duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mira-orange/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">MONITOR MIRA</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Estado da Fila: {monitoringService.title}</p>
              </div>
              <button onClick={() => setMonitoringService(null)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><X size={20} /></button>
            </div>

            <div className="grid gap-4 relative z-10">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Como está o atendimento agora?</p>
              {[
                { id: 'normal', label: 'Atendimento Normal', icon: <CheckCircle2 />, color: 'bg-green-500', wait: 'Baixa Espera' },
                { id: 'crowded', label: 'Local Lotado', icon: <Users />, color: 'bg-orange-500', wait: 'Muita Espera' },
                { id: 'no_slots', label: 'Sem mais Vagas', icon: <X />, color: 'bg-red-500', wait: 'Só com Agendamento' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (!session) { alert("Tens de entrar com a tua conta para reportar."); return; }

                    const { error } = await supabase.from('service_reports').insert([{
                      service_id: monitoringService.id,
                      service_title: monitoringService.title,
                      status: opt.id,
                      waiting_time: opt.wait,
                      user_id: session.user.id
                    }]);

                    if (!error) {
                      setServiceStatuses(prev => ({
                        ...prev,
                        [monitoringService.id]: { status: opt.id, waiting_time: opt.wait, reported_at: new Date().toISOString() }
                      }));
                      setMonitoringService(null);
                    }
                  }}
                  className="flex items-center justify-between p-7 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:border-mira-orange transition-all group overflow-hidden relative"
                >
                  <div className="flex items-center gap-5 relative z-10">
                    <div className={`p-4 rounded-2xl ${opt.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>{opt.icon}</div>
                    <div className="text-left">
                      <span className="block text-sm font-black text-slate-900 uppercase tracking-tight">{opt.label}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-slate-600 transition-colors">{opt.wait}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-mira-orange group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed">
              Obrigado por apoiar a comunidade. <br />A sua informação ajuda outros imigrantes a não perderem tempo.
            </p>
          </div>
        </div>
      )}

      {/* Mantenha o modal de reviewService (Opcional, mas para não quebrar o código anterior) */}
      {reviewService && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
          <div className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] p-8 space-y-6 animate-in slide-in-from-bottom duration-500 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">AVALIAR SERVIÇO</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{reviewService.title}</p>
              </div>
              <button onClick={() => { setReviewService(null); setRating(0); setComment(""); }} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Qual é a sua avaliação?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setRating(star)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform active:scale-90"
                    >
                      <Star
                        size={32}
                        className={`${star <= rating
                          ? "text-mira-yellow fill-mira-yellow"
                          : "text-slate-200"
                          } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Partilhe a sua experiência (Opcional)</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Como foi o atendimento? Houve algum problema?"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl text-[12px] font-bold focus:bg-white focus:border-mira-blue transition-all outline-none h-32 resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                onClick={handleSubmitReview}
                className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isSubmitting
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-mira-orange"
                  }`}
              >
                {isSubmitting ? "A Enviar..." : "Submeter Avaliação"}
              </button>
            </div>

            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed">
              As suas avaliações ajudam outros membros da comunidade <br />a saber o que esperar deste balcão.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
