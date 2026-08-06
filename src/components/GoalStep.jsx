import React from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function GoalStep({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main Card */}
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

            <div className="h-2 w-full bg-[#F0E3E9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF3D7F] to-[#D92667] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Question Title & Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-[#171116] tracking-tight leading-tight font-heading">
              {stepData.title}
            </h2>
            {stepData.subtitle && (
              <p className="text-xs sm:text-sm text-[#5F525A] leading-relaxed font-medium max-w-sm mx-auto">
                {stepData.subtitle}
              </p>
            )}
          </div>

          {/* SYMMETRICAL GOAL CARDS GRID */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectOption(opt.value)}
                  className={`relative flex flex-col items-center justify-between p-4 rounded-[16px] border-2 transition-all duration-200 bg-white cursor-pointer ${
                    isSelected 
                      ? 'border-[#FF3D7F] bg-[#FFF0F5] ring-2 ring-[#FF3D7F]/20 shadow-md text-[#5B163A] font-bold' 
                      : 'border-[#F0E3E9] hover:border-[#FF3D7F]/50 hover:bg-[#FFF0F5]/50 text-[#171116] shadow-sm'
                  }`}
                >
                  {/* Indicator Radio Badge */}
                  <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#FF3D7F] text-white' : 'border border-[#DFC9D3] bg-[#FFF9F6]'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  {/* Emoji Box */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-2 transition-all ${
                    isSelected ? 'bg-[#FF3D7F] text-white shadow-sm' : 'bg-[#FFF0F5] text-[#5B163A]'
                  }`}>
                    {opt.emoji}
                  </div>

                  <span className="text-xs sm:text-sm font-bold leading-snug font-heading">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footnote */}
          <div className="pt-2 text-center border-t border-[#F0E3E9] flex items-center justify-center gap-1.5 text-xs font-medium text-[#8C7D86]">
            <ShieldCheck className="w-4 h-4 text-[#32B768]" />
            <span>Configuración guardada para tu rutina personalizada</span>
          </div>

        </div>
      </div>
    </div>
  );
}
