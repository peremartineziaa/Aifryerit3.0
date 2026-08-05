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
