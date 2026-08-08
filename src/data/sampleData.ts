import { WeeklyPlan, WeightEntry, UserGoal, TelegramPost, BonusInfo, ShoppingItem } from '../types';

export const INITIAL_USER_GOAL: UserGoal = {
  startWeightKg: 78.5,
  currentWeightKg: 72.8,
  targetWeightKg: 65.0,
  heightCm: 168,
  startDate: '2026-06-01',
  targetDate: '2026-10-15',
};

export const INITIAL_WEIGHT_ENTRIES: WeightEntry[] = [
  { id: 'w1', date: '2026-06-01', weightKg: 78.5, waistCm: 88, notes: 'Comienzo de la app AirFryFit', mood: '💪' },
  { id: 'w2', date: '2026-06-08', weightKg: 77.2, waistCm: 86.5, notes: 'Primera semana completada con éxito', mood: '🔥' },
  { id: 'w3', date: '2026-06-15', weightKg: 76.0, waistCm: 85, notes: 'Me encantan las 21 Cenas en Airfryer', mood: '😊' },
  { id: 'w4', date: '2026-06-22', weightKg: 75.1, waistCm: 84, notes: 'Súper motivada con los postres de avena', mood: '✨' },
  { id: 'w5', date: '2026-06-29', weightKg: 74.3, waistCm: 82.5, notes: 'Progreso constante en el mes 1', mood: '⚡' },
  { id: 'w6', date: '2026-07-06', weightKg: 73.9, waistCm: 81.8, notes: 'Pérdida sostenible sin pasar hambre', mood: '💪' },
  { id: 'w7', date: '2026-07-20', weightKg: 73.2, waistCm: 80.5, notes: 'Pantalones una talla más pequeña!', mood: '🔥' },
  { id: 'w8', date: '2026-08-03', weightKg: 72.8, waistCm: 79.2, notes: '¡-5.7 kg acumulados en total!', mood: '✨' },
];

export const PRESET_WEEKLY_PLANS: WeeklyPlan[] = [
  {
    id: 'reto-21-dias',
    title: '🔥 Reto 21 Días Quemagrasa Airfryer',
    description: 'Menú semanal estructurado con déficit calórico moderado para quemar grasa de forma rápida y saludable.',
    slots: {
      'lunes_desayuno': 'desayuno-1',
      'lunes_comida': 'comida-1',
      'lunes_cena': 'cena-1',
      'lunes_snack': 'snack-1',

      'martes_desayuno': 'desayuno-1',
      'martes_comida': 'comida-1',
      'martes_cena': 'cena-2',
      'martes_snack': 'postre-1',

      'miercoles_desayuno': 'desayuno-1',
      'miercoles_comida': 'comida-1',
      'miercoles_cena': 'cena-3',
      'miercoles_snack': 'snack-1',

      'jueves_desayuno': 'desayuno-1',
      'jueves_comida': 'comida-1',
      'jueves_cena': 'cena-4',
      'jueves_snack': 'postre-2',

      'viernes_desayuno': 'desayuno-1',
      'viernes_comida': 'comida-1',
      'viernes_cena': 'cena-6',
      'viernes_snack': 'snack-1',

      'sabado_desayuno': 'desayuno-1',
      'sabado_comida': 'comida-1',
      'sabado_cena': 'cena-11',
      'sabado_snack': 'postre-3',

      'domingo_desayuno': 'desayuno-1',
      'domingo_comida': 'comida-1',
      'domingo_cena': 'cena-7',
      'domingo_snack': 'postre-4',
    }
  },
  {
    id: 'plan-cenas-ligeras',
    title: '🌙 Especial 21 Cenas Ligeras para Adelgazar',
    description: 'Plan centrado en cenas ultraligeras y ricas en proteína para maximizar la quema nocturna de grasa.',
    slots: {
      'lunes_cena': 'cena-1',
      'martes_cena': 'cena-2',
      'miercoles_cena': 'cena-3',
      'jueves_cena': 'cena-4',
      'viernes_cena': 'cena-5',
      'sabado_cena': 'cena-6',
      'domingo_cena': 'cena-7',
    }
  },
  {
    id: 'plan-low-carb',
    title: '🥑 Plan Express Bajo en Carbohidratos',
    description: 'Enfocado en verduras crujientes, proteínas magras y grasas saludables preparadas en Airfryer.',
    slots: {
      'lunes_desayuno': 'desayuno-1',
      'lunes_cena': 'cena-1',
      'martes_cena': 'cena-8',
      'miercoles_cena': 'cena-9',
      'jueves_cena': 'cena-10',
      'viernes_cena': 'cena-12',
    }
  }
];

