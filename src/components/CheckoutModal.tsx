import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  ExternalLink, 
  Gift,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Mail,
  Lock,
  Key,
  AlertCircle
} from 'lucide-react';
import { RegisteredUser } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl29: string;
  onProcessPayment: (email: string) => void;
  onLoginAttempt: (email: string, passwordInput: string) => void;
  registeredUsers: RegisteredUser[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  checkoutUrl29,
  onProcessPayment,
  onLoginAttempt,
  registeredUsers,
}) => {
  const [activeTabMode, setActiveTabMode] = useState<'checkout' | 'login'>('checkout');
  
  // Checkout Form State
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail || !buyerEmail.includes('@')) {
      setCheckoutError('Por favor introduce un correo electrónico válido para recibir tus accesos.');
      return;
    }

    setCheckoutError('');
    setIsProcessing(true);

    if (checkoutUrl29) {
      window.open(checkoutUrl29, '_blank');
    }

    setTimeout(() => {
      setIsProcessing(false);
      onProcessPayment(buyerEmail.trim());
      setBuyerEmail('');
    }, 600);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Introduce tu usuario (email) y contraseña.');
      return;
    }

    setLoginError('');
    onLoginAttempt(loginEmail.trim(), loginPassword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-[36px] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-900">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-inner flex items-center justify-center p-0.5 shrink-0">
              <img 
                src="/src/assets/images/airfryfit_logo_1786197820048.jpg" 
                alt="AirFryFit Logo" 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  ACCESO USUARIOS DE PAGO
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Plan Completo AirFryFit (29 €)
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

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Tabs: Purchase vs Member Access */}
          <div className="flex rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setActiveTabMode('checkout')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTabMode === 'checkout'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Comprar Acceso (29 €)
            </button>
            <button
              onClick={() => setActiveTabMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTabMode === 'login'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Ya Compré / Iniciar Sesión
            </button>
          </div>

          {activeTabMode === 'checkout' ? (
            /* PURCHASE MODE */
            <div className="space-y-6">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-black uppercase text-green-700 tracking-wider bg-green-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-green-600" />
                  <span>OFERTA DE LANZAMIENTO CON TELEGRAM DE REGALO</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Todo Incluido por solo 29 €
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Un único pago para siempre. Tras tu compra recibirás automáticamente un email desde <strong className="text-slate-900">Airfryfit@gmail.com</strong> con tus claves de acceso.
                </p>
              </div>

              {/* CARD DETAILS */}
              <div className="relative rounded-[32px] p-6 sm:p-7 bg-gradient-to-b from-orange-50/70 via-white to-sky-50/50 border-2 border-orange-500 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-orange-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                      PAGO ÚNICO DE POR VIDA
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">App AirFryFit + Recetario</h4>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through font-bold block">119 €</span>
                    <span className="text-3xl font-black text-slate-900">29 €</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-800 font-bold bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Acceso de por vida a la App AirFryFit</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-800 font-bold bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>80+ Recetas Saludables en Freidora de Aire</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-800 font-bold bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Planificador Semanal + Lista de Compra</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-800 font-bold bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Asistente Inteligente Chef IA</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-800 font-bold bg-white/80 p-2.5 rounded-xl border border-slate-100 sm:col-span-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>3 Ebooks Bonus (21 Cenas, 10 Postres, Guía Despensa)</span>
                  </div>

                  <div className="flex items-start gap-3 text-sky-950 font-extrabold bg-sky-100/90 p-3 rounded-2xl border border-sky-300 sm:col-span-2">
                    <Gift className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sky-900 font-black text-xs block">🎁 DE REGALO CON TU COMPRA:</span>
                      <span className="text-[11px] text-sky-800 font-semibold leading-relaxed">
                        Acceso ilimitado al Grupo Oficial de Telegram para resolver dudas con la nutricionista y compartir platos.
                      </span>
                    </div>
                  </div>
                </div>

                {/* EMAIL REQUEST IN CHECKOUT FORM */}
                <form onSubmit={handleCheckoutSubmit} className="pt-2 space-y-3">
                  {checkoutError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{checkoutError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-orange-600" />
                      <span>Tu Email para envío de claves de acceso (Airfryfit@gmail.com):</span>
                    </label>
                    <input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-300 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500 shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all scale-101 hover:scale-102 active:scale-95"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>{isProcessing ? 'Procesando Pago & Generando Claves...' : 'REALIZAR PAGO DE 29 €'}</span>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </button>
                </form>

              </div>
            </div>
          ) : (
            /* MEMBER LOGIN MODE */
            <div className="bg-slate-50 border border-slate-200/90 rounded-[28px] p-6 space-y-5 text-left">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Iniciar Sesión - Usuario de Pago</h3>
                  <p className="text-xs text-slate-500">
                    Introduce el email y contraseña temporal enviada desde <strong>Airfryfit@gmail.com</strong>
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Email de Usuario:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="tuemail@ejemplo.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Contraseña:</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-green-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Entrar a AirFryFit</span>
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* Guarantee Footer */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
              <div>
                <span className="font-extrabold text-slate-900 block">Pago 100% Seguro & Envío de Accesos</span>
                <span className="text-slate-500">Recibirás un email inmediato de Airfryfit@gmail.com con tus credenciales.</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full shrink-0">
              GARANTÍA DE SATISFACCIÓN
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
