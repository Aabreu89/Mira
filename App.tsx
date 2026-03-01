import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Navigation from './components/Navigation';
import CommunityView from './components/CommunityView';
import AssistantView from './components/AssistantView';
import DashboardView from './components/DashboardView';
import { HomeView } from './components/HomeView';
import { DocumentAssistant } from './components/DocumentAssistant';
import { GamificationProfile } from './components/GamificationProfile';
import { JobBoard } from './components/JobBoard';
import { LearningHub } from './components/LearningHub';
import { LocalServicesMap } from './components/LocalServicesMap';
import { PrivacyPage } from './components/PrivacyPage';
import { ConsentModal } from './components/ConsentModal';
import { AuthScreen } from './components/AuthScreen';
import { ViewType, DocumentTask, ChatSession, GeneratedDocument, User, NotificationPreferences, Course, CATEGORIES, Post } from './types';
import { analytics } from './services/analyticsService';
import { communityService } from './services/communityService';
import { AdminHub } from './components/AdminHub';
import { adminService } from './services/adminService';
import { MIRA_LOGO } from './constants';
import { Bell, X, Info, Bot, Globe, ChevronDown, LayoutDashboard, LogOut, Sparkles, MessageCircle, ArrowLeft, Users } from 'lucide-react';
import { t } from './utils/translations';

const INITIAL_NOTIFS: NotificationPreferences = {
  OFFICIAL_AIMA: true,
  LEGAL_CHANGES: true,
  DOC_EXPIRATION: true,
  JOB_MATCHES: true,
  COMMUNITY_REPUTATION: true,
  MAP_URGENCY: true,
  MIRA_INSIGHTS: true,
  SOCIAL_CONNECT: true
};



