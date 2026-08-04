import React, { useState, useEffect } from 'react';
import WelcomeStep from './components/WelcomeStep';
import QuizCard from './components/QuizCard';
import AgeStep from './components/AgeStep';
import CoachStep from './components/CoachStep';
import GoalStep from './components/GoalStep';
import SummaryStep from './components/SummaryStep';
import AnalyzingStep from './components/AnalyzingStep';
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

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCouponStep, setIsCouponStep] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = QUIZ_STEPS.length;
  const currentStepData = QUIZ_STEPS[currentStepIndex];

  // INSTANT IMAGE PRELOADER IN BROWSER MEMORY
  useEffect(() => {
    const urlsToPreload = [
      ASSETS.logo,
      ASSETS.gifs.sales1,
      ASSETS.gifs.fit1,
      ASSETS.gifs.homeFit,
      ASSETS.coach.main,
      ASSETS.coach.alt,
      ...Object.values(ASSETS.ages),
      ...ASSETS.results
    ];
    urlsToPreload.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, []);

  // COMPUTED CURRENT SLUG FOR TRACKING PIXELS & URL HARMONY
  const getCurrentSlug = () => {
    if (showWelcome) return 'boas-vindas';
    if (showSummary) return 'perfil-analisado';
    if (isAnalyzing) return 'analisando-ia';
    if (isCouponStep) return 'bolsa-desconto';
    if (isFinished) return 'oferta-final';
    return currentStepData ? `passo-${currentStepIndex + 1}-${currentStepData.slug}` : `passo-${currentStepIndex + 1}`;
  };

  const currentSlug = getCurrentSlug();

  const getStepNumber = () => {
    if (showWelcome) return 0;
    if (isFinished) return 15;
    return currentStepIndex + 1;
  };

  // AUTOMATIC URL SLUG SYNCHRONIZATION & PIXEL TRACKING DISPATCHER
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update URL hash dynamically (#boas-vindas, #passo-1-inicio-avaliacao, #bolsa-desconto, etc.)
    const newHash = `#${currentSlug}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
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
  }, [currentSlug, currentStepIndex, showWelcome, showSummary, isAnalyzing, isCouponStep, isFinished, answers]);

  const handleStartQuiz = () => {
    trackQuizStart();
    setShowWelcome(false);
  };

  const handleSelectOption = (value) => {
    const newAnswers = { ...answers, [currentStepData.id]: value };
    setAnswers(newAnswers);

    trackQuizStep(currentStepIndex + 1, totalSteps, currentStepData, value);

    if (currentStepIndex === totalSteps - 1) {
      trackSummaryView(newAnswers);
      setShowSummary(true);
    } else {
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 160);
    }
  };

  const handlePrevStep = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      setShowWelcome(true);
    }
  };

  const handleSummaryContinue = () => {
    trackAnalyzingStep();
    setShowSummary(false);
    setIsAnalyzing(true);
  };

  const handleAnalyzingComplete = () => {
    trackCouponUnlocked();
    setIsAnalyzing(false);
    setIsCouponStep(true);
  };

  const handleClaimCoupon = () => {
    trackOfferPage();
    setIsCouponStep(false);
    setIsFinished(true);
  };

  const renderCurrentStep = () => {
    if (showWelcome) {
      return <WelcomeStep onStart={handleStartQuiz} />;
    }
    if (showSummary) {
      return <SummaryStep userAnswers={answers} onContinue={handleSummaryContinue} />;
    }
    if (isAnalyzing) {
      return <AnalyzingStep onComplete={handleAnalyzingComplete} />;
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
    <div className="min-h-screen bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#0F172A] font-sans antialiased selection:bg-teal-500 selection:text-white">
      {renderCurrentStep()}
    </div>
  );
}
