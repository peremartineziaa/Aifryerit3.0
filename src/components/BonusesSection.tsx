import React, { useState } from 'react';
import { Recipe, BonusInfo } from '../types';
import { INITIAL_BONUSES } from '../data/sampleData';
import { RecipeCard } from './RecipeCard';
import { 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  Moon, 
  Cake, 
  ShoppingCart, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

interface BonusesSectionProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onAddToMenu: (recipe: Recipe) => void;
  onAddToShopping: (recipe: Recipe) => void;
  onNavigateToShopping: () => void;
  onNavigateToPlanner: () => void;
}

export const BonusesSection: React.FC<BonusesSectionProps> = ({
  recipes,
  onSelectRecipe,
  onAddToMenu,
  onAddToShopping,
  onNavigateToShopping,
  onNavigateToPlanner,
}) => {
  const [activeBonusTab, setActiveBonusTab] = useState<number>(1);

  const bonus1Dinners = recipes.filter((r) => r.isBonus1Dinner);
  const bonus2Desserts = recipes.filter((r) => r.isBonus2Dessert);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
              <Gift className="w-4 h-4 text-amber-600" />
              <span>REGALOS EXCLUSIVOS DE BIENVENIDA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 Bonus de Regalo Incluidos (Valorado en 60€)
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              Al inscribirte en la app AirFryFit recibes acceso inmediato e ilimitado a estos tres módulos diseñados para acelerar tus resultados.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-[24px] border border-slate-100 text-center shrink-0">
            <span className="text-xs text-slate-400 font-bold uppercase block">Valor Total Regalos:</span>
            <span className="text-2xl font-black text-slate-400 line-through">60 €</span>
            <span className="text-xl font-black text-green-600 block mt-0.5">¡GRATIS HOY!</span>
          </div>
        </div>
      </div>

      {/* Bonus Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bonus 1 */}
        <div
          onClick={() => setActiveBonusTab(1)}
          className={`bg-white border rounded-[28px] p-6 space-y-4 cursor-pointer transition-all relative overflow-hidden ${
            activeBonusTab === 1
              ? 'border-green-500 shadow-md ring-2 ring-green-500/20'
              : 'border-slate-100/90 shadow-sm hover:shadow-md hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Moon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              VALOR: 25€
            </span>
          </div>

          <div>
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">BONUS 1</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              21 Cenas para Adelgazar con Airfryer
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Recetario completo de cenas nocturnas ultraligeras, proteicas y listas en menos de 15 min.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-green-600 font-bold">
            <span>{bonus1Dinners.length} Recetas Disponibles</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bonus 2 */}
        <div
          onClick={() => setActiveBonusTab(2)}
          className={`bg-white border rounded-[28px] p-6 space-y-4 cursor-pointer transition-all relative overflow-hidden ${
            activeBonusTab === 2
              ? 'border-pink-500 shadow-md ring-2 ring-pink-500/20'
              : 'border-slate-100/90 shadow-sm hover:shadow-md hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              <Cake className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              VALOR: 15€
            </span>
          </div>

          <div>
            <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest block">BONUS 2</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              10 Postres Saludables en Airfryer
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Muffins, tartas de queso, brownies fit y donuts calientitos sin azúcar refinado.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-pink-600 font-bold">
            <span>{bonus2Desserts.length} Postres Disponibles</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bonus 3 */}
        <div
          onClick={() => {
            setActiveBonusTab(3);
            onNavigateToShopping();
          }}
          className={`bg-white border rounded-[28px] p-6 space-y-4 cursor-pointer transition-all relative overflow-hidden ${
            activeBonusTab === 3
              ? 'border-green-500 shadow-md ring-2 ring-green-500/20'
              : 'border-slate-100/90 shadow-sm hover:shadow-md hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              VALOR: 20€
            </span>
          </div>

          <div>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block">BONUS 3</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              Lista Inteligente de la Compra
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Módulo interactivo que consolida tus ingredientes por pasillos e incluye la guía de esenciales Airfryer.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-green-600 font-bold">
            <span>Ir a Lista Inteligente</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Active Bonus Detail Showcase */}
      {activeBonusTab === 1 && (
        <div className="space-y-6 bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Moon className="w-5 h-5 text-orange-500" />
                <span>Bonus 1: Colección 21 Cenas para Adelgazar</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Todas diseñadas para prepararse en tu freidora de aire entre 8 y 15 minutos.
              </p>
            </div>

            <button
              onClick={onNavigateToPlanner}
              className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-full flex items-center gap-2 transition-colors shadow-md shadow-green-500/20"
            >
              <span>Cargar Cenas en Menú Semanal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonus1Dinners.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={onSelectRecipe}
                onAddToMenu={onAddToMenu}
                onAddToShopping={onAddToShopping}
              />
            ))}
          </div>
        </div>
      )}

      {activeBonusTab === 2 && (
        <div className="space-y-6 bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Cake className="w-5 h-5 text-pink-500" />
                <span>Bonus 2: Colección 10 Postres Saludables en Airfryer</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Disfruta de dulces reconfortantes ricos en proteína y bajos en calorías.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonus2Desserts.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={onSelectRecipe}
                onAddToMenu={onAddToMenu}
                onAddToShopping={onAddToShopping}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
