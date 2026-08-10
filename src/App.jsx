import React, { useState, useEffect, useCallback } from 'react';
import WelcomeStep from './components/WelcomeStep';
import QuizCard from './components/QuizCard';
import AgeStep from './components/AgeStep';
import BodyMetricsStep from './components/BodyMetricsStep';
import CoachStep from './components/CoachStep';
import GoalStep from './components/GoalStep';
import AwarenessStep from './components/AwarenessStep';
import SummaryStep from './components/SummaryStep';
import AnalyzingStep from './components/AnalyzingStep';
import VSLStep from './components/VSLStep';
import CouponStep from './components/CouponStep';
import ResultStep from './components/ResultStep';
import { QUIZ_STEPS, ASSETS } from './data/quizData';

import { 
  trackQuizStart, 
  trackQuizStep, 
  trackSummaryView, 
  trackAnalyzingStep, 
  trackCouponUnlocked, 
  trackOfferPage 
} from './utils/pixel';

const STORAGE_ANSWERS_KEY = 'pgb_quiz_answers';
const STORAGE_SLUG_KEY = 'pgb_current_slug';

/**
 * Safe LocalStorage helpers
 */
const getSavedAnswers = () => {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveAnswersToStorage = (answers) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(answers));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
};

/**
 * Helper to compute the standard slug for any given step state
 */
export const getSlugForState = ({
  showWelcome,
  showSummary,
  isAnalyzing,
  isVSLStep,
  isCouponStep,
  isFinished,
  currentStepIndex
}) => {
  if (showWelcome) return 'bienvenida';
  if (showSummary) return 'perfil-analizado';
  if (isAnalyzing) return 'analizando-ia';
  if (isVSLStep) return 'video-presentacion';
  if (isCouponStep) return 'beca-descuento';
  if (isFinished) return 'oferta-final';

  const step = QUIZ_STEPS[currentStepIndex];
  if (step) {
    return `paso-${currentStepIndex + 1}-${step.slug}`;
  }
  return `paso-${currentStepIndex + 1}`;
};

/**
 * Resolves full state flags and step index from a given URL slug or hash
 */
