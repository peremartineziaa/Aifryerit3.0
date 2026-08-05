import React from 'react';
import { Recipe } from '../types';
import { Flame, Thermometer, Clock, Plus, Check, Heart, ShieldCheck, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onAddToMenu?: (recipe: Recipe) => void;
  onAddToShopping?: (recipe: Recipe) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  isAddedToShopping?: boolean;
  onStartCooking?: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  onAddToMenu,
  onAddToShopping,
  isFavorite = false,
  onToggleFavorite,
  isAddedToShopping = false,
  onStartCooking,
}) => {
  return (
    <div className="group bg-white border border-slate-100/90 rounded-[28px] p-4 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 flex flex-col h-full">
      
      {/* Recipe Image & Overlay Badges */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden cursor-pointer shadow-inner mb-3" onClick={() => onSelect(recipe)}>
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

        {/* Bonus Badge */}
        {recipe.isBonus1Dinner && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>BONUS 1: 21 CENAS</span>
          </div>
        )}
        {recipe.isBonus2Dessert && (
          <div className="absolute top-3 left-3 bg-pink-500 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>BONUS 2: POSTRE FIT</span>
          </div>
        )}

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-rose-500 text-white scale-110 shadow-md'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        )}

        {/* Bottom Airfryer Settings Pill Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1 text-[11px] font-bold text-white">
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>{recipe.temperatureCelsius}°C</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1 bg-green-500 text-white px-2.5 py-1 rounded-xl font-extrabold shadow-sm">
            <Flame className="w-3.5 h-3.5" />
            <span>{recipe.calories} kcal</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {recipe.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 
            onClick={() => onSelect(recipe)} 
            className="text-base font-extrabold text-slate-900 hover:text-green-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {recipe.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Nutrition Macros Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-1.5 text-center bg-slate-50 p-2 rounded-2xl border border-slate-100 mb-3 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Proteína</span>
              <span className="font-extrabold text-green-600">{recipe.proteinGrams}g</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Carbos</span>
              <span className="font-bold text-slate-700">{recipe.carbsGrams}g</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Grasas</span>
              <span className="font-bold text-slate-700">{recipe.fatGrams}g</span>
            </div>
          </div>

          {/* Card Actions */}
          <div className="space-y-2">
            {onStartCooking && (
              <button
                onClick={() => onStartCooking(recipe)}
                className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all scale-101 hover:scale-102"
              >
                <ChefHat className="w-3.5 h-3.5 fill-current" />
                <span>COCINAR AHORA</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {onAddToMenu && (
                <button
                  onClick={() => onAddToMenu(recipe)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Al Menú</span>
                </button>
              )}

              {onAddToShopping && (
                <button
                  onClick={() => onAddToShopping(recipe)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl text-xs font-bold border transition-all ${
                    isAddedToShopping
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'bg-green-500 hover:bg-green-600 text-white border-transparent shadow-sm'
                  }`}
                >
                  {isAddedToShopping ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isAddedToShopping ? 'En Compra' : 'A Compra'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
