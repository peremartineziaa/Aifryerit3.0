import React, { useState, useEffect } from 'react';
import { Recipe, ShoppingItem, WeightEntry, UserGoal } from './types';
import { RECIPES_DATA } from './data/recipes';
import { 
  PRESET_WEEKLY_PLANS, 
  INITIAL_WEIGHT_ENTRIES, 
  INITIAL_USER_GOAL 
} from './data/sampleData';

import { Navbar } from './components/Navbar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { ShoppingList } from './components/ShoppingList';
import { WeightTracker } from './components/WeightTracker';
import { BonusesSection } from './components/BonusesSection';
import { TelegramCommunity } from './components/TelegramCommunity';
import { PricingValuationModal } from './components/PricingValuationModal';
import { AIChefModal } from './components/AIChefModal';
import { CookingModeModal } from './components/CookingModeModal';

import { 
  Search, 
  Filter, 
  Sparkles, 
  Gift, 
  Calendar, 
  ShoppingCart, 
  TrendingDown, 
  MessageSquare,
  ChevronRight,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('recipes');

  // App Data State
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES_DATA);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['cena-1', 'cena-2', 'postre-1']);
  
  // Weekly Menu Planner Slots
  const [currentSlots, setCurrentSlots] = useState<Record<string, string>>(PRESET_WEEKLY_PLANS[0].slots);
  
  // Shopping List Items
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  
  // Weight Control State
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(INITIAL_WEIGHT_ENTRIES);
  const [userGoal, setUserGoal] = useState<UserGoal>(INITIAL_USER_GOAL);

  // Modals State
  const [valuationModalOpen, setValuationModalOpen] = useState<boolean>(false);
  const [aiChefModalOpen, setAiChefModalOpen] = useState<boolean>(false);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);

  // Filters State for Recipe Gallery
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Auto-generate initial shopping list from preset plan on first load
  useEffect(() => {
    generateShoppingListFromSlots(currentSlots);
  }, []);

  const generateShoppingListFromSlots = (slotsMap: Record<string, string>) => {
    const recipeMap = new Map<string, Recipe>(recipes.map((r) => [r.id, r]));
    const plannedRecipeIds = Object.values(slotsMap).filter((id) => recipeMap.has(id));

    const aggregatedMap = new Map<string, { amount: number; unit: string; category: any; recipeSource: string }>();

    plannedRecipeIds.forEach((id) => {
      const r = recipeMap.get(id);
      if (!r) return;

      r.ingredients.forEach((ing) => {
        const key = `${ing.name.toLowerCase().trim()}_${ing.unit}`;
        if (aggregatedMap.has(key)) {
          const prev = aggregatedMap.get(key)!;
          prev.amount += ing.amount;
        } else {
          aggregatedMap.set(key, {
            amount: ing.amount,
            unit: ing.unit,
            category: ing.category,
            recipeSource: r.title,
          });
        }
      });
    });

    const newShoppingList: ShoppingItem[] = Array.from(aggregatedMap.entries()).map(
      ([key, data], idx) => {
        const cleanName = key.split('_')[0];
        const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        return {
          id: 'shop_' + idx,
          name: formattedName,
          amount: Math.round(data.amount * 10) / 10,
          unit: data.unit,
          category: data.category,
          checked: false,
          recipeSource: data.recipeSource,
        };
      }
    );

    setShoppingItems(newShoppingList);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddSingleRecipeToShopping = (recipe: Recipe) => {
    const newItems: ShoppingItem[] = recipe.ingredients.map((ing, idx) => ({
      id: `single_${recipe.id}_${idx}_${Date.now()}`,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
      category: ing.category,
      checked: false,
      recipeSource: recipe.title,
    }));

    setShoppingItems((prev) => [...newItems, ...prev]);
  };

  const handleAddCustomRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [recipe, ...prev]);
  };

  const handleAddWeightEntry = (entry: WeightEntry) => {
    setWeightEntries((prev) => [...prev, entry]);
    setUserGoal((prev) => ({ ...prev, currentWeightKg: entry.weightKg }));
  };

  const handleDeleteWeightEntry = (id: string) => {
    setWeightEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Recipe Filtering Logic
  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFav = !showOnlyFavorites || favoriteIds.includes(r.id);

    return matchesCategory && matchesSearch && matchesFav;
  });

  return (
    <div className="min-h-screen bg-[#F8FAF5] text-slate-900 flex flex-col font-sans selection:bg-green-500 selection:text-white antialiased">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAIChef={() => setAiChefModalOpen(true)}
        openValuationModal={() => setValuationModalOpen(true)}
      />

      {/* Main App Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* --- TAB 1: RECETAS AIRFRYER --- */}
        {activeTab === 'recipes' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Bento Grid Hero Banner & Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Main Hero Bento Card */}
              <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      OFERTA DE LANZAMIENTO
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> 90% MENOS GRASA
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Cocina Crujiente, Ligera & Saludable en Airfryer
                  </h1>
                  <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
                    Sabor de frito sin remordimientos. Planifica tus menús semanales, accede a tus <strong className="text-slate-900 font-bold">3 Bonus VIP</strong> y calcula la compra automática.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab('bonuses')}
                    className="px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-green-500/20 transition-all scale-102 hover:scale-105"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Ver Mis 3 Bonus VIP (Gratis)</span>
                  </button>

                  <button
                    onClick={() => setAiChefModalOpen(true)}
                    className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Crear Receta con Chef AI</span>
                  </button>
                </div>
              </div>

              {/* Bento Price / Membership Card */}
              <div className="lg:col-span-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-[32px] p-6 border-2 border-orange-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                      Membresía Completa
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold line-through">119 €</span>
                  </div>

                  <div className="mt-4">
                    <div className="text-4xl font-black text-orange-600">29 €</div>
                    <p className="text-xs text-orange-800 font-bold tracking-tight">PAGO ÚNICO PARA SIEMPRE</p>
                  </div>

                  <div className="space-y-1.5 mt-4 text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Acceso ilimitado a todas las Recetas</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>3 Bonus VIP (+21 Cenas, +10 Postres, Lista)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Grupo de Apoyo en Telegram</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setValuationModalOpen(true)}
                  className="mt-4 w-full py-2.5 rounded-2xl bg-white border border-orange-200 text-orange-700 hover:bg-orange-100 font-bold text-xs transition-colors text-center"
                >
                  Ver Análisis Estratégico 29€
                </button>
              </div>

            </div>

            {/* Recipe Controls: Search & Category Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por plato, ingrediente o etiqueta (ej. salmón, calabacín, keto)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Favorites Toggle */}
                <button
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                    showOnlyFavorites
                      ? 'bg-rose-50 text-rose-600 border-rose-300 shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current text-rose-500' : ''}`} />
                  <span>Favoritos ({favoriteIds.length})</span>
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                {[
                  { id: 'all', label: 'Todas las Recetas' },
                  { id: 'cenas', label: '🌙 Cenas Ligeras (Bonus 1)' },
                  { id: 'postres', label: '🍰 Postres Fit (Bonus 2)' },
                  { id: 'desayunos', label: '☕ Desayunos Proteicos' },
                  { id: 'comidas', label: '☀️ Comidas Principales' },
                  { id: 'snacks', label: '🍟 Snacks Crujientes' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={(r) => setSelectedRecipe(r)}
                  onAddToMenu={(r) => {
                    setSelectedRecipe(r);
                  }}
                  onAddToShopping={handleAddSingleRecipeToShopping}
                  isFavorite={favoriteIds.includes(recipe.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onStartCooking={(r) => setCookingRecipe(r)}
                />
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 2: MENÚ SEMANAL --- */}
        {activeTab === 'planner' && (
          <WeeklyPlanner
            recipes={recipes}
            currentSlots={currentSlots}
            setSlots={setCurrentSlots}
            onGenerateShoppingList={(ids) => generateShoppingListFromSlots(currentSlots)}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            onNavigateToShopping={() => setActiveTab('shopping')}
          />
        )}

        {/* --- TAB 3: LISTA DE LA COMPRA --- */}
        {activeTab === 'shopping' && (
          <ShoppingList
            items={shoppingItems}
            setItems={setShoppingItems}
            onClearList={() => setShoppingItems([])}
          />
        )}

        {/* --- TAB 4: MI PESO & PROGRESO --- */}
        {activeTab === 'weight' && (
          <WeightTracker
            entries={weightEntries}
            goal={userGoal}
            onAddEntry={handleAddWeightEntry}
            onDeleteEntry={handleDeleteWeightEntry}
            onUpdateGoal={setUserGoal}
          />
        )}

        {/* --- TAB 5: 3 BONUS VIP --- */}
        {activeTab === 'bonuses' && (
          <BonusesSection
            recipes={recipes}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            onAddToMenu={(r) => setSelectedRecipe(r)}
            onAddToShopping={handleAddSingleRecipeToShopping}
            onNavigateToShopping={() => setActiveTab('shopping')}
            onNavigateToPlanner={() => setActiveTab('planner')}
          />
        )}

        {/* --- TAB 6: COMUNIDAD TELEGRAM --- */}
        {activeTab === 'telegram' && <TelegramCommunity />}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500 font-semibold mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              SISTEMA OPTIMIZADO PARA PÉRDIDA DE PESO EN AIRFRYER
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            AirFryFit © 2026 — Recetas Airfryer, Menú Semanal Inteligente & Control de Peso
          </p>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddToMenu={(r) => {
          setActiveTab('planner');
        }}
        onAddToShopping={handleAddSingleRecipeToShopping}
        onStartCooking={(r) => setCookingRecipe(r)}
      />

      {/* Strategic Pricing Valuation Modal */}
      <PricingValuationModal
        isOpen={valuationModalOpen}
        onClose={() => setValuationModalOpen(false)}
      />

      {/* AI Chef Guided Conversation Modal */}
      <AIChefModal
        isOpen={aiChefModalOpen}
        onClose={() => setAiChefModalOpen(false)}
        onAddCustomRecipe={handleAddCustomRecipe}
        onCookRecipe={(r) => setCookingRecipe(r)}
        existingRecipes={recipes}
      />

      {/* Interactive Cooking Mode Modal */}
      <CookingModeModal
        recipe={cookingRecipe}
        onClose={() => setCookingRecipe(null)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={cookingRecipe ? favoriteIds.includes(cookingRecipe.id) : false}
        allRecipes={recipes}
        onSelectRecipe={(r) => setCookingRecipe(r)}
      />

    </div>
  );
}