export const INITIAL_BONUSES: BonusInfo[] = [
  {
    id: 1,
    title: 'Bonus 1: 21 Cenas para Adelgazar con Airfryer',
    subtitle: 'Recetario exclusivo de cenas rápidas, proteicas y bajas en calorías',
    description: 'Cenas listas en menos de 15 minutos diseñadas para eliminar el hambre nocturna y optimizar la pérdida de grasa mientras duermes.',
    value: 25,
    iconName: 'Moon',
    badge: '¡REGALO INCLUIDO!',
    unlocked: true,
    recipeCount: 21,
  },
  {
    id: 2,
    title: 'Bonus 2: 10 Postres Saludables en Airfryer',
    subtitle: 'Caprichos dulces sin azúcar refinado ni remordimientos',
    description: 'Muffins, brownies, donuts fit y tartas de queso súper cremosas para calmar el antojo dulce de forma 100% saludable.',
    value: 15,
    iconName: 'Cake',
    badge: '¡REGALO INCLUIDO!',
    unlocked: true,
    recipeCount: 10,
  },
  {
    id: 3,
    title: 'Bonus 3: Lista Inteligente de la Compra & Guía de Despensa Airfryer',
    subtitle: 'Módulo interactivo y guía de básicos de cocina saludable',
    description: 'Organiza tus compras automáticamente por pasillo del supermercado y descubre los mejores accesorios y especias para tu freidora de aire.',
    value: 20,
    iconName: 'ShoppingCart',
    badge: '¡REGALO INCLUIDO!',
    unlocked: true,
  }
];

export const SAMPLE_TELEGRAM_POSTS: TelegramPost[] = [
  {
    id: 't1',
    author: 'Elena R. - Madrid',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    time: 'Hace 15 min',
    role: 'Miembro VIP',
    content: '¡Hola a tod@s! Hoy hice el Salmón con costra de hierbas del Bonus 1 y quedó ESPECTACULAR. Jugosísimo por dentro y crujiente fuera. ¡Ya llevo -3.8 kg este mes! 🔥',
    likes: 24,
    recipeTag: 'Salmón Crujiente Airfryer',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 't2',
    author: 'Chef AirFryFit 👨‍🍳',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80',
    time: 'Hace 1 hora',
    role: 'Chef AirFryFit',
    content: '💡 Truco del Día: Si vas a preparar los garbanzos crujientes del menú, sécalos con un paño limpio de cocina antes de pulverizar el spray de oliva. ¡Quedarán el doble de crujientes!',
    likes: 58,
  },
  {
    id: 't3',
    author: 'Carlos M. - Valencia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    time: 'Hace 3 horas',
    role: 'Miembro VIP',
    content: 'Empecé el Reto 21 Días la semana pasada y la lista de la compra automática me ahorró muchísimo tiempo en el súper. Sin desperdiciar nada de comida.',
    likes: 19,
  },
  {
    id: 't4',
    author: 'Dra. Sofía - Nutricionista',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
    time: 'Hace 5 horas',
    role: 'Nutricionista',
    content: 'Recordad que cenar proteína de alta calidad (como el pavo o el salmón) en la Airfryer ayuda a preservar la masa muscular durante el déficit calórico. ¡Seguid así equipazo!',
    likes: 42,
  }
];

export const AIRFRYER_PANTRY_ESSENTIALS = [
  { name: 'Papel vegetal agujereado especial para Airfryer', category: 'Accesorios', note: 'Evita que los alimentos se peguen manteniendo la circulación de aire.' },
  { name: 'Pulverizador/Spray de Aceite de Oliva Virgen Extra', category: 'Básicos', note: 'Permite usar solo 2-3ml de aceite por ración reduciendo el 90% de grasa.' },
  { name: 'Moldes individuales de silicona de 7-8cm', category: 'Accesorios', note: 'Imprescindible para los muffins y cheesecakes del Bonus 2.' },
  { name: 'Eritritol o Estevia líquida pura', category: 'Endulzantes', note: 'Sustituto 0 calorías del azúcar para postres y bebidas.' },
  { name: 'Especias fit: Ajo en polvo, cebolla, pimentón de la Vera, orégano, canela', category: 'Sabor', note: 'Aportan sabor gourmet sin añadir calorías.' },
];

