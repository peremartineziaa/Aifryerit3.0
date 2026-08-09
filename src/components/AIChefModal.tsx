import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ChefHat, 
  Flame, 
  Thermometer, 
  Clock, 
  RefreshCw, 
  ChevronRight, 
  Check, 
  ArrowLeft,
  Utensils,
  Lock
} from 'lucide-react';
import { Recipe } from '../types';
import { RECIPES_DATA } from '../data/recipes';

interface AIChefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomRecipe: (recipe: Recipe) => void;
  onCookRecipe: (recipe: Recipe) => void;
  existingRecipes?: Recipe[];
  userRole?: 'admin' | 'plan_29' | 'free';
  aiChefUsageCount?: number;
  onIncrementAiChefUsage?: () => void;
  onOpenCheckout?: () => void;
}

export const AIChefModal: React.FC<AIChefModalProps> = ({
  isOpen,
  onClose,
  onAddCustomRecipe,
  onCookRecipe,
  existingRecipes = RECIPES_DATA,
  userRole = 'free',
  aiChefUsageCount = 0,
  onIncrementAiChefUsage,
  onOpenCheckout,
}) => {
  // Guided flow steps: 1 = Ingredientes, 2 = Deseo/Estilo, 3 = Tiempo, 4 = Resultado, 5 = Límite Demo Alcanzado
  const [step, setStep] = useState<number>(1);

  // User Selections
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['🍗 Pollo']);
  const [customIngredients, setCustomIngredients] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('🥗 Ligero');
  const [selectedTime, setSelectedTime] = useState<number>(20);

  // AI Loading & Result State
  const [loading, setLoading] = useState<boolean>(false);
  const [matchedRecipes, setMatchedRecipes] = useState<Recipe[]>([]);

  if (!isOpen) return null;

  const isDemoMode = userRole === 'free';

  const INGREDIENT_OPTIONS = [
    { label: '🍗 Pollo', key: 'pollo' },
    { label: '🥩 Carne', key: 'carne' },
    { label: '🐟 Pescado', key: 'pescado' },
    { label: '🥚 Huevos', key: 'huevos' },
    { label: '🥔 Patata', key: 'patata' },
    { label: '🥦 Verduras', key: 'verduras' },
    { label: '🧀 Queso', key: 'queso' },
    { label: '🍞 Pan / Arroz', key: 'pan' },
  ];

  const STYLE_OPTIONS = [
    { label: '🥗 Ligero', desc: 'Bajo en calorías, alto en nutrientes' },
    { label: '🍔 Contundente', desc: 'Proteico y muy saciante' },
    { label: '🔥 Crujiente', desc: 'Textura frita crujiente sin aceite' },
    { label: '🍰 Dulce', desc: 'Postre o capricho saludable' },
  ];

  const TIME_OPTIONS = [10, 20, 30];

  const toggleIngredient = (label: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(label)
        ? prev.length > 1
          ? prev.filter((i) => i !== label)
          : prev
        : [...prev, label]
    );
  };

  const handleGenerateResults = async () => {
    // Check Demo Mode limit
    if (isDemoMode && aiChefUsageCount >= 2) {
      setStep(5);
      return;
    }

    setLoading(true);
    setStep(4);
    if (isDemoMode && onIncrementAiChefUsage) {
      onIncrementAiChefUsage();
    }

    try {
      const allIngs = [...selectedIngredients, customIngredients].filter(Boolean).join(', ');
      
      // Request Gemini to generate 3 custom structured recipes or fallback to matching local recipes
      const res = await fetch('/api/ai-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'recipe_from_ingredients',
          ingredients: allIngs,
          calories: selectedStyle.includes('Ligero') ? 350 : selectedStyle.includes('Contundente') ? 500 : 420,
        }),
      });

      const data = await res.json();

      let results: Recipe[] = [];

      if (data.recipe) {
        const primaryAiRecipe: Recipe = {
          id: 'ai_' + Date.now(),
          title: data.recipe.title || 'Pollo Crujiente Especial Chef IA',
          description: data.recipe.description || 'Receta adaptada a tus ingredientes en Airfryer',
          category: selectedStyle.includes('Dulce') ? 'postres' : 'comidas',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          prepTimeMinutes: 5,
          cookTimeMinutes: selectedTime,
          temperatureCelsius: data.recipe.temperatureCelsius || 190,
          calories: data.recipe.calories || 380,
          proteinGrams: data.recipe.proteinGrams || 32,
          carbsGrams: data.recipe.carbsGrams || 14,
          fatGrams: data.recipe.fatGrams || 10,
          servings: 1,
          tags: ['Chef IA', 'A Medida', selectedStyle],
          difficulty: 'Fácil',
          airfryerTip: data.recipe.chefTip || 'Cocina a temperatura constante para el dorado perfecto.',
          ingredients: (data.recipe.ingredients || ['180g pechuga', '1 cda aceite']).map((i: string) => ({
            name: typeof i === 'string' ? i : 'Ingrediente',
            amount: 1,
            unit: 'ración',
            category: 'despensa',
          })),
          instructions: data.recipe.instructions || [
            'Precalienta la freidora de aire a ' + (data.recipe.temperatureCelsius || 190) + '°C durante 3 minutos.',
            'Sazona los ingredientes con especias al gusto y 1 pulverización de aceite de oliva.',
            'Introduce en la cesta sin amontonar y cocina durante ' + selectedTime + ' minutos girando a mitad de cocción.'
          ],
        };

      results = [primaryAiRecipe];
        onAddCustomRecipe(primaryAiRecipe);
      } else {
        // Fallback: pick top 3 matching recipes from local data
        results = existingRecipes.slice(0, 3);
      }

      setMatchedRecipes(results);
    } catch (err) {
      console.error(err);
      setMatchedRecipes(existingRecipes.slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setMatchedRecipes([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-[36px] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full border border-green-500/30">
                  CONVERSACIÓN GUIADA
                </span>
                {isDemoMode && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    DEMO: {aiChefUsageCount}/2 COMIDAS USADAS
                  </span>
                )}
              </div>
              <h2 className="text-lg font-black text-white">
                Chef IA AirFryFit
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="bg-slate-100 p-3 flex items-center justify-center gap-2 border-b border-slate-200/60">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                step === s
                  ? 'w-8 bg-green-500'
                  : step > s
                  ? 'w-2 bg-green-700'
                  : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Guided Conversation Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900">

          {/* PASO 1: ¿QUÉ TIENES HOY? */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                  PREGUNTA 1 DE 3
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  ¿Qué tienes hoy en la cocina?
                </h3>
                <p className="text-xs text-slate-500">
                  Selecciona uno o varios ingredientes base que quieras aprovechar.
                </p>
              </div>

              {/* Ingredient Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {INGREDIENT_OPTIONS.map((ing) => {
                  const isSelected = selectedIngredients.includes(ing.label);
                  return (
                    <button
                      key={ing.key}
                      onClick={() => toggleIngredient(ing.label)}
                      className={`py-3.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border transition-all ${
                        isSelected
                          ? 'bg-green-500 text-white border-green-500 shadow-md shadow-green-500/20 scale-102'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span>{ing.label}</span>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Otro ingrediente (opcional):
                </label>
                <input
                  type="text"
                  placeholder="ej. calabacín, ajo, cebolla, pimentón..."
                  value={customIngredients}
                  onChange={(e) => setCustomIngredients(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-green-500/20 transition-all scale-102 hover:scale-105"
              >
                <span>Siguiente: ¿Qué te apetece?</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PASO 2: ¿QUÉ TE APETECE? */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                    PREGUNTA 2 DE 3
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    ¿Qué te apetece hoy?
                  </h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = selectedStyle === style.label;
                  return (
                    <button
                      key={style.label}
                      onClick={() => setSelectedStyle(style.label)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-green-500'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="text-base font-extrabold">{style.label}</div>
                      <div className={`text-xs mt-1 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {style.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-green-500/20 transition-all scale-102 hover:scale-105"
              >
                <span>Siguiente: ¿Cuánto tiempo tienes?</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PASO 3: ¿CUÁNTO TIEMPO TIENES? */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                    PREGUNTA 3 DE 3
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    ¿Cuánto tiempo tienes?
                  </h3>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {TIME_OPTIONS.map((t) => {
                  const isSelected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-5 px-3 rounded-2xl text-center border transition-all ${
                        isSelected
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-105'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="text-2xl font-black">{t}</div>
                      <div className="text-xs font-extrabold uppercase tracking-wider opacity-90">
                        minutos
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Summary recap */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[10px]">
                  Resumen de tu elección:
                </span>
                <p className="text-slate-600 font-medium">
                  • Ingredientes: <strong>{selectedIngredients.join(', ')}</strong> {customIngredients && `(${customIngredients})`}
                  <br />
                  • Estilo: <strong>{selectedStyle}</strong>
                  <br />
                  • Tiempo: <strong>{selectedTime} minutos</strong>
                </p>
              </div>

              <button
                onClick={handleGenerateResults}
                className="w-full py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all scale-102 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-green-400" />
                <span>Generar 3 Recetas Personalizadas</span>
              </button>
            </div>
          )}

          {/* PASO 4: RESULTADO - 3 RECETAS Y BOTÓN ENORME "COCINAR ESTA" */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                    RESPUESTA CHEF IA
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    3 Recetas recomendadas para ti:
                  </h3>
                </div>

                <button
                  onClick={resetFlow}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Nueva Búsqueda</span>
                </button>
              </div>

              {loading ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-spin">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    El Chef IA está ajustando los tiempos y temperaturas de tu freidora de aire...
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {matchedRecipes.map((recipe, idx) => (
                    <div
                      key={recipe.id || idx}
                      className="bg-white border border-slate-200/90 rounded-[28px] p-5 shadow-sm hover:border-green-300 transition-all space-y-4"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] font-extrabold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full uppercase">
                              OPCIÓN {idx + 1}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {recipe.temperatureCelsius}°C • {recipe.cookTimeMinutes} min
                            </span>
                          </div>

                          <h4 className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                            {recipe.title}
                          </h4>

                          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                            <span className="flex items-center gap-1 text-green-600 font-bold">
                              <Flame className="w-3.5 h-3.5" />
                              {recipe.calories} kcal
                            </span>
                            <span>•</span>
                            <span>{recipe.proteinGrams}g proteína</span>
                          </div>
                        </div>
                      </div>

                      {/* BOTÓN MUY GRANDE "COCINAR ESTA" */}
                      <button
                        onClick={() => {
                          onCookRecipe(recipe);
                          onClose();
                        }}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all scale-102 hover:scale-105 active:scale-95"
                      >
                        <ChefHat className="w-5 h-5 fill-current" />
                        <span>COCINAR ESTA</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PASO 5: LÍMITE DEMO ALCANZADO (MAX 2 COMIDAS) */}
          {step === 5 && (
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                  LÍMITE DEMO ALCANZADO (2/2 COMIDAS)
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  ¡Has completado tus 2 pruebas con el Chef IA!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  En la versión Demo solo se permiten <strong>2 pruebas del Chef IA</strong>. Para usar el Chef IA sin límites, adaptar todas tus comidas en Airfryer y acceder a las 80+ recetas VIP, desbloquea el acceso completo.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 max-w-md mx-auto text-left space-y-3">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Acceso Completo AirFryFit (29 €):
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                  <li>✅ Chef IA Ilimitado para cualquier ingrediente</li>
                  <li>✅ 80+ Recetas completas con macros e instrucciones</li>
                  <li>✅ Planificador Semanal y Lista de la Compra</li>
                  <li>✅ Regalo: Grupo Privado de Telegram de por vida</li>
                </ul>
              </div>

              <div className="space-y-3 max-w-md mx-auto pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenCheckout) onOpenCheckout();
                  }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-sm shadow-lg shadow-green-500/25 transition-all scale-102 hover:scale-105"
                >
                  <span>Desbloquear Chef IA Ilimitado (29 €)</span>
                </button>

                <p className="text-[11px] text-slate-400">
                  ¿Ya tienes usuario? Inicia sesión como <strong>Lidia (300177)</strong> en el menú superior para tener acceso ilimitado.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