export const resolveStateFromSlug = (rawSlug) => {
  const clean = (rawSlug || '').replace(/^#\/?/, '').trim().toLowerCase();

  if (!clean || clean === 'bienvenida' || clean === 'inicio' || clean === 'boas-vindas') {
    return {
      showWelcome: true,
      currentStepIndex: 0,
      showSummary: false,
      isAnalyzing: false,
      isVSLStep: false,
      isCouponStep: false,
      isFinished: false
    };
  }

  if (clean === 'perfil-analizado' || clean === 'resumen' || clean === 'diagnostico') {
    return {
      showWelcome: false,
      currentStepIndex: QUIZ_STEPS.length - 1,
      showSummary: true,
      isAnalyzing: false,
      isVSLStep: false,
      isCouponStep: false,
      isFinished: false
    };
  }

  if (clean === 'analizando-ia' || clean === 'analizando' || clean === 'ia') {
    return {
      showWelcome: false,
      currentStepIndex: QUIZ_STEPS.length - 1,
      showSummary: false,
      isAnalyzing: true,
      isVSLStep: false,
      isCouponStep: false,
      isFinished: false
    };
  }

  if (clean === 'video-presentacion' || clean === 'vsl' || clean === 'video') {
    return {
      showWelcome: false,
      currentStepIndex: QUIZ_STEPS.length - 1,
      showSummary: false,
      isAnalyzing: false,
      isVSLStep: true,
      isCouponStep: false,
      isFinished: false
    };
  }

  if (clean === 'beca-descuento' || clean === 'cupon' || clean === 'descuento' || clean === 'beca') {
    return {
      showWelcome: false,
      currentStepIndex: QUIZ_STEPS.length - 1,
      showSummary: false,
      isAnalyzing: false,
      isVSLStep: false,
      isCouponStep: true,
      isFinished: false
    };
  }

  if (clean === 'oferta-final' || clean === 'resultado' || clean === 'oferta' || clean === 'checkout') {
    return {
      showWelcome: false,
      currentStepIndex: QUIZ_STEPS.length - 1,
      showSummary: false,
      isAnalyzing: false,
      isVSLStep: false,
      isCouponStep: false,
      isFinished: true
    };
  }

  // Check direct matches in QUIZ_STEPS (by full slug, short paso-X, or step.slug)
  const stepIdx = QUIZ_STEPS.findIndex((step, idx) => {
    const fullSlug = `paso-${idx + 1}-${step.slug}`.toLowerCase();
    const shortStep = `paso-${idx + 1}`.toLowerCase();
    return clean === fullSlug || clean === shortStep || clean === step.slug.toLowerCase();
  });

  if (stepIdx !== -1) {
    return {
      showWelcome: false,
      currentStepIndex: stepIdx,
      showSummary: false,
      isAnalyzing: false,
      isVSLStep: false,
      isCouponStep: false,
      isFinished: false
    };
  }

  // Fallback regex match for "paso-X"
  const match = clean.match(/^paso-(\d+)/);
  if (match) {
    const num = Number.parseInt(match[1], 10) - 1;
    if (num >= 0 && num < QUIZ_STEPS.length) {
      return {
        showWelcome: false,
        currentStepIndex: num,
        showSummary: false,
        isAnalyzing: false,
        isVSLStep: false,
        isCouponStep: false,
        isFinished: false
      };
    }
  }

  // Default fallback to welcome
  return {
    showWelcome: true,
    currentStepIndex: 0,
    showSummary: false,
    isAnalyzing: false,
    isVSLStep: false,
    isCouponStep: false,
    isFinished: false
  };
};

export default function App() {
  // Read initial slug from URL hash or localStorage so F5 always restores the exact current page
  const initialHash = typeof window !== 'undefined' ? window.location.hash : '';
  const initialStorageSlug = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_SLUG_KEY) : '';
  const initialResolved = resolveStateFromSlug(initialHash || initialStorageSlug || 'bienvenida');

  const [showWelcome, setShowWelcome] = useState(initialResolved.showWelcome);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialResolved.currentStepIndex);
  const [answers, setAnswers] = useState(getSavedAnswers);
  const [showSummary, setShowSummary] = useState(initialResolved.showSummary);
  const [isAnalyzing, setIsAnalyzing] = useState(initialResolved.isAnalyzing);
  const [isVSLStep, setIsVSLStep] = useState(initialResolved.isVSLStep);
  const [isCouponStep, setIsCouponStep] = useState(initialResolved.isCouponStep);
  const [isFinished, setIsFinished] = useState(initialResolved.isFinished);

  const totalSteps = QUIZ_STEPS.length;
  const currentStepData = QUIZ_STEPS[currentStepIndex] || QUIZ_STEPS[0];

  // INSTANT IMAGE & GIF PRELOADER IN BROWSER MEMORY
  useEffect(() => {
    const urlsToPreload = [
      ASSETS.logo,
      ASSETS.vslCover,
      ASSETS.gifs?.sales1,
      ASSETS.gifs?.fit1,
      ASSETS.gifs?.homeFit,
      ASSETS.coach?.main,
      ASSETS.coach?.alt,
      ...Object.values(ASSETS.ages || {}),
      ...(ASSETS.results || [])
    ];
    urlsToPreload.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, []);

  // COMPUTED CURRENT SLUG FOR TRACKING PIXELS & URL HARMONY
  const currentSlug = getSlugForState({
    showWelcome,
    showSummary,
    isAnalyzing,
    isVSLStep,
    isCouponStep,
    isFinished,
    currentStepIndex
  });

  const getStepNumber = useCallback(() => {
    if (showWelcome) return 0;
    if (isFinished) return totalSteps + 3;
    if (isCouponStep) return totalSteps + 2;
    if (isVSLStep) return totalSteps + 1;
    if (isAnalyzing || showSummary) return totalSteps;
    return currentStepIndex + 1;
  }, [showWelcome, isFinished, isCouponStep, isVSLStep, isAnalyzing, showSummary, currentStepIndex, totalSteps]);

  // SAVE ANSWERS TO LOCALSTORAGE ON EVERY UPDATE
  useEffect(() => {
    saveAnswersToStorage(answers);
  }, [answers]);

  // AUTOMATIC URL SLUG SYNCHRONIZATION & LOCALSTORAGE CACHE
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const newHash = `#${currentSlug}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
    try {
      localStorage.setItem(STORAGE_SLUG_KEY, currentSlug);
    } catch {
      // Ignore
    }

    // Fire Custom Pixel Event for Meta Pixel, TikTok Pixel, Google Analytics & UTMify
    window.dispatchEvent(new CustomEvent('quiz_step_change', {
      detail: { 
        slug: currentSlug, 
        stepNumber: getStepNumber(),
        answers 
      }
    }));

    if (isFinished) {
      trackOfferPage();
    }

    // Trigger TikTok Pixel if installed
    if (typeof window.ttq === 'object' && typeof window.ttq.page === 'function') {
      window.ttq.page();
    }
  }, [currentSlug, getStepNumber, isFinished, answers]);

  // HANDLE BROWSER BACK/FORWARD AND MANUAL HASH CHANGES
  useEffect(() => {
    const handleHashChange = () => {
      const targetHash = window.location.hash;
      const resolved = resolveStateFromSlug(targetHash);
      setShowWelcome(resolved.showWelcome);
      setCurrentStepIndex(resolved.currentStepIndex);
      setShowSummary(resolved.showSummary);
      setIsAnalyzing(resolved.isAnalyzing);
      setIsVSLStep(resolved.isVSLStep);
      setIsCouponStep(resolved.isCouponStep);
      setIsFinished(resolved.isFinished);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateToSlug = (targetSlug) => {
    if (typeof window !== 'undefined') {
      const newHash = `#${targetSlug}`;
      window.location.hash = newHash;
    }
    const resolved = resolveStateFromSlug(targetSlug);
    setShowWelcome(resolved.showWelcome);
    setCurrentStepIndex(resolved.currentStepIndex);
    setShowSummary(resolved.showSummary);
    setIsAnalyzing(resolved.isAnalyzing);
    setIsVSLStep(resolved.isVSLStep);
    setIsCouponStep(resolved.isCouponStep);
    setIsFinished(resolved.isFinished);
  };

  const handleStartQuiz = () => {
    trackQuizStart();
    const nextSlug = `paso-1-${QUIZ_STEPS[0].slug}`;
    navigateToSlug(nextSlug);
  };

  const handleSelectOption = (value) => {
    const stepData = currentStepData;
    const newAnswers = { ...answers, [stepData.id]: value };
    setAnswers(newAnswers);

    trackQuizStep(currentStepIndex + 1, totalSteps, stepData, value);

    if (currentStepIndex >= totalSteps - 1) {
      trackSummaryView(newAnswers);
      setTimeout(() => {
        navigateToSlug('perfil-analizado');
      }, 160);
    } else {
      setTimeout(() => {
        const nextIdx = currentStepIndex + 1;
        const nextStep = QUIZ_STEPS[nextIdx];
        const nextSlug = `paso-${nextIdx + 1}-${nextStep.slug}`;
        navigateToSlug(nextSlug);
      }, 160);
    }
  };

  const handlePrevStep = () => {
    if (isFinished) {
      navigateToSlug('beca-descuento');
    } else if (isCouponStep) {
      navigateToSlug('video-presentacion');
    } else if (isVSLStep) {
      navigateToSlug('perfil-analizado');
    } else if (isAnalyzing) {
      navigateToSlug('perfil-analizado');
    } else if (showSummary) {
      const lastIdx = totalSteps - 1;
      const lastStep = QUIZ_STEPS[lastIdx];
      navigateToSlug(`paso-${lastIdx + 1}-${lastStep.slug}`);
    } else if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      const prevStep = QUIZ_STEPS[prevIdx];
      navigateToSlug(`paso-${prevIdx + 1}-${prevStep.slug}`);
    } else {
      navigateToSlug('bienvenida');
    }
  };

  const handleSummaryContinue = () => {
    trackAnalyzingStep();
    navigateToSlug('analizando-ia');
  };

  const handleAnalyzingComplete = () => {
    navigateToSlug('video-presentacion');
  };

  const handleVSLContinue = () => {
    trackCouponUnlocked();
    navigateToSlug('beca-descuento');
  };

  const handleClaimCoupon = () => {
    trackOfferPage();
    navigateToSlug('oferta-final');
  };

  const renderCurrentStep = () => {
    if (showWelcome) {
      return <WelcomeStep onStart={handleStartQuiz} />;
    }
    if (showSummary) {
      return <SummaryStep userAnswers={answers} onContinue={handleSummaryContinue} onPrevStep={handlePrevStep} />;
    }
    if (isAnalyzing) {
      return <AnalyzingStep onComplete={handleAnalyzingComplete} />;
    }
    if (isVSLStep) {
      return <VSLStep onContinue={handleVSLContinue} />;
    }
    if (isCouponStep) {
      return <CouponStep onClaimCoupon={handleClaimCoupon} />;
    }
    if (isFinished) {
      return <ResultStep userAnswers={answers} />;
    }
    if (currentStepData.type === 'age') {
      return (
        <AgeStep
          stepData={currentStepData}
          onSelectOption={handleSelectOption}
          onPrevStep={handlePrevStep}
          selectedValue={answers[currentStepData.id]}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
        />
      );
    }
    if (currentStepData.type === 'body-metrics') {
      return (
        <BodyMetricsStep
          stepData={currentStepData}
          onNext={(metrics) => handleSelectOption(metrics)}
          onPrevStep={handlePrevStep}
          initialMetrics={answers[currentStepData.id]}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
        />
      );
    }
    if (currentStepData.type === 'coach') {
      return (
        <CoachStep
          stepData={currentStepData}
          onNext={handleSelectOption}
          onPrevStep={handlePrevStep}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
        />
      );
    }
    if (currentStepData.type === 'awareness') {
      return (
        <AwarenessStep
          stepData={currentStepData}
          onSelectOption={handleSelectOption}
          onPrevStep={handlePrevStep}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
        />
      );
    }
    if (currentStepData.type === 'goal') {
      return (
        <GoalStep
          stepData={currentStepData}
          onSelectOption={handleSelectOption}
          onPrevStep={handlePrevStep}
          selectedValue={answers[currentStepData.id]}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
        />
      );
    }
    return (
      <QuizCard
        stepData={currentStepData}
        onSelectOption={handleSelectOption}
        onPrevStep={handlePrevStep}
        selectedValue={answers[currentStepData.id]}
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] font-body text-[#171116] antialiased selection:bg-[#FF3D7F] selection:text-white">
      {renderCurrentStep()}
    </div>
  );
}