export const KIT_OFFICIAL_SHOPPING_LIST: ShoppingItem[] = [
  // 🥩 CARNES Y AVES
  { id: 'kit_1', name: 'Pechugas de pollo', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_2', name: 'Muslos de pollo', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_3', name: 'Alitas de pollo', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_4', name: 'Pechuga de pavo (filetes y entera)', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_5', name: 'Carne picada de pavo', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_6', name: 'Carne picada magra', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_7', name: 'Solomillo de cerdo', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_8', name: 'Chuletas de cordero', category: 'carnes', checked: false, recipeSource: 'Kit de Inicio' },

  // 🐟 PESCADOS Y MARISCOS
  { id: 'kit_9', name: 'Lomos de salmón', category: 'pescados', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_10', name: 'Lomos de merluza', category: 'pescados', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_11', name: 'Filetes de lubina', category: 'pescados', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_12', name: 'Lomos de bacalao desalado', category: 'pescados', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_13', name: 'Gambas peladas', category: 'pescados', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_14', name: 'Atún en conserva al natural', category: 'pescados', checked: false, recipeSource: 'Kit de Inicio' },

  // 🥚 HUEVOS Y LÁCTEOS
  { id: 'kit_15', name: 'Huevos', category: 'lacteos', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_16', name: 'Queso rallado bajo en grasa', category: 'lacteos', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_17', name: 'Queso fresco batido', category: 'lacteos', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_18', name: 'Queso feta', category: 'lacteos', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_19', name: 'Queso batido 0%', category: 'lacteos', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_20', name: 'Yogur natural', category: 'lacteos', checked: false, recipeSource: 'Kit de Inicio' },

  // 🫘 LEGUMBRES Y OTROS FRESCOS
  { id: 'kit_21', name: 'Garbanzos cocidos', category: 'legumbres', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_22', name: 'Tofu firme', category: 'legumbres', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_23', name: 'Patata cocida', category: 'legumbres', checked: false, recipeSource: 'Kit de Inicio' },

  // 🥦 FRUTAS Y VERDURAS
  { id: 'kit_24', name: 'Calabacín', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_25', name: 'Cebolla', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_26', name: 'Pimiento rojo y verde', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_27', name: 'Espinacas frescas', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_28', name: 'Berenjenas', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_29', name: 'Champiñones portobello', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_30', name: 'Limones', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_31', name: 'Ajo fresco', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_32', name: 'Perejil, romero y eneldo frescos', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_33', name: 'Rúcula', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_34', name: 'Tomate cherry y triturado natural', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_35', name: 'Manzanas', category: 'frutas', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_36', name: 'Plátanos maduros', category: 'frutas', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_37', name: 'Peras conferencia', category: 'frutas', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_38', name: 'Arándanos y frutos rojos', category: 'frutas', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_39', name: 'Piña natural', category: 'frutas', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_40', name: 'Menta fresca', category: 'verduras', checked: false, recipeSource: 'Kit de Inicio' },

  // 🌾 PANADERÍA Y CEREALES
  { id: 'kit_41', name: 'Pan rallado y panko', category: 'panaderia', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_42', name: 'Harina de trigo', category: 'panaderia', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_43', name: 'Harina de avena', category: 'panaderia', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_44', name: 'Copos de avena', category: 'panaderia', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_45', name: 'Tortillas de trigo integral', category: 'panaderia', checked: false, recipeSource: 'Kit de Inicio' },

  // 🧂 DESPENSA Y CONDIMENTOS
  { id: 'kit_46', name: 'Aceite de oliva virgen extra', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_47', name: 'Salsa de soja', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_48', name: 'Mostaza de Dijon', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_49', name: 'Miel', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_50', name: 'Salsa picante tipo buffalo', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_51', name: 'Semillas de sésamo', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_52', name: 'Maicena', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_53', name: 'Cacao puro en polvo', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_54', name: 'Chips de chocolate negro 85%', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_55', name: 'Levadura química', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_56', name: 'Esencia de vainilla', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_57', name: 'Eritritol o edulcorante', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_58', name: 'Vino tinto (opcional)', category: 'despensa', checked: false, recipeSource: 'Kit de Inicio' },

  // 🌿 ESPECIAS BÁSICAS
  { id: 'kit_59', name: 'Pimentón dulce y ahumado', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_60', name: 'Orégano', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_61', name: 'Comino', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_62', name: 'Canela', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_63', name: 'Nuez moscada', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_64', name: 'Ajo y cebolla en polvo', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
  { id: 'kit_65', name: 'Sal y pimienta', category: 'especias', checked: false, recipeSource: 'Kit de Inicio' },
];
