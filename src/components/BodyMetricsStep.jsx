import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Ruler, Weight, Activity, CheckCircle2, ArrowRight, Minus, Plus, Zap } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function BodyMetricsStep({ stepData, onNext, onPrevStep, currentStep, totalSteps, initialMetrics }) {
  const [height, setHeight] = useState(initialMetrics?.height || 165);
  const [weight, setWeight] = useState(initialMetrics?.weight || 62);
  const percentage = Math.round((currentStep / totalSteps) * 100);

  // Real-time BMI Calculation
  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  const numericBmi = Number.parseFloat(bmi);

  const getBmiDetails = (val) => {
    if (val < 18.5) {
      return { 
        label: "IMC Bajo • Alta Respuesta a Volumen Glúteo", 
        color: "text-amber-700", 
        bg: "bg-amber-50 border-amber-300", 
        meterPercent: 25,
        badge: "⚡ Máxima Capacidad de Aumento"
      };
    }
    if (val <= 24.9) {
      return { 
        label: "IMC Saludable • Metabolismo Glúteo Óptimo", 
        color: "text-[#0D9488]", 
        bg: "bg-[#0D9488]/10 border-[#0D9488]/30", 
        meterPercent: 55,
        badge: "🏆 Relación Estructura-Músculo Ideal"
      };
    }
    if (val <= 29.9) {
      return { 
        label: "IMC Curva Fuerte • Potencial Anti-Flacidez Máximo", 
        color: "text-[#E11D48]", 
        bg: "bg-[#E11D48]/10 border-[#E11D48]/30", 
        meterPercent: 80,
        badge: "🔥 Quema de Grasa & Elevación Simultánea"
      };
    }
    return { 
      label: "IMC Reestructuración • Estímulo Neuromuscular Profundo", 
      color: "text-purple-700", 
      bg: "bg-purple-50 border-purple-300", 
      meterPercent: 95,
      badge: "🚀 Reducción de Impacto Articular"
    };
  };

  const bmiDetails = getBmiDetails(numericBmi);

  const handleHeightStep = (delta) => {
    setHeight((prev) => Math.min(210, Math.max(140, prev + delta)));
  };

  const handleWeightStep = (delta) => {
    setWeight((prev) => Math.min(140, Math.max(40, prev + delta)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ height, weight, bmi: numericBmi });
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#59D6CF] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main Card Container */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-teal-100 animate-pop space-y-6 text-center quiz-card">
          
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer"
                    title="Volver a la pregunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 font-bold text-xs px-3.5 py-1 rounded-full border border-teal-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                  Paso {currentStep} de {totalSteps}
                </span>
              </div>
              <span className="font-mono font-black text-[#0D9488] text-xs">{percentage}%</span>
            </div>

            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-[#0D9488] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* QUESTION TITLE & GAMIFIED EYEBROW */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#E11D48] bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
              Calibración Biomecánica Interactiva
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              Ingresa tu Estatura y Peso 📏
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold max-w-sm mx-auto">
              Ajusta los medidores interactivos para calcular tu IMC y fuerza neuromuscular.
            </p>
          </div>

          {/* GAMIFIED CONTROLS GRID */}
          <form onSubmit={handleSubmit} className="space-y-5 text-left pt-1">
            
            {/* GAMIFIED HEIGHT CONTROL */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#0D9488]" />
                  Estatura
                </span>
                <span className="text-2xl font-black text-slate-950 font-mono tracking-tight bg-white px-3 py-0.5 rounded-xl border border-slate-200 shadow-inner">
                  {height} <span className="text-xs font-bold text-slate-400">cm</span>
                </span>
              </div>

              {/* STEPPER CONTROLS & SLIDER */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleHeightStep(-1)}
                  className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#0D9488] active:scale-95 text-slate-700 font-black text-xl flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min="140"
                    max="200"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 font-mono">
                    <span>140 cm</span>
                    <span>170 cm</span>
                    <span>200 cm</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleHeightStep(1)}
                  className="w-11 h-11 rounded-2xl bg-[#0D9488] text-white hover:bg-[#0F766E] active:scale-95 font-black text-xl flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* QUICK CHIPS */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[155, 160, 165, 170, 175].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setHeight(val)}
                    className={`flex-1 py-1.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                      height === val
                        ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#0D9488]/40'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* GAMIFIED WEIGHT CONTROL */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Weight className="w-4 h-4 text-[#E11D48]" />
                  Peso Actual
                </span>
                <span className="text-2xl font-black text-slate-950 font-mono tracking-tight bg-white px-3 py-0.5 rounded-xl border border-slate-200 shadow-inner">
                  {weight} <span className="text-xs font-bold text-slate-400">kg</span>
                </span>
              </div>

              {/* STEPPER CONTROLS & SLIDER */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleWeightStep(-1)}
                  className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#E11D48] active:scale-95 text-slate-700 font-black text-xl flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E11D48]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 font-mono">
                    <span>40 kg</span>
                    <span>75 kg</span>
                    <span>120 kg</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWeightStep(1)}
                  className="w-11 h-11 rounded-2xl bg-[#E11D48] text-white hover:bg-[#BE123C] active:scale-95 font-black text-xl flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* QUICK CHIPS */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[50, 58, 64, 70, 78].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setWeight(val)}
                    className={`flex-1 py-1.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                      weight === val
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#E11D48]/40'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* REAL-TIME GAMIFIED BMI SPEEDOMETER / METRIC CARD */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${bmiDetails.bg} space-y-3 shadow-sm transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#0D9488] animate-pulse" />
                  IMC Biométrico:
                </span>
                <span className="text-xl font-mono font-black text-slate-950 bg-white px-3 py-0.5 rounded-xl border border-slate-200 shadow-sm">
                  {bmi} <span className="text-[10px] font-bold text-slate-500">kg/m²</span>
                </span>
              </div>

              {/* VISUAL METRIC GAUGE BAR */}
              <div className="space-y-1">
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 relative">
                  <div 
                    className="h-full bg-[#0D9488] rounded-full transition-all duration-500"
                    style={{ width: `${bmiDetails.meterPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase px-0.5">
                  <span>Bajo</span>
                  <span>Saludable</span>
                  <span>Curva Fuerte</span>
                </div>
              </div>

              {/* DYNAMIC COMPATIBILITY BADGE */}
              <div className="pt-1 flex items-center justify-between text-xs font-black">
                <span className="text-[#0D9488] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {bmiDetails.label}
                </span>
              </div>
            </div>

            {/* ACTION SUBMIT BUTTON (COR SÓLIDA SÓLIDA) */}
            <button
              type="submit"
              className="w-full py-5 sm:py-6 px-8 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xl sm:text-2xl shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wider text-center"
            >
              <span>CONFIRMAR Y CONTINUAR</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

          </form>

          {/* TRUST BADGE */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Medición 100% privada para tu plan biomecánico</span>
          </div>

        </div>
      </div>
    </div>
  );
}
