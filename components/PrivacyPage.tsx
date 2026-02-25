
import React, { useState } from 'react';
import { 
  Shield, Scale, Bot, Lock, FileWarning, ChevronDown, ChevronUp, 
  Database, Eraser, ExternalLink, Globe, Award, Flame, UserCheck, 
  ShieldAlert, MessageCircle, FileText, MapPin, Book, Heart, Zap, AlertTriangle, AlertCircle,
  Copyright, ShieldCheck as ShieldCheckIcon, CalendarCheck
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>('copyright');

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const Section = ({ id, title, icon: Icon, children, colorClass }: any) => (
    <div className={`bg-white rounded-[2rem] border transition-all overflow-hidden ${activeSection === id ? 'border-slate-200 shadow-md' : 'border-slate-100 shadow-sm'}`}>
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${colorClass}`}>
                <Icon size={22} />
            </div>
            <h3 className="font-black text-slate-900 text-sm tracking-tight uppercase">{title}</h3>
        </div>
        {activeSection === id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
      </button>
      
      {activeSection === id && (
        <div className="px-6 pb-8 pt-0 animate-in slide-in-from-top-2">
            <div className="h-px w-full bg-slate-50 mb-6"></div>
            <div className="text-sm text-slate-500 font-medium leading-relaxed space-y-4">
                {children}
            </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 max-w-2xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="text-center py-8">
          <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-mira-orange shadow-inner">
              <ShieldCheckIcon size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Segurança & Direitos</h2>
          <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">
              Salvaguarda Jurídica e Ética Comunitária
          </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">

          <Section id="copyright" title="Propriedade Intelectual" icon={Copyright} colorClass="bg-mira-orange-pastel text-mira-orange">
              <div className="space-y-4">
                  <p className="font-black text-slate-900 leading-tight">© 2026 MIRA - Amanda Silva Abreu. Todos os direitos reservados.</p>
                  <p className="leading-relaxed">
                      Todo o ecossistema digital MIRA — abrangendo a sua interface visual, arquitetura de experiência do utilizador (UX/UI), assistente de inteligência artificial generativa, metodologias de integração social e bases de dados proprietárias — constitui propriedade intelectual exclusiva da sua idealizadora, <strong>Amanda Silva Abreu</strong>.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Proteção Legal v6.8</h4>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed">
                          A reprodução integral ou parcial, engenharia reversa, descompilação ou qualquer forma de utilização não autorizada dos ativos desta plataforma é estritamente proibida. Esta obra está protegida pelas leis de direitos de autor nacionais e internacionais, assim como pela legislação de propriedade industrial vigente em Portugal e na União Europeia.
                      </p>
                  </div>
              </div>
          </Section>
          
          <Section id="badges" title="Sistema de Selos (Badges)" icon={Award} colorClass="bg-mira-yellow-pastel text-mira-yellow">
              <p className="mb-4">No MIRA, a reputação é o seu maior ativo. Existem selos exclusivos que demonstram o seu compromisso com a comunidade:</p>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                {[
                  { icon: Flame, name: "Pioneiro", desc: "Membro veterano das primeiras fases do app." },
                  { icon: UserCheck, name: "Verificador", desc: "Verificou como verdadeira 20 postagens na comunidade." },
                  { icon: MessageCircle, name: "Conselheiro", desc: "Teve 50 comentários úteis marcados pela comunidade." },
                  { icon: FileText, name: "Especialista em Documentos", desc: "Gerou e utilizou minutas oficiais para vencer a burocracia." },
                  { icon: MapPin, name: "Guia Local", desc: "Comentou e avaliou mais de 10 locais no Serviço para Imigrantes." },
                  { icon: Award, name: "Mentor", desc: "Ajudou diretamente 20 recém-chegados em canais de ajuda." },
                  { icon: ShieldAlert, name: "Sentinela", desc: "Denunciou 10 conteúdos fraudulentos confirmados pela moderação." },
                  { icon: Book, name: "Estudante", desc: "Leu mais de 10 artigos produzidos pelo MIRA." },
                  { icon: CalendarCheck, name: "Chat Expert", desc: "Conversou com o MIRA por 10 dias seguidos." },
                  { icon: Heart, name: "Resiliente", desc: "Membro ativo e colaborativo por mais de 6 meses." },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-mira-yellow text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <badge.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs uppercase">{badge.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100">
                <h4 className="font-black text-red-600 uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                  <AlertTriangle size={14}/> Regras de Penalização
                </h4>
                <p className="text-xs text-red-800 font-bold leading-relaxed mb-4">
                  A confiança é a base do MIRA. Má conduta resulta em perdas imediatas:
                </p>
                <ul className="space-y-3 text-xs text-red-700">
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
                    <span><strong>Marcação de Falso:</strong> Se os seus posts forem marcados como falsos pela maioria, perde pontos de reputação.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
                    <span><strong>Perda de Selos:</strong> Ao atingir um limite crítico de pontos negativos, os seus selos conquistados são revogados um a um.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
                    <span><strong>Expulsão:</strong> Em casos extremos de fraude comprovada, discurso de ódio ou reincidência, a conta será banida permanentemente.</span>
                  </li>
                </ul>
              </div>
          </Section>

          <Section id="disclaimer" title="Isenção de Responsabilidade" icon={FileWarning} colorClass="bg-mira-orange-pastel text-mira-orange">
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-4">
                  <p className="font-black text-red-600 uppercase text-[10px] tracking-widest mb-1 flex items-center gap-2">
                      <Shield size={14}/> Aviso Importante
                  </p>
                  <p className="text-xs text-red-800 font-bold leading-normal">
                      O MIRA NÃO É UM ADVOGADO NEM UMA ENTIDADE GOVERNAMENTAL.
                  </p>
              </div>
              <p>
                  1. <strong>Caráter Informativo:</strong> Todo o conteúdo gerado por esta aplicação (incluindo respostas do chat, documentos e mapas) tem fins meramente informativos e educativos. Não constitui aconselhamento jurídico oficial.
              </p>
              <p>
                  2. <strong>Verificação Obrigatória:</strong> As leis de imigração e procedimentos (AIMA, SNS, Finanças) mudam frequentemente. O utilizador deve sempre validar as informações junto das fontes oficiais ou de um advogado inscrito na Ordem.
              </p>
              <p>
                  3. <strong>Sem Responsabilidade:</strong> A equipa do MIRA não se responsabiliza por quaisquer danos, multas, recusas de processos ou perdas decorrentes do uso das informações aqui contidas. O uso da aplicação é feito por sua conta e risco.
              </p>
          </Section>

          <Section id="privacy" title="Política de Privacidade (RGPD)" icon={Lock} colorClass="bg-mira-green-pastel text-mira-green">
              <p>
                  Em conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD) - UE 2016/679</strong>:
              </p>
              <ul className="space-y-3">
                  <li className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-mira-green/10 text-mira-green flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12}/>
                      </div>
                      <span><strong>Minimização de Dados:</strong> Apenas recolhemos os dados estritamente necessários para o funcionamento da app.</span>
                  </li>
                  <li className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-mira-green/10 text-mira-green flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12}/>
                      </div>
                      <span><strong>Anonimização:</strong> Dados sensíveis utilizados para estatísticas são agregados, tornando impossível a identificação individual.</span>
                  </li>
                  <li className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-mira-green/10 text-mira-green flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12}/>
                      </div>
                      <span><strong>Direito ao Esquecimento:</strong> Pode solicitar a eliminação total da sua conta e dados a qualquer momento.</span>
                  </li>
              </ul>
              
              <button 
                onClick={() => alert("Pedido de download dos seus dados enviado. Receberá um arquivo JSON em breve.")}
                className="mt-6 w-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-mira-green bg-mira-green-pastel border border-mira-green/20 py-4 rounded-2xl hover:bg-mira-green hover:text-white transition-all"
              >
                  <Database size={16} /> Descarregar meus dados (Portabilidade)
              </button>
          </Section>

          <Section id="ai" title="Inteligência Artificial (AI Act)" icon={Bot} colorClass="bg-mira-blue-pastel text-mira-blue">
              <p>
                  Em antecipação ao <strong>EU AI Act</strong>, informamos que:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black text-slate-800 mb-1 uppercase tracking-tight">Interação com Máquina</p>
                    <p className="text-xs text-slate-500">Ao conversar com a MIRA, está a interagir com IA Generativa (Google Gemini), e não com um ser humano. </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black text-slate-800 mb-1 uppercase tracking-tight">Risco de Inexatidão</p>
                    <p className="text-xs text-slate-500">A IA pode gerar informações incorretas ("alucinações"). Nunca tome decisões críticas sem verificação oficial.</p>
                </div>
              </div>
          </Section>

          <Section id="data" title="Uso de Dados Comunitários" icon={Globe} colorClass="bg-mira-yellow-pastel text-mira-yellow">
              <p>
                  O MIRA colabora com universidades e ONGs para mapear desafios de integração em tempo real de forma segura.
              </p>
              <p>
                  Ao ativar a opção "Contribuição de Dados", concorda que metadados anónimos sejam usados para relatórios que pressionam por melhores políticas públicas.
              </p>
              <div className="bg-mira-yellow-pastel/50 p-6 rounded-[2rem] text-xs text-mira-yellow font-bold border border-mira-yellow/20">
                  <span className="font-black uppercase tracking-widest text-[9px] block mb-2 opacity-60">Garantia MIRA:</span>
                  O conteúdo das suas conversas privadas NUNCA é partilhado, apenas as categorias gerais dos problemas.
              </div>
          </Section>

          <Section id="terms" title="Termos de Serviço" icon={FileText} colorClass="bg-slate-900 text-white">
              <div className="space-y-4">
                  <p>Ao utilizar o MIRA, concorda com os seguintes termos:</p>
                  <ul className="space-y-2 text-xs">
                      <li>• Uso pessoal e não comercial da plataforma.</li>
                      <li>• Responsabilidade total pelas informações partilhadas na comunidade.</li>
                      <li>• Proibição de uso para fins ilegais ou fraudulentos.</li>
                      <li>• Aceitação de que o MIRA é uma ferramenta de apoio e não substitui aconselhamento profissional.</li>
                  </ul>
              </div>
          </Section>

      </div>

      {/* Footer Actions */}
      <div className="pt-10 border-t border-slate-50">
          <p className="text-[9px] font-black text-slate-300 text-center mb-8 uppercase tracking-[0.3em]">
              © 2026 MIRA - Amanda Silva Abreu
          </p>
      </div>
    </div>
  );
};

// Simple Check icon for inside lists
const CheckIcon = ({size = 16}: {size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
