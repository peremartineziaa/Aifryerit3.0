import React, { useState, useEffect, useRef } from 'react';
import { Recipe } from '../types';
import { 
  X, 
  Check, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Heart, 
  Sparkles, 
  ChefHat, 
  Flame, 
  Volume2, 
  ChevronRight,
  Utensils
} from 'lucide-react';

interface CookingModeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onToggleFavorite: (recipeId: string) => void;
  isFavorite: boolean;
  allRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  onClose,
  onToggleFavorite,
  isFavorite,
  allRecipes,
  onSelectRecipe,
}) => {
  if (!recipe) return null;

  // Ingredients checklist state
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Timer State
  const initialSeconds = (recipe.cookTimeMinutes || 12) * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  // Feedback & Spotify Recommendation State
  const [userRating, setUserRating] = useState<'liked' | 'disliked' | null>(null);
  const [favoriteSaved, setFavoriteSaved] = useState<boolean>(isFavorite);

  // Reset states when recipe changes
  useEffect(() => {
    setCheckedIngredients({});
    setSecondsLeft((recipe.cookTimeMinutes || 12) * 60);
    setIsTimerRunning(false);
    setTimerFinished(false);
    setUserRating(null);
    setFavoriteSaved(isFavorite);
  }, [recipe, isFavorite]);

  // Timer Interval Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTimerFinished(true);
      playAlarmSound();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  // Audio Chime Synthesizer using Web Audio API
  const playAlarmSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playTone = (freq: number, delayMs: number) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        }, delayMs);
      };

      // Play cheerful 3-tone chime (C5 -> E5 -> G5)
      playTone(523.25, 0);
      playTone(659.25, 200);
      playTone(783.99, 400);
    } catch (e) {
      console.log('Audio playback notice:', e);
    }
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(initialSeconds);
      setTimerFinished(false);
    }
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsLeft(initialSeconds);
    setTimerFinished(false);
  };

  const handleLike = () => {
    setUserRating('liked');
    if (!favoriteSaved) {
      onToggleFavorite(recipe.id);
      setFavoriteSaved(true);
    }
  };

  const handleDislike = () => {
    setUserRating('disliked');
  };

  // Spotify-style recommendation logic: pick another recipe from same category or complementary
  const recommendedRecipes = allRecipes.filter((r) => r.id !== recipe.id);
  const recommendedRecipe = 
    recommendedRecipes.find((r) => r.category === recipe.category) || 
    recommendedRecipes[0];

  const totalIngredients = recipe.ingredients.length;
  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAFBF8] border border-slate-200/90 rounded-[36px] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold shrink-0">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full">
                  MODO COCINAR
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {recipe.temperatureCelsius}°C • {recipe.cookTimeMinutes} min
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 line-clamp-1 mt-0.5">
                {recipe.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
            title="Cerrar modo cocina"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-900">

          {/* CARD 1: INGREDIENTES CHECKLIST */}
          <div className="bg-white border border-slate-100 rounded-[28px] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-green-600" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Ingredientes
                </h3>
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {checkedCount} / {totalIngredients} listos
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-green-50/70 border-green-200 text-slate-500 line-through'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-100 text-slate-900'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">
                      {ing.amount} {ing.unit} {ing.name}
                    </span>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isChecked
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD 2: PASO A PASO (CARDS CON FOTO + TEXTO CORTO) */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 px-1">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span>Paso a Paso</span>
            </h3>

            <div className="space-y-4">
              {recipe.instructions.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-sm p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-xs">
                      Paso {idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Airfryer @ {recipe.temperatureCelsius}°C
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-full sm:w-32 h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                      <img
                        src={recipe.imageUrl}
                        alt={`Paso ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold flex-1 pt-1">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 3: TEMPORIZADOR CON BOTÓN ENORME */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-[32px] p-6 sm:p-8 shadow-xl space-y-6 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-green-400">
              <Clock className="w-4 h-4" />
              <span>TEMPORIZADOR AIRFRYER</span>
            </div>

            {/* Big Countdown Display */}
            <div className="text-5xl sm:text-7xl font-black tracking-tight font-mono text-white py-2">
              {formatTime(secondsLeft)}
            </div>

            {timerFinished && (
              <div className="bg-green-500/20 border border-green-500/40 p-3 rounded-2xl text-xs text-green-300 font-bold flex items-center justify-center gap-2 animate-bounce">
                <Volume2 className="w-4 h-4" />
                <span>¡TIEMPO TERMINADO! TU PLATO ESTÁ LISTO</span>
              </div>
            )}

            {/* BOTÓN ENORME */}
            <div className="space-y-3 pt-2">
              {!isTimerRunning ? (
                <button
                  onClick={handleStartTimer}
                  className="w-full py-5 rounded-full bg-green-500 hover:bg-green-600 text-white font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 transition-all scale-102 hover:scale-105 active:scale-95"
                >
                  <Play className="w-6 h-6 fill-current" />
                  <span>INICIAR {recipe.cookTimeMinutes} MINUTOS</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className="w-full py-5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-lg shadow-amber-500/30 transition-all active:scale-95"
                >
                  <Pause className="w-6 h-6 fill-current" />
                  <span>PAUSAR TEMPORIZADOR</span>
                </button>
              )}

              {secondsLeft < initialSeconds && (
                <button
                  onClick={handleResetTimer}
                  className="px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 mx-auto transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar Reloj</span>
                </button>
              )}
            </div>
          </div>

          {/* CARD 4: CUANDO TERMINA LA RECETA (FEEDBACK + SPOTIFY-STYLE RECOMMENDATION) */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                VALORA LA RECETA
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                ⭐ ¿Te ha gustado este plato?
              </h3>
              <p className="text-xs text-slate-500">
                Tu respuesta ayuda a personalizar tus recomendaciones semanales.
              </p>
            </div>

            {/* Rating Action Buttons */}
            <div className="flex gap-4 max-w-sm mx-auto">
              <button
                onClick={handleLike}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
                  userRating === 'liked'
                    ? 'bg-green-500 text-white border-green-500 shadow-md scale-105'
                    : 'bg-slate-50 hover:bg-green-50 text-slate-800 hover:text-green-700 border-slate-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>¡Sí, Me Encantó!</span>
              </button>

              <button
                onClick={handleDislike}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
                  userRating === 'disliked'
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>No Mucho</span>
              </button>
            </div>

            {/* Favorite Saved Notification */}
            {favoriteSaved && (
              <div className="bg-green-100 border border-green-200 text-green-800 p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span>¡Receta guardada automáticamente en tus Favoritas!</span>
              </div>
            )}

            {/* SPOTIFY-STYLE RECOMMENDATION */}
            {recommendedRecipe && (
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    RECOMENDADO PARA TI (ESTILO SPOTIFY):
                  </span>
                </div>

                <div className="bg-gradient-to-r from-green-50 via-slate-50 to-orange-50 border border-green-200/80 rounded-[24px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={recommendedRecipe.imageUrl}
                      alt={recommendedRecipe.title}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-green-700 uppercase">
                        Si te gustó {recipe.title.split(' ')[0]}...
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">
                        {recommendedRecipe.title}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        {recommendedRecipe.calories} kcal • {recommendedRecipe.cookTimeMinutes} min
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectRecipe(recommendedRecipe)}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
                  >
                    <span>Cocinar Esta Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
