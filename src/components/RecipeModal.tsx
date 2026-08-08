import React, { useState } from 'react';
import { Recipe } from '../types';
import { 
  X, 
  Flame, 
  Thermometer, 
  Clock, 
  Users, 
  Sparkles, 
  Plus, 
  Check, 
  ShoppingCart, 
  Calendar,
  ChefHat,
  Share2,
  Heart
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onAddToMenu: (recipe: Recipe) => void;
  onAddToShopping: (recipe: Recipe) => void;
  isAddedToShopping?: boolean;
  onStartCooking?: (recipe: Recipe) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  onAddToMenu,
  onAddToShopping,
  isAddedToShopping = false,
  onStartCooking,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [servings, setServings] = useState<number>(recipe?.servings || 1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!recipe) return null;

  const multiplier = servings / recipe.servings;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-[32px] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Image & Actions */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Close & Favorite Button Header */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg border ${
                  isFavorite
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white/80 text-slate-700 hover:text-rose-500 border-white/40'
                }`}
                title="♡ Guardar en Favoritos"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Tags Overlay */}
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-black bg-orange-500 text-white px-3 py-1 rounded-full shadow">
                {recipe.category.toUpperCase()}
              </span>
              {recipe.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase mb-1">Temperatura</span>
              <div className="flex items-center gap-1 text-amber-600 font-black text-lg">
                <Thermometer className="w-5 h-5" />
                <span>{recipe.temperatureCelsius}°C</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase mb-1">Tiempo Total</span>
              <div className="flex items-center gap-1 text-orange-600 font-black text-lg">
                <Clock className="w-5 h-5" />
                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase mb-1">Calorías</span>
              <div className="flex items-center gap-1 text-emerald-600 font-black text-lg">
                <Flame className="w-5 h-5" />
                <span>{Math.round(recipe.calories * multiplier)} kcal</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase mb-1">Proteína</span>
              <div className="flex items-center gap-1 text-sky-600 font-black text-lg">
                <ChefHat className="w-5 h-5" />
                <span>{Math.round(recipe.proteinGrams * multiplier)}g</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {recipe.description}
          </p>

          {/* Servings Adjuster */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-bold text-slate-800">Ajustar Raciones:</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-black flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="font-extrabold text-sm text-slate-900 min-w-[20px] text-center">
                {servings} {servings === 1 ? 'ración' : 'raciones'}
              </span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-black flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Airfryer Pro Tip */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl space-y-1">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Consejo AirFryFit:</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              {recipe.airfryerTip}
            </p>
          </div>

          {/* Ingredients Section */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span>Ingredientes ({servings} {servings === 1 ? 'ración' : 'raciones'}):</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center justify-between bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100 text-xs">
                  <span className="text-slate-800 font-medium">{ing.name}</span>
                  <span className="font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                    {Math.round(ing.amount * multiplier * 10) / 10} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Step by Step */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <ChefHat className="w-4 h-4 text-orange-600" />
              <span>Preparación Paso a Paso:</span>
            </h3>
            <div className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white font-extrabold shrink-0 flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed mt-0.5 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
          {onStartCooking && (
            <button
              onClick={() => {
                onStartCooking(recipe);
                onClose();
              }}
              className="flex-1 px-4 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-green-500/20 transition-all scale-102 hover:scale-105"
            >
              <ChefHat className="w-4 h-4" />
              <span>🔥 Cocinar ahora</span>
            </button>
          )}

          <button
            onClick={() => {
              onAddToMenu(recipe);
              onClose();
            }}
            className="flex-1 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>📅 Añadir al menú</span>
          </button>

          <button
            onClick={() => onAddToShopping(recipe)}
            className={`flex-1 px-4 py-3 rounded-full font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isAddedToShopping
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>🛒 {isAddedToShopping ? 'En la compra' : 'Añadir a compra'}</span>
          </button>

          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`px-4 py-3 rounded-full text-xs font-black flex items-center justify-center gap-1.5 border transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span>♡ {isFavorite ? 'Guardada' : 'Guardar'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
