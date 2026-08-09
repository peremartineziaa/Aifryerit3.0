import React, { useState } from 'react';
import { 
  Sparkles, 
  ChefHat, 
  Flame, 
  Clock, 
  RefreshCw, 
  ChevronRight, 
  Check, 
  ArrowLeft,
  Lock
} from 'lucide-react';
import { Recipe } from '../types';
import { RECIPES_DATA } from '../data/recipes';

interface AIChefViewProps {
  onCookRecipe: (recipe: Recipe) => void;
  onAddCustomRecipe: (recipe: Recipe) => void;
  userRole?: 'admin' | 'plan_29' | 'free';
  aiChefUsageCount?: number;
  onIncrementAiChefUsage?: () => void;
  onOpenCheckout?: () => void;
}

export const AIChefView: React.FC<AIChefViewProps> = ({
  onCookRecipe,
  onAddCustomRecipe,
  userRole = 'free',
  aiChefUsageCount = 0,
  onIncrementAiChefUsage,
  onOpenCheckout,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['🍗 Pollo']);
  const [customIngredients, setCustomIngredients] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('🥗 Ligero');
  const [selectedTime, setSelectedTime] = useState<number>(20);

  const [loading, setLoading] = useState<boolean>(false);
  const [matchedRecipes, setMatchedRecipes] = useState<Recipe[]>([]);

  const isDemoMode = userRole === 'free';

  const INGREDIENT_OPTIONS = [
    { label: '🍗 Pollo', key: 'pollo' },
    { label: '🥩 Carne', key: 'carne' },
    { label: '🐟 Pescado', key: 'pescado' },
    { label: '🥚 Huevos', key: 'huevos' },
    { label: '🥔 Patata', key: 'patata' },
    { label: '🥦 Verduras', key: 'verduras' },
    { label: '🧀 Queso', key: 'queso' },
    { label: '🍚 Arroz', key: 'arroz' },
    { label: '🍞 Pan', key: 'pan' },
    { label: '🫘 Legumbres', key: 'legumbres' },
  ];

  const STYLE_OPTIONS = [
    { label: '🥗 Ligero', desc: 'Bajo en calorías y lleno de sabor.' },
    { label: '💪 Alto en proteína', desc: 'Proteico y muy saciante.' },
    { label: '🔥 Crujiente', desc: 'Dorado y crujiente con muy poco aceite.' },
    { label: '🍰 Dulce', desc: 'Un capricho saludable.' },
    { label: '🤷 Sorpréndeme', desc: 'Déjalo a mi elección.' },
  ];

  const TIME_OPTIONS = [
    { label: '⚡ 10 minutos', val: 10 },
    { label: '🍽️ 20 minutos', val: 20 },
    { label: '👨‍🍳 30 minutos', val: 30 },
    { label: '⏰ No me importa', val: 25 },
  ];

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

      const res = await fetch('https://airfryerfit-api.onrender.com/api/ai-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'recipe_from_ingredients',
          ingredients: allIngs,
          calories: selectedStyle.includes('Ligero') ? 350 : selectedStyle.includes('proteína') ? 480 : 410,
        }),
      });

      const data = await res.json();
      let results: Recipe[] = [];

     if (data.recipes && Array.isArray(data.recipes) && data.recipes.length === 3) {
  results = data.recipes.map((recipe: any, index: number): Recipe => ({
    id: 'ai_' + Date.now() + '_' + index,
    title: recipe.title || `Receta Chef IA ${index + 1}`,
    description:
      recipe.description ||
      'Receta diseñada especialmente con tus ingredientes para Airfryer.',
    category: selectedStyle.includes('Dulce') ? 'postres' : 'comidas',
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: recipe.prepTimeMinutes || 5,
    cookTimeMinutes: recipe.cookTimeMinutes || selectedTime,
    temperatureCelsius: recipe.temperatureCelsius || 190,
    calories: recipe.calories || 380,
    proteinGrams: recipe.proteinGrams || 30,
    carbsGrams: recipe.carbsGrams || 20,
    fatGrams: recipe.fatGrams || 10,
    servings: 1,
    tags: ['Chef IA', 'A Medida', selectedStyle],
    difficulty: 'Fácil',
    airfryerTip:
      recipe.chefTip || 'Asegúrate de no sobrecargar la cesta.',
    ingredients: (recipe.ingredients || []).map((i: string) => ({
      name: typeof i === 'string' ? i : 'Ingrediente',
      amount: 1,
      unit: 'ración',
      category: 'despensa',
    })),
    instructions: recipe.instructions || [
      `Precalienta la Airfryer a ${recipe.temperatureCelsius || 190}°C durante 3 minutos.`,
      'Añade los ingredientes y cocina según las indicaciones.',
      `Cocina durante ${recipe.cookTimeMinutes || selectedTime} minutos.`,
    ],
  }));

  results.forEach((recipe) => {
    onAddCustomRecipe(recipe);
  });
} else {
  console.error('El Chef IA no ha devuelto exactamente 3 recetas:', data);

  results = [];
}
        

       
   } catch (err) {
  console.error('Error generando recetas con Chef IA:', err);
  setMatchedRecipes([]);

    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setMatchedRecipes([]);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-green-600" />
              <span>ASISTENTE PERSONAL DE COCINA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              🤖 Chef IA AirFryFit
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Dime qué tienes en casa y qué te apetece. Yo me encargo del resto.
            </p>
          </div>

          {isDemoMode && (
            <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl shrink-0 text-right">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                MODO DEMO
              </span>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                {aiChefUsageCount}/2 Pruebas Usadas
              </div>
              <span className="text-[11px] text-slate-500 block">✨ 2 recetas gratuitas</span>
            </div>
          )}
        </div>

        {/* Step dots */}
        <div className="mt-6 flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                step === s
                  ? 'w-10 bg-green-500'
                  : step > s
                  ? 'w-3 bg-green-700'
                  : 'w-3 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">

        {/* PREGUNTA 1 DE 3 */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                PREGUNTA 1 DE 3
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                ¿Qué tienes en casa?
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Selecciona lo que tengas. Puedes elegir varios.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {INGREDIENT_OPTIONS.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.label);
                return (
                  <button
                    key={ing.key}
                    onClick={() => toggleIngredient(ing.label)}
                    className={`p-4 rounded-2xl font-extrabold text-xs flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-green-500 text-white border-green-500 shadow-md scale-102'
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
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ✏️ ¿Tienes algo más?
              </label>
              <input
                type="text"
                placeholder="Ej.: calabacín, champiñones, yogur..."
                value={customIngredients}
                onChange={(e) => setCustomIngredients(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-green-500/20 transition-all scale-102 hover:scale-105"
              >
                <span>Continuar →</span>
              </button>
            </div>
          </div>
        )}

        {/* PREGUNTA 2 DE 3 */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                  PREGUNTA 2 DE 3
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  😋 ¿Qué te apetece hoy?
                </h2>
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
                    <div className="text-sm font-extrabold">{style.label}</div>
                    <div className={`text-xs mt-1 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {style.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Continuar →</span>
            </button>
          </div>
        )}

        {/* PREGUNTA 3 DE 3 */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                  PREGUNTA 3 DE 3
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  ⏱️ ¿Cuánto tiempo tienes?
                </h2>
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Atrás</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TIME_OPTIONS.map((t) => {
                const isSelected = selectedTime === t.val;
                return (
                  <button
                    key={t.label}
                    onClick={() => setSelectedTime(t.val)}
                    className={`py-4 px-3 rounded-2xl text-center font-extrabold text-xs border transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Resumen previo */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px]">
                ✨ Tu receta ideal:
              </span>
              <p className="text-slate-600">
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
              <span>✨ Crear mis 3 recetas</span>
            </button>
          </div>
        )}

        {/* RESULTADOS */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-green-600 tracking-wider">
                  👨‍🍳 Tus recetas están listas
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  He encontrado 3 opciones utilizando tus ingredientes
                </h2>
              </div>

              <button
                onClick={resetFlow}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>🔄 Crear 3 nuevas</span>
              </button>
            </div>

            {loading ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-spin">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-600">
                  El Chef IA está diseñando tus recetas con la temperatura y tiempos óptimos...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {matchedRecipes.map((recipe, idx) => (
                  <div
                    key={recipe.id || idx}
                    className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full sm:w-28 h-32 rounded-2xl object-cover border border-slate-100"
                      />
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[10px] font-extrabold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                            🟢 Utiliza tus ingredientes
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {recipe.temperatureCelsius}°C • {recipe.cookTimeMinutes} min
                          </span>
                        </div>

                        <h3 className="font-black text-slate-900 text-xl">
                          {recipe.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
                          <span className="flex items-center gap-1 text-green-600 font-bold">
                            <Flame className="w-3.5 h-3.5" />
                            {recipe.calories} kcal
                          </span>
                          <span>•</span>
                          <span>{recipe.proteinGrams}g proteína</span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
                          {recipe.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onCookRecipe(recipe)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all scale-102 hover:scale-105"
                    >
                      <ChefHat className="w-5 h-5 fill-current" />
                      <span>COCINAR ESTA →</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LÍMITE DEMO ALCANZADO */}
        {step === 5 && (
          <div className="space-y-6 text-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                LÍMITE DEMO ALCANZADO (2/2 COMIDAS)
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                ¡Has completado tus 2 pruebas con el Chef IA!
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                En la versión Demo solo se permiten <strong>2 pruebas del Chef IA</strong>. Para usar el Chef IA sin límites, desbloquea la versión completa.
              </p>
            </div>

            {onOpenCheckout && (
              <button
                onClick={onOpenCheckout}
                className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-sm shadow-lg transition-all"
              >
                Desbloquear Chef IA Ilimitado (29 €)
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
