
import React from 'react';
import { Shield, Lock, CheckCircle2, Database, Info } from 'lucide-react';

interface ConsentModalProps {
    onAccept: () => void;
    onDecline: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-white w-full max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-500">
                <div className="p-6 space-y-5 text-center">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                        <Shield className="text-mira-orange" size={28} />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-tight">Privacidade Total</h2>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-4">Não guardamos dados sensíveis. A sua segurança é absoluta.</p>
                    </div>

                    <div className="bg-slate-50 rounded-[1.8rem] p-4 border border-slate-100 space-y-3">
                        <div className="flex items-center gap-3 text-left">
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-slate-100 shrink-0">
                                <CheckCircle2 size={10} className="text-mira-orange" />
                            </div>
                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">
                                Dados <span className="text-slate-900">100% Anonimizados</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-left">
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-slate-100 shrink-0">
                                <Lock size={10} className="text-mira-blue" />
                            </div>
                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">
                                Sem <span className="text-slate-900">Dados Pessoais</span> Identificáveis
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={onAccept}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
                        >
                            Aceitar e entrar
                        </button>
                        <button
                            onClick={onDecline}
                            className="w-full text-slate-400 py-2 rounded-xl font-black uppercase text-[8px] tracking-widest hover:text-slate-600 transition-colors"
                        >
                            Manter offline
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1 opacity-40 text-slate-500">
                        <span className="text-[7px] font-black uppercase tracking-[0.2em]">Compliance Total RGPD</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
