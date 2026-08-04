/**
 * Meta (Facebook) Pixel Ultra-Advanced Tracking Helper
 * Pixel ID: 3856177681190176
 */

export const trackMetaEvent = (eventName, params = {}, isCustom = false) => {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.fbq === 'function') {
      if (isCustom) {
        window.fbq('trackCustom', eventName, params);
      } else {
        window.fbq('track', eventName, params);
      }
    }
  } catch (err) {
    console.warn('[Meta Pixel Tracking Warning]:', err);
  }
};

/**
 * Event 1: Start Quiz (Boas-vindas -> Passo 1)
 */
export const trackQuizStart = () => {
  trackMetaEvent('QuizStart', {
    content_name: 'FitFlow Método 28D - Avaliação',
    start_time: new Date().toISOString()
  }, true);
  
  trackMetaEvent('Lead', {
    content_name: 'Inicio do Quiz',
    status: 'started'
  });
};

/**
 * Event 2: Step Answered / Step View
 */
export const trackQuizStep = (stepNumber, totalSteps, stepData, selectedValue) => {
  const percentage = Math.round((stepNumber / totalSteps) * 100);
  
  trackMetaEvent('QuizStepView', {
    step_number: stepNumber,
    step_slug: stepData?.slug || `passo-${stepNumber}`,
    question_title: stepData?.title || '',
    selected_value: selectedValue || '',
    progress_percentage: `${percentage}%`
  }, true);

  // Milestone tracking for Facebook Optimization
  if (stepNumber === 1) {
    trackMetaEvent('ViewContent', {
      content_name: 'Primeira Pergunta',
      content_category: 'Quiz Step'
    });
  } else if (stepNumber === 5) {
    trackMetaEvent('QuizMidpoint', {
      step_number: 5,
      progress: '40%'
    }, true);
  } else if (stepData?.type === 'coach') {
    trackMetaEvent('ViewContent', {
      content_name: 'Apresentação Coach Luca',
      content_category: 'Coach Authority'
    });
  }
};

/**
 * Event 3: Summary Step (Perfil Analisado)
 */
export const trackSummaryView = (userAnswers = {}) => {
  trackMetaEvent('CustomizeProduct', {
    content_name: 'Plano Personalizado Glúteos 28D',
    user_answers_count: Object.keys(userAnswers).length
  });

  trackMetaEvent('QuizCompleted', {
    status: 'completed',
    timestamp: new Date().toISOString()
  }, true);
};

/**
 * Event 4: Analyzing Step (IA Processing)
 */
export const trackAnalyzingStep = () => {
  trackMetaEvent('Search', {
    search_string: 'Analise Biomecanica IA Gluteos'
  });
};

/**
 * Event 5: Coupon Unlocked (Raspadinha)
 */
export const trackCouponUnlocked = () => {
  trackMetaEvent('CouponUnlocked', {
    coupon_code: 'FITFLOW47',
    discount_amount: 150.00,
    final_price: 47.00
  }, true);
};

/**
 * Event 6: Offer / Result Page Load (InitiateCheckout & High Intent)
 */
export const trackOfferPage = () => {
  trackMetaEvent('InitiateCheckout', {
    content_name: 'FitFlow Método 28D - Coach Luca',
    content_category: 'Programa de Treino e Nutrição',
    content_ids: ['fitflow_28d_47'],
    value: 47.00,
    currency: 'BRL',
    num_items: 1
  });

  trackMetaEvent('OfferPageView', {
    offer_price: 47.00,
    original_price: 197.00,
    discount_percentage: '76%'
  }, true);
};

/**
 * Event 7: Click Checkout Button (High Converting Outbound Click)
 */
export const trackCheckoutClick = () => {
  trackMetaEvent('AddPaymentInfo', {
    content_name: 'FitFlow Método 28D',
    value: 47.00,
    currency: 'BRL'
  });

  trackMetaEvent('ClickCheckoutButton', {
    checkout_url: 'https://pay.cakto.com.br/capui7o_1015855',
    value: 47.00,
    currency: 'BRL',
    timestamp: new Date().toISOString()
  }, true);
};
