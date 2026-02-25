
import React from 'react';
import { Shield, Lock, CheckCircle, Database } from 'lucide-react';

interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600 mx-auto">
                <Database size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Ajude a Melhorar Políticas Públicas</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed text-center">
                A MIRA colabora com universidades e ONGs para analisar os desafios dos imigrantes. 
                Gostaria de contribuir com <strong>dados anónimos</strong> (ex: região, tipo de problema) para ajudar a criar leis e serviços melhores?
            </p>
            
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-6 border border-slate-100">
                <div className="flex items-start gap-3 text-xs text-slate-600">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Os dados são totalmente anónimos e agregados (conforme RGPD).</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Utilizados exclusivamente para investigação e indicadores de políticas públicas.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                    <Lock size={14} className="text-green-500 shrink-0 mt-0.5" />
                    <span>Ganha <span className="font-bold text-indigo-600">+Pontos</span> ao contribuir com relatórios detalhados.</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={onAccept}
                    className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    Concordo e Contribuo
                </button>
                <button 
                    onClick={onDecline}
                    className="w-full bg-white text-slate-500 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors border border-slate-200"
                >
                    Não, manter os meus dados privados
                </button>
            </div>
        </div>
    </div>
  );
};
