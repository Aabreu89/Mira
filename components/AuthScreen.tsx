
import React, { useState } from 'react';
import { User } from '../types';
import { Globe, Lock, Eye, EyeOff, Mail, ArrowLeft, CheckCircle2, ChevronDown, ShieldCheck, Key } from 'lucide-react';
import { t } from '../utils/translations';
import { MIRA_LOGO } from '../constants';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const RANDOM_ADJECTIVES = ['Explorador', 'Valente', 'Resiliente', 'Curioso', 'Brilhante', 'Atento', 'Livre', 'Paciente'];
const RANDOM_NOUNS = ['Fênix', 'Águia', 'Golfinho', 'Leão', 'Estrela', 'Horizonte', 'Vento', 'Maré'];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, language, setLanguage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isForgotPassword) {
        if (!email) return;
        setIsResetSent(true);
        setTimeout(() => {
            setIsResetSent(false);
            setIsForgotPassword(false);
        }, 3000);
        return;
    }

    if (!isLogin && !isVerifyingEmail) {
        // Trigger 2FA Simulation
        setIsVerifyingEmail(true);
        return;
    }

    const isAdmin = email.toUpperCase() === 'ADMIN' && password === 'Britney123';
    const randomName = isAdmin ? "Administrador MIRA" : `${RANDOM_ADJECTIVES[Math.floor(Math.random() * RANDOM_ADJECTIVES.length)]} ${RANDOM_NOUNS[Math.floor(Math.random() * RANDOM_NOUNS.length)]}`;

    const newUser: User = {
        id: isAdmin ? 'admin-system-id' : 'mock-id-' + Math.random().toString(36).substr(2, 9),
        email,
        name: randomName,
        nationality: isAdmin ? 'Portugal' : 'Anônimo',
        ageRange: 'N/A',
        location: isAdmin ? 'Central Hub' : 'Lisboa',
        mainChallenge: 'Gestão',
        dataConsent: true,
        reputation: isAdmin ? 1000 : 10,
        trustLevel: isAdmin ? 'Curador Comunitário' : 'Observador',
        isMuted: false,
        registrationDate: new Date().toISOString(),
        avatar: isAdmin ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' : `https://i.pravatar.cc/150?u=${Math.random()}`,
        role: isAdmin ? 'admin' : 'member',
        isVerified: isAdmin
    };
    
    onLogin(newUser);
  };

  const renderForm = () => {
      if (isVerifyingEmail) {
          return (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                      <button type="button" onClick={() => setIsVerifyingEmail(false)} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors">
                          <ArrowLeft size={20} />
                      </button>
                      <h3 className="font-black text-slate-800 uppercase tracking-tighter">Verificação de Segurança</h3>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                      <div className="p-2 bg-mira-blue text-white rounded-xl"><Key size={20}/></div>
                      <p className="text-[11px] text-blue-800 font-bold leading-relaxed uppercase">Enviamos um código de 6 dígitos para o seu e-mail. Por favor, introduza-o para validar a sua identidade.</p>
                  </div>
                  <div className="space-y-4">
                      <input 
                        type="text" 
                        maxLength={6}
                        placeholder="CÓDIGO DE 6 DÍGITOS"
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full tracking-[1em] text-center py-5 bg-slate-50 border-2 border-transparent rounded-2xl text-xl font-black focus:border-mira-blue focus:bg-white transition-all outline-none"
                      />
                      <button 
                        type="submit" 
                        disabled={otp.length < 6}
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl active:scale-95 transition-all disabled:opacity-30"
                      >
                        Validar e Entrar
                      </button>
                      <p className="text-center text-[9px] font-black text-slate-400 uppercase">Não recebeu? <span className="text-mira-blue cursor-pointer">Reenviar código</span></p>
                  </div>
              </div>
          );
      }

      if (isForgotPassword) {
          return (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                      <button type="button" onClick={() => setIsForgotPassword(false)} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors">
                          <ArrowLeft size={20} />
                      </button>
                      <h3 className="font-black text-slate-800 uppercase tracking-tighter">Recuperar Senha</h3>
                  </div>

                  {isResetSent ? (
                      <div className="bg-green-50 border border-green-100 p-8 rounded-[2.5rem] text-center space-y-3 animate-in zoom-in-95">
                          <div className="w-16 h-16 bg-mira-green text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                              <CheckCircle2 size={32} />
                          </div>
                          <p className="text-sm font-black text-green-800 uppercase tracking-widest">{t('auth_reset_success', language)}</p>
                      </div>
                  ) : (
                      <div className="space-y-4">
                          <div className="space-y-1.5">
                              <div className="relative">
                                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                  <input 
                                      type="email" 
                                      placeholder={t('auth_email_placeholder', language)}
                                      value={email}
                                      onChange={e => setEmail(e.target.value)}
                                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-mira-blue focus:bg-white transition-all outline-none"
                                  />
                              </div>
                          </div>
                          <button 
                            type="submit" 
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all"
                          >
                              {t('auth_btn_reset', language)}
                          </button>
                      </div>
                  )}
              </div>
          );
      }

      return (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="relative">
                            <Globe className="absolute left-4 top-3.5 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder={t('auth_email_placeholder', language)}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-mira-blue focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                            <input 
                                type={showPass ? "text" : "password"} 
                                placeholder={t('auth_pass_placeholder', language)}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-mira-blue focus:bg-white transition-all outline-none"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex justify-end items-center px-1">
                            <button 
                                type="button" 
                                onClick={() => setIsForgotPassword(true)}
                                className="text-[10px] font-black text-mira-blue hover:text-blue-700 transition-colors uppercase tracking-widest"
                            >
                                {t('auth_forgot_pass', language)}
                            </button>
                        </div>
                    )}

                    <button type="submit" className="w-full py-5 bg-mira-orange text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-orange-200 hover:bg-slate-900 transition-all active:scale-95">
                        {isLogin ? 'Iniciar Jornada' : 'Confirmar e-mail'}
                    </button>
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0c2461] relative overflow-hidden font-['Plus_Jakarta_Sans']">
        <style>
          {`
            @keyframes modern-pulse {
              0%, 100% { opacity: 0.3; transform: scale(1); filter: blur(0px); }
              50% { opacity: 1; transform: scale(1.3); filter: blur(1px); }
            }
            @keyframes glow-line {
              0%, 100% { filter: brightness(1) drop-shadow(0 0 2px rgba(255,255,255,0.5)); }
              50% { filter: brightness(1.5) drop-shadow(0 0 10px rgba(249,115,22,1)); }
            }
            .dot-flash-1 { animation: modern-pulse 2s infinite ease-in-out; }
            .dot-flash-2 { animation: modern-pulse 2s infinite ease-in-out 0.5s; }
            .dot-flash-3 { animation: modern-pulse 2s infinite ease-in-out 1s; }
            .dot-flash-4 { animation: modern-pulse 2s infinite ease-in-out 1.5s; }
            .glow-line-animated { animation: glow-line 3s infinite ease-in-out; }
          `}
        </style>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-mira-orange rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-mira-blue rounded-full blur-[100px]"></div>
        </div>

        {/* Language Selector Dropdown - Moved to far Right and distanced from logo */}
        <div className="absolute top-6 right-2 z-50">
             <div className="relative">
                 <button 
                   onClick={() => setShowLangMenu(!showLangMenu)}
                   className="bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-white/10 transition-all"
                 >
                     <Globe size={16} className="text-mira-orange" /> {language} <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                 </button>
                 {showLangMenu && (
                     <div className="absolute top-full right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 animate-in slide-in-from-top-2">
                         {['PT', 'EN', 'ES', 'FR'].map(l => (
                              <button 
                                key={l} 
                                onClick={() => { setLanguage(l); setShowLangMenu(false); }} 
                                className={`w-full text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${language === l ? 'bg-mira-orange text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
                              >
                                  {l === 'PT' ? 'Português' : l === 'EN' ? 'English' : l === 'ES' ? 'Español' : 'Français'}
                              </button>
                          ))}
                     </div>
                 )}
             </div>
        </div>

        <div className="w-full max-w-md z-10 flex flex-col items-center">
            {/* Bloco de Logo Isolado */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="inline-flex w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] mb-6 p-4 items-center justify-center shadow-2xl border border-white/20">
                    <div className="w-full h-full text-white">
                        {MIRA_LOGO}
                    </div>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-lg leading-none">MIRA</h1>
                <p className="text-white/60 text-[9px] font-bold mt-4 max-w-[280px] mx-auto leading-relaxed uppercase tracking-[0.2em]">Empoderando vozes. Unindo vidas</p>
            </div>

            <div className="bg-white w-full p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden border-2 border-white/10">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mira-orange via-mira-yellow to-mira-blue glow-line-animated"></div>
                <form onSubmit={handleAuth}>
                    {renderForm()}
                </form>
            </div>

            {/* Link de Registro Separado */}
            {!isForgotPassword && !isVerifyingEmail && (
                <div className="text-center mt-10 mb-16 animate-in fade-in duration-1000">
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-black text-white/90 hover:text-white transition-colors uppercase tracking-[0.2em]">
                        {isLogin ? 'Ainda não tens conta?' : 'Já fazes parte da rede?'} <span className="text-mira-orange underline decoration-mira-orange/40 underline-offset-8">{isLogin ? 'Regista-te aqui' : 'Entra aqui'}</span>
                    </button>
                </div>
            )}
        </div>
        
        {/* High-Tech Blinking Lights & Attribution Footer */}
        <div className="absolute bottom-6 w-full flex flex-col items-center gap-4 px-6">
            <div className="flex gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-mira-orange dot-flash-1 shadow-[0_0_10px_#f97316]"></div>
                <div className="w-2 h-2 rounded-full bg-mira-blue dot-flash-2 shadow-[0_0_10px_#0ea5e9]"></div>
                <div className="w-2 h-2 rounded-full bg-mira-yellow dot-flash-3 shadow-[0_0_10px_#eab308]"></div>
                <div className="w-2 h-2 rounded-full bg-mira-green dot-flash-4 shadow-[0_0_10px_#22c55e]"></div>
            </div>
            <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">MIRA - COPYWRITE 2026, Amanda Silva Abreu.</p>
        </div>
    </div>
  );
};
