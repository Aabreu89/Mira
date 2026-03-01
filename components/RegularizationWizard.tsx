
import React, { useState } from 'react';
import {
    ChevronRight, ArrowLeft, CheckCircle2, FileText, Info,
    Landmark, AlertCircle, BookOpen, Star, HelpCircle
} from 'lucide-react';
import { t } from '../utils/translations';
import { templates } from '../utils/documentsDatabase';

interface WizardProps {
    language: string;
    onSelectTemplate: (templateId: string) => void;
    onGoToDocs: () => void;
}

export const RegularizationWizard: React.FC<WizardProps> = ({ language, onSelectTemplate, onGoToDocs }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleAnswer = (key: string, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        setStep(prev => prev + 1);
    };

    const resetWizard = () => {
        setStep(1);
        setAnswers({});
    };

    const renderStep1 = () => (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{t('wizard_step1_q', language)}</h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{t('wizard_step1_h', language)}</p>
            </div>
            <div className="grid gap-3">
                {[
                    { id: 'cplp', label: 'CPLP (Brasil, Angola, Cabo Verde, etc)', icon: <Landmark className="text-mira-orange" /> },
                    { id: 'eu', label: 'União Europeia / EEE / Suíça', icon: <Landmark className="text-blue-500" /> },
                    { id: 'other', label: 'Resto do Mundo (Visto Geral / Art. 90+)', icon: <Landmark className="text-slate-400" /> }
                ].map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => handleAnswer('origin', opt.id)}
                        className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-mira-orange hover:bg-white transition-all text-left group"
                    >
                        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{opt.icon}</div>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-mira-orange transition-colors">
                <ArrowLeft size={14} /> Voltar
            </button>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">2. Qual o seu objetivo em Portugal?</h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">O motivo da estada dita os documentos necessários.</p>
            </div>
            <div className="grid gap-3">
                {[
                    { id: 'work', label: 'Trabalho (Subordinado ou Recibos)', icon: <CheckCircle2 className="text-green-500" /> },
                    { id: 'family', label: 'Reagrupamento Familiar', icon: <CheckCircle2 className="text-pink-500" /> },
                    { id: 'study', label: 'Estudo ou Investigação', icon: <CheckCircle2 className="text-mira-blue" /> },
                    { id: 'nomad', label: 'Nómada Digital / Rendimentos Próprios', icon: <CheckCircle2 className="text-purple-500" /> }
                ].map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => handleAnswer('purpose', opt.id)}
                        className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-mira-orange hover:bg-white transition-all text-left group"
                    >
                        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{opt.icon}</div>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderResult = () => {
        // Lógica simplificada de resultados baseada nas respostas
        const getChecklist = () => {
            const origin = answers.origin;
            const purpose = answers.purpose;

            if (origin === 'eu') {
                return {
                    title: 'Certificado de Registo (CRUE)',
                    desc: 'Cidadãos europeus devem registar-se na Câmara Municipal após 90 dias.',
                    steps: ['Obter NIF de Estrangeiro', 'Solicitar Atestado de Morada na Junta', 'Agendar Requerimento na Câmara'],
                    docs: ['crue_req', 'nif_req', 'junta_morada']
                };
            }
            if (origin === 'cplp') {
                return {
                    title: 'Autorização CPLP Digital / CVA',
                    desc: 'Acesso facilitado através do portal AIMA para países da CPLP.',
                    steps: ['Pedir NISS Online', 'Validar NIF nas Finanças', 'Submeter pedido no portal AIMA CPLP'],
                    docs: ['ss_niss', 'nif_req', 'junta_morada']
                };
            }

            // Outras origens (Visto Geral)
            if (purpose === 'work') {
                return {
                    title: 'Trabalho e Regularização (AIMA)',
                    desc: 'Para quem deseja legalizar-se através do exercício de atividade profissional.',
                    steps: ['Promessa ou Contrato de Trabalho', 'Inscrição na Segurança Social (NISS)', 'Submissão de Pedido de Residência'],
                    docs: ['aima_ar_temp', 'ss_niss', 'ss_dec_desemprego']
                };
            }
            if (purpose === 'nomad') {
                return {
                    title: 'Rendimentos Próprios / Nómada Digital',
                    desc: 'Caminho para quem trabalha remotamente ou possui meios financeiros.',
                    steps: ['Comprovar rendimentos estáveis', 'Obter Visto ou AR Temporária', 'Atestado de Alojamento'],
                    docs: ['aima_ar_temp', 'aima_dec_sustento', 'aima_dec_alojamento']
                };
            }
            if (purpose === 'family') {
                return {
                    title: 'Reagrupamento Familiar (Art. 98)',
                    desc: 'Processo para trazer familiares dependentes para Portugal.',
                    steps: ['Prova de parentesco legalizada', 'Declaração de Responsabilidade', 'Comprovativo de condições de alojamento'],
                    docs: ['aima_dec_responsabilidade', 'aima_dec_alojamento', 'certidao_civil_req']
                };
            }

            return {
                title: 'Autorização de Residência Geral',
                desc: 'Processo padrão para permanência legal em Portugal.',
                steps: ['Agendamento prévio na AIMA', 'Comprovativo de Subsistência', 'Atestado de Morada Local'],
                docs: ['aima_ar_temp', 'aima_dec_sustento', 'junta_morada']
            };
        };

        const checklist = getChecklist();

        // Helper to get template name
        const getTemplateName = (id: string) => {
            const found = templates.find((t: any) => t.id === id);
            return found ? found.title : 'Ver Modelo e Preencher';
        };

        return (
            <div className="space-y-8 animate-in zoom-in duration-500">
                <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-mira-orange/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <Star className="text-mira-orange mb-4" size={32} fill="currentColor" />
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4">Plano MIRA</h2>
                    <div className="inline-block px-4 py-2 bg-white/10 rounded-xl">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">{checklist.title}</p>
                    </div>
                    <p className="mt-6 text-[11px] text-slate-300 font-bold uppercase leading-relaxed">{checklist.desc}</p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-l-4 border-mira-orange pl-3">Passos Obrigatórios</h3>
                    <div className="grid gap-3">
                        {checklist.steps.map((s, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 bg-slate-50 rounded-3xl border border-slate-100/50">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-mira-orange shadow-sm shrink-0 border border-slate-100">{i + 1}</div>
                                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tight leading-normal">{s}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-l-4 border-mira-blue pl-3">Minutas Recomendadas</h3>
                    <div className="grid gap-3">
                        {checklist.docs.map(docId => (
                            <button
                                key={docId}
                                onClick={() => onSelectTemplate(docId)}
                                className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2.5rem] hover:border-mira-blue hover:shadow-lg transition-all shadow-sm group text-left"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="p-3 bg-blue-50 text-mira-blue rounded-2xl group-hover:bg-mira-blue group-hover:text-white transition-colors shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Ver Modelo e Preencher</span>
                                        <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-tight truncate leading-tight group-hover:text-mira-blue transition-colors">{getTemplateName(docId)}</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-mira-blue transition-colors shrink-0" />
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={resetWizard}
                    className="w-full py-5 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-mira-orange hover:text-mira-orange transition-all"
                >
                    Refazer Diagnóstico
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-8 pb-32">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderResult()}
            </div>
        </div>
    );
};
