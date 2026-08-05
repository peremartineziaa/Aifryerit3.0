import React from 'react';
import { 
  X, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Gift, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  Check, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface PricingValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingValuationModal: React.FC<PricingValuationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 border-b border-orange-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                Valoración Estratégica de Precio (29€) & Modelo de Negocio
              </h2>
              <p className="text-xs text-amber-200/80">
                Análisis profesional solicitado sobre la viabilidad comercial y comunidad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm leading-relaxed">
          
          {/* Executive Summary Box */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Dictamen: El precio de 29 € es ALTAMENTE RECOMENDADO para la fase de captación</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              El precio de <strong className="text-white">29 € pago único</strong> es la barrera de entrada óptima ("puntos de precio impulso"). Elimina la resistencia que generan las suscripciones mensuales (9.99€/mes) y maximiza la tasa de conversión en campañas publicitarias.
            </p>
          </div>

          {/* Detailed Valuation Breakdown */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span>1. Desglose de Valor Percibido vs Oferta Comercial:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">App AirFryFit (Software + Menús):</span>
                <span className="font-extrabold text-amber-400 text-sm">Valor estimado: 29 €</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Bonus 1: 21 Cenas para Adelgazar:</span>
                <span className="font-extrabold text-orange-400 text-sm">Valor estimado: 25 €</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Bonus 2: 10 Postres Saludables:</span>
                <span className="font-extrabold text-pink-400 text-sm">Valor estimado: 15 €</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Bonus 3: Lista Inteligente & Despensa:</span>
                <span className="font-extrabold text-emerald-400 text-sm">Valor estimado: 20 €</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
                <span className="text-slate-400 font-semibold block">Comunidad VIP Telegram & Nutricionista:</span>
                <span className="font-extrabold text-sky-400 text-sm">Valor estimado: 30 €</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Valor Total Acumulado del Paquete:</span>
                <span className="text-xl font-black text-slate-400 line-through">119 €</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-400 font-bold block uppercase">Oferta de Lanzamiento:</span>
                <span className="text-3xl font-black text-emerald-400">29 € <span className="text-xs font-normal text-slate-300">pago único</span></span>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span>2. Estrategia de Monetización Híbrida Recomendada:</span>
            </h3>

            <div className="space-y-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <h4 className="font-bold text-orange-400 text-xs uppercase tracking-wider">Paso 1: Front-End Offer (29 € Pago Único)</h4>
                <p className="text-xs text-slate-300">
                  Vender la app + los 3 Bonus + el grupo de Telegram por 29 €. Esto genera ingresos rápidos y cubre los costes de adquisición de clientes (CAC).
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <h4 className="font-bold text-sky-400 text-xs uppercase tracking-wider">Paso 2: Back-End Upsell (Recurrencia de 9.99 €/mes)</h4>
                <p className="text-xs text-slate-300">
                  Tras 30 días de uso, ofrecer un "Club VIP Nutrición Avanzada" con directos semanales con la nutricionista, rutinas de ejercicios de 15 min y menús de temporada actualizados cada mes.
                </p>
              </div>
            </div>
          </div>

          {/* Telegram Assessment */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-400" />
              <span>3. Valoración de la Creación del Grupo de Telegram:</span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-xs text-slate-300">
                La creación del grupo de Telegram es un <strong className="text-white font-semibold">elemento diferencativo clave</strong>. Transforma un simple recetario estático en una <strong className="text-sky-400 font-semibold">comunidad viva de transformación personal</strong>. Rediseña la experiencia del usuario y multiplica la recomendación orgánica.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow"
          >
            Entendido, Cerrar Análisis
          </button>
        </div>

      </div>
    </div>
  );
};
