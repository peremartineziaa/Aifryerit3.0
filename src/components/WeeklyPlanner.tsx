import React, { useState } from 'react';
import { Recipe, DayOfWeek, MealType, WeeklyPlan } from '../types';
import { PRESET_WEEKLY_PLANS } from '../data/sampleData';
import { 
  Calendar, 
  ShoppingCart, 
  Flame, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  ChevronRight,
  Utensils,
  Moon,
  Sun,
  Coffee,
  Apple
} from 'lucide-react';

interface WeeklyPlannerProps {
  recipes: Recipe[];
  currentSlots: Record<string, string>;
  setSlots: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onGenerateShoppingList: (recipeIds: string[]) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigateToShopping: () => void;
}

const DAYS: { id: DayOfWeek; label: string }[] = [
  { id: 'lunes', label: 'Lunes' },
  { id: 'martes', label: 'Martes' },
  { id: 'miercoles', label: 'Miércoles' },
  { id: 'jueves', label: 'Jueves' },
  { id: 'viernes', label: 'Viernes' },
  { id: 'sabado', label: 'Sábado' },
  { id: 'domingo', label: 'Domingo' },
];

const MEALS: { id: MealType; label: string; icon: any }[] = [
  { id: 'desayuno', label: 'Desayuno', icon: Coffee },
  { id: 'comida', label: 'Comida', icon: Sun },
  { id: 'cena', label: 'Cena', icon: Moon },
  { id: 'snack', label: 'Snack / Postre', icon: Apple },
];

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  recipes,
  currentSlots,
  setSlots,
  onGenerateShoppingList,
  onSelectRecipe,
  onNavigateToShopping,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('lunes');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [activeAssignSlot, setActiveAssignSlot] = useState<{ day: DayOfWeek; mealType: MealType } | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const recipeMap = new Map<string, Recipe>(recipes.map((r) => [r.id, r]));

  // Calculate daily nutrition totals for selectedDay
  const getDayTotals = (day: DayOfWeek) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let count = 0;

    MEALS.forEach((m) => {
      const key = `${day}_${m.id}`;
      const recipeId = currentSlots[key];
      if (recipeId && recipeMap.has(recipeId)) {
        const r = recipeMap.get(recipeId)!;
        calories += r.calories;
        protein += r.proteinGrams;
        carbs += r.carbsGrams;
        fat += r.fatGrams;
        count++;
      }
    });

    return { calories, protein, carbs, fat, count };
  };

  // Calculate total recipes planned in the entire week
  const allPlannedRecipeIds = (Object.values(currentSlots) as string[]).filter((id) => recipeMap.has(id));

  const handleApplyPresetPlan = (plan: WeeklyPlan) => {
    setSlots(plan.slots);
  };

  const handleOpenAssignModal = (day: DayOfWeek, mealType: MealType) => {
    setActiveAssignSlot({ day, mealType });
    setAssignModalOpen(true);
  };

  const handleAssignRecipe = (recipeId: string) => {
    if (activeAssignSlot) {
      const key = `${activeAssignSlot.day}_${activeAssignSlot.mealType}`;
      setSlots((prev) => ({ ...prev, [key]: recipeId }));
      setAssignModalOpen(false);
      setActiveAssignSlot(null);
    }
  };

  const handleRemoveRecipe = (day: DayOfWeek, mealType: MealType) => {
    const key = `${day}_${mealType}`;
    setSlots((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleClearWeek = () => {
    setSlots({});
  };

  const handleGenerateListAndRedirect = () => {
    onGenerateShoppingList(allPlannedRecipeIds);
    onNavigateToShopping();
  };

  const dayTotals = getDayTotals(selectedDay);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner Bento */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLANIFICADOR DE MENÚS AIRFRYER</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Diseña tu Semana Fit & Sin Estrés
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              Organiza tus desayunos, comidas y las <strong className="text-slate-900 font-bold">21 Cenas del Bonus 1</strong>. La app calcula automáticamente la lista de la compra de tu semana.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleGenerateListAndRedirect}
              disabled={allPlannedRecipeIds.length === 0}
              className={`px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                allPlannedRecipeIds.length > 0
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20 scale-102 hover:scale-105'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Generar Lista de Compra ({allPlannedRecipeIds.length} Recetas)</span>
            </button>

            {allPlannedRecipeIds.length > 0 && (
              <button
                onClick={handleClearWeek}
                className="px-4 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="Vaciar menú semanal"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="sm:hidden">Limpiar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preset Plans Quick Selector */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-600" />
          <span>Plantillas de Menús Recomendadas:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_WEEKLY_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-slate-100/90 rounded-[24px] p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-green-600 transition-colors">
                  {plan.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <button
                onClick={() => handleApplyPresetPlan(plan)}
                className="mt-4 w-full py-2.5 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Cargar este Menú</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="bg-white p-2 rounded-full border border-slate-200/80 shadow-sm flex items-center gap-1 overflow-x-auto scrollbar-none">
        {DAYS.map((d) => {
          const isSelected = selectedDay === d.id;
          const totals = getDayTotals(d.id);
          return (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id)}
              className={`flex-1 min-w-[100px] py-3 px-3 rounded-full text-center transition-all ${
                isSelected
                  ? 'bg-green-500 text-white font-bold shadow-md shadow-green-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="block text-xs uppercase font-extrabold tracking-wider">{d.label}</span>
              <span className={`text-[10px] block mt-0.5 font-semibold ${isSelected ? 'text-green-100' : 'text-slate-400'}`}>
                {totals.calories > 0 ? `${totals.calories} kcal` : 'Sin asignar'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Daily Summary Stats Bar */}
      <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Resumen Día ({selectedDay.toUpperCase()})</span>
            <span className="text-lg font-black text-slate-900">
              {dayTotals.calories} <span className="text-xs font-normal text-slate-500">/ ~1,400 kcal meta</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Proteína</span>
            <span className="font-extrabold text-green-600 text-sm">{dayTotals.protein}g</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Carbohidratos</span>
            <span className="font-bold text-slate-700 text-sm">{dayTotals.carbs}g</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Grasas</span>
            <span className="font-bold text-slate-700 text-sm">{dayTotals.fat}g</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Platos</span>
            <span className="font-bold text-slate-900 text-sm">{dayTotals.count} / 4</span>
          </div>
        </div>
      </div>

      {/* Meals Grid for Selected Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MEALS.map((meal) => {
          const slotKey = `${selectedDay}_${meal.id}`;
          const recipeId = currentSlots[slotKey];
          const recipe = recipeId ? recipeMap.get(recipeId) : null;
          const MealIcon = meal.icon;

          return (
            <div
              key={meal.id}
              className="bg-white border border-slate-100/90 rounded-[28px] p-4 shadow-sm flex flex-col justify-between space-y-3 min-h-[220px]"
            >
              {/* Meal Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-slate-100 text-slate-700">
                    <MealIcon className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">{meal.label}</span>
                </div>
                {recipe && (
                  <button
                    onClick={() => handleRemoveRecipe(selectedDay, meal.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    title="Quitar de la comida"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Meal Content or Empty State */}
              {recipe ? (
                <div className="flex-1 flex flex-col justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 cursor-pointer shadow-sm"
                      onClick={() => onSelectRecipe(recipe)}
                    />
                    <div>
                      <h5
                        onClick={() => onSelectRecipe(recipe)}
                        className="font-extrabold text-xs text-slate-900 hover:text-green-600 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {recipe.title}
                      </h5>
                      <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500 font-semibold">
                        <span className="font-extrabold text-green-600">{recipe.calories} kcal</span>
                        <span>•</span>
                        <span>{recipe.temperatureCelsius}°C</span>
                        <span>•</span>
                        <span>{recipe.cookTimeMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                    <span className="text-slate-700 font-bold">{recipe.proteinGrams}g proteína</span>
                    <button
                      onClick={() => handleOpenAssignModal(selectedDay, meal.id)}
                      className="text-green-600 hover:text-green-700 font-bold underline"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => handleOpenAssignModal(selectedDay, meal.id)}
                  className="flex-1 border-2 border-dashed border-slate-200 hover:border-green-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer group transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 group-hover:bg-green-500 group-hover:text-white flex items-center justify-center transition-all mb-2 shadow-sm">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900">
                    Añadir Receta
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Assign Recipe Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-[32px] p-6 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Seleccionar Receta Airfryer
                </h3>
                <p className="text-xs text-slate-500">
                  Para {activeAssignSlot?.day.toUpperCase()} ({activeAssignSlot?.mealType.toUpperCase()})
                </p>
              </div>
              <button
                onClick={() => setAssignModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            {/* Category Filter Pills inside Modal */}
            <div className="py-3 flex gap-2 overflow-x-auto scrollbar-none">
              {['all', 'desayunos', 'comidas', 'cenas', 'postres', 'snacks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                    filterCategory === cat
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : cat}
                </button>
              ))}
            </div>

            {/* Recipe List */}
            <div className="overflow-y-auto space-y-2 py-2 flex-1">
              {recipes
                .filter((r) => filterCategory === 'all' || r.category === filterCategory)
                .map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleAssignRecipe(r.id)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={r.imageUrl} alt={r.title} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-green-600 transition-colors">
                          {r.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {r.calories} kcal • {r.temperatureCelsius}°C • {r.cookTimeMinutes} min
                        </span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold transition-colors shadow-sm">
                      Elegir
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
