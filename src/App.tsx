import React, { useState, useEffect } from 'react';
import { Recipe, ShoppingItem, WeightEntry, UserGoal, RegisteredUser } from './types';
import { RECIPES_DATA } from './data/recipes';
import { 
  PRESET_WEEKLY_PLANS, 
  INITIAL_WEIGHT_ENTRIES, 
  INITIAL_USER_GOAL,
  KIT_OFFICIAL_SHOPPING_LIST
} from './data/sampleData';

import { Navbar } from './components/Navbar';
import { InicioDashboard } from './components/InicioDashboard';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { ShoppingList } from './components/ShoppingList';
import { WeightTracker } from './components/WeightTracker';
import { FavoritesView } from './components/FavoritesView';
import { BonusesSection } from './components/BonusesSection';
import { ProfileView } from './components/ProfileView';
import { AIChefView } from './components/AIChefView';
import { TelegramCommunity } from './components/TelegramCommunity';
import { AIChefModal } from './components/AIChefModal';
import { CookingModeModal } from './components/CookingModeModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';

import { 
  Search, 
  Sparkles, 
  Gift, 
  Flame,
  Heart,
  Crown
} from 'lucide-react';

export default function App() {
  // Navigation Defaults to 'home' per redesign specification
  const [activeTab, setActiveTab] = useState<string>('home');

  // App Data State
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES_DATA);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['cena-1', 'cena-2', 'postre-1']);
  
  // Weekly Menu Planner Slots
  const [currentSlots, setCurrentSlots] = useState<Record<string, string>>(PRESET_WEEKLY_PLANS[0].slots);
  
  // Shopping List Items initialized with official Kit shopping list
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(KIT_OFFICIAL_SHOPPING_LIST);
  
  // Weight Control State
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(INITIAL_WEIGHT_ENTRIES);
  const [userGoal, setUserGoal] = useState<UserGoal>(INITIAL_USER_GOAL);

  // Modals State
  const [aiChefModalOpen, setAiChefModalOpen] = useState<boolean>(false);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  // Email & Password Management Modals State
  const [emailNotificationOpen, setEmailNotificationOpen] = useState<boolean>(false);
  const [sentEmailAddress, setSentEmailAddress] = useState<string>('');
  const [sentTempPassword, setSentTempPassword] = useState<string>('');

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false);
  const [userEmailToChangePassword, setUserEmailToChangePassword] = useState<string>('');

  // Registered Users Storage State
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = localStorage.getItem('airfryfit_registered_users');
    let baseUsers: RegisteredUser[] = [
      {
        email: 'cliente@ejemplo.com',
        password: 'AF-123456',
        tempPassword: 'AF-123456',
        mustChangePassword: true,
        createdAt: new Date().toISOString(),
      }
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return baseUsers;
  });

  useEffect(() => {
    localStorage.setItem('airfryfit_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Chef AI usage count for Demo user (Max 2 uses)
  const [aiChefUsageCount, setAiChefUsageCount] = useState<number>(() => {
    const saved = localStorage.getItem('airfryfit_ai_chef_usage');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

  useEffect(() => {
    localStorage.setItem('airfryfit_ai_chef_usage', aiChefUsageCount.toString());
  }, [aiChefUsageCount]);

  // User Role & Admin Access State (Defaults to 'free' demo user for initial trial)
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'admin' | 'plan_29' | 'free'>('free');

  // Payment Links State
  const [checkoutUrl29, setCheckoutUrl29] = useState<string>(() => {
    const saved = localStorage.getItem('airfryfit_checkout_url_29');
    return saved || 'https://buy.stripe.com/7sY28s8Jx0tT1sw7vFenS04';
  });
  const [telegramGroupUrl, setTelegramGroupUrl] = useState<string>(() => {
    const saved = localStorage.getItem('airfryfit_telegram_url');
    return saved || 'https://t.me/+p3cyhFZzt6JkZDY8';
  });

  useEffect(() => {
    localStorage.setItem('airfryfit_checkout_url_29', checkoutUrl29);
  }, [checkoutUrl29]);

  useEffect(() => {
    localStorage.setItem('airfryfit_telegram_url', telegramGroupUrl);
  }, [telegramGroupUrl]);

  // Filters State for Recipe Gallery
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

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

  // Payment & Email Dispatch Handler
  const handleProcessPayment = (email: string) => {
    const tempPass = `AF-${Math.floor(100000 + Math.random() * 900000)}`;

    const newUser: RegisteredUser = {
      email: email.toLowerCase().trim(),
      password: tempPass,
      tempPassword: tempPass,
      mustChangePassword: true,
      createdAt: new Date().toISOString(),
    };

    setRegisteredUsers((prev) => [
      newUser,
      ...prev.filter((u) => u.email !== newUser.email),
    ]);

    setSentEmailAddress(email);
    setSentTempPassword(tempPass);
    
    setCheckoutModalOpen(false);
    setEmailNotificationOpen(true);
  };

  // Login Attempt Handler
  const handleLoginAttempt = (emailInput: string, passwordInput: string) => {
    const cleanInput = emailInput.trim();
    const lowerInput = cleanInput.toLowerCase();

    // Privileged User: Lidia / 300177
    if ((lowerInput === 'lidia' || lowerInput === 'lidia@airfryfit.com' || lowerInput === 'lidia@gmail.com') && passwordInput.trim() === '300177') {
      setUserRole('plan_29');
      setIsAdmin(false);
      setCheckoutModalOpen(false);
      alert('¡Sesión de Usuario Especial iniciada correctamente como Lidia (Acceso Total de Pago)!');
      return;
    }

    let existingUser = registeredUsers.find((u) => u.email.toLowerCase() === lowerInput);

    if (!existingUser) {
      existingUser = {
        email: cleanInput,
        password: passwordInput,
        tempPassword: passwordInput,
        mustChangePassword: false,
        createdAt: new Date().toISOString(),
      };
      setRegisteredUsers((prev) => [existingUser!, ...prev]);
    }

    if (existingUser.mustChangePassword) {
      setUserEmailToChangePassword(existingUser.email);
      setCheckoutModalOpen(false);
      setChangePasswordModalOpen(true);
    } else {
      setUserRole('plan_29');
      setIsAdmin(false);
      setCheckoutModalOpen(false);
      alert(`¡Sesión de Usuario de Pago iniciada correctamente como ${existingUser.email}!`);
    }
  };

  // Password Change Handler
  const handleConfirmNewPassword = (newPassword: string) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.email === userEmailToChangePassword) {
          return {
            ...u,
            password: newPassword,
            mustChangePassword: false,
          };
        }
        return u;
      })
    );

    setChangePasswordModalOpen(false);
    setUserRole('plan_29');
    setIsAdmin(false);
    alert('¡Contraseña actualizada correctamente! Bienvenido a AirFryFit.');
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
      
      {/* Top Navbar with Mobile Bottom Nav Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAIChef={() => setAiChefModalOpen(true)}
        openCheckout={() => setCheckoutModalOpen(true)}
        openAdminPanel={() => setAdminModalOpen(true)}
        isAdmin={isAdmin}
        currentRole={userRole}
      />

      {/* Main App Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* --- TAB: INICIO (DESIGND DASHBOARD) --- */}
        {activeTab === 'home' && (
          <InicioDashboard
            onNavigate={(tab) => setActiveTab(tab)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            recipes={recipes}
            weightEntries={weightEntries}
            userGoal={userGoal}
            currentSlots={currentSlots}
            onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
            onStartCooking={(recipe) => setCookingRecipe(recipe)}
            onOpenAIChef={() => setAiChefModalOpen(true)}
            onOpenCheckout={() => setCheckoutModalOpen(true)}
            userRole={userRole}
          />
        )}

        {/* --- TAB: RECETAS AIRFRYER --- */}
        {activeTab === 'recipes' && (
          <div className="space-y-8 animate-fade-in pb-16">
            
            {/* Header / Intro */}
            <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-orange-600" />
                    <span>CATÁLOGO AIRFRYFIT</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    🍗 Recetas para Airfryer
                  </h1>
                  <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
                    Platos fáciles, saludables y crujientes con la temperatura y minutos exactos para tu freidora de aire.
                  </p>
                </div>

                <button
                  onClick={() => setAiChefModalOpen(true)}
                  className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-2 shadow-md transition-all shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Chef IA para tus Ingredientes</span>
                </button>
              </div>

              {/* Recipe Controls: Search & Category Filters */}
              <div className="mt-6 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
                  
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar por plato, ingrediente o etiqueta (ej. salmón, calabacín, keto)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 shadow-xs"
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
                        : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
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
                          : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo Mode Banner */}
            {userRole === 'free' && (
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 p-5 rounded-[28px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-600/30">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-sm shrink-0 shadow-inner">
                    DEMO
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-base">
                      🧪 Estás en la Versión Demo de AirFryFit
                    </h4>
                    <p className="text-xs text-slate-900 font-medium leading-relaxed">
                      Acceso activo a <strong>5 Cenas Ligeras</strong>, <strong>3 Postres Fit</strong>, <strong>2 pruebas del Chef IA</strong> y el <strong>Control de Progreso sin restricciones</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleLoginAttempt('Lidia', '300177')}
                    className="px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs shadow-md transition-all scale-102 hover:scale-105"
                  >
                    👑 Entrar como Lidia (300177)
                  </button>
                  <button
                    onClick={() => setCheckoutModalOpen(true)}
                    className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-black text-xs shadow-md transition-all border border-amber-600"
                  >
                    Desbloquear Todo (29 €)
                  </button>
                </div>
              </div>
            )}

            {/* Recipe Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => {
                const DEMO_ALLOWED_IDS = [
                  'cena-1', 'cena-2', 'cena-3', 'cena-4', 'cena-5',
                  'postre-1', 'postre-2', 'postre-3'
                ];
                const isLocked = userRole === 'free' && !DEMO_ALLOWED_IDS.includes(recipe.id);

                return (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isLockedInDemo={isLocked}
                    onUnlockClick={() => setCheckoutModalOpen(true)}
                    onSelect={(r) => {
                      if (isLocked) {
                        setCheckoutModalOpen(true);
                      } else {
                        setSelectedRecipe(r);
                      }
                    }}
                    onAddToMenu={(r) => {
                      if (isLocked) {
                        setCheckoutModalOpen(true);
                      } else {
                        setSelectedRecipe(r);
                      }
                    }}
                    onAddToShopping={(r) => {
                      if (isLocked) {
                        setCheckoutModalOpen(true);
                      } else {
                        handleAddSingleRecipeToShopping(r);
                      }
                    }}
                    isFavorite={favoriteIds.includes(recipe.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onStartCooking={(r) => {
                      if (isLocked) {
                        setCheckoutModalOpen(true);
                      } else {
                        setCookingRecipe(r);
                      }
                    }}
                  />
                );
              })}
            </div>

          </div>
        )}

        {/* --- TAB: CHEF IA --- */}
        {activeTab === 'chef' && (
          <AIChefView
            onCookRecipe={(r) => setCookingRecipe(r)}
            onAddCustomRecipe={handleAddCustomRecipe}
            userRole={userRole}
            aiChefUsageCount={aiChefUsageCount}
            onIncrementAiChefUsage={() => setAiChefUsageCount((prev) => prev + 1)}
            onOpenCheckout={() => setCheckoutModalOpen(true)}
          />
        )}

        {/* --- TAB: MENÚ SEMANAL --- */}
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

        {/* --- TAB: LISTA DE LA COMPRA --- */}
        {activeTab === 'shopping' && (
          <ShoppingList
            items={shoppingItems}
            setItems={setShoppingItems}
            onClearList={() => setShoppingItems([])}
            onLoadOfficialKitList={() => setShoppingItems(KIT_OFFICIAL_SHOPPING_LIST)}
          />
        )}

        {/* --- TAB: PROGRESO --- */}
        {activeTab === 'weight' && (
          <WeightTracker
            entries={weightEntries}
            goal={userGoal}
            onAddEntry={handleAddWeightEntry}
            onDeleteEntry={handleDeleteWeightEntry}
            onUpdateGoal={setUserGoal}
          />
        )}

        {/* --- TAB: FAVORITOS --- */}
        {activeTab === 'favorites' && (
          <FavoritesView
            recipes={recipes}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            onAddToMenu={(r) => setSelectedRecipe(r)}
            onAddToShopping={handleAddSingleRecipeToShopping}
            onStartCooking={(r) => setCookingRecipe(r)}
            userRole={userRole}
            onOpenCheckout={() => setCheckoutModalOpen(true)}
          />
        )}

        {/* --- TAB: BONUS --- */}
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

        {/* --- TAB: PERFIL --- */}
        {activeTab === 'profile' && (
          <ProfileView
            userRole={userRole}
            isAdmin={isAdmin}
            onOpenCheckout={() => setCheckoutModalOpen(true)}
            onOpenAdminPanel={() => setAdminModalOpen(true)}
            onSwitchRole={setUserRole}
            onNavigateToTelegram={() => setActiveTab('telegram')}
          />
        )}

        {/* --- TAB: COMUNIDAD TELEGRAM --- */}
        {activeTab === 'telegram' && (
          <TelegramCommunity
            hasTelegramAccess={isAdmin || userRole === 'plan_29' || userRole === 'admin'}
            telegramGroupUrl={telegramGroupUrl}
            onOpenCheckout={() => setCheckoutModalOpen(true)}
            userRole={userRole}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500 font-semibold mt-12 mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              AIRFRYFIT — TU ASISTENTE PERSONAL PARA COMER MEJOR CON AIRFRYER
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            AirFryFit © 2026 — Descubrir • Planificar • Comprar • Cocinar • Seguir Progreso
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
        isFavorite={selectedRecipe ? favoriteIds.includes(selectedRecipe.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* AI Chef Guided Conversation Modal */}
      <AIChefModal
        isOpen={aiChefModalOpen}
        onClose={() => setAiChefModalOpen(false)}
        onAddCustomRecipe={handleAddCustomRecipe}
        onCookRecipe={(r) => setCookingRecipe(r)}
        existingRecipes={recipes}
        userRole={userRole}
        aiChefUsageCount={aiChefUsageCount}
        onIncrementAiChefUsage={() => setAiChefUsageCount((prev) => prev + 1)}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
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

      {/* Checkout Modal (Single 29 € Plan with Telegram Gift & Email Key Generation) */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        checkoutUrl29={checkoutUrl29}
        onProcessPayment={handleProcessPayment}
        onLoginAttempt={handleLoginAttempt}
        registeredUsers={registeredUsers}
      />

      {/* Email Dispatch Notification Modal */}
      <EmailNotificationModal
        isOpen={emailNotificationOpen}
        onClose={() => setEmailNotificationOpen(false)}
        userEmail={sentEmailAddress}
        tempPassword={sentTempPassword}
        onProceedToLogin={() => {
          setEmailNotificationOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Force Password Change Modal for First Login */}
      <ChangePasswordModal
        isOpen={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
        userEmail={userEmailToChangePassword}
        onConfirmNewPassword={handleConfirmNewPassword}
      />

      {/* Admin Panel Modal with Login Credentials */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onToggleAdmin={setIsAdmin}
        currentRole={userRole}
        onChangeRole={setUserRole}
        checkoutUrl29={checkoutUrl29}
        telegramUrl={telegramGroupUrl}
        onSaveCheckoutUrls={(u29, tUrl) => {
          setCheckoutUrl29(u29);
          setTelegramGroupUrl(tUrl);
        }}
      />

    </div>
  );
}
