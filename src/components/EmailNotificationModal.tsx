import React from 'react';
import { Mail, CheckCircle2, X, Lock, Key, ArrowRight, ShieldCheck } from 'lucide-react';

interface EmailNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  tempPassword: string;
  onProceedToLogin: () => void;
}

export const EmailNotificationModal: React.FC<EmailNotificationModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  tempPassword,
  onProceedToLogin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-[36px] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-900">
        
        {/* Email Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-green-500/20 text-green-300 px-2.5 py-0.5 rounded-full border border-green-500/30">
                  CORREO ENVIADO CON ÉXITO
                </span>
              </div>
              <h2 className="text-base font-black text-white">
                Airfryfit@gmail.com
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

        {/* Email Content Container */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-slate-800 text-xs leading-relaxed">
          
          {/* Email Info Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 font-sans">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-bold text-slate-700">De: <strong className="text-slate-900">Airfryfit@gmail.com</strong></span>
              <span>Hace un instante</span>
            </div>
            <div className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5">
              <span className="font-bold text-slate-700">Para: <strong className="text-green-700">{userEmail}</strong></span>
            </div>
            <div className="text-[11px] font-bold text-slate-800 border-t border-slate-200/60 pt-1.5">
              Asunto: ¡Bienvenido/a a AirfryerFit! 💚 - Tus Datos de Acceso
            </div>
          </div>

          {/* EXACT EMAIL BODY REQUESTED BY USER */}
          <div className="bg-green-50/50 border border-green-200/80 rounded-2xl p-5 space-y-3 font-sans text-slate-800">
            <p className="font-bold text-sm text-slate-900">¡Hola! 👋</p>
            <p className="font-bold text-slate-900">¡Bienvenido/a a AirfryerFit! 💚</p>
            
            <p>
              A partir de hoy tienes todo lo necesario para hacer que tu Airfryer sea tu mejor aliada para comer rico, fácil y saludable.
            </p>

            <p className="font-bold text-slate-900">🔥 ¿Por dónde empezar?</p>
            
            <p>Entra en AirfryerFit y descubre:</p>

            <ul className="space-y-1 pl-1">
              <li>🥗 Recetas saludables para todos los días</li>
              <li>⏱️ Recetas rápidas y fáciles de preparar</li>
              <li>🍗 Ideas para comidas y cenas con Airfryer</li>
              <li>❤️ Opciones pensadas para ayudarte a mejorar tus hábitos</li>
              <li>✨ Nuevas ideas para que nunca te quedes sin saber qué cocinar</li>
            </ul>

            <p>Nuestro consejo: no intentes verlo todo de golpe.</p>

            <p>👉 Entra ahora en AirfryerFit, elige una receta que te apetezca y prepárala hoy.</p>

            <p>Cada pequeño cambio cuenta.</p>

            <p className="font-bold text-slate-900">¡Nos alegra muchísimo tenerte con nosotros! 💚</p>

            <p className="font-bold text-slate-900">¡Vamos a cocinar! 🔥</p>

            <p className="font-extrabold text-slate-900 text-xs">El equipo de AirfryerFit</p>
          </div>

          {/* CREDENTIALS HIGHLIGHT BOX */}
          <div className="bg-slate-900 text-white border-2 border-amber-400 rounded-2xl p-4.5 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                <Key className="w-3.5 h-3.5" /> DATOS DE ACCESO GENERADOS
              </span>
              <span className="text-[9px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                🔒 PRIMER ACCESO
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Usuario (Email):</span>
                <span className="font-mono font-bold text-white text-xs">{userEmail}</span>
              </div>

              <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Contraseña Temporal:</span>
                <span className="font-mono font-bold text-amber-400 text-sm tracking-wider">{tempPassword}</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-[11px] text-amber-200 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Obligatorio:</strong> La primera vez que entres con esta contraseña temporal, el sistema te exigirá cambiar tu contraseña antes de acceder.
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={onProceedToLogin}
              className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 transition-all scale-101"
            >
              <span>Ir a Iniciar Sesión con mi Usuario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
