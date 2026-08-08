import React from 'react';
import { Recipe, UserGoal, WeightEntry } from '../types';
import { 
  Sparkles, 
  Utensils, 
  Calendar, 
  ShoppingCart, 
  TrendingDown, 
  ChefHat, 
  Flame, 
  Gift, 
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface InicioDashboardProps {
  onNavigateTab?: (tab: string) => void;
  onNavigate?: (tab: string) => void;
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  currentSlots?: Record<string, string>;
  userGoal: UserGoal;
  weightEntries: WeightEntry[];
  onStartCooking?: (recipe: Recipe) => void;
  onOpenAIChef?: () => void;
  onOpenCheckout?: () => void;
  userRole?: 'admin' | 'plan_29' | 'free';
}

export const InicioDashboard: React.FC<InicioDashboardProps> = ({
  onNavigateTab,
  onNavigate,
  recipes = [],
  onSelectRecipe,
  currentSlots = {},
  userGoal,
  weightEntries = [],
  onOpenCheckout,
  userRole = 'free',
}) => {
  const handleNavigate = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    if (onNavigateTab) onNavigateTab(tab);
  };

  // Get current day name in Spanish
  const daysMap: Record<number, string> = {
    0: 'domingo',
    1: 'lunes',
    2: 'martes',
    3: 'miercoles',
    4: 'jueves',
    5: 'viernes',
    6: 'sabado',
  };
  const now = new Date();
  const currentDayKey = daysMap[now.getDay()] || 'lunes';
  const dayDisplayNames: Record<string, string> = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sábado',
    domingo: 'Domingo',
  };

  // Calculate stats for current day from currentSlots
  const recipeMap = new Map<string, Recipe>(recipes.map((r) => [r.id, r]));
  const mealTypes = ['desayuno', 'comida', 'cena', 'snack'];
  let todayCalories = 0;
  let todayProtein = 0;
  let todayCarbs = 0;
  let todayFat = 0;
  let todayMealsCount = 0;

  const slots = currentSlots || {};
  mealTypes.forEach((m) => {
    const recipeId = slots[`${currentDayKey}_${m}`];
    if (recipeId && recipeMap.has(recipeId)) {
      const r = recipeMap.get(recipeId)!;
      todayCalories += r.calories;
      todayProtein += r.proteinGrams;
      todayCarbs += r.carbsGrams;
      todayFat += r.fatGrams;
      todayMealsCount++;
    }
  });

  const targetCalories = 1400;
  const caloriePct = Math.min(100, Math.round((todayCalories / targetCalories) * 100));

  // Progress calculations
  const latestWeight = weightEntries.length > 0 ? weightEntries[0].weightKg : userGoal.currentWeightKg;
  const totalToLose = Math.max(0.1, userGoal.startWeightKg - userGoal.targetWeightKg);
  const totalLost = Math.max(0, userGoal.startWeightKg - latestWeight);
  const progressPct = Math.min(100, Math.round((totalLost / totalToLose) * 100));

  // Select 3 featured recipes for "Recetas para hoy"
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* 1. HERO PRINCIPAL */}
      <div className="relative bg-slate-900 rounded-[36px] p-6 sm:p-10 text-white overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-black uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-green-400" />
              <span>AIRFRYFIT • ASISTENTE PERSONAL AIRFRYER</span>
            </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              AIRFRYFIT
            </h1>
            <p className="text-lg sm:text-2xl font-bold text-amber-300">
              "Cocina mejor. Planifica tu semana. Disfruta de tu Airfryer."
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Recetas fáciles y saludables, planificación semanal, Chef IA y lista de compra automática. Todo en una sola app.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => handleNavigate('planner')}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-green-500/25 transition-all scale-102 hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>✨ Crear mi menú</span>
            </button>

            <button
              onClick={() => handleNavigate('chef')}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>🤖 Probar Chef IA</span>
            </button>
          </div>
        </div>

        {/* AirFryFit Logo Badge */}
        <div className="shrink-0 flex items-center justify-center self-center md:self-auto pt-4 md:pt-0">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-slate-950 p-1.5 border-2 border-green-500/30 shadow-2xl hover:scale-105 transition-transform">
            <img 
              src="/src/assets/images/airfryfit_logo_1786197820048.jpg" 
              alt="AirFryFit Logo" 
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-bold text-slate-400 flex-wrap">
            <span className="flex items-center gap-1 text-slate-300">
              <Flame className="w-4 h-4 text-orange-500 fill-current" />
              Más de 100 recetas
            </span>
            <span>•</span>
            <span className="text-slate-300">Chef IA</span>
            <span>•</span>
            <span className="text-slate-300">Menú semanal</span>
            <span>•</span>
            <span className="text-slate-300">Lista de compra</span>
          </div>
        </div>
      </div>

      {/* 2. TU DÍA */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700 px-3 py-1 rounded-full">
              HOY • {dayDisplayNames[currentDayKey].toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              📅 Tu día
            </h2>
          </div>

          <button
            onClick={() => handleNavigate('planner')}
            className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Ver mi menú</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Calories & Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span className="text-slate-700">
              Calorías consumidas: <strong className="text-green-600 text-sm">{todayCalories} kcal</strong>
            </span>
            <span className="text-slate-400">Objetivo: {targetCalories} kcal</span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${caloriePct}%` }}
            />
          </div>
        </div>

        {/* Macros & Meal Count Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Proteína</span>
            <span className="text-base font-black text-green-600 block">{todayProtein}g</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Carbohidratos</span>
            <span className="text-base font-black text-slate-800 block">{todayCarbs}g</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Grasas</span>
            <span className="text-base font-black text-slate-800 block">{todayFat}g</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center space-y-0.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Comidas Planificadas</span>
            <span className="text-base font-black text-slate-900 block">{todayMealsCount} / 4</span>
          </div>
        </div>

        {/* Dynamic Motivational Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-green-200/80 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-xs text-green-900 font-bold leading-relaxed">
            {todayMealsCount === 0
              ? '¡Empieza tu día planificando tus comidas en la pestaña "Mi Menú" para controlar tus macros fácilmente!'
              : todayMealsCount < 4
              ? `Tienes ${todayMealsCount} comidas planificadas para hoy. ¡Vas por un excelente camino! Completa tu menú fit.`
              : '¡Increíble! Tienes todas las comidas de hoy planificadas. Mantén la constancia con tu Airfryer.'}
          </p>
        </div>
      </div>

      {/* 3. ¿QUÉ QUIERES HACER? */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          ¿Qué quieres hacer?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => handleNavigate('recipes')}
            className="bg-white border border-slate-100/90 rounded-[28px] p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shadow-inner">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-green-600 transition-colors">
                Buscar receta
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">100+ Recetas fit</p>
            </div>
          </div>

          <div
            onClick={() => handleNavigate('chef')}
            className="bg-white border border-slate-100/90 rounded-[28px] p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shadow-inner">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-green-600 transition-colors">
                Chef IA
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Recetas a medida</p>
            </div>
          </div>

          <div
            onClick={() => handleNavigate('planner')}
            className="bg-white border border-slate-100/90 rounded-[28px] p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shadow-inner">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-green-600 transition-colors">
                Planificar semana
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Menú de Lun a Dom</p>
            </div>
          </div>

          <div
            onClick={() => handleNavigate('shopping')}
            className="bg-white border border-slate-100/90 rounded-[28px] p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shadow-inner">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-green-600 transition-colors">
                Lista de compra
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Auto consolidada</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RECETAS PARA HOY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-current" />
            <span>🔥 Recetas para hoy</span>
          </h2>
          <button
            onClick={() => handleNavigate('recipes')}
            className="text-xs font-extrabold text-green-600 hover:text-green-700 flex items-center gap-1"
          >
            <span>Ver todas ({recipes.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredRecipes.map((r) => (
            <div
              key={r.id}
              onClick={() => onSelectRecipe(r)}
              className="bg-white border border-slate-100/90 rounded-[28px] p-4 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-bold">
                    <span>🔥 {r.calories} kcal</span>
                    <span>🌡️ {r.temperatureCelsius}°C</span>
                    <span>⏱️ {r.cookTimeMinutes} min</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-green-600 transition-colors line-clamp-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {r.description}
                  </p>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors shadow-sm">
                Ver Receta
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. TU PROGRESO */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              EVOLUCIÓN FIT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              🎯 Tu progreso
            </h2>
          </div>

          <button
            onClick={() => handleNavigate('weight')}
            className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Ver mi progreso</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Peso Actual</span>
            <span className="text-2xl font-black text-slate-900 block">{latestWeight} kg</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Peso Perdido</span>
            <span className="text-2xl font-black text-green-600 block">-{totalLost.toFixed(1)} kg</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Progreso al Objetivo</span>
            <span className="text-2xl font-black text-purple-600 block">{progressPct}%</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>Inicio: {userGoal.startWeightKg} kg</span>
            <span>Objetivo: {userGoal.targetWeightKg} kg</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 6. TUS BONUS */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Gift className="w-5 h-5 text-pink-500" />
          <span>🎁 Tus Bonus</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => handleNavigate('bonuses')}
            className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-[28px] p-6 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                BONUS 1
              </span>
              <h3 className="text-xl font-black">21 Cenas Ligeras</h3>
              <p className="text-xs text-orange-100 leading-relaxed">
                Plan de cenas saciantes de menos de 400 kcal para perder peso sin hambre.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-full bg-white text-orange-900 font-extrabold text-xs shadow-sm hover:bg-orange-50 transition-colors">
              Abrir Bonus 1
            </button>
          </div>

          <div
            onClick={() => handleNavigate('bonuses')}
            className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-[28px] p-6 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                BONUS 2
              </span>
              <h3 className="text-xl font-black">10 Postres Fit</h3>
              <p className="text-xs text-pink-100 leading-relaxed">
                Dulces sin azúcar añadido, en menos de 10 minutos y crujientes.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-full bg-white text-pink-900 font-extrabold text-xs shadow-sm hover:bg-pink-50 transition-colors">
              Abrir Bonus 2
            </button>
          </div>

          <div
            onClick={() => handleNavigate('bonuses')}
            className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-[28px] p-6 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                BONUS 3
              </span>
              <h3 className="text-xl font-black">Guía de Despensa</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Los imprescindibles para sacarle el 100% de partido a tu Airfryer.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-full bg-white text-emerald-900 font-extrabold text-xs shadow-sm hover:bg-emerald-50 transition-colors">
              Abrir Bonus 3
            </button>
          </div>
        </div>
      </div>

      {/* 7. CHEF IA BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-black uppercase tracking-wider border border-green-500/30">
            <ChefHat className="w-3.5 h-3.5 text-green-400" />
            <span>CHEF IA AIRFRYFIT</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            "Dime qué tienes y te digo qué cocinar."
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Sube tus ingredientes de la nevera y el Chef IA generará 3 recetas paso a paso listas para tu Airfryer en segundos.
          </p>
        </div>

        <button
          onClick={() => handleNavigate('chef')}
          className="px-6 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-xs sm:text-sm shadow-md shadow-green-500/20 transition-all shrink-0 scale-102 hover:scale-105"
        >
          Crear mi receta
        </button>
      </div>

    </div>
  );
};
