import React, { useState } from 'react';
import { Lock, ShieldAlert, Key, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onConfirmNewPassword: (newPassword: string) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  onConfirmNewPassword,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setErrorMsg('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Verifícalas e inténtalo de nuevo.');
      return;
    }

    setErrorMsg('');
    onConfirmNewPassword(newPassword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-[36px] shadow-2xl overflow-hidden my-6 flex flex-col text-slate-900">
        
        {/* Header Bar */}
        <div className="p-5 bg-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                CAMBIO DE CONTRASEÑA OBLIGATORIO
              </span>
              <h2 className="text-base font-black text-white">
                Primer Inicio de Sesión
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-amber-600/50 hover:bg-amber-600 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Protección de tu cuenta AirFryFit</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Hola <strong>{userEmail}</strong>. Por motivos de seguridad, debes actualizar la contraseña temporal por una contraseña personal definitiva antes de acceder a la App.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Nueva Contraseña Definitiva:</span>
            </label>
            <input
              type="password"
              placeholder="Escribe tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Confirmar Nueva Contraseña:</span>
            </label>
            <input
              type="password"
              placeholder="Repite la nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all scale-101"
            >
              Guardar Contraseña y Entrar a la App
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
