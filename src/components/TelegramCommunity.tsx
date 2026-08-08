import React, { useState } from 'react';
import { TelegramPost } from '../types';
import { SAMPLE_TELEGRAM_POSTS } from '../data/sampleData';
import { 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Users, 
  Sparkles, 
  ExternalLink, 
  Gift, 
  ShieldAlert,
  MessageCircle,
  Crown
} from 'lucide-react';

interface TelegramCommunityProps {
  hasTelegramAccess?: boolean;
  telegramGroupUrl?: string;
  onOpenCheckout?: () => void;
  userRole?: 'admin' | 'plan_29' | 'free';
}

export const TelegramCommunity: React.FC<TelegramCommunityProps> = ({
  hasTelegramAccess = true,
  telegramGroupUrl = 'https://t.me/+p3cyhFZzt6JkZDY8',
  onOpenCheckout,
  userRole = 'plan_29',
}) => {
  const [posts, setPosts] = useState<TelegramPost[]>(SAMPLE_TELEGRAM_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [likeCount, setLikeCount] = useState<Record<string, number>>({
    t1: 12, t2: 28, t3: 15, t4: 22
  });

  const handleLike = (id: string) => {
    setLikeCount((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const post: TelegramPost = {
      id: 'post_' + Date.now(),
      author: 'Tú (Miembro AirFryFit)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      time: 'Justo ahora',
      role: 'Miembro VIP',
      content: newPostContent.trim(),
      likes: 1,
    };

    setPosts([post, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-sky-600" />
              <span>REGALO EXCLUSIVO INCLUIDO CON TU ACCESO AIRFRYFIT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Grupo Oficial de Telegram
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Resuelve dudas de cocina al instante, comparte fotos de tus platos en Airfryer, recibe consejos directos de la nutricionista y mantén la motivación al 100%.
            </p>
          </div>

          {hasTelegramAccess ? (
            <a
              href={telegramGroupUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all scale-102 hover:scale-105 shrink-0"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Unirse al Grupo Oficial de Telegram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={onOpenCheckout}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-green-500 hover:from-sky-600 hover:to-green-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all scale-102 hover:scale-105 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Obtener Acceso Total (29 €)</span>
            </button>
          )}
        </div>
      </div>

      {/* Access Banner for Unpaid Users */}
      {!hasTelegramAccess && (
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-900 text-white rounded-[28px] p-6 shadow-xl border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500/30 text-sky-300 px-3 py-1 rounded-full border border-sky-400/30">
              🎁 TELEGRAM DE REGALO CON TU COMPRA
            </span>
            <h3 className="text-lg font-black text-white">
              Consigue el Grupo Oficial de Telegram por solo 29 €
            </h3>
            <p className="text-xs text-sky-100/80">
              Al adquirir tu plan de 29 €, recibes de regalo la invitación directa al grupo exclusivo con la nutricionista.
            </p>
          </div>

          <button
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shrink-0 transition-all"
          >
            <span>Obtener Plan (29 €)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strategic Valuation Box */}
      <div className="bg-white border border-slate-100/90 rounded-[28px] p-6 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
          <MessageCircle className="w-4 h-4 text-sky-600" />
          <span>Beneficios del Grupo Oficial de Telegram:</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900 font-bold">Acompañamiento Constante:</strong> Un espacio interactivo diseñado para potenciar tu avance y resolver dudas rápidamente.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1">
            <span className="font-extrabold text-sky-600 block">1. Soporte Directo</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">Pregunta tus dudas sobre tiempos de cocción o sustitución de ingredientes.</p>
          </li>
          <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1">
            <span className="font-extrabold text-amber-600 block">2. Recetas Exclusivas</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">Publicación periódica de nuevos platos e ideas rápidas para la freidora de aire.</p>
          </li>
          <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1">
            <span className="font-extrabold text-green-600 block">3. Comunidad Unida</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">Comparte fotos de tus resultados y descubre variaciones deliciosas.</p>
          </li>
        </ul>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-600" />
            <span>Feed de la Comunidad en Vivo:</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Canal Oficial AirFryFit
          </span>
        </div>

        {/* Create Post Box */}
        <form onSubmit={handleCreatePost} className="bg-white border border-slate-100/90 rounded-[24px] p-4 space-y-3 shadow-sm">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Comparte tu experiencia, fotos de tu freidora de aire o tus dudas con la comunidad..."
            rows={2}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar Mensaje</span>
            </button>
          </div>
        </form>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-slate-100/90 rounded-[28px] p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-xs">{post.author}</span>
                      <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                        {post.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{post.time}</span>
                  </div>
                </div>

                {post.recipeTag && (
                  <span className="text-[10px] font-extrabold bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    {post.recipeTag}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {post.content}
              </p>

              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden max-h-60 w-full shadow-sm">
                  <img src={post.imageUrl} alt="Plato" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-green-600 font-bold transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{likeCount[post.id] || post.likes} Me gusta</span>
                </button>

                <span className="text-[10px] text-slate-400 font-semibold">Comunidad AirFryFit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
