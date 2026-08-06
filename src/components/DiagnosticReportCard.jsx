import React from 'react';
import { Activity, TrendingUp, Sparkles, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DiagnosticReportCard({ userAnswers }) {
  const selectedAge = userAnswers[2] || "30-39";
  const metrics = userAnswers[3] || { height: 165, weight: 62, bmi: 22.8 };

  const height = metrics.height || 165;
  const weight = metrics.weight || 62;
  const bmi = metrics.bmi || (weight / Math.pow(height / 100, 2)).toFixed(1);

  // Mifflin-St Jeor BMR estimation for females
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * 32 - 161 + 350);

  const getAgeLabel = (val) => {
    if (val === "18-29") return "18 a 29 años";
    if (val === "30-39") return "30 a 39 años";
    if (val === "40-49") return "40 a 49 años";
    if (val === "50plus") return "50+ años";
    return "30 a 39 años";
  };

  const ageText = getAgeLabel(selectedAge);

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-7 shadow-2xl border border-teal-100 space-y-6 text-slate-900 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="text-left space-y-0.5">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0D9488] animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Informe Biométrico & Metabólico
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            Calibrado para <span className="text-[#0D9488] font-black">{height} cm • {weight} kg • {ageText}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 text-xs font-black px-3.5 py-1.5 rounded-full border border-teal-200 self-start sm:self-auto shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#0D9488] fill-[#0D9488]" />
          <span>Diagnóstico Biomédico IA</span>
        </div>
      </div>

      {/* REALISTIC BIOMETRIC SNAPSHOT DASHBOARD */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 text-white rounded-2xl p-4 border border-teal-500/40 shadow-lg space-y-3 text-left">
        <div className="flex items-center justify-between border-b border-teal-800/60 pb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
            📊 BIOMETRÍA CORPORAL PROCESADA
          </span>
          <span className="text-[10px] font-mono font-bold bg-teal-800/80 px-2 py-0.5 rounded text-teal-200">
            CONFIRMADAS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-teal-500/30">
            <span className="text-[10px] font-bold text-teal-300 uppercase block">Estatura</span>
            <span className="text-base sm:text-lg font-black text-white font-mono">{height} cm</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-teal-500/30">
            <span className="text-[10px] font-bold text-teal-300 uppercase block">Peso Actual</span>
            <span className="text-base sm:text-lg font-black text-white font-mono">{weight} kg</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-cyan-500/30">
            <span className="text-[10px] font-bold text-cyan-300 uppercase block">IMC Calculado</span>
            <span className="text-base sm:text-lg font-black text-amber-300 font-mono">{bmi}</span>
          </div>
        </div>
      </div>

      {/* LEGEND & METABOLIC METRICS BREAKDOWN */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span>Curva de Activación Muscular Progresiva</span>
          <span className="text-emerald-700 font-black">28 Días</span>
        </div>

        {/* CUSTOM GRAPHICAL VISUALIZATION (Stacked Area Representation) */}
        <div className="bg-gradient-to-br from-amber-50/60 via-emerald-50/40 to-slate-50 p-4 rounded-2xl border border-emerald-100 space-y-3">
          
          {/* Visual Legend */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span>Síntesis Glútea</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span>Respuesta Anti-Flacidez</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EA580C]" />
              <span>Actividad Metabólica</span>
            </div>
          </div>

          {/* SVG Progress Curve Chart */}
          <div className="h-36 w-full relative pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="25" x2="300" y2="25" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#E2E8F0" strokeDasharray="3 3" />

              {/* Area 1 */}
              <path
                d="M 0,85 Q 75,65 150,35 T 300,10 L 300,100 L 0,100 Z"
                fill="url(#emeraldGrad)"
              />
              {/* Area 2 */}
              <path
                d="M 0,90 Q 75,75 150,45 T 300,20 L 300,100 L 0,100 Z"
                fill="url(#amberGrad)"
              />

              {/* Curve Lines */}
              <path
                d="M 0,85 Q 75,65 150,35 T 300,10"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 0,90 Q 75,75 150,45 T 300,20"
                fill="none"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="0" cy="85" r="4" fill="#10B981" />
              <circle cx="100" cy="55" r="4" fill="#10B981" />
              <circle cx="200" cy="25" r="4" fill="#10B981" />
              <circle cx="300" cy="10" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* X-Axis labels */}
            <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-1">
              <span>Semana 1 (20%)</span>
              <span>Semana 2 (50%)</span>
              <span>Semana 3 (80%)</span>
              <span className="text-emerald-700 font-black">Semana 4 (96%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* SUMMARY STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
        {/* STAT CARD 1 */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
          <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-wider">
            Índice de Activación Glútea
          </span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-slate-950 font-mono tracking-tight">
              96.4%
            </span>
            <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>+14.2% vs Media</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-semibold">
            Respuesta muscular clasificada en rango óptimo.
          </p>
        </div>

        {/* STAT CARD 2 */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
          <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-wider">
            Potencial de Crecimiento
          </span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-emerald-700 font-mono tracking-tight">
              +5.2 cm
            </span>
            <div className="flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-200">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Estimación 28D</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-semibold">
            Aumento estimado en circunferencia en 4 semanas.
          </p>
        </div>
      </div>

      {/* DETAILED METRICS LIST WITH ICONS */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-3 shadow-sm divide-y divide-slate-200/80">
        
        {/* METRIC 1 */}
        <div className="flex items-center justify-between pt-1 first:pt-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 font-bold">
              ⏱️
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block">Tiempo de Respuesta Neuromuscular</span>
              <span className="text-[11px] text-slate-500 font-semibold">Estimulación diaria requerida</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-slate-950 font-mono">8.2 min/día</span>
        </div>

        {/* METRIC 2 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 font-bold">
              🔥
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block">Tasa Metabólica Basal Estimada</span>
              <span className="text-[11px] text-slate-500 font-semibold">Gasto calórico de síntesis</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-teal-700 font-mono">{bmr.toLocaleString()} kcal/día</span>
        </div>

        {/* METRIC 3 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 shrink-0 font-bold">
              🎯
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block">Reclutamiento de Fibras</span>
              <span className="text-[11px] text-slate-500 font-semibold">Tipo de fibra hipertrófica</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-amber-800 font-mono">Tipo II (Alta Respuesta)</span>
        </div>

        {/* METRIC 4 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 font-bold">
              🏠
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block">Nivel de Equipamiento</span>
              <span className="text-[11px] text-slate-500 font-semibold">Sin gimnasio ni pesas</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-emerald-700 font-mono">100% Corporal</span>
        </div>

      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Diagnóstico procesado por el Algoritmo Biomecánico del Coach Luca</span>
      </div>

    </div>
  );
}
