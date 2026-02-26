import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
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

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        if (isForgotPassword) {
            if (!email) { setIsLoading(false); return; }
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            setIsLoading(false);
            if (error) {
                setErrorMsg(error.message);
                return;
            }
            setIsResetSent(true);
            setTimeout(() => {
                setIsResetSent(false);
                setIsForgotPassword(false);
            }, 3000);
            return;
        }

        if (isVerifyingEmail) {
            setIsLoading(false);
            return;
        }

        if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
            if (error) {
                setErrorMsg(error.message);
            } else if (data.session) {
                try {
                    const fetchProfile = supabase.from('profiles').select('*').eq('id', data.session.user.id).single();
                    const timeout = new Promise<{ data: any, error: any }>((resolve) => setTimeout(() => resolve({ data: null, error: new Error('Timeout') }), 2000));

                    const { data: profile, error: profileErr } = await Promise.race([fetchProfile, timeout]);

                    console.log('Profile query result:', profile, profileErr);

                    if (profile && !profileErr) {
                        onLogin({
                            id: profile.id,
                            email: data.session.user.email || '',
                            name: profile.name || data.session.user.user_metadata?.name || 'Usuário Novo',
                            avatar: profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}`,
                            bio: profile.bio || '',
                            nationality: profile.nationality || 'Não especificada',
                            ageRange: profile.age_range || '',
                            location: profile.location || '',
                            mainChallenge: profile.main_challenge || '',
                            reputation: profile.reputation || 0,
                            trustLevel: profile.trust_level || 'Observador',
                            isVerified: profile.is_verified || false,
                            role: profile.role || 'member',
                            isMuted: profile.is_muted || false,
                            registrationDate: profile.updated_at || new Date().toISOString()
                        });
                    } else {
                        const emailStr = data.session.user.email || '';
                        const isAdmin = emailStr.includes('amandasabreu');
                        const defaultName = isAdmin ? 'Amanda Admin' : (data.session.user.user_metadata?.name || 'Usuário Comunidade');

                        // Try to create profile if completely missing
                        supabase.from('profiles').insert([{
                            id: data.session.user.id,
                            name: defaultName,
                            role: isAdmin ? 'admin' : 'member'
                        }]).then(() => console.log('Criou profile fallback'));

                        onLogin({
                            id: data.session.user.id,
                            email: emailStr,
                            name: defaultName,
                            role: isAdmin ? 'admin' : 'member',
                            reputation: 500,
                            trustLevel: 'Curador Comunitário',
                            isVerified: true,
                            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isAdmin ? 'Admin' : 'User')}`,
                            bio: '', nationality: '', ageRange: '', location: '', mainChallenge: '', isMuted: false, registrationDate: new Date().toISOString()
                        });
                    }
                } catch (err: any) {
                    console.error('Profile fetch error:', err);
                    setErrorMsg('Erro interno no servidor ou no perfil.');
                }
            }
        } else {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name: `Usuário ${Math.floor(Math.random() * 1000)}` }
                }
            });
            if (error) {
                setErrorMsg(error.message);
            } else {
                const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
                if (signInError) setErrorMsg('Sua conta foi criada! Faça login agora para entrar na plataforma.');
                else if (data.session) onLogin({ id: data.session.user.id, email: data.session.user.email, name: 'Usuário Novo', role: 'member', reputation: 0, trustLevel: 'Observador' });
            }
        }

        setIsLoading(false);
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
                        <div className="p-2 bg-mira-blue text-white rounded-xl"><Key size={20} /></div>
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

                    {errorMsg && (
                        <div className="text-red-500 text-xs text-center font-bold px-4 py-2 bg-red-50 rounded-lg">
                            {errorMsg}
                        </div>
                    )}

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

                    <button type="submit" disabled={isLoading} className="w-full py-5 bg-mira-orange text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-orange-200 hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50">
                        {isLoading ? 'A PROCESSAR...' : (isLogin ? 'Iniciar Jornada' : 'Registar')}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0A162B] via-[#003B75] to-[#0A162B] relative overflow-hidden font-['Plus_Jakarta_Sans']">
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

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-mira-blue-light/15 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-mira-blue/20 rounded-full blur-[200px]"></div>
            </div>

            {/* Language Selector Dropdown - Moved to far Right and distanced from logo */}
            <div className="absolute top-6 right-2 z-50">
                <div className="relative">
                    <button
                        onClick={() => setShowLangMenu(!showLangMenu)}
                        className="bg-white/10 backdrop-blur-3xl border border-white/10 px-5 py-2.5 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_10px_30px_rgba(0,229,255,0.05)] hover:bg-white/20 transition-all"
                    >
                        <Globe size={16} className="text-mira-orange" /> {language} <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                    </button>
                    {showLangMenu && (
                        <div className="absolute top-full right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 animate-in slide-in-from-top-2">
                            {['PT', 'EN', 'ES', 'FR'].map(l => (
                                <button
                                    key={l}
                                    onClick={() => { setLanguage(l); setShowLangMenu(false); }}
                                    className={`w-full text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${language === l ? 'bg-mira-blue-light text-mira-blue-dark shadow-lg shadow-cyan-500/30' : 'text-slate-600 hover:bg-mira-blue-pastel hover:text-mira-blue-dark'}`}
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
                    <div className="inline-flex w-24 h-24 bg-mira-dark-blue/40 backdrop-blur-3xl rounded-[2.5rem] mb-6 p-4 items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 rounded-[2.5rem] group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="w-full h-full text-mira-blue-light relative z-10 filter drop-shadow-[0_0_15px_rgba(0,229,255,0.7)]">
                            {MIRA_LOGO}
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-md leading-none">MIRA</h1>
                    <p className="text-white/90 text-[9px] font-bold mt-4 max-w-[280px] mx-auto leading-relaxed uppercase tracking-[0.2em]">Empoderando vozes. Unindo vidas</p>
                </div>

                <div className="bg-white/95 backdrop-blur-3xl w-full p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden border border-white/20">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mira-orange via-mira-blue-light to-mira-blue glow-line-animated"></div>
                    <form onSubmit={handleAuth}>
                        {renderForm()}
                    </form>
                </div>

                {/* Link de Registro Separado */}
                {!isForgotPassword && !isVerifyingEmail && (
                    <div className="text-center mt-10 mb-16 animate-in fade-in duration-1000">
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-black text-white/80 hover:text-white transition-colors uppercase tracking-[0.2em] drop-shadow-sm">
                            {isLogin ? 'Ainda não tens conta?' : 'Já fazes parte da rede?'} <span className="text-white underline decoration-white/40 underline-offset-8 decoration-2">{isLogin ? 'Regista-te aqui' : 'Entra aqui'}</span>
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
                <p className="text-[8px] font-black text-white/60 uppercase tracking-[0.3em] drop-shadow-sm">MIRA - COPYWRITE 2026, Amanda Silva Abreu.</p>
            </div>
        </div>
    );
};
