import React, { useState } from 'react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { Heart, Sparkles, Utensils } from 'lucide-react';

interface FavoritesViewProps {
  recipes: Recipe[];
  favoriteIds: string[];
  onToggleFavorite: (recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onAddToMenu: (recipe: Recipe) => void;
  onAddToShopping: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  userRole?: 'admin' | 'plan_29' | 'free';
  onOpenCheckout?: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  recipes,
  favoriteIds,
  onToggleFavorite,
  onSelectRecipe,
  onAddToMenu,
  onAddToShopping,
  onStartCooking,
  userRole = 'free',
  onOpenCheckout,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id));

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'cenas', label: '🌙 Cenas Ligeras' },
    { id: 'postres', label: '🍰 Postres Fit' },
    { id: 'desayunos', label: '☕ Desayunos' },
    { id: 'comidas', label: '☀️ Comidas' },
  ];

  const filteredFavorites = favoriteRecipes.filter((r) => {
    if (categoryFilter === 'all') return true;
    return r.category === categoryFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
            <span>RECETAS GUARDADAS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ❤️ Mis Favoritos
          </h1>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            Tu colección personal de platos favoritos para Airfryer. Planifica y cocina en un clic.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-none pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === c.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid or Empty State */}
      {filteredFavorites.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-[32px] p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No tienes favoritos guardados en esta categoría</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Pulsa en el corazón ❤️ de cualquier receta para guardarla aquí y tenerla siempre a mano.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
              onAddToMenu={onAddToMenu}
              onAddToShopping={onAddToShopping}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onStartCooking={onStartCooking}
            />
          ))}
        </div>
      )}

    </div>
  );
};