const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [showConsent, setShowConsent] = useState(false);
  const [points, setPoints] = useState(0);

  const [language, setLanguage] = useState(() => {
    const navLang = navigator.language?.split('-')[0]?.toUpperCase();
    return ['PT', 'EN', 'ES', 'FR'].includes(navLang) ? navLang : 'EN';
  });
  const [showLangMenu, setShowLangMenu] = useState(false);

  const [tasks, setTasks] = useState<DocumentTask[]>([]);
  const [chatSessions] = useState<ChatSession[]>([]);
  const [docDrafts, setDocDrafts] = useState<any[]>([]);
  const [docHistory, setDocHistory] = useState<GeneratedDocument[]>([]);
  const [savedPostsIds, setSavedPostsIds] = useState<Set<string>>(new Set());
  const [courses, setCourses] = useState<Course[]>([]);
  const [masterPosts, setMasterPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('mira_community_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('mira_community_posts', JSON.stringify(masterPosts));
  }, [masterPosts]);

  // DB Sync for Posts
  useEffect(() => {
    if (user && user.id) {
      communityService.fetchPosts().then(dbPosts => {
        if (dbPosts && dbPosts.length > 0) {
          setMasterPosts(dbPosts);
        }
      });
    }
  }, [user?.id]);

  useEffect(() => {
    supabase.from('courses').select('*').then(({ data }) => {
      if (data && data.length > 0) {
        setCourses(data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category as any,
          type: item.type,
          duration: item.duration,
          image: item.image_url || 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&q=80',
          link: item.link || undefined
        })));
      }
    });
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Fetch public profile with timeout to bypass potential RLS infinite recursion
        const fetchProfile = supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const timeout = new Promise<{ data: any, error: any }>((resolve) => setTimeout(() => resolve({ data: null, error: new Error('Timeout') }), 2000));
        const { data: profile, error } = await Promise.race([fetchProfile, timeout]);

        if (error) {
          console.error('Erro ao buscar perfil:', error);
        }

        let u: User;
        if (profile && !error) {
          u = {
            id: profile.id,
            email: session.user.email || '',
            name: profile.name || session.user.user_metadata?.name || 'Usuário Novo',
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
          };

          // Sync email if missing
          if (!profile.email && session.user.email) {
            supabase.from('profiles')
              .update({ email: session.user.email })
              .eq('id', profile.id)
              .then(() => console.log('Email sincronizado no App'));
          }
        } else {
          const emailStr = session.user.email || '';
          const isAdmin = emailStr.includes('amandasabreu');
          const defaultName = isAdmin ? 'Amanda Admin' : (session.user.user_metadata?.name || 'Usuário Comunidade');

          supabase.from('profiles').insert([{
            id: session.user.id,
            name: defaultName,
            email: emailStr,
            role: isAdmin ? 'admin' : 'member'
          }]).then(() => console.log('Criou profile fallback a partir do App'));

          u = {
            id: session.user.id,
            email: emailStr,
            name: defaultName,
            role: isAdmin ? 'admin' : 'member',
            reputation: 500,
            trustLevel: 'Curador Comunitário',
            isVerified: true,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isAdmin ? 'Admin' : 'User')}`,
            bio: '', nationality: '', ageRange: '', location: '', mainChallenge: '', isMuted: false, registrationDate: new Date().toISOString()
          };
        }

        setUser(u);
        if (u.role === 'admin') setCurrentView(ViewType.ADMIN_HUB);
        else {
          const consentGiven = localStorage.getItem('mira_consent_given');
          if (consentGiven !== 'true') setShowConsent(true);
        }
      } else {
        setUser(null);
      }
    });

    const savedIds = localStorage.getItem('mira_saved_posts');
    if (savedIds) setSavedPostsIds(new Set(JSON.parse(savedIds)));
    const savedCourses = localStorage.getItem('mira_courses');
    if (savedCourses) setCourses(JSON.parse(savedCourses));

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const handleLogin = (newUser: User) => {
    // Opcional: Ainda usado se AuthScreen quiser forçar o set de usuário antes do onAuthStateChange
    setUser(newUser);
    if (newUser.role === 'admin') setCurrentView(ViewType.ADMIN_HUB);
    else {
      const consentGiven = localStorage.getItem('mira_consent_given');
      if (consentGiven !== 'true') setShowConsent(true);
    }
  };

  const handleLogoutAction = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView(ViewType.HOME);
  };

  const handleToggleSavePost = (postId: string) => {
    const newSet = new Set(savedPostsIds);
    if (newSet.has(postId)) newSet.delete(postId);
    else { newSet.add(postId); analytics.track('vote_cast', user?.id || 'anon', 'SavePost', { postId }); }
    setSavedPostsIds(newSet);
    localStorage.setItem('mira_saved_posts', JSON.stringify(Array.from(newSet)));
  };

  const handleAddCourse = (course: Course) => {
    const updated = [course, ...courses];
    setCourses(updated);
    localStorage.setItem('mira_courses', JSON.stringify(updated));
  };

  const handleAddMultipleCourses = (newCourses: Course[]) => {
    const updated = [...newCourses, ...courses];
    setCourses(updated);
    localStorage.setItem('mira_courses', JSON.stringify(updated));
  };

  const handleAcceptConsent = () => {
    localStorage.setItem('mira_consent_given', 'true');
    setShowConsent(false);
  };

  const renderView = () => {
    if (!user) return null;
    const lowerLang = language.toLowerCase().substring(0, 2);
    switch (currentView) {
      case ViewType.HOME: return <HomeView user={user} onViewChange={setCurrentView} language={language} onLogout={handleLogoutAction} />;
      case ViewType.COMMUNITY: return <CommunityView language={language} user={user} onViewChange={setCurrentView} onEarnPoints={setPoints} masterPosts={masterPosts} setMasterPosts={setMasterPosts} savedPostsIds={savedPostsIds} onToggleSavePost={handleToggleSavePost} />;
      case ViewType.ASSISTANT: return <AssistantView language={language} />;
      case ViewType.JOBS: return <JobBoard language={language} isAdmin={user.role === 'admin'} />;
      case ViewType.MAP: return <LocalServicesMap language={language} />;
      case ViewType.LEARNING: return <LearningHub courses={courses} onNavigateToChat={() => setCurrentView(ViewType.ASSISTANT)} onEarnPoints={() => { }} onNavigateToContact={() => { }} language={language} />;
      case ViewType.DOCUMENTS: return <DocumentAssistant tasks={tasks} chatSessions={chatSessions} drafts={docDrafts} setDrafts={setDocDrafts} history={docHistory} addToHistory={(doc) => setDocHistory([doc, ...docHistory])} onOpenSession={() => { }} language={language} onEarnPoints={() => { }} onToggleTask={() => { }} onViewChange={setCurrentView} />;
      case ViewType.PROFILE: return <GamificationProfile user={user} onUpdateUser={setUser} helps={14} impact={342 + points} badges={['Resiliente']} activitiesCount={142} savedCount={savedPostsIds.size} followingCount={56} language={lowerLang} onNavigateToPost={() => setCurrentView(ViewType.COMMUNITY)} onViewChange={setCurrentView} createdPosts={masterPosts.filter(p => p.authorId === user.id)} onDeletePost={async (id) => { if (!window.confirm("Certeza que queres eliminar este post?")) return; setMasterPosts(prev => prev.filter(p => p.id !== id)); try { const { communityService } = await import('./services/communityService'); await communityService.deletePost(id, user.id); } catch (e) { } }} savedPosts={masterPosts.filter(p => savedPostsIds.has(p.id))} onLogout={handleLogoutAction} />;
      case ViewType.DASHBOARD: return <DashboardView masterPosts={masterPosts} onUpdatePosts={setMasterPosts} totalOfficialDocs={6} onAddCourse={handleAddCourse} onAddMultipleCourses={handleAddMultipleCourses} onLogout={handleLogoutAction} onDeleteAllUsers={() => {
        // In a real app, this would call an API. Here we simulate by clearing local storage and resetting state
        localStorage.removeItem('mira_user');
        localStorage.removeItem('mira_consent_given');
        alert("Base de dados de utilizadores limpa com sucesso (Simulação).");
      }} />;
      case ViewType.ADMIN_HUB: return <AdminHub onBack={() => setCurrentView(ViewType.DASHBOARD)} />;
      case ViewType.PRIVACY: return <PrivacyPage />;
      default: return <HomeView user={user} onViewChange={setCurrentView} language={language} />;
    }
  };

  if (!user) return <AuthScreen onLogin={handleLogin} language={language} setLanguage={setLanguage} />;

  const isAdmin = user.role === 'admin';

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-slate-950' : 'bg-white md:bg-slate-50'} flex flex-col md:flex-row font-['Plus_Jakarta_Sans'] overflow-hidden`}>
      {showConsent && <ConsentModal onAccept={handleAcceptConsent} onDecline={() => setShowConsent(false)} />}

      <header className={`${isAdmin ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white/95 border-b shadow-sm'} backdrop-blur-md sticky top-0 z-[150] px-6 py-4 flex items-center justify-between transition-all duration-300`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentView(isAdmin ? ViewType.ADMIN_HUB : ViewType.HOME)}>
          <div className="w-10 h-10 shadow-glow transition-transform group-hover:scale-110">{MIRA_LOGO}</div>
          <span className={`${isAdmin ? 'text-white' : 'text-slate-900'} font-black tracking-tighter text-2xl`}>MIRA</span>
        </div>

        <div className="flex items-center gap-6">
          {!isAdmin && currentView !== ViewType.HOME && (
            <button
              onClick={() => setCurrentView(ViewType.HOME)}
              className={`p-2.5 rounded-2xl flex items-center gap-2 transition-all ${isAdmin ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-400 hover:text-mira-orange hover:bg-mira-orange-pastel'}`}
              title="Voltar para Início"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          {isAdmin && currentView !== ViewType.ADMIN_HUB && (
            <button onClick={() => setCurrentView(ViewType.ADMIN_HUB)} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"><Users size={16} /> Admin Hub</button>
          )}
          <div className="relative ml-2">
            <button onClick={() => setShowLangMenu(!showLangMenu)} className={`p-2.5 rounded-2xl flex items-center gap-2 transition-all ${isAdmin ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-400'}`}>
              <Globe size={18} /><span className="text-[10px] font-black">{language}</span><ChevronDown size={12} className={showLangMenu ? 'rotate-180' : ''} />
            </button>
            {showLangMenu && (
              <div className="absolute top-full right-0 mt-3 w-32 bg-white rounded-2xl shadow-2xl border p-2 z-[200] animate-in slide-in-from-top-2">
                {['PT', 'EN', 'ES', 'FR'].map(l => <button key={l} onClick={() => { setLanguage(l); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${language === l ? 'bg-mira-orange text-white' : 'text-slate-600 hover:bg-slate-50'}`}>{l}</button>)}
              </div>
            )}
          </div>
          <button onClick={handleLogoutAction} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-sm ${isAdmin ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-white text-red-500 border border-red-50 hover:bg-red-50'}`} title="Sair da Plataforma">
            <LogOut size={16} /><span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Floating Chat Mira Button - always visible on the right side corner */}
      <button
        onClick={() => setCurrentView(ViewType.ASSISTANT)}
        className="fixed bottom-24 right-6 md:right-8 lg:right-10 z-[9999] w-16 h-16 bg-gradient-to-br from-mira-orange via-orange-500 to-red-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(249,115,22,0.6)] active:scale-90 transition-all hover:scale-110 group animate-pulse"
      >
        <Bot size={32} className="text-white group-hover:rotate-12 transition-transform drop-shadow-md" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-mira-green rounded-full border-2 border-white shadow-sm"></div>
        <div className="absolute -top-3 right-full mr-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl">
          Dúvidas? Pergunte ao MIRA
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 rotate-45 transform origin-center"></div>
        </div>
      </button>


      <div className={`fixed bottom-0 left-0 right-0 z-[200] md:relative md:bottom-auto transition-transform duration-300`}>
        <Navigation currentView={currentView} onViewChange={setCurrentView} language={language} />
      </div>

      <main className="flex-1 md:ml-24 overflow-hidden flex flex-col h-[calc(100vh-64px)] md:h-screen">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-5xl mx-auto h-full relative">{renderView()}</div>
        </div>
      </main>

      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default App;
