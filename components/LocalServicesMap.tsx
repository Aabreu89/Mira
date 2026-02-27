import React, { useState, useEffect } from 'react';
import { MapAlert, CATEGORIES, UNIFIED_CATEGORIES } from '../types';
import { MapPin, Star, AlertTriangle, X, Building2, Search, ChevronDown, MessageSquare, User, Send, Mail, ChevronUp, Phone, Info, Globe, PhoneCall, HeartPulse, Scale, GraduationCap, Briefcase, Landmark, ExternalLink } from 'lucide-react';
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

export const LocalServicesMap: React.FC<LocalServicesMapProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [reportService, setReportService] = useState<MapAlert | null>(null);
  const [reviewService, setReviewService] = useState<MapAlert | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [services, setServices] = useState<MapAlert[]>([]);

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
              {UNIFIED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-mira-yellow-pastel/50 px-3 py-1.5 rounded-xl border border-mira-yellow/20">
                      <Star size={14} className="text-mira-yellow fill-mira-yellow" />
                      <span className="text-xs font-black text-yellow-700">{service.avgRating || 'Novo'}</span>
                    </div>
                    <button onClick={() => toggleComments(service.id)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-mira-blue flex items-center gap-2 transition-colors">
                      {service.ratings.length} Relatos {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                  {siteUrl && (
                    <button onClick={(e) => { e.stopPropagation(); window.open(siteUrl, '_blank'); }} className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-mira-orange transition-all shadow-lg active:scale-95 group/btn border border-white/10" title="Aceder ao Site Oficial">
                      <ExternalLink size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8 pt-5 border-t border-slate-100">
                  <button onClick={() => setReviewService(service)} className="bg-mira-blue text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 hover:bg-slate-900 transition-colors">
                    <Star size={14} /> Avaliar Centro
                  </button>
                  <button onClick={() => setReportService(service)} className="bg-red-50 text-red-500 border border-red-100 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 hover:bg-red-500 hover:text-white transition-all">
                    <AlertTriangle size={14} /> Reportar Alerta
                  </button>
                </div>
              </div>
            </div>
          );
        }) : <div className="flex flex-col items-center justify-center py-24 text-center opacity-40"><MapPin size={48} className="mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">Sem resultados para estes filtros</p></div>}
      </div>
    </div>
  );
};
