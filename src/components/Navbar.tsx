import React, { useState } from 'react';
import logo from '../assets/images/airfryfit_logo_1786197820048.jpg';
import { 
  Home,
  Utensils, 
  Calendar, 
  ShoppingCart, 
  TrendingDown, 
  Gift, 
  Sparkles, 
  Menu, 
  X,
  CreditCard,
  Crown,
  UserCheck,
  ChefHat,
  Heart,
  User
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAIChef: () => void;
  openCheckout?: () => void;
  openAdminPanel?: () => void;
  isAdmin?: boolean;
  currentRole?: 'admin' | 'plan_29' | 'free';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAIChef,
  openCheckout,
  openAdminPanel,
  isAdmin = false,
  currentRole = 'plan_29',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop navigation items
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'recipes', label: 'Recetas', icon: Utensils },
    { id: 'chef', label: 'Chef IA', icon: ChefHat },
    { id: 'planner', label: 'Mi Menú', icon: Calendar },
    { id: 'shopping', label: 'Compra', icon: ShoppingCart },
    { id: 'weight', label: 'Progreso', icon: TrendingDown },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'bonuses', label: 'Bonus', icon: Gift, badge: 'REGALO' },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  // Mobile Bottom Bar core 5 items
  const bottomNavItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'recipes', label: 'Recetas', icon: Utensils },
    { id: 'chef', label: 'Chef IA', icon: ChefHat },
    { id: 'planner', label: 'Mi menú', icon: Calendar },
    { id: 'shopping', label: 'Compra', icon: ShoppingCart },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const getRoleBadge = () => {
    if (isAdmin || currentRole === 'admin') {
      return (
        <span className="text-[10px] font-black bg-amber-500 text-white px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-xs">
          <Crown className="w-2.5 h-2.5 fill-current" />
          ADMINISTRADOR
        </span>
      );
    }
    if (currentRole === 'plan_29') {
      return (
        <span className="text-[10px] font-extrabold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
          <UserCheck className="w-2.5 h-2.5" />
          USUARIO DE PAGO
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">
        DEMO
      </span>
    );
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* Logo */}
            <div 
              onClick={() => handleTabClick('home')} 
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center p-0.5">
                <img 
                <img 
  src={logo} 
  alt="AirFryFit Logo" 
  className="w-full h-full object-cover rounded-lg"
/>
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    AirFry<span className="text-green-600 font-medium italic">Fit</span>
                  </span>
                  {getRoleBadge()}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-1.5 py-1 px-1 transition-all ${
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

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Button 1: Usuarios de Pago */}
              {openCheckout && (
                <button
                  onClick={openCheckout}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs transition-all shadow-sm"
                  title="Acceso o compra para usuarios de pago (29 €)"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Acceso Pago</span>
                </button>
              )}

              {/* Button 2: Entrar como Administrador */}
              {openAdminPanel && (
                <button
                  onClick={openAdminPanel}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
                    isAdmin || currentRole === 'admin'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500 shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-800'
                  }`}
                  title="Acceso exclusivo para el Administrador"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-300 fill-current" />
                  <span>{isAdmin ? 'Admin' : 'Acceso Admin'}</span>
                </button>
              )}

              {/* Chef AI Assistant Button */}
              <button
                onClick={() => handleTabClick('chef')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs transition-all shadow-sm"
                title="Asistente de Cocina IA AirFryFit"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Chef IA</span>
              </button>
            </div>

            {/* Mobile Top Menu Drawer Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Expanded Drawer for Extra Options */}
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

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {openCheckout && (
                <button
                  onClick={() => {
                    openCheckout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Acceso Usuarios de Pago (29 €)</span>
                </button>
              )}

              {openAdminPanel && (
                <button
                  onClick={() => {
                    openAdminPanel();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-sm"
                >
                  <Crown className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Acceso Administrador</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Fixed Bottom Mobile Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl px-2 py-2">
        <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                  isActive
                    ? 'text-green-600 font-extrabold scale-105'
                    : 'text-slate-400 hover:text-slate-700 font-medium'
                }`}
              >
                <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-green-100 text-green-600' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
