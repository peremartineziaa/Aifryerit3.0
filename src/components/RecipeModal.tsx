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
  Share2
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onAddToMenu: (recipe: Recipe) => void;
  onAddToShopping: (recipe: Recipe) => void;
  isAddedToShopping?: boolean;
  onStartCooking?: (recipe: Recipe) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  onAddToMenu,
  onAddToShopping,
  isAddedToShopping = false,
  onStartCooking,
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
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Image & Actions */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Tags Overlay */}
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-1 rounded-full shadow">
                {recipe.category.toUpperCase()}
              </span>
              {recipe.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-medium bg-slate-800/80 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded-full border border-slate-700/60">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-center">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-medium mb-1">Temperatura</span>
              <div className="flex items-center gap-1 text-amber-400 font-bold text-lg">
                <Thermometer className="w-5 h-5" />
                <span>{recipe.temperatureCelsius}°C</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-medium mb-1">Tiempo Total</span>
              <div className="flex items-center gap-1 text-orange-400 font-bold text-lg">
                <Clock className="w-5 h-5" />
                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-medium mb-1">Calorías</span>
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
                <Flame className="w-5 h-5" />
                <span>{Math.round(recipe.calories * multiplier)} kcal</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-xs font-medium mb-1">Dificultad</span>
              <div className="flex items-center gap-1 text-sky-400 font-bold text-lg">
                <ChefHat className="w-5 h-5" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed">
            {recipe.description}
          </p>

          {/* Servings Adjuster */}
          <div className="flex items-center justify-between bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-semibold text-slate-200">Ajustar Raciones:</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="font-extrabold text-base text-amber-300 min-w-[20px] text-center">
                {servings} {servings === 1 ? 'ración' : 'raciones'}
              </span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Airfryer Pro Tip */}
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border-l-4 border-amber-500 p-4 rounded-r-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Truco del Chef para Airfryer:</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {recipe.airfryerTip}
            </p>
          </div>

          {/* Ingredients Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              <span>Ingredientes ({servings} {servings === 1 ? 'ración' : 'raciones'}):</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center justify-between bg-slate-950/50 px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-300 font-medium">{ing.name}</span>
                  <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                    {Math.round(ing.amount * multiplier * 10) / 10} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Step by Step */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-400" />
              <span>Paso a Paso en Airfryer:</span>
            </h3>
            <div className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/80 text-xs">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold shrink-0 flex items-center justify-center border border-orange-500/30">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed mt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          {onStartCooking && (
            <button
              onClick={() => {
                onStartCooking(recipe);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all scale-102 hover:scale-105"
            >
              <ChefHat className="w-4 h-4 fill-current" />
              <span>MODO COCINAR (Paso a Paso & Reloj)</span>
            </button>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={() => {
                onAddToMenu(recipe);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Añadir al Menú</span>
            </button>

            <button
              onClick={() => onAddToShopping(recipe)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                isAddedToShopping
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isAddedToShopping ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isAddedToShopping ? 'Agregado' : 'Añadir a Compra'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
