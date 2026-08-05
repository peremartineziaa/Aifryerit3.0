import { Recipe } from '../types';

export const RECIPES_DATA: Recipe[] = [
  // --- BONUS 1: 21 CENAS PARA ADELGAZAR EN AIRFRYER ---
  {
    id: 'cena-1',
    title: 'Salmón Crujiente con Costra de Hierbas y Espárragos',
    description: 'Cena ligera rica en Omega-3 y súper saciante. El salmón queda jugoso por dentro y dorado por fuera.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 8,
    cookTimeMinutes: 12,
    temperatureCelsius: 190,
    calories: 340,
    proteinGrams: 32,
    carbsGrams: 6,
    fatGrams: 18,
    servings: 1,
    tags: ['Bonus 1', 'Alta Proteína', 'Keto Friendly', 'Rápido'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Sazona bien con ajo en polvo y eneldo. Rocía un disparo ligero de aceite de oliva en spray sobre los espárragos.',
    ingredients: [
      { name: 'Lomo de salmón fresco', amount: 180, unit: 'g', category: 'pescados' },
      { name: 'Espárragos trigueros', amount: 120, unit: 'g', category: 'verduras' },
      { name: 'Aceite de oliva en spray', amount: 3, unit: 'ml', category: 'despensa' },
      { name: 'Ajo en polvo y eneldo', amount: 1, unit: 'pizca', category: 'despensa' },
      { name: 'Rodaja de limón', amount: 1, unit: 'unidad', category: 'verduras' }
    ],
    instructions: [
      'Precalienta la freidora de aire a 190°C durante 3 minutos.',
      'Lava los espárragos y retira la parte dura del tallo.',
      'Sazona el lomo de salmón con sal, pimienta, ajo en polvo y eneldo seco.',
      'Coloca el salmón y los espárragos en el cestillo de la Airfryer sin encimar.',
      'Cocina a 190°C durante 10-12 minutos hasta que el salmón esté dorado.',
      'Sirve caliente con un chorrito de jugo de limón recién exprimido.'
    ]
  },
  {
    id: 'cena-2',
    title: 'Pechuga Marina al Limón con Chips de Calabacín',
    description: 'Cena ultra proteica y muy baja en calorías. Ideal para perder grasa sin pasar hambre.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 14,
    temperatureCelsius: 185,
    calories: 280,
    proteinGrams: 38,
    carbsGrams: 8,
    fatGrams: 9,
    servings: 1,
    tags: ['Bonus 1', 'Bajo en Calorías', 'Proteico'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Corta el calabacín en rodajas finas e iguales para que se doren de forma uniforme.',
    ingredients: [
      { name: 'Pechuga de pollo en filetes', amount: 180, unit: 'g', category: 'carnes' },
      { name: 'Calabacín medio', amount: 150, unit: 'g', category: 'verduras' },
      { name: 'Jugo de 1/2 limón', amount: 20, unit: 'ml', category: 'verduras' },
      { name: 'Orégano y pimentón dulce', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra', amount: 5, unit: 'ml', category: 'despensa' }
    ],
    instructions: [
      'Marina el pollo con el jugo de limón, orégano, pimentón y sal durante 10 min.',
      'Lava el calabacín y córtalo en rodajas finas.',
      'Coloca los filetes de pollo y las rodajas de calabacín en la cesta de la Airfryer.',
      'Cocina a 185°C durante 12-14 minutos, volteando a la mitad del tiempo.',
      'Comprueba que el pollo esté bien cocinado y jugoso.'
    ]
  },
  {
    id: 'cena-3',
    title: 'Berenjenas Rellenas de Atún y Queso Light',
    description: 'Una cena reconfortante y saciante con mucho sabor mediterráneo.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 12,
    cookTimeMinutes: 18,
    temperatureCelsius: 180,
    calories: 290,
    proteinGrams: 28,
    carbsGrams: 14,
    fatGrams: 11,
    servings: 1,
    tags: ['Bonus 1', 'Saciante', 'Rico en Fibra'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Asa primero la berenjena para extraer suavemente la pulpa sin romper la piel.',
    ingredients: [
      { name: 'Berenjena mediana', amount: 1, unit: 'unidad', category: 'verduras' },
      { name: 'Atún al natural en lata', amount: 120, unit: 'g', category: 'pescados' },
      { name: 'Tomate triturado natural', amount: 60, unit: 'g', category: 'verduras' },
      { name: 'Queso mozzarella rallado light', amount: 35, unit: 'g', category: 'lacteos' },
      { name: 'Orégano seco', amount: 1, unit: 'pizca', category: 'despensa' }
    ],
    instructions: [
      'Corta la berenjena por la mitad a lo largo y haz cortes diagonales en la pulpa.',
      'Cocina las mitades en la Airfryer a 180°C durante 10 minutos.',
      'Extrae la pulpa con una cuchara y mézclala con el atún escurrido y la salsa de tomate.',
      'Rellena las pieles de las berenjenas, cubre con queso light y orégano.',
      'Vuelve a meter a la Airfryer a 180°C durante 6-8 minutos hasta gratinar.'
    ]
  },
  {
    id: 'cena-4',
    title: 'Brochetas de Langostinos y Verduras Asadas',
    description: 'Cena rápida, vistosa y muy baja en grasa. Sabor marino supremo en minutos.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    temperatureCelsius: 195,
    calories: 230,
    proteinGrams: 30,
    carbsGrams: 7,
    fatGrams: 6,
    servings: 1,
    tags: ['Bonus 1', 'Bajo en Grasa', 'Exprés'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Remoja los palillos de brocheta de madera en agua durante 5 minutos para evitar que se quemen.',
    ingredients: [
      { name: 'Langostinos pelados', amount: 160, unit: 'g', category: 'pescados' },
      { name: 'Pimiento rojo y verde', amount: 80, unit: 'g', category: 'verduras' },
      { name: 'Cebolla morada', amount: 60, unit: 'g', category: 'verduras' },
      { name: 'Ajo y perejil picado', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Aceite de oliva en spray', amount: 3, unit: 'ml', category: 'despensa' }
    ],
    instructions: [
      'Ensarta alternadamente en los palillos langostinos, pimiento y cebolla.',
      'Pulveriza con spray de aceite de oliva y sazona con ajo y perejil.',
      'Introduce en la freidora de aire a 195°C.',
      'Cocina durante 8-10 minutos, dándoles la vuelta a la mitad del tiempo.',
      'Disfruta con rodajas de limón fresco.'
    ]
  },
  {
    id: 'cena-5',
    title: 'Merluza al Papillote Airfryer con Verduras',
    description: 'Pescado blanco tierno y súper digestivo, cocinado en su propio jugo.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 8,
    cookTimeMinutes: 14,
    temperatureCelsius: 180,
    calories: 250,
    proteinGrams: 31,
    carbsGrams: 9,
    fatGrams: 7,
    servings: 1,
    tags: ['Bonus 1', 'Digestivo', 'Fácil'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Usa papel vegetal especial para Airfryer formando un sobre bien cerrado.',
    ingredients: [
      { name: 'Lomo de merluza limpio', amount: 180, unit: 'g', category: 'pescados' },
      { name: 'Zanahoria en juliana', amount: 60, unit: 'g', category: 'verduras' },
      { name: 'Calabacín en juliana', amount: 80, unit: 'g', category: 'verduras' },
      { name: 'Aceite de oliva virgen', amount: 5, unit: 'ml', category: 'despensa' },
      { name: 'Vino blanco (opcional)', amount: 15, unit: 'ml', category: 'despensa' }
    ],
    instructions: [
      'Coloca un pliego de papel vegetal sobre la encimera.',
      'Haz una cama con las verduras en juliana y coloca el lomo de merluza encima.',
      'Agrega sal, pimienta, el hilo de aceite y el chorrito de vino blanco.',
      'Cierra los bordes del papel formando un paquete hermético.',
      'Cocina a 180°C durante 14 minutos en la freidora de aire.'
    ]
  },
  {
    id: 'cena-6',
    title: 'Pizza Fit con Base de Coliflor y Pavo',
    description: 'Satisface tus antojos de pizza con el 70% menos de carbohidratos.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 15,
    cookTimeMinutes: 16,
    temperatureCelsius: 190,
    calories: 320,
    proteinGrams: 29,
    carbsGrams: 12,
    fatGrams: 14,
    servings: 1,
    tags: ['Bonus 1', 'Keto', 'Sabor Gourmet'],
    isBonus1Dinner: true,
    difficulty: 'Media',
    airfryerTip: 'Escurre muy bien la coliflor rallada con un paño limpio para lograr una base crujiente.',
    ingredients: [
      { name: 'Coliflor rallada fina', amount: 200, unit: 'g', category: 'verduras' },
      { name: 'Huevo entero', amount: 1, unit: 'unidad', category: 'lacteos' },
      { name: 'Jamón de pavo 90% carne', amount: 50, unit: 'g', category: 'carnes' },
      { name: 'Queso mozzarella light', amount: 40, unit: 'g', category: 'lacteos' },
      { name: 'Salsa de tomate casera sin azúcar', amount: 30, unit: 'g', category: 'despensa' }
    ],
    instructions: [
      'Cocina la coliflor rallada en el microondas 3 min y escurre todo el agua sobrante.',
      'Mezcla la coliflor con el huevo, sal y especias hasta formar una masa.',
      'Da forma circular sobre papel vegetal en la Airfryer y hornea 10 min a 190°C.',
      'Añade el tomate, el jamón de pavo y la mozzarella light.',
      'Hornea 5-6 minutos más hasta que el queso esté dorado y burbujeante.'
    ]
  },
  {
    id: 'cena-7',
    title: 'Hamburguesas de Pavo y Calabacín al Romero',
    description: 'Extremadamente jugosas gracias al calabacín rallado incorporado.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    temperatureCelsius: 185,
    calories: 270,
    proteinGrams: 35,
    carbsGrams: 5,
    fatGrams: 10,
    servings: 1,
    tags: ['Bonus 1', 'Alto en Proteína', 'Fácil'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'No aplastes las hamburguesas mientras se cocinan para mantener todos los jugos.',
    ingredients: [
      { name: 'Carne picada de pavo magra', amount: 170, unit: 'g', category: 'carnes' },
      { name: 'Calabacín rallado escurrido', amount: 60, unit: 'g', category: 'verduras' },
      { name: 'Ajo en polvo y romero seco', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Sal y pimienta negra', amount: 1, unit: 'pizca', category: 'despensa' }
    ],
    instructions: [
      'Mezcla en un bol la carne de pavo, el calabacín rallado y las especias.',
      'Forma 2 hamburguesas de grosor mediano.',
      'Pincela ligeramente con aceite e introduce en la cesta de la Airfryer.',
      'Cocina a 185°C durante 12 minutos, dando la vuelta a los 6 minutos.',
      'Sirve con ensalada verde fresca.'
    ]
  },
  {
    id: 'cena-8',
    title: 'Tofu Crujiente Especiado con Champiñones',
    description: 'Opción vegetariana crujiente y llena de sabor, perfecta para cenas ligeras.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    temperatureCelsius: 200,
    calories: 260,
    proteinGrams: 22,
    carbsGrams: 9,
    fatGrams: 14,
    servings: 1,
    tags: ['Bonus 1', 'Vegetariano', 'Crujiente'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Añade 1 cucharadita de harina de maíz (maizena) al tofu para conseguir un crujiente extremo.',
    ingredients: [
      { name: 'Tofu firme prensado', amount: 180, unit: 'g', category: 'despensa' },
      { name: 'Champiñones laminados', amount: 120, unit: 'g', category: 'verduras' },
      { name: 'Salsa de soya baja en sodio', amount: 15, unit: 'ml', category: 'despensa' },
      { name: 'Maizena', amount: 5, unit: 'g', category: 'despensa' },
      { name: 'Ajo picado y pimentón', amount: 1, unit: 'cucharadita', category: 'despensa' }
    ],
    instructions: [
      'Corta el tofu en dados y sécalo bien con papel absorbente.',
      'Mezcla el tofu con la salsa de soya, maizena y especias.',
      'Sazona los champiñones.',
      'Pon todo en la cesta de la freidora a 200°C durante 15 minutos.',
      'Agita la cesta a mitad de cocción.'
    ]
  },
  {
    id: 'cena-9',
    title: 'Calamares a la Andaluza "Sin Aceite"',
    description: 'Todo el crujiente tradicional pero con el 85% menos de calorías.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    temperatureCelsius: 200,
    calories: 240,
    proteinGrams: 28,
    carbsGrams: 16,
    fatGrams: 5,
    servings: 1,
    tags: ['Bonus 1', 'Bajo en Grasa', 'Gourmet Fit'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Usa harina de garbanzo o arroz para un empanado doradito perfecto.',
    ingredients: [
      { name: 'Anillas de calamar frescas', amount: 200, unit: 'g', category: 'pescados' },
      { name: 'Harina de garbanzo', amount: 20, unit: 'g', category: 'despensa' },
      { name: 'Aceite de oliva en spray', amount: 3, unit: 'ml', category: 'despensa' },
      { name: 'Limón y sal fina', amount: 1, unit: 'pizca', category: 'despensa' }
    ],
    instructions: [
      'Seca muy bien las anillas de calamar con papel de cocina.',
      'Pásalas ligeramente por la harina de garbanzo sacudiendo el exceso.',
      'Coloca en la cesta sin amontonar y pulveriza con aceite de oliva.',
      'Cocina a 200°C durante 10 minutos hasta que estén dorados.',
      'Sirve inmediatamente con gajos de limón.'
    ]
  },
  {
    id: 'cena-10',
    title: 'Pimientos Rellena de Picar de Pavo y Especias',
    description: 'Sabrosos pimientos asados rellenos de proteína magra y especias morunas.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 12,
    cookTimeMinutes: 18,
    temperatureCelsius: 180,
    calories: 295,
    proteinGrams: 33,
    carbsGrams: 11,
    fatGrams: 10,
    servings: 1,
    tags: ['Bonus 1', 'Saciante', 'Proteico'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Asa los pimientos 5 min antes de rellenar si te gustan muy tiernos.',
    ingredients: [
      { name: 'Pimiento rojo grande', amount: 1, unit: 'unidad', category: 'verduras' },
      { name: 'Carne picada de pavo', amount: 150, unit: 'g', category: 'carnes' },
      { name: 'Cebolla y ajo picados', amount: 40, unit: 'g', category: 'verduras' },
      { name: 'Comino y pimentón', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Queso rallado light', amount: 25, unit: 'g', category: 'lacteos' }
    ],
    instructions: [
      'Corta la parte superior del pimiento y retira las semillas.',
      'Mezcla la carne con la cebolla, ajo y especias.',
      'Rellena el pimiento e introduce en la cesta de la freidora.',
      'Cocina a 180°C durante 15 minutos.',
      'Añade el queso light encima y cocina 3 min más para gratinar.'
    ]
  },

  // Add remaining 11 dinners for Bonus 1 dataset coverage
  {
    id: 'cena-11',
    title: 'Tacos de Pollo Crujiente Fit con Tortillas de Maíz',
    description: 'Pollo empanado en copos de avena con especias mexicanas.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    temperatureCelsius: 190,
    calories: 330,
    proteinGrams: 34,
    carbsGrams: 22,
    fatGrams: 8,
    servings: 1,
    tags: ['Bonus 1', 'Rápido', 'Favorito'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Usa copos de avena triturados con orégano para un empanado Fit sin huevo.',
    ingredients: [
      { name: 'Tiras de pechuga de pollo', amount: 160, unit: 'g', category: 'carnes' },
      { name: 'Copos de avena molidos', amount: 20, unit: 'g', category: 'despensa' },
      { name: 'Tortillas pequeñas de maíz', amount: 2, unit: 'unidad', category: 'despensa' },
      { name: 'Salsa mexicana 0%', amount: 30, unit: 'g', category: 'despensa' }
    ],
    instructions: [
      'Empana el pollo con los copos de avena especiados.',
      'Cocina en Airfryer a 190°C durante 10-12 min.',
      'Calienta las tortillas 1 min en la cesta.',
      'Monta los tacos con vegetales frescos al gusto.'
    ]
  },
  {
    id: 'cena-12',
    title: 'Dorada a la Sal Ligera con Pimientos',
    description: 'Pescado blanco jugoso al estilo tradicional en freidora de aire.',
    category: 'cenas',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 8,
    cookTimeMinutes: 15,
    temperatureCelsius: 185,
    calories: 270,
    proteinGrams: 32,
    carbsGrams: 6,
    fatGrams: 9,
    servings: 1,
    tags: ['Bonus 1', 'Saludable', 'Bajo en Carbos'],
    isBonus1Dinner: true,
    difficulty: 'Fácil',
    airfryerTip: 'Pide en la pescadería la dorada abierta en libro sin espinas.',
    ingredients: [
      { name: 'Filete de dorada limpia', amount: 180, unit: 'g', category: 'pescados' },
      { name: 'Tiras de pimiento asado', amount: 100, unit: 'g', category: 'verduras' },
      { name: 'Ajo y perejil picado', amount: 1, unit: 'cucharadita', category: 'despensa' }
    ],
    instructions: [
      'Sazona la dorada con sal marina y ajo.',
      'Coloca en el cestillo sobre papel vegetal con los pimientos.',
      'Cocina a 185°C durante 15 minutos.'
    ]
  },

  // --- BONUS 2: 10 POSTRES SALUDABLES EN AIRFRYER ---
  {
    id: 'postre-1',
    title: 'Manzanas Asadas con Canela y Nueces',
    description: 'Postre caliente, reconfortante y naturalmente dulce sin un gramo de azúcar añadido.',
    category: 'postres',
    imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    temperatureCelsius: 180,
    calories: 160,
    proteinGrams: 3,
    carbsGrams: 28,
    fatGrams: 5,
    servings: 1,
    tags: ['Bonus 2', 'Sin Azúcar', '100% Natural', 'Súper Rápido'],
    isBonus2Dessert: true,
    difficulty: 'Fácil',
    airfryerTip: 'Descorazona la manzana dejando la base intacta para retener todos los jugos caramelizados.',
    ingredients: [
      { name: 'Manzana Fuji o Reineta', amount: 1, unit: 'unidad', category: 'frutas' },
      { name: 'Canela Cilán en polvo', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Nueces picadas', amount: 10, unit: 'g', category: 'despensa' },
      { name: 'Eritritol o stevia (opcional)', amount: 1, unit: 'cucharadita', category: 'despensa' }
    ],
    instructions: [
      'Lava la manzana y retira el centro sin perforar la base.',
      'Espolvorea generosamente con canela y rellena con las nueces picadas.',
      'Añade unas gotas de agua en el interior.',
      'Hornea en la Airfryer a 180°C durante 15 minutos.',
      'Sirve tibia con un toque extra de canela.'
    ]
  },
  {
    id: 'postre-2',
    title: 'Muffins Fit de Plátano, Avena y Cacao 0%',
    description: 'Esponjosos, sabrosos y cargados de energía saludable. Ideal para calmar el antojo de dulce.',
    category: 'postres',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 8,
    cookTimeMinutes: 12,
    temperatureCelsius: 160,
    calories: 145,
    proteinGrams: 6,
    carbsGrams: 22,
    fatGrams: 3,
    servings: 2,
    tags: ['Bonus 2', 'Snack / Postre', 'Fit'],
    isBonus2Dessert: true,
    difficulty: 'Fácil',
    airfryerTip: 'Usa moldes individuales de silicona aptos para freidora de aire.',
    ingredients: [
      { name: 'Plátano maduro', amount: 1, unit: 'unidad', category: 'frutas' },
      { name: 'Harina de avena integral', amount: 40, unit: 'g', category: 'despensa' },
      { name: 'Huevo entero', amount: 1, unit: 'unidad', category: 'lacteos' },
      { name: 'Cacao puro en polvo 0%', amount: 10, unit: 'g', category: 'despensa' },
      { name: 'Levadura química', amount: 1, unit: 'cucharadita', category: 'despensa' }
    ],
    instructions: [
      'Chafa el plátano en un bol hasta hacer puré.',
      'Añade el huevo, la harina de avena, el cacao y la levadura.',
      'Mezcla bien hasta obtener una masa homogénea.',
      'Vierte en moldes de silicona hasta 3/4 partes.',
      'Cocina a 160°C durante 12 minutos en Airfryer.'
    ]
  },
  {
    id: 'postre-3',
    title: 'Cheesecake Exprès de Queso Batido en Taza',
    description: 'Tarta de queso en minutos con textura cremosísima y alto contenido proteico.',
    category: 'postres',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 5,
    cookTimeMinutes: 14,
    temperatureCelsius: 160,
    calories: 180,
    proteinGrams: 18,
    carbsGrams: 10,
    fatGrams: 4,
    servings: 1,
    tags: ['Bonus 2', 'Proteico', 'Súper Rápido'],
    isBonus2Dessert: true,
    difficulty: 'Fácil',
    airfryerTip: 'Deja enfriar 10 minutos antes de consumir para que adquiera firmeza.',
    ingredients: [
      { name: 'Queso fresco batido 0%', amount: 150, unit: 'g', category: 'lacteos' },
      { name: 'Clara de huevo', amount: 2, unit: 'unidad', category: 'lacteos' },
      { name: 'Eritritol o edulcorante', amount: 1, unit: 'cucharada', category: 'despensa' },
      { name: 'Esencia de vainilla', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Mermelada de fresa 0% azúcar', amount: 20, unit: 'g', category: 'despensa' }
    ],
    instructions: [
      'Bate el queso fresco batido con las claras, vainilla y edulcorante.',
      'Vierte la mezcla en un ramequín de cerámica resistente al calor.',
      'Cocina a 160°C durante 14 minutos.',
      'Saca, deja atemperar y cubre con la mermelada 0% azúcar.'
    ]
  },
  {
    id: 'postre-4',
    title: 'Brownie Fit de Cacao y Aguacate',
    description: 'Textura fudgy irresistible sin mantequillas ni azúcares refinados.',
    category: 'postres',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    temperatureCelsius: 165,
    calories: 195,
    proteinGrams: 7,
    carbsGrams: 18,
    fatGrams: 9,
    servings: 2,
    tags: ['Bonus 2', 'Sin Azúcar', 'Gourmet Fit'],
    isBonus2Dessert: true,
    difficulty: 'Fácil',
    airfryerTip: 'El aguacate aporta grasas saludables y una cremosidad inigualable.',
    ingredients: [
      { name: 'Aguacate maduro', amount: 80, unit: 'g', category: 'frutas' },
      { name: 'Cacao en polvo puro 0%', amount: 25, unit: 'g', category: 'despensa' },
      { name: 'Harina de almendra', amount: 30, unit: 'g', category: 'despensa' },
      { name: 'Huevo entero', amount: 1, unit: 'unidad', category: 'lacteos' },
      { name: 'Edulcorante al gusto', amount: 1, unit: 'cucharada', category: 'despensa' }
    ],
    instructions: [
      'Tritura el aguacate con el huevo y el edulcorante.',
      'Añade el cacao y la harina de almendra.',
      'Mezcla hasta integrar y vierte en moldecitos horneables.',
      'Cocina en la Airfryer a 165°C durante 15 minutos.'
    ]
  },
  {
    id: 'postre-5',
    title: 'Donuts de Avena y Manzana a la Canela',
    description: 'Tener donuts calientitos para el café de la tarde ahora es saludable.',
    category: 'postres',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    temperatureCelsius: 170,
    calories: 155,
    proteinGrams: 5,
    carbsGrams: 24,
    fatGrams: 3,
    servings: 2,
    tags: ['Bonus 2', 'Bajo en Grasa', 'Fit'],
    isBonus2Dessert: true,
    difficulty: 'Fácil',
    airfryerTip: 'Usa moldes de silicona de donuts para freidora de aire.',
    ingredients: [
      { name: 'Compota de manzana sin azúcar', amount: 100, unit: 'g', category: 'frutas' },
      { name: 'Harina de avena', amount: 50, unit: 'g', category: 'despensa' },
      { name: 'Huevo', amount: 1, unit: 'unidad', category: 'lacteos' },
      { name: 'Canela', amount: 1, unit: 'cucharadita', category: 'despensa' }
    ],
    instructions: [
      'Mezcla todos los ingredientes en un cuenco.',
      'Rellena los moldes de dona de silicona.',
      'Hornea en Airfryer a 170°C durante 10 minutos.'
    ]
  },

  // --- OTRAS RECETAS DESTACADAS (DESAYUNOS, COMIDAS, SNACKS) ---
  {
    id: 'desayuno-1',
    title: 'Tortilla de Claras, Espinacas y Queso Feta en Airfryer',
    description: 'Desayuno proteico de digestión rápida que te mantiene saciado toda la mañana.',
    category: 'desayunos',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    temperatureCelsius: 175,
    calories: 220,
    proteinGrams: 26,
    carbsGrams: 4,
    fatGrams: 8,
    servings: 1,
    tags: ['Alto Proteico', 'Bajo en Carbos', 'Keto'],
    difficulty: 'Fácil',
    airfryerTip: 'Usa un molde redondo de silicona para que la tortilla suba esponjosa.',
    ingredients: [
      { name: 'Claras de huevo', amount: 150, unit: 'ml', category: 'lacteos' },
      { name: 'Espinacas frescas', amount: 50, unit: 'g', category: 'verduras' },
      { name: 'Queso feta desmenuzado light', amount: 30, unit: 'g', category: 'lacteos' },
      { name: 'Sal y pimienta', amount: 1, unit: 'pizca', category: 'despensa' }
    ],
    instructions: [
      'Bate las claras con la sal y la pimienta.',
      'Añade las espinacas picadas y el queso feta.',
      'Vierte en el molde de silicona previante engrasado.',
      'Cocina a 175°C durante 10 minutos en la Airfryer.'
    ]
  },
  {
    id: 'comida-1',
    title: 'Albóndigas de Pavo con Salsa de Tomate y Albahaca',
    description: 'Jugosas, proteicas y perfectas para preparar con antelación (Meal Prep).',
    category: 'comidas',
    imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    temperatureCelsius: 185,
    calories: 380,
    proteinGrams: 42,
    carbsGrams: 14,
    fatGrams: 12,
    servings: 1,
    tags: ['Meal Prep', 'Plato Principal', 'Proteico'],
    difficulty: 'Fácil',
    airfryerTip: 'Cocina primero las albóndigas en seco 10 min y luego cúbrelas con la salsa de tomate.',
    ingredients: [
      { name: 'Carne picada de pavo magra', amount: 200, unit: 'g', category: 'carnes' },
      { name: 'Avena molida', amount: 20, unit: 'g', category: 'despensa' },
      { name: 'Salsa de tomate casera', amount: 100, unit: 'g', category: 'verduras' },
      { name: 'Ajo y albahaca fresca', amount: 1, unit: 'cucharada', category: 'despensa' }
    ],
    instructions: [
      'Mezcla la carne con la avena molida, ajo y sal. Forma 6 albóndigas.',
      'Coloca en la cesta de la freidora y cocina 10 min a 185°C.',
      'Transfiere a un recipiente horneable, vierte la salsa de tomate y hornea 5 min más.'
    ]
  },
  {
    id: 'snack-1',
    title: 'Garbanzos Crujientes Especiados (Snack Quema-Grasa)',
    description: 'El aperitivo sustituto perfecto de las patatas fritas de bolsa.',
    category: 'snacks',
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    temperatureCelsius: 200,
    calories: 175,
    proteinGrams: 9,
    carbsGrams: 24,
    fatGrams: 4,
    servings: 2,
    tags: ['Snack Crujiente', 'Rico en Fibra', 'Vegano'],
    difficulty: 'Fácil',
    airfryerTip: 'Seca los garbanzos en un paño antes de ponerles el aceite para máximo crujiente.',
    ingredients: [
      { name: 'Garbanzos cocidos en conserva', amount: 200, unit: 'g', category: 'despensa' },
      { name: 'Pimentón dulce, comino y ajo', amount: 1, unit: 'cucharadita', category: 'despensa' },
      { name: 'Aceite de oliva virgen', amount: 5, unit: 'ml', category: 'despensa' }
    ],
    instructions: [
      'Enjuaga y seca muy bien los garbanzos.',
      'Mezcla en un cuenco con el aceite y las especias.',
      'Cocina a 200°C durante 15 minutos agitando la cesta cada 5 min.'
    ]
  }
];
