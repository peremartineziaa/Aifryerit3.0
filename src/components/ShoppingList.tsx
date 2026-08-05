import React, { useState } from 'react';
import { ShoppingItem } from '../types';
import { AIRFRYER_PANTRY_ESSENTIALS } from '../data/sampleData';
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
  ExternalLink
} from 'lucide-react';

interface ShoppingListProps {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  onClearList: () => void;
}

const CATEGORY_META = {
  verduras: { label: '🥬 Verduras & hortalizas', color: 'emerald' },
  carnes: { label: '🥩 Carnes & Aves magras', color: 'rose' },
  pescados: { label: '🐟 Pescados & Mariscos', color: 'sky' },
  lacteos: { label: '🥛 Lácteos, Huevos & Claras', color: 'amber' },
  despensa: { label: '🥫 Despensa & Especias Airfryer', color: 'orange' },
  frutas: { label: '🍎 Frutas frescas', color: 'purple' },
};

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  setItems,
  onClearList,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingItem['category']>('despensa');
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
      amount: 1,
      unit: 'unidad',
      category: newItemCategory,
      checked: false,
      isManual: true,
    };

    setItems((prev) => [item, ...prev]);
    setNewItemName('');
  };

  const completedCount = items.filter((i) => i.checked).length;
  const progressPct = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  // Group items by category
  const categories = Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[];

  const handleShareWhatsApp = () => {
    const listText = items
      .map((i) => `${i.checked ? '✅' : '☐'} ${i.name} (${i.amount} ${i.unit})`)
      .join('\n');

    const fullMsg = `🛒 *Mi Lista de la Compra AirFryFit*:\n\n${listText}\n\nApp AirFryFit - Recetas & Menús Airfryer`;
    const url = `https://wa.me/?text=${encodeURIComponent(fullMsg)}`;
    window.open(url, '_blank');
  };

  const handleCopyClipboard = () => {
    const listText = items
      .map((i) => `${i.checked ? '✅' : '☐'} ${i.name} (${i.amount} ${i.unit})`)
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
              <span>BONUS 3: LISTA INTELIGENTE DE LA COMPRA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lista de la Compra Automática
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Generada a partir de tu menú semanal. Organizada por pasillos del supermercado para comprar sin rodeos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleShareWhatsApp}
              disabled={items.length === 0}
              className="px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-green-500/20 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar a WhatsApp</span>
            </button>

            <button
              onClick={handleCopyClipboard}
              disabled={items.length === 0}
              className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-colors"
            >
              {copiedText ? '¡Copiada!' : 'Copiar Texto'}
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
          onChange={(e) => setNewItemCategory(e.target.value as any)}
          className="bg-slate-50 border border-slate-200/80 rounded-full px-4 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_META[c].label}
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
            Ve a la pestaña <strong>"Menú Semanal"</strong> y pulsa en <strong>"Generar Lista de Compra"</strong> para extraer automáticamente los ingredientes necesarios.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((catKey) => {
            const catItems = items.filter((i) => i.category === catKey);
            if (catItems.length === 0) return null;

            const meta = CATEGORY_META[catKey];

            return (
              <div
                key={catKey}
                className="bg-white border border-slate-100/90 rounded-[28px] p-6 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-sm">
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
                        <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                          {item.amount} {item.unit}
                        </span>
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
