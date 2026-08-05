import React, { useState } from 'react';
import { 
  Utensils, 
  Calendar, 
  ShoppingCart, 
  TrendingDown, 
  Gift, 
  MessageSquare, 
  Sparkles, 
  Menu, 
  X,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAIChef: () => void;
  openValuationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAIChef,
  openValuationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'recipes', label: 'Recetas Airfryer', icon: Utensils },
    { id: 'planner', label: 'Menú Semanal', icon: Calendar },
    { id: 'shopping', label: 'Lista Compra', icon: ShoppingCart },
    { id: 'weight', label: 'Mi Peso & Progreso', icon: TrendingDown },
    { id: 'bonuses', label: '3 Bonus VIP', icon: Gift, badge: 'REGALO' },
    { id: 'telegram', label: 'Comunidad Telegram', icon: MessageSquare, badge: 'VIP' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => handleTabClick('recipes')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  AirFry<span className="text-green-600 font-medium italic">Fit</span>
                </span>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">
                  PLAN 29€
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 py-1 transition-all ${
                    isActive
                      ? 'text-green-600 border-b-2 border-green-500 font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: AI Chef & Price Assessment */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={openAIChef}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Chef AI</span>
            </button>

            <button
              onClick={openValuationModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              title="Valoración de Precio (29€) y Estrategia"
            >
              <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
              <span>Análisis 29€</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={openAIChef}
              className="p-2 rounded-xl bg-green-500 text-white shadow-sm"
              title="Chef AI"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-700 font-extrabold border border-green-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                openValuationModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold"
            >
              <HelpCircle className="w-4 h-4 text-orange-500" />
              <span>Análisis Valoración 29€</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
