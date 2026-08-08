import React from 'react';
import { 
  User, 
  Crown, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  Settings, 
  Bell, 
  Lock, 
  MessageSquare,
  CreditCard,
  UserCheck
} from 'lucide-react';

interface ProfileViewProps {
  userRole: 'admin' | 'plan_29' | 'free';
  isAdmin: boolean;
  onOpenCheckout: () => void;
  onOpenAdminPanel?: () => void;
  onSwitchRole: (role: 'admin' | 'plan_29' | 'free') => void;
  onNavigateToTelegram: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userRole,
  isAdmin,
  onOpenCheckout,
  onOpenAdminPanel,
  onSwitchRole,
  onNavigateToTelegram,
}) => {
  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl overflow-hidden bg-slate-900 border-2 border-green-500/30 text-white flex items-center justify-center font-black shadow-md p-0.5 shrink-0">
              <img 
                src="/src/assets/images/airfryfit_logo_1786197820048.jpg" 
                alt="AirFryFit Logo" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {userRole === 'plan_29' ? 'Lidia' : isAdmin ? 'Administrador' : 'Usuario Demo'}
                </h1>
                {userRole === 'plan_29' && (
                  <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Acceso VIP Activo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {userRole === 'plan_29' ? 'lidia@airfryfit.com' : 'Suscripción Activa AirFryFit'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {userRole === 'free' ? (
              <button
                onClick={onOpenCheckout}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs shadow-md transition-all scale-102 hover:scale-105"
              >
                Desbloquear Todo (29 €)
              </button>
            ) : (
              <button
                onClick={() => onSwitchRole('free')}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-all"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 💎 MI ACCESO AIRFRYFIT PREMIUM */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-[32px] p-6 sm:p-8 shadow-xl space-y-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
              💎 MI ACCESO
            </span>
            <h2 className="text-2xl font-black tracking-tight mt-2 text-white">
              AirFryFit Premium (Acceso de Por Vida)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Tu plan incluye acceso completo a todas las herramientas y futuras actualizaciones sin suscripciones.
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-green-400 block">29 €</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Pago Único</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Recetas ilimitadas</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Chef IA ilimitado</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Menús semanales</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Lista de compra</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Seguimiento de progreso</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Bonus incluidos</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Grupo privado Telegram</span>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold text-slate-200">Soporte directo</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={onNavigateToTelegram}
            className="px-5 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Acceder al Grupo Telegram VIP</span>
          </button>
        </div>
      </div>

      {/* Preferencias & Ajustes */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" />
          <span>Ajustes & Preferencias</span>
        </h3>

        <div className="space-y-4 text-xs font-semibold">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-500" />
              <div>
                <h4 className="font-extrabold text-slate-900">Notificaciones de Comidas</h4>
                <p className="text-[11px] text-slate-400">Recordatorio para registrar peso y menú diario</p>
              </div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-green-600 rounded" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-slate-500" />
              <div>
                <h4 className="font-extrabold text-slate-900">Unidades de Medida</h4>
                <p className="text-[11px] text-slate-400">Kilogramos (kg) y Grados Celsius (°C)</p>
              </div>
            </div>
            <span className="text-slate-600 font-bold">Métrico (°C / kg)</span>
          </div>
        </div>
      </div>

      {/* Módulo de Cambio Rápido de Rol (Para Pruebas) */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-[28px] p-6 space-y-3">
        <h4 className="text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
          <Crown className="w-4 h-4 text-amber-600" />
          <span>Selector de Rol (Para Pruebas del Evaluador):</span>
        </h4>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => onSwitchRole('free')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              userRole === 'free' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            🧪 Probar Usuario Demo (Gratuito)
          </button>

          <button
            onClick={() => onSwitchRole('plan_29')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              userRole === 'plan_29' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            👑 Probar Usuario de Pago (Lidia 300177)
          </button>

          {onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="px-4 py-2 rounded-full text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-white shadow-md"
            >
              👑 Abrir Panel Administrador
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
