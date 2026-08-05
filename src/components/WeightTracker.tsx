import React, { useState } from 'react';
import { WeightEntry, UserGoal } from '../types';
import { 
  TrendingDown, 
  Plus, 
  Target, 
  Award, 
  Calendar, 
  Sparkles, 
  Scale, 
  Smile, 
  Trash2,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

interface WeightTrackerProps {
  entries: WeightEntry[];
  goal: UserGoal;
  onAddEntry: (entry: WeightEntry) => void;
  onDeleteEntry: (id: string) => void;
  onUpdateGoal: (goal: UserGoal) => void;
}

export const WeightTracker: React.FC<WeightTrackerProps> = ({
  entries,
  goal,
  onAddEntry,
  onDeleteEntry,
  onUpdateGoal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState<string>('');
  const [newWaist, setNewWaist] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newMood, setNewMood] = useState<WeightEntry['mood']>('💪');

  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const currentWeight = sortedEntries.length > 0 ? sortedEntries[sortedEntries.length - 1].weightKg : goal.currentWeightKg;
  const initialWeight = sortedEntries.length > 0 ? sortedEntries[0].weightKg : goal.startWeightKg;
  
  const totalLost = Math.round((initialWeight - currentWeight) * 10) / 10;
  const remainingToGoal = Math.round((currentWeight - goal.targetWeightKg) * 10) / 10;
  
  const totalGoalDifference = initialWeight - goal.targetWeightKg;
  const progressPct = totalGoalDifference > 0 
    ? Math.min(100, Math.max(0, Math.round(((initialWeight - currentWeight) / totalGoalDifference) * 100))) 
    : 0;

  // Calculate BMI (IMC)
  const heightInMeters = goal.heightCm / 100;
  const bmi = Math.round((currentWeight / (heightInMeters * heightInMeters)) * 10) / 10;

  let bmiCategory = 'Normopeso';
  let bmiColor = 'text-emerald-400 bg-emerald-500/20';
  if (bmi < 18.5) {
    bmiCategory = 'Bajo peso';
    bmiColor = 'text-amber-400 bg-amber-500/20';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Sobrepeso ligero';
    bmiColor = 'text-orange-400 bg-orange-500/20';
  } else if (bmi >= 30) {
    bmiCategory = 'Obesidad';
    bmiColor = 'text-rose-400 bg-rose-500/20';
  }

  // Monthly breakdown calculation
  const getMonthlyBreakdown = () => {
    const months: Record<string, { start: number; end: number }> = {};
    sortedEntries.forEach((e) => {
      const monthKey = e.date.substring(0, 7); // YYYY-MM
      if (!months[monthKey]) {
        months[monthKey] = { start: e.weightKg, end: e.weightKg };
      } else {
        months[monthKey].end = e.weightKg;
      }
    });

    return Object.entries(months).map(([month, data]) => {
      const diff = Math.round((data.start - data.end) * 10) / 10;
      const dateObj = new Date(month + '-01');
      const monthName = dateObj.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      return { monthName, diff, start: data.start, end: data.end };
    });
  };

  const monthlyBreakdown = getMonthlyBreakdown();

  const handleAddWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;

    const entry: WeightEntry = {
      id: 'w_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      weightKg: parseFloat(newWeight),
      waistCm: newWaist ? parseFloat(newWaist) : undefined,
      notes: newNotes.trim() || undefined,
      mood: newMood,
    };

    onAddEntry(entry);
    setNewWeight('');
    setNewWaist('');
    setNewNotes('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100/90 rounded-[32px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONTROL DE PESO Y PROGRESO MENSUAL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Evolución de Tu Pérdida de Peso
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Visualiza tus resultados semanales y mensuales. Perder peso de forma constante con Airfryer mantiene tu vitalidad y masa muscular.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-green-500/20 transition-all scale-102 hover:scale-105 shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Registrar Peso Hoy</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Peso Inicial</span>
          <div className="text-2xl font-black text-slate-900">{initialWeight} <span className="text-xs font-normal text-slate-400">kg</span></div>
          <span className="text-[10px] text-slate-400 font-medium">Inicio de plan</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Peso Actual</span>
          <div className="text-2xl font-black text-green-600">{currentWeight} <span className="text-xs font-normal text-slate-400">kg</span></div>
          <span className="text-[10px] text-green-700 font-extrabold bg-green-100 px-2 py-0.5 rounded-full inline-block">-{totalLost} kg total</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Meta de Peso</span>
          <div className="text-2xl font-black text-slate-900">{goal.targetWeightKg} <span className="text-xs font-normal text-slate-400">kg</span></div>
          <span className="text-[10px] text-slate-500 font-medium">Faltan {remainingToGoal > 0 ? remainingToGoal : 0} kg</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Índice IMC</span>
          <div className="text-2xl font-black text-slate-900">{bmi}</div>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${bmiColor}`}>
            {bmiCategory}
          </span>
        </div>

      </div>

      {/* Goal Progress Bar */}
      <div className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2 text-slate-800">
            <Target className="w-4 h-4 text-green-600" />
            <span>Progreso hacia la Meta ({goal.targetWeightKg} kg):</span>
          </div>
          <span className="text-green-600 font-black">{progressPct}% completado</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-green-500 transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Recharts Chart */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Gráfica de Evolución de Peso (Semanas & Meses)</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Línea punteada verde = Meta ({goal.targetWeightKg} kg)
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sortedEntries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickFormatter={(val) => val.substring(5)} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: any) => [`${val} kg`, 'Peso']}
                labelFormatter={(label) => `Fecha: ${label}`}
              />
              <ReferenceLine y={goal.targetWeightKg} stroke="#16a34a" strokeDasharray="5 5" label={{ value: 'Meta', fill: '#16a34a', fontSize: 10 }} />
              <Area type="monotone" dataKey="weightKg" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#weightGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Progress Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-600" />
          <span>Resumen de Progreso Mensual:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monthlyBreakdown.map((m, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 capitalize font-bold block">{m.monthName}</span>
                <span className="text-xs text-slate-500 font-medium">{m.start} kg → {m.end} kg</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-green-600 block">
                  -{m.diff} kg
                </span>
                <span className="text-[10px] text-green-700 font-extrabold bg-green-100 px-2 py-0.5 rounded-full">¡Pérdida Sostenible!</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log History List */}
      <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Scale className="w-4 h-4 text-green-600" />
          <span>Historial de Registros de Peso:</span>
        </h3>

        <div className="space-y-2">
          {sortedEntries.slice().reverse().map((e) => (
            <div key={e.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-lg">{e.mood || '😊'}</span>
                <div>
                  <span className="font-bold text-slate-900 block">{e.weightKg} kg</span>
                  <span className="text-[10px] text-slate-400">{e.date} {e.waistCm ? `• Cintura: ${e.waistCm} cm` : ''}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {e.notes && <span className="text-slate-500 italic hidden sm:inline">{e.notes}</span>}
                <button
                  onClick={() => onDeleteEntry(e.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Registering Weight */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-[32px] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-green-600" />
                <span>Nuevo Registro de Peso</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>

            <form onSubmit={handleAddWeightSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Peso Hoy (kg):</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="ej. 72.5"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-slate-900 focus:outline-none focus:border-green-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Perímetro Cintura (cm, opcional):</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="ej. 80"
                  value={newWaist}
                  onChange={(e) => setNewWaist(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-slate-900 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notas / Sensaciones:</label>
                <input
                  type="text"
                  placeholder="ej. Excelente energía hoy"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Estado de Ánimo:</label>
                <div className="flex gap-2">
                  {['😊', '🔥', '💪', '✨', '⚡'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewMood(emoji as any)}
                      className={`p-2.5 rounded-2xl border text-lg flex-1 transition-all ${
                        newMood === emoji ? 'bg-green-100 border-green-500' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-full shadow-md shadow-green-500/20 transition-all"
              >
                Guardar Registro
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
