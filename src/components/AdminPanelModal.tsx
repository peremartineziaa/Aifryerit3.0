import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Link as LinkIcon, 
  Save, 
  CheckCircle2, 
  Crown, 
  CreditCard, 
  Users,
  Eye,
  Key,
  User,
  AlertCircle
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onToggleAdmin: (status: boolean) => void;
  currentRole: 'admin' | 'plan_29' | 'free';
  onChangeRole: (role: 'admin' | 'plan_29' | 'free') => void;
  checkoutUrl29: string;
  onSaveCheckoutUrls: (url29: string, telegramUrl: string) => void;
  telegramUrl: string;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onToggleAdmin,
  currentRole,
  onChangeRole,
  checkoutUrl29,
  onSaveCheckoutUrls,
  telegramUrl,
}) => {
  const [url29, setUrl29] = useState(checkoutUrl29);
  const [tUrl, setTUrl] = useState(telegramUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Login Form Credentials State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Private Admin Credentials
    if (usernameInput.trim() === 'Perelidia1' && passwordInput === '1234') {
      setLoginError(false);
      onToggleAdmin(true);
      onChangeRole('admin');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCheckoutUrls(url29, tUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-[36px] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-900">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  PANEL DE ADMINISTRACIÓN
                </span>
                {isAdmin && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full border border-green-500/30">
                    SESIÓN INICIADA
                  </span>
                )}
              </div>
              <h2 className="text-lg font-black text-white">
                {isAdmin ? 'Ajustes de Administrador AirFryFit' : 'Acceso Administrador'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-900">
          
          {/* LOGIN VIEW IF NOT LOGGED IN AS ADMIN */}
          {!isAdmin ? (
            <div className="space-y-6">
              
              <div className="text-center space-y-2 max-w-md mx-auto">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Acceso Administrador</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Introduce tu usuario y contraseña de administración para gestionar enlaces de pago y la App.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="bg-slate-50 border border-slate-200/90 rounded-[28px] p-6 space-y-4 max-w-md mx-auto shadow-sm">
                
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Usuario Administrador:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Usuario"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-slate-500" />
                    <span>Contraseña:</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all scale-101"
                >
                  Entrar como Administrador
                </button>
              </form>

            </div>
          ) : (
            /* ADMIN LOGGED IN VIEW */
            <>
              {/* Admin Active Banner */}
              <div className="bg-gradient-to-r from-amber-50 via-slate-50 to-amber-50 border border-amber-200 rounded-[28px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    ROL ACTUAL
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span>👑 Administrador Principal Activo</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tienes acceso total a la gestión de recetas, menú semanal, enlaces de pago y grupo de Telegram.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onToggleAdmin(false);
                    onChangeRole('plan_29');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs flex items-center gap-2 transition-all shrink-0"
                >
                  <Lock className="w-4 h-4" />
                  <span>Cerrar Sesión Admin</span>
                </button>
              </div>

              {/* Role Simulator */}
              <div className="bg-white border border-slate-200/90 rounded-[28px] p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-700" />
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      Probador de Vista de Usuario
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Cambia la vista activa</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onToggleAdmin(true);
                      onChangeRole('admin');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      currentRole === 'admin'
                        ? 'bg-amber-500 text-white border-amber-500 font-extrabold shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-bold'
                    }`}
                  >
                    <div className="text-xs flex items-center justify-between">
                      <span>Administrador</span>
                      <Crown className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[10px] opacity-80 font-normal mt-0.5">Acceso Total</div>
                  </button>

                  <button
                    onClick={() => {
                      onToggleAdmin(false);
                      onChangeRole('plan_29');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      currentRole === 'plan_29'
                        ? 'bg-slate-900 text-white border-slate-900 font-extrabold shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-bold'
                    }`}
                  >
                    <div className="text-xs flex items-center justify-between">
                      <span>Usuario de Pago (29 €)</span>
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[10px] opacity-80 font-normal mt-0.5">Miembro Activo</div>
                  </button>

                  <button
                    onClick={() => {
                      onToggleAdmin(false);
                      onChangeRole('free');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      currentRole === 'free'
                        ? 'bg-slate-400 text-white border-slate-400 font-extrabold shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-bold'
                    }`}
                  >
                    <div className="text-xs flex items-center justify-between">
                      <span>Visitante</span>
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[10px] opacity-80 font-normal mt-0.5">Sin Pago</div>
                  </button>
                </div>
              </div>

              {/* Form to set Payment Links */}
              <form onSubmit={handleSave} className="bg-white border border-slate-200/90 rounded-[28px] p-5 sm:p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-amber-600" />
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Configuración de Enlaces de Pago Personalizados
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    Stripe / Hotmart / Paypal
                  </span>
                </div>

                {savedSuccess && (
                  <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>¡Enlaces guardados correctamente!</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Enlace de Pago Único (29 €):
                    </label>
                    <input
                      type="url"
                      placeholder="https://buy.stripe.com/..."
                      value={url29}
                      onChange={(e) => setUrl29(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Enlace a tu pasarela donde el cliente pagará los 29 €.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Enlace del Grupo Oficial de Telegram (Regalo):
                    </label>
                    <input
                      type="url"
                      placeholder="https://t.me/+..."
                      value={tUrl}
                      onChange={(e) => setTUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Enlace de invitación al grupo privado de Telegram.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Guardar Cambios de Administrador</span>
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
