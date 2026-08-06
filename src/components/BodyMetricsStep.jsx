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
        color: "text-[#D9A441]", 
        bg: "bg-[#FFF4D9] border-[#D9A441]/40", 
        meterPercent: 25,
        badge: "⚡ Máxima Capacidad de Aumento"
      };
    }
    if (val <= 24.9) {
      return { 
        label: "IMC Saludable • Metabolismo Glúteo Óptimo", 
        color: "text-[#32B768]", 
        bg: "bg-[#E4F7EB] border-[#32B768]/40", 
        meterPercent: 55,
        badge: "🏆 Relación Estructura-Músculo Ideal"
      };
    }
    if (val <= 29.9) {
      return { 
        label: "IMC Curva Fuerte • Potencial Anti-Flacidez Máximo", 
        color: "text-[#FF3D7F]", 
        bg: "bg-[#FFE1EC] border-[#FF8EBA]/40", 
        meterPercent: 80,
        badge: "🔥 Quema de Grasa & Elevación Simultánea"
      };
    }
    return { 
      label: "IMC Reestructuración • Estímulo Neuromuscular Profundo", 
      color: "text-[#5B163A]", 
      bg: "bg-[#FFF0F5] border-[#DFC9D3]", 
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
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main Card Container */}
        <div className="bg-white rounded-[24px] p-5 sm:p-7 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 text-center quiz-card">
          
          {/* Progress Header */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-heading">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-[#FFF0F5] hover:bg-[#FFE1EC] text-[#5B163A] flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer border border-[#DFC9D3]"
                    title="Volver a la pregunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1.5 bg-[#FFE1EC] text-[#B71F58] font-bold text-xs px-3.5 py-1 rounded-full border border-[#FF8EBA]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF3D7F]" />
                  Paso {currentStep} de {totalSteps}
                </span>
              </div>
              <span className="font-extrabold text-[#FF3D7F] text-xs">{percentage}%</span>
            </div>

            <div className="h-2.5 w-full bg-[#F0E3E9] rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#FF3D7F] to-[#D92667] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* QUESTION TITLE & GAMIFIED EYEBROW */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#B71F58] bg-[#FFE1EC] px-3.5 py-1 rounded-full border border-[#FF8EBA]/40 font-heading">
              <Zap className="w-3.5 h-3.5 text-[#FF3D7F] fill-[#FF3D7F]" />
              Calibración Biomecánica Interactiva
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#171116] tracking-tight leading-tight font-heading">
              Ingresa tu Estatura y Peso 📏
            </h2>
            <p className="text-xs sm:text-sm text-[#5F525A] leading-relaxed font-medium max-w-sm mx-auto">
              Ajusta los medidores interactivos para calcular tu IMC y fuerza neuromuscular.
            </p>
          </div>

          {/* GAMIFIED CONTROLS GRID */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left pt-1">
            
            {/* GAMIFIED HEIGHT CONTROL */}
            <div className="bg-[#FFF9F6] rounded-[16px] p-4 border border-[#F0E3E9] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#5B163A] uppercase tracking-wider flex items-center gap-2 font-heading">
                  <Ruler className="w-4 h-4 text-[#FF3D7F]" />
                  Estatura
                </span>
                <span className="text-xl font-black text-[#171116] font-heading tracking-tight bg-white px-3 py-0.5 rounded-xl border border-[#DFC9D3]">
                  {height} <span className="text-xs font-bold text-[#8C7D86]">cm</span>
                </span>
              </div>

              {/* STEPPER CONTROLS & SLIDER */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleHeightStep(-1)}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-[#DFC9D3] hover:border-[#FF3D7F] active:scale-95 text-[#5B163A] font-black text-xl flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min="140"
                    max="200"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#DFC9D3] rounded-lg appearance-none cursor-pointer accent-[#FF3D7F]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-[#8C7D86] px-1 font-heading">
                    <span>140 cm</span>
                    <span>170 cm</span>
                    <span>200 cm</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleHeightStep(1)}
                  className="w-10 h-10 rounded-xl bg-[#FF3D7F] text-white hover:bg-[#D92667] active:scale-95 font-black text-xl flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* QUICK CHIPS */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[155, 160, 165, 170, 175].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setHeight(val)}
                    className={`flex-1 py-1 text-xs font-bold rounded-xl border transition-all cursor-pointer font-heading ${
                      height === val
                        ? 'bg-[#FF3D7F] text-white border-[#FF3D7F] shadow-sm'
                        : 'bg-white text-[#5F525A] border-[#F0E3E9] hover:border-[#FF3D7F]/40'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* GAMIFIED WEIGHT CONTROL */}
            <div className="bg-[#FFF9F6] rounded-[16px] p-4 border border-[#F0E3E9] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#5B163A] uppercase tracking-wider flex items-center gap-2 font-heading">
                  <Weight className="w-4 h-4 text-[#FF3D7F]" />
                  Peso Actual
                </span>
                <span className="text-xl font-black text-[#171116] font-heading tracking-tight bg-white px-3 py-0.5 rounded-xl border border-[#DFC9D3]">
                  {weight} <span className="text-xs font-bold text-[#8C7D86]">kg</span>
                </span>
              </div>

              {/* STEPPER CONTROLS & SLIDER */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleWeightStep(-1)}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-[#DFC9D3] hover:border-[#FF3D7F] active:scale-95 text-[#5B163A] font-black text-xl flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#DFC9D3] rounded-lg appearance-none cursor-pointer accent-[#FF3D7F]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-[#8C7D86] px-1 font-heading">
                    <span>40 kg</span>
                    <span>75 kg</span>
                    <span>120 kg</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWeightStep(1)}
                  className="w-10 h-10 rounded-xl bg-[#FF3D7F] text-white hover:bg-[#D92667] active:scale-95 font-black text-xl flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* QUICK CHIPS */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[50, 58, 64, 70, 78].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setWeight(val)}
                    className={`flex-1 py-1 text-xs font-bold rounded-xl border transition-all cursor-pointer font-heading ${
                      weight === val
                        ? 'bg-[#FF3D7F] text-white border-[#FF3D7F] shadow-sm'
                        : 'bg-white text-[#5F525A] border-[#F0E3E9] hover:border-[#FF3D7F]/40'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* REAL-TIME GAMIFIED BMI SPEEDOMETER / METRIC CARD */}
            <div className={`p-4 rounded-[16px] border ${bmiDetails.bg} space-y-2.5 shadow-sm transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#171116] flex items-center gap-1.5 font-heading">
                  <Activity className="w-4 h-4 text-[#FF3D7F] animate-pulse" />
                  IMC Biométrico:
                </span>
                <span className="text-lg font-black text-[#171116] bg-white px-3 py-0.5 rounded-xl border border-[#DFC9D3] font-heading">
                  {bmi} <span className="text-[10px] font-bold text-[#8C7D86]">kg/m²</span>
                </span>
              </div>

              {/* VISUAL METRIC GAUGE BAR */}
              <div className="space-y-1">
                <div className="h-2.5 w-full bg-[#DFC9D3] rounded-full overflow-hidden p-0.5 relative">
                  <div 
                    className="h-full bg-[#FF3D7F] rounded-full transition-all duration-500"
                    style={{ width: `${bmiDetails.meterPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-bold text-[#8C7D86] uppercase px-0.5 font-heading">
                  <span>Bajo</span>
                  <span>Saludable</span>
                  <span>Curva Fuerte</span>
                </div>
              </div>

              {/* DYNAMIC COMPATIBILITY BADGE */}
              <div className="pt-1 flex items-center justify-between text-xs font-bold">
                <span className="text-[#32B768] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {bmiDetails.label}
                </span>
              </div>
            </div>

            {/* ACTION SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-4 sm:py-5 px-6 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-extrabold text-lg sm:text-xl shadow-[0_10px_24px_rgba(217,38,103,0.28)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
            >
              <span>CONFIRMAR Y CONTINUAR</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

          </form>

          {/* TRUST BADGE */}
          <div className="pt-2 text-center border-t border-[#F0E3E9] flex items-center justify-center gap-1.5 text-xs font-medium text-[#8C7D86]">
            <ShieldCheck className="w-4 h-4 text-[#32B768]" />
            <span>Medición 100% privada para tu plan biomecánico</span>
          </div>

        </div>
      </div>
    </div>
  );
}
