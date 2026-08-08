import React, { useState } from 'react';
import { ShoppingItem, ShoppingCategory } from '../types';
import { AIRFRYER_PANTRY_ESSENTIALS, KIT_OFFICIAL_SHOPPING_LIST } from '../data/sampleData';
import { 
  ShoppingCart, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Share2, 
  Check, 
  Sparkles, 
  Info, 
  Lightbulb,
  RotateCcw
} from 'lucide-react';

interface ShoppingListProps {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  onClearList: () => void;
  onLoadOfficialKitList?: () => void;
}

const CATEGORY_META: Record<ShoppingCategory, { label: string; color: string }> = {
  carnes: { label: '🥩 CARNES Y AVES', color: 'rose' },
  pescados: { label: '🐟 PESCADOS Y MARISCOS', color: 'sky' },
  lacteos: { label: '🥚 HUEVOS Y LÁCTEOS', color: 'amber' },
  legumbres: { label: '🫘 LEGUMBRES Y OTROS FRESCOS', color: 'emerald' },
  verduras: { label: '🥦 FRUTAS Y VERDURAS', color: 'green' },
  frutas: { label: '🍎 FRUTAS FRESCAS', color: 'purple' },
  panaderia: { label: '🌾 PANADERÍA Y CEREALES', color: 'yellow' },
  despensa: { label: '🧂 DESPENSA Y CONDIMENTOS', color: 'orange' },
  especias: { label: '🌿 ESPECIAS BÁSICAS', color: 'teal' },
};

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  setItems,
  onClearList,
  onLoadOfficialKitList,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingCategory>('despensa');
  const [copiedText, setCopiedText] = useState(false);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const item: ShoppingItem = {
      id: 'manual_' + Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
      checked: false,
      isManual: true,
    };

    setItems((prev) => [item, ...prev]);
    setNewItemName('');
  };

  const handleLoadOfficialKit = () => {
    if (onLoadOfficialKitList) {
      onLoadOfficialKitList();
    } else {
      setItems(KIT_OFFICIAL_SHOPPING_LIST);
    }
  };

  const completedCount = items.filter((i) => i.checked).length;
  const progressPct = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  // Group items by category in the exact order specified
  const categoryOrder: ShoppingCategory[] = [
    'carnes',
    'pescados',
    'lacteos',
    'legumbres',
    'verduras',
    'frutas',
    'panaderia',
    'despensa',
    'especias',
  ];

  const handleShareWhatsApp = () => {
    const listText = items
      .map((i) => `${i.checked ? '✅' : '☐'} ${i.name}${i.amount && i.unit ? ` (${i.amount} ${i.unit})` : ''}`)
      .join('\n');

    const fullMsg = `🛒 *LISTA INTELIGENTE DE LA COMPRA - KIT DE INICIO AIRFRYER FIT*:\n\n${listText}\n\nApp AirFryFit - 21 Cenas y 10 Postres`;
    const url = `https://wa.me/?text=${encodeURIComponent(fullMsg)}`;
    window.open(url, '_blank');
  };

  const handleCopyClipboard = () => {
    const listText = items
      .map((i) => `${i.checked ? '✅' : '☐'} ${i.name}${i.amount && i.unit ? ` (${i.amount} ${i.unit})` : ''}`)
      .join('\n');
    navigator.clipboard?.writeText?.(listText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KIT DE INICIO • LISTA INTELIGENTE DE LA COMPRA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lista Inteligente de la Compra
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Todo lo que necesitas para las <strong>21 cenas</strong> y los <strong>10 postres</strong> de tu Kit, organizado por secciones de supermercado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadOfficialKit}
              className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              title="Cargar la lista completa de las 21 cenas y 10 postres"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Cargar Lista Oficial Kit (21 Cenas + 10 Postres)</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              disabled={items.length === 0}
              className="px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-green-500/20 transition-all disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyClipboard}
              disabled={items.length === 0}
              className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-colors disabled:opacity-50"
            >
              {copiedText ? '¡Copiada!' : 'Copiar'}
            </button>

            {items.length > 0 && (
              <button
                onClick={onClearList}
                className="p-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors"
                title="Vaciar Lista"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {items.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600">
                Progreso de Compra: {completedCount} de {items.length} productos
              </span>
              <span className="text-green-600 font-black">{progressPct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="bg-white border border-slate-100/90 rounded-[24px] p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Añadir otro producto (ej: Papel vegetal Airfryer, servilletas...)"
          className="flex-1 bg-slate-50 border border-slate-200/80 rounded-full px-5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as ShoppingCategory)}
          className="bg-slate-50 border border-slate-200/80 rounded-full px-4 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none"
        >
          {categoryOrder.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_META[c]?.label || c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir</span>
        </button>
      </form>

      {/* Shopping Categories & Items */}
      {items.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-[32px] p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 mx-auto flex items-center justify-center">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Tu lista está vacía</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Pulsa en <strong>"Cargar Lista Oficial Kit"</strong> para ver todos los ingredientes de las 21 cenas y 10 postres, o genera tu lista desde la pestaña <strong>"Menú Semanal"</strong>.
          </p>
          <button
            onClick={handleLoadOfficialKit}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full inline-flex items-center gap-2 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Cargar Lista del Kit de Inicio</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryOrder.map((catKey) => {
            const catItems = items.filter((i) => i.category === catKey);
            if (catItems.length === 0) return null;

            const meta = CATEGORY_META[catKey] || { label: catKey, color: 'emerald' };

            return (
              <div
                key={catKey}
                className="bg-white border border-slate-100/90 rounded-[28px] p-6 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">
                    {meta.label}
                  </h3>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                    {catItems.length} items
                  </span>
                </div>

                <ul className="space-y-2">
                  {catItems.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                        item.checked
                          ? 'bg-slate-50 border-slate-200/60 text-slate-400 line-through'
                          : 'bg-white border-slate-100 text-slate-800 hover:border-green-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.checked ? (
                          <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs font-semibold">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.amount && item.unit ? (
                          <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                            {item.amount} {item.unit}
                          </span>
                        ) : null}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(item.id);
                          }}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* Official Tip Box from PDF */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-[24px] p-5 flex items-start gap-3.5 shadow-sm">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          <strong>Consejo Kit:</strong> marca cada casilla a medida que llenas el carrito, y guarda esta lista — la volverás a usar cada semana con las recetas del Kit.
        </p>
      </div>

      {/* Airfryer Pantry Essentials Guide */}
      <div className="bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Guía de Despensa & Imprescindibles Airfryer (Bonus 3)</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Ten siempre estos básicos en casa para preparar cualquier receta de la app en menos de 15 minutos:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AIRFRYER_PANTRY_ESSENTIALS.map((ess, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-1">
              <span className="text-[9px] font-extrabold uppercase bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full">
                {ess.category}
              </span>
              <h5 className="font-bold text-slate-900 pt-1">{ess.name}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">{ess.note}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

