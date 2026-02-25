
import React, { useState, useMemo } from 'react';
import { 
  Heart, MessageCircle, MoreHorizontal, 
  CheckCircle2, Search, Plus, X, 
  ImageIcon, Bookmark, ThumbsUp, ThumbsDown, 
  ChevronDown, Send, AlertTriangle, Trash2, Filter, Loader2,
  Share2, Flag, UserPlus, Info, Reply, CheckCircle, ShieldX, ShieldAlert, Star, Users, Zap, Shield
} from 'lucide-react';
import { Post, UNIFIED_CATEGORIES, User, UnifiedCategory, Comment, ViewType } from '../types';
import { analytics } from '../services/analyticsService';
import { t } from '../utils/translations';

interface CommunityViewProps {
  language: string;
  user: User;
  onViewChange: (view: ViewType) => void;
  onEarnPoints: (points: number) => void;
  masterPosts: Post[];
  setMasterPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  savedPostsIds: Set<string>;
  onToggleSavePost: (postId: string) => void;
}

const THEMED_IMAGES = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054db0db644?w=800&q=80',
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80'
];

const CommunityView: React.FC<CommunityViewProps> = ({ 
  language, user, onViewChange, onEarnPoints, masterPosts, setMasterPosts, savedPostsIds, onToggleSavePost 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchFilter, setSearchFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<UnifiedCategory | ''>('');
  const [selectedImage, setSelectedImage] = useState(THEMED_IMAGES[0]);
  const [commentingOn, setCommentingOn] = useState<{postId: string, replyToName?: string} | null>(null);
  const [newComment, setNewComment] = useState('');
  const [userVotes, setUserVotes] = useState<Record<string, 'true' | 'false'>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [reportingItem, setReportingItem] = useState<{postId: string, commentId?: string} | null>(null);
  const [reportForm, setReportForm] = useState({ name: user.name || '', email: user.email || '', reason: '' });

  const filteredPosts = useMemo(() => {
    let result = activeCategory === 'Todos' ? masterPosts : masterPosts.filter(p => p.category === activeCategory);
    if (searchFilter.trim()) {
        const term = searchFilter.toLowerCase();
        result = result.filter(p => p.content.toLowerCase().includes(term) || p.authorName.toLowerCase().includes(term));
    }
    return result;
  }, [activeCategory, masterPosts, searchFilter]);

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !selectedCategory) return;
    const newPost: Post = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar || '',
      title: 'Post Comunitário',
      content: newPostContent,
      category: selectedCategory,
      tags: [],
      likes: 0,
      comments: [],
      isVerified: false,
      isFraudWarning: false,
      timestamp: 'Agora',
      reports: 0,
      urgency: 0,
      validationStatus: 'pending',
      usefulVotes: 0,
      fakeVotes: 0,
      reviewVotes: 0,
      backgroundImage: selectedImage
    };
    setMasterPosts([newPost, ...masterPosts]);
    setShowCreateModal(false);
    setNewPostContent('');
    setSelectedCategory('');
    onEarnPoints(10);
    analytics.track('post_created', user.id, selectedCategory);
  };

  const handleLike = (postId: string, commentId?: string) => {
    const isLiked = commentId ? likedComments.has(commentId) : likedPosts.has(postId);
    if (isLiked) return; 
    setMasterPosts(prev => prev.map(p => {
        if (p.id !== postId) return p;
        if (!commentId) return { ...p, likes: p.likes + 1 };
        return { ...p, comments: p.comments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c) };
    }));
    if (commentId) setLikedComments(prev => new Set(prev).add(commentId));
    else setLikedPosts(prev => new Set(prev).add(postId));
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !commentingOn) return;
    const comment: Comment = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      content: commentingOn.replyToName ? `@${commentingOn.replyToName} ${newComment}` : newComment,
      timestamp: 'Agora',
      likes: 0
    };
    setMasterPosts(prev => prev.map(p => {
        if (p.id !== commentingOn.postId) return p;
        return { ...p, comments: [...p.comments, comment] };
    }));
    setCommentingOn(null);
    setNewComment('');
    onEarnPoints(2);
    analytics.track('comment_created', user.id);
  };

  const handleFactVote = (postId: string, isTrue: boolean) => {
      const currentVote = userVotes[postId];
      const newVote = isTrue ? 'true' : 'false';
      if (currentVote === newVote) return; 
      setMasterPosts(prev => prev.map(p => {
          if (p.id !== postId) return p;
          let useful = p.usefulVotes;
          let fake = p.fakeVotes;
          if (currentVote === 'true') useful--;
          if (currentVote === 'false') fake--;
          if (newVote === 'true') useful++;
          if (newVote === 'false') fake++;
          return { ...p, usefulVotes: useful, fakeVotes: fake };
      }));
      setUserVotes(prev => ({ ...prev, [postId]: newVote }));
      onEarnPoints(5);
  };

  const handleReportSubmit = () => {
    if (!reportForm.reason.trim() || !reportForm.name || !reportForm.email) {
      alert("Preencha todos os campos da denúncia.");
      return;
    }
    alert(`Denúncia enviada com sucesso para análise pela equipa MIRA.`);
    if (reportingItem) {
      setMasterPosts(prev => prev.map(p => {
          if (p.id !== reportingItem.postId) return p;
          if (!reportingItem.commentId) return { ...p, reports: p.reports + 1 };
          return p;
      }));
    }
    setReportingItem(null);
    setReportForm({ name: user.name || '', email: user.email || '', reason: '' });
  };

  const openMemberProfile = (authorId: string, authorName: string, authorAvatar: string) => {
      setSelectedMember({ 
          id: authorId, 
          name: authorName, 
          avatar: authorAvatar, 
          reputation: Math.floor(Math.random() * 800) + 150, 
          trustLevel: authorId === 'a1' ? 'Curador Comunitário' : 'Colaborador', 
          bio: 'Membro ativo da rede MIRA focado em integração e solidariedade em Portugal.',
          isVerified: authorId === 'a1'
      });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative font-['Plus_Jakarta_Sans']">
      {/* Perfil Popup Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in zoom-in-95 duration-300">
            <div className="bg-white w-full max-w-sm rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all"><X size={20}/></button>
                
                <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-[2.8rem] p-1 bg-gradient-to-tr from-mira-orange via-mira-yellow to-mira-blue shadow-2xl">
                        <img src={selectedMember.avatar} className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white" alt="" referrerPolicy="no-referrer" />
                    </div>
                    {selectedMember.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg">
                            <CheckCircle2 size={24} className="text-mira-blue fill-mira-blue" />
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-2">{selectedMember.name}</h3>
                <p className="text-[10px] font-black text-mira-orange uppercase tracking-[0.2em] mb-6">{selectedMember.trustLevel}</p>
                
                <div className="grid grid-cols-3 gap-3 w-full mb-8">
                    <div className="bg-slate-50 p-4 rounded-3xl flex flex-col items-center shadow-inner">
                        <Zap size={18} className="text-mira-orange mb-1"/>
                        <span className="text-sm font-black">{selectedMember.reputation}</span>
                        <span className="text-[7px] font-black text-slate-400 uppercase">Impacto</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-3xl flex flex-col items-center shadow-inner">
                        <Heart size={18} className="text-red-500 mb-1"/>
                        <span className="text-sm font-black">42</span>
                        <span className="text-[7px] font-black text-slate-400 uppercase">Ajudas</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-3xl flex flex-col items-center shadow-inner">
                        <Shield size={18} className="text-mira-blue mb-1"/>
                        <span className="text-sm font-black">100%</span>
                        <span className="text-[7px] font-black text-slate-400 uppercase">Trust</span>
                    </div>
                </div>

                <p className="text-xs text-slate-500 font-bold leading-relaxed mb-10 italic">"{selectedMember.bio}"</p>

                <div className="flex gap-4 w-full">
                    <button onClick={() => setSelectedMember(null)} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all">Seguir Membro</button>
                </div>
            </div>
        </div>
      )}

      <div className="bg-white px-6 pt-8 pb-4 space-y-4 border-b border-slate-100 z-30 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <button onClick={() => onViewChange(ViewType.PROFILE)} className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-mira-orange-pastel shadow-sm active:scale-90 transition-transform">
                <img src={user.avatar} className="w-full h-full object-cover" alt="Perfil" referrerPolicy="no-referrer" />
             </button>
             <div><h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">COMUNIDADE MIRA</h2></div>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="w-12 h-12 bg-gradient-to-br from-mira-orange to-red-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 active:scale-90 transition-all">
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="space-y-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-mira-orange transition-colors" size={18} />
            <input type="text" placeholder="Pesquisar..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:border-mira-orange outline-none transition-all shadow-inner" />
          </div>
          <div className="relative group">
             <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="w-full pl-6 pr-10 py-3.5 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:border-mira-orange shadow-sm transition-all">
                <option value="Todos">Todas as Categorias</option>
                {UNIFIED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
             <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" size={16} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-10 pb-48">
        {filteredPosts.length > 0 ? filteredPosts.map(post => {
          const isPostLiked = likedPosts.has(post.id);
          const isPostSaved = savedPostsIds.has(post.id);
          const fontSizeClass = post.content.length < 80 ? 'text-2xl' : post.content.length < 160 ? 'text-lg' : 'text-sm';
          return (
            <div key={post.id} className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-slate-100 group transition-all hover:shadow-2xl">
              <div className="h-[480px] relative overflow-hidden">
                 <img src={post.backgroundImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Post Visual" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60"></div>
                 
                 {/* Metadata Header - Nome menor que categoria como solicitado */}
                 <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                    <div onClick={() => openMemberProfile(post.authorId, post.authorName, post.authorAvatar)} className="flex items-center gap-2.5 bg-white/10 backdrop-blur-2xl p-1.5 pr-4 rounded-full border border-white/20 cursor-pointer active:scale-95 shadow-2xl group/author">
                      <img src={post.authorAvatar} className="w-8 h-8 rounded-full border border-white/40 shadow-sm" alt="" referrerPolicy="no-referrer" />
                      <div className="text-white">
                          <p className="text-[8px] font-black uppercase tracking-widest leading-none opacity-90 group-hover/author:opacity-100">{post.authorName}</p>
                      </div>
                    </div>
                    <span className="bg-mira-orange text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/10">{post.category}</span>
                 </div>

                 {/* Post Content */}
                 <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
                    <div className="bg-black/40 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl max-w-[340px] w-full text-center max-h-[340px] flex flex-col justify-center transform transition-transform group-hover:-translate-y-1">
                      <div className="overflow-y-auto no-scrollbar">
                        <p className={`font-black text-white leading-tight tracking-tight uppercase break-words drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${fontSizeClass}`}>{post.content}</p>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Interaction Area - Diagramação Reformulada */}
              <div className="p-8 space-y-8">
                <div className="flex gap-3">
                  <button onClick={() => handleFactVote(post.id, true)} className={`flex-1 py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all border-2 min-h-[56px] ${userVotes[post.id] === 'true' ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-100' : 'bg-white text-emerald-500 border-emerald-50 hover:bg-emerald-50'}`}>
                      <CheckCircle size={16} /> <span className="truncate">VERDADE ({post.usefulVotes})</span>
                  </button>
                  <button onClick={() => handleFactVote(post.id, false)} className={`flex-1 py-4.5 rounded-[1.5rem] flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all border-2 min-h-[56px] ${userVotes[post.id] === 'false' ? 'bg-red-500 text-white border-red-500 shadow-xl shadow-red-100' : 'bg-white text-red-500 border-red-50 hover:bg-red-50'}`}>
                      <ShieldX size={16} /> <span className="truncate">FALSO ({post.fakeVotes})</span>
                  </button>
                </div>

                <div className="flex items-center justify-between px-2 pt-2 gap-2">
                  <div className="flex items-center justify-between flex-1">
                    <button onClick={() => handleLike(post.id)} className={`flex flex-col items-center gap-1.5 group transition-all ${isPostLiked ? 'cursor-default' : 'active:scale-90'}`}>
                      <div className={`p-4 rounded-2xl transition-all ${isPostLiked ? 'bg-mira-orange text-white shadow-lg shadow-orange-200' : 'bg-slate-50 text-slate-300 group-hover:bg-red-50'}`}>
                        <Heart size={22} className={isPostLiked ? 'fill-white text-white' : ''} />
                      </div>
                      <span className="text-[9px] font-black text-slate-800 tracking-tighter">{post.likes}</span>
                    </button>

                    <button onClick={() => setCommentingOn({postId: post.id})} className="flex flex-col items-center gap-1.5 group active:scale-90 transition-all">
                      <div className="p-4 bg-slate-50 rounded-2xl text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                        <MessageCircle size={22} />
                      </div>
                      <span className="text-[9px] font-black text-slate-800 tracking-tighter">{post.comments.length}</span>
                    </button>

                    <button 
                      onClick={() => onToggleSavePost(post.id)} 
                      className="flex flex-col items-center gap-1.5 group active:scale-90 transition-all"
                      title="Salvar Post"
                    >
                      <div className={`p-4 rounded-2xl transition-all ${isPostSaved ? 'bg-mira-blue text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-300'}`}>
                        <Bookmark size={22} className={isPostSaved ? 'fill-white' : ''} />
                      </div>
                      <span className="text-[9px] font-black text-slate-800 tracking-tighter opacity-0">.</span>
                    </button>
                    
                    <button 
                      onClick={() => setReportingItem({postId: post.id})} 
                      className="flex flex-col items-center gap-1.5 group active:scale-90 transition-all relative -top-2"
                      title="Alerta de Segurança"
                    >
                      <div className={`p-4 rounded-2xl transition-all ${post.reports > 0 ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500'}`}>
                        <ShieldAlert size={22} />
                      </div>
                      <span className="text-[9px] font-black text-slate-800 tracking-tighter opacity-0">.</span>
                    </button>
                  </div>
                </div>

                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-5 border-t border-slate-50 pt-8">
                     {post.comments.map(comment => (
                       <div key={comment.id} className="flex gap-4 items-start group/comment">
                          <img src={comment.authorAvatar} className="w-11 h-11 rounded-2xl border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-all shrink-0" onClick={() => openMemberProfile(comment.authorId, comment.authorName || 'Membro', comment.authorAvatar || '')} alt="" referrerPolicy="no-referrer" />
                          <div className="flex-1 bg-slate-50/70 p-5 rounded-[1.8rem] rounded-tl-none border border-slate-100 relative max-w-full overflow-hidden shadow-sm hover:bg-white hover:shadow-md transition-all">
                              <div className="flex justify-between items-center mb-1.5">
                                <p className="text-xs font-black text-slate-900 uppercase tracking-tight truncate">{comment.authorName}</p>
                                <button 
                                  onClick={() => setReportingItem({postId: post.id, commentId: comment.id})} 
                                  className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                                  title="Denunciar Comentário"
                                >
                                  <ShieldAlert size={14} />
                                </button>
                              </div>
                              <p className="text-sm text-slate-700 font-medium leading-relaxed break-words whitespace-pre-line">{comment.content}</p>
                              <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-200/40">
                                  <button onClick={() => handleLike(post.id, comment.id)} className={`flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-400 hover:text-red-500 transition-colors ${likedComments.has(comment.id) ? 'text-red-500 cursor-default' : ''}`}><Heart size={12} className={comment.likes > 0 ? 'fill-red-500 text-red-500' : ''} /> {comment.likes}</button>
                                  <button onClick={() => setCommentingOn({postId: post.id, replyToName: comment.authorName})} className="flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-500 transition-colors"><Reply size={12} /> RESPONDER</button>
                                  <span className="text-[8px] text-slate-300 ml-auto font-bold uppercase tracking-tighter">{comment.timestamp}</span>
                              </div>
                          </div>
                       </div>
                     ))}
                  </div>
                )}
              </div>
            </div>
          );
        }) : <div className="flex flex-col items-center justify-center py-40 opacity-20"><Search size={64} className="mb-4" /><p className="text-xs font-black uppercase tracking-[0.3em]">Nenhum post encontrado</p></div>}
      </div>

      {/* REPORT MODAL */}
      {reportingItem && (
        <div className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in zoom-in-95 duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative overflow-y-auto max-h-[90vh] no-scrollbar">
              <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                       <ShieldAlert size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Denunciar</h3>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{reportingItem.commentId ? 'Comentário sob suspeita' : 'Post sob suspeita'}</p>
                    </div>
                 </div>
                 <button onClick={() => setReportingItem(null)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"><X size={20}/></button>
              </div>
              <div className="space-y-4">
                 <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-2">
                    <p className="text-[9px] text-amber-800 font-bold uppercase leading-relaxed">A equipa de moderação do MIRA analisará este conteúdo para garantir a segurança da rede.</p>
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Seu Nome</label>
                    <input type="text" value={reportForm.name} onChange={e => setReportForm({...reportForm, name: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-100 outline-none" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Seu E-mail</label>
                    <input type="email" value={reportForm.email} onChange={e => setReportForm({...reportForm, email: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-100 outline-none" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Motivo da Denúncia</label>
                    <textarea placeholder="Explique o problema (Fraude, Ódio, Spam...)" value={reportForm.reason} onChange={e => setReportForm({...reportForm, reason: e.target.value})} className="w-full h-32 p-5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-100 outline-none resize-none shadow-inner" />
                 </div>
                 <button onClick={handleReportSubmit} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all mt-4 hover:bg-red-700">
                   Confirmar Denúncia
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* NEW POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in zoom-in-95 duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
             <div className="flex justify-between items-center p-8 border-b border-slate-50 shrink-0">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-mira-orange text-white rounded-xl flex items-center justify-center shadow-lg"><Plus size={24} strokeWidth={3} /></div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">NOVO POST</h3>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all"><X size={20}/></button>
             </div>
             <div className="flex-1 overflow-y-auto no-scrollbar p-8 pt-6 space-y-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] ml-2 flex items-center gap-2"><CheckCircle2 size={12}/> CATEGORIA</label>
                   <select required value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as UnifiedCategory)} className={`w-full pl-6 pr-12 py-4 bg-slate-50 border-2 rounded-2xl text-xs font-black uppercase tracking-[0.1em] appearance-none outline-none focus:bg-white focus:border-mira-orange transition-all ${!selectedCategory ? 'border-red-50' : 'border-transparent'}`}>
                     <option value="">Selecione o Apoio</option>
                     {UNIFIED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                   </select>
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2"><ImageIcon size={12}/> PERSONALIZAR FUNDO</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 h-48 overflow-y-auto no-scrollbar pr-2 rounded-2xl p-4 bg-slate-50 border border-slate-100 shadow-inner">
                        {THEMED_IMAGES.map((img, idx) => <button key={idx} onClick={() => setSelectedImage(img)} className={`aspect-square rounded-xl overflow-hidden border-4 transition-all ${selectedImage === img ? 'border-mira-orange scale-95 shadow-xl' : 'border-transparent opacity-80 hover:opacity-100'}`}><img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" /></button>)}
                    </div>
                </div>
                <div className="space-y-4 pb-10">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2"><MessageCircle size={12}/> MENSAGEM DO POST</label>
                   <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="w-full h-64 p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] text-sm font-bold focus:bg-white focus:border-mira-orange transition-all shadow-inner outline-none resize-none leading-relaxed text-slate-800" placeholder="Escreva aqui a sua dica, aviso ou ajuda..." />
                </div>
             </div>
             <div className="p-8 border-t border-slate-50 shrink-0 bg-white">
                <button onClick={handleCreatePost} disabled={!newPostContent.trim() || !selectedCategory} className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all disabled:opacity-20">
                  <Send size={20} /> Publicar na Rede MIRA
                </button>
             </div>
          </div>
        </div>
      )}

      {/* COMMENTING MODAL with Reply Mention logic */}
      {commentingOn && (
        <div className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-10 shadow-2xl animate-in slide-in-from-bottom-10 border-t-4 border-mira-orange">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                     {commentingOn.replyToName ? `Responder a @${commentingOn.replyToName}` : 'Novo Comentário'}
                 </h3>
                 <button onClick={() => setCommentingOn(null)} className="p-3 bg-slate-50 rounded-full"><X size={24} /></button>
              </div>
              <div className="space-y-6">
                 <textarea autoFocus value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-full h-40 p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] text-sm font-bold focus:bg-white focus:border-mira-orange outline-none shadow-inner resize-none" placeholder={commentingOn.replyToName ? "Escreva a sua resposta..." : "Partilhe a sua ajuda..."} />
                 <button onClick={handleAddComment} disabled={!newComment.trim()} className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-30">
                   <Send size={20} /> Publicar {commentingOn.replyToName ? 'Resposta' : 'Comentário'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CommunityView;
