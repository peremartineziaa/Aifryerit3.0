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
  CheckCircle, 
  ShieldAlert,
  MessageCircle
} from 'lucide-react';

export const TelegramCommunity: React.FC = () => {
  const [posts, setPosts] = useState<TelegramPost[]>(SAMPLE_TELEGRAM_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [likeCount, setLikeCount] = useState<Record<string, number>>({
    t1: 24, t2: 58, t3: 19, t4: 42
  });

  const handleLike = (id: string) => {
    setLikeCount((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const post: TelegramPost = {
      id: 'post_' + Date.now(),
      author: 'Tú (Usuario VIP)',
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
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>COMUNIDAD OFICIAL TELEGRAM DE AIRFRYFIT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Grupo de Apoyo & Recetas en Telegram
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Resuelve dudas de cocina al instante, comparte fotos de tus platos en Airfryer, recibe tips de la nutricionista y mantén la motivación al 100%.
            </p>
          </div>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all scale-102 hover:scale-105 shrink-0"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>Unirse a Telegram (1,480 Miembros)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Strategic Valuation Box: Por qué crear el Grupo de Telegram */}
      <div className="bg-white border border-slate-100/90 rounded-[28px] p-6 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
          <MessageCircle className="w-4 h-4 text-sky-600" />
          <span>Valoración Estratégica de la Creación del Grupo de Telegram:</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900 font-bold">Análisis de Impacto:</strong> Crear el grupo de Telegram para los usuarios de la APP a 29€ es una <strong className="text-green-600 font-bold">decisión de negocio sobresaliente</strong> por las siguientes razones:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1">
            <span className="font-extrabold text-sky-600 block">1. Retención & Constancia</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">Ver fotos diarias de otros usuarios motiva a cocinar en casa y evita el abandono de la app.</p>
          </li>
          <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1">
            <span className="font-extrabold text-amber-600 block">2. Prueba Social & Boca a Boca</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">Los usuarios satisfechos comparten sus transformaciones de peso atrayendo nuevos clientes orgánicos.</p>
          </li>
          <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1">
            <span className="font-extrabold text-green-600 block">3. Feedback Instantáneo</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">Permite conocer qué recetas gustan más para añadir semanalmente nuevos menús exclusivos.</p>
          </li>
        </ul>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-600" />
            <span>Feed en Vivo de la Comunidad:</span>
          </h3>
          <span className="text-xs text-green-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            148 usuarios activos ahora
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
