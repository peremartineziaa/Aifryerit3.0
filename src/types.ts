export type RecipeCategory = 
  | 'desayunos' 
  | 'comidas' 
  | 'cenas' 
  | 'postres' 
  | 'snacks';

export type ShoppingCategory = 
  | 'carnes'
  | 'pescados'
  | 'lacteos'
  | 'legumbres'
  | 'verduras'
  | 'panaderia'
  | 'despensa'
  | 'especias'
  | 'frutas';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  imageUrl: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  temperatureCelsius: number;
  calories: number; // kcal
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  servings: number;
  tags: string[]; // e.g. ["Bajo en carbos", "Rápido", "Bonus 1", "Bonus 2", "Proteico"]
  isBonus1Dinner?: boolean;
  isBonus2Dessert?: boolean;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    category: ShoppingCategory;
  }[];
  instructions: string[];
  airfryerTip: string;
  difficulty: 'Fácil' | 'Media' | 'Avanzada';
}

export type MealType = 'desayuno' | 'comida' | 'cena' | 'snack';
export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export interface MealSlot {
  day: DayOfWeek;
  mealType: MealType;
  recipeId?: string;
  customTitle?: string;
}

export interface WeeklyPlan {
  id: string;
  title: string;
  description: string;
  slots: Record<string, string>; // key: `${day}_${mealType}`, value: recipeId
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  category: ShoppingCategory;
  checked: boolean;
  recipeSource?: string;
  isManual?: boolean;
}

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  waistCm?: number;
  notes?: string;
  mood?: '😊' | '🔥' | '💪' | '✨' | '⚡';
}

export interface UserGoal {
  startWeightKg: number;
  targetWeightKg: number;
  currentWeightKg: number;
  heightCm: number;
  startDate: string;
  targetDate: string;
}

export interface TelegramPost {
  id: string;
  author: string;
  avatar: string;
  time: string;
  role: 'Miembro VIP' | 'Chef AirFryFit' | 'Nutricionista' | 'Moderador';
  content: string;
  likes: number;
  recipeTag?: string;
  imageUrl?: string;
}

export interface BonusInfo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  value: number; // Valuation in Euros e.g. 25
  iconName: string;
  badge: string;
  unlocked: boolean;
  recipeCount?: number;
}

export interface RegisteredUser {
  email: string;
  password: string;
  tempPassword?: string;
  mustChangePassword: boolean;
  createdAt: string;
}

