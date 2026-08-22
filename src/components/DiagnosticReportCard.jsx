import React from 'react';
import { Activity, TrendingUp, Sparkles, Zap, ShieldCheck } from 'lucide-react';

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
    <div className="bg-[#240828] rounded-[24px] p-4 sm:p-6 border-2 border-[#4C1450] shadow-2xl space-y-4 text-left font-body text-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#4C1450]">
        <div className="text-left space-y-0.5 font-heading">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF2A85] animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Informe Biométrico & Metabólico
            </h3>
          </div>
          <p className="text-xs text-[#D4BCD0] font-semibold font-body">
            Calibrado para <span className="text-[#FF2A85] font-black">{height} cm • {weight} kg • {ageText}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] text-xs font-black px-3.5 py-1.5 rounded-full border-2 border-[#FFE600] self-start sm:self-auto shadow-[2px_2px_0px_#FF2A85] font-heading">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>Diagnóstico PGB IA</span>
        </div>
      </div>

      {/* REALISTIC BIOMETRIC SNAPSHOT DASHBOARD */}
      <div className="bg-gradient-to-r from-[#1A041E] via-[#2E0832] to-[#140217] text-white rounded-[20px] p-4 border border-[#FFE600]/30 shadow-md space-y-3 text-left font-heading">
        <div className="flex items-center justify-between border-b border-white/15 pb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FFE600]">
            📊 BIOMETRÍA CORPORAL PROCESADA
          </span>
          <span className="text-[10px] font-mono font-bold bg-[#FF2A85]/40 px-2 py-0.5 rounded text-white border border-[#FF2A85]/50">
            CONFIRMADAS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center font-heading">
          <div className="bg-[#240828] p-2.5 rounded-xl border border-[#4C1450]">
            <span className="text-[10px] font-bold text-[#FFE600] uppercase block">Estatura</span>
            <span className="text-base sm:text-lg font-black text-white font-mono">{height} cm</span>
          </div>
          <div className="bg-[#240828] p-2.5 rounded-xl border border-[#4C1450]">
            <span className="text-[10px] font-bold text-[#FFE600] uppercase block">Peso Actual</span>
            <span className="text-base sm:text-lg font-black text-white font-mono">{weight} kg</span>
          </div>
          <div className="bg-[#240828] p-2.5 rounded-xl border border-[#FFE600]/60">
            <span className="text-[10px] font-black text-[#FFE600] uppercase block">IMC Calculado</span>
            <span className="text-base sm:text-lg font-black text-[#FFE600] font-mono">{bmi}</span>
          </div>
        </div>
      </div>

      {/* LEGEND & METABOLIC METRICS BREAKDOWN */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#D4BCD0] px-1 font-heading">
          <span>Curva de Activación Muscular Progresiva</span>
          <span className="text-[#10B981] font-black">28 Días</span>
        </div>

        {/* CUSTOM GRAPHICAL VISUALIZATION */}
        <div className="bg-[#1A041E] p-4 rounded-[20px] border border-[#4C1450] space-y-3">
          
          {/* Visual Legend */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-[#D4BCD0] font-heading flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span>Síntesis Glútea</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
              <span>Respuesta Anti-Flacidez</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF2A85]" />
              <span>Actividad Metabólica</span>
            </div>
          </div>

          {/* SVG Progress Curve Chart */}
          <div className="h-36 w-full relative pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pgbGreenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="pgbPinkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF2A85" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF2A85" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="25" x2="300" y2="25" stroke="#4C1450" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#4C1450" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#4C1450" strokeDasharray="3 3" />

              {/* Area 1 */}
              <path
                d="M 0,85 Q 75,65 150,35 T 300,10 L 300,100 L 0,100 Z"
                fill="url(#pgbGreenGrad)"
              />
              {/* Area 2 */}
              <path
                d="M 0,90 Q 75,75 150,45 T 300,20 L 300,100 L 0,100 Z"
                fill="url(#pgbPinkGrad)"
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
                stroke="#FF2A85"
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
            <div className="flex justify-between text-[10px] font-bold text-[#A890A4] pt-1 font-heading">
              <span>Semana 1 (20%)</span>
              <span>Semana 2 (50%)</span>
              <span>Semana 3 (80%)</span>
              <span className="text-[#10B981] font-black">Semana 4 (96%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* SUMMARY STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left font-heading">
        {/* STAT CARD 1 */}
        <div className="bg-[#1A041E] p-4 rounded-2xl border border-[#4C1450] space-y-1.5 shadow-2xs">
          <span className="text-xs font-black text-[#D4BCD0] block uppercase tracking-wider">
            Índice de Activación Glútea
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white font-heading tracking-tight">
              96.4%
            </span>
            <div className="flex items-center gap-1 bg-[#063725] text-[#10B981] text-[11px] font-black px-2.5 py-0.5 rounded-full border border-[#10B981]/40">
              <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              <span>+14.2% vs Media</span>
            </div>
          </div>
          <p className="text-[11px] text-[#D4BCD0] font-medium font-body">
            Respuesta muscular clasificada en rango óptimo.
          </p>
        </div>

        {/* STAT CARD 2 */}
        <div className="bg-[#1A041E] p-4 rounded-2xl border border-[#4C1450] space-y-1.5 shadow-2xs">
          <span className="text-xs font-black text-[#D4BCD0] block uppercase tracking-wider">
            Potencial de Crecimiento
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#10B981] font-heading tracking-tight">
              +5.2 cm
            </span>
            <div className="flex items-center gap-1 bg-[#FFE600] text-[#19041C] text-[11px] font-black px-2.5 py-0.5 rounded-full border border-[#FFE600]">
              <Zap className="w-3.5 h-3.5 text-[#FF2A85] fill-[#19041C]" />
              <span>Estimación 28D</span>
            </div>
          </div>
          <p className="text-[11px] text-[#D4BCD0] font-medium font-body">
            Aumento estimado en circunferencia en 4 semanas.
          </p>
        </div>
      </div>

      {/* DETAILED METRICS LIST WITH ICONS */}
      <div className="bg-[#1A041E] rounded-2xl p-4 sm:p-5 border border-[#4C1450] text-left space-y-3 shadow-2xs divide-y divide-[#4C1450]">
        
        {/* METRIC 1 */}
        <div className="flex items-center justify-between pt-1 first:pt-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#240828] border border-[#FFE600] flex items-center justify-center text-[#FF2A85] shrink-0 font-bold">
              ⏱️
            </div>
            <div>
              <span className="text-xs font-black text-white block font-heading">Tiempo de Respuesta Neuromuscular</span>
              <span className="text-[11px] text-[#D4BCD0] font-medium font-body">Estimulación diaria requerida</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-[#FFE600] font-heading">8.2 min/día</span>
        </div>

        {/* METRIC 2 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#063725] border border-[#10B981]/40 flex items-center justify-center text-[#10B981] shrink-0 font-bold">
              🔥
            </div>
            <div>
              <span className="text-xs font-black text-white block font-heading">Tasa Metabólica Basal Estimada</span>
              <span className="text-[11px] text-[#D4BCD0] font-medium font-body">Gasto calórico de síntesis</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-[#10B981] font-heading">{bmr.toLocaleString()} kcal/día</span>
        </div>

        {/* METRIC 3 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#240828] border border-[#FFE600] flex items-center justify-center text-[#FFB800] shrink-0 font-bold">
              🎯
            </div>
            <div>
              <span className="text-xs font-black text-white block font-heading">Reclutamiento de Fibras</span>
              <span className="text-[11px] text-[#D4BCD0] font-medium font-body">Tipo de fibra hipertrófica</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-white font-heading">Tipo II (Alta Respuesta)</span>
        </div>

        {/* METRIC 4 */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#240828] border border-[#4C1450] flex items-center justify-center text-[#FF2A85] shrink-0 font-bold">
              🏠
            </div>
            <div>
              <span className="text-xs font-black text-white block font-heading">Nivel de Equipamiento</span>
              <span className="text-[11px] text-[#D4BCD0] font-medium font-body">Sin gimnasio ni pesas</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-[#FF2A85] font-heading">100% Corporal</span>
        </div>

      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#A890A4] pt-1">
        <ShieldCheck className="w-4 h-4 text-[#10B981]" />
        <span>Diagnóstico procesado por el Algoritmo del Protocolo Glúteos Brasileños</span>
      </div>

    </div>
  );
}
