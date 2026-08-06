/**
 * Meta (Facebook) Pixel Ultra-Advanced Tracking Helper
 * Pixel ID: 1043202255361208
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
 * Event 1: Start Quiz (Bienvenida -> Paso 1)
 */
export const trackQuizStart = () => {
  trackMetaEvent('QuizStart', {
    content_name: 'Método Glúteos Brasileños - Evaluación',
    start_time: new Date().toISOString()
  }, true);
  
  trackMetaEvent('Lead', {
    content_name: 'Inicio del Quiz',
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
    step_slug: stepData?.slug || `paso-${stepNumber}`,
    question_title: stepData?.title || '',
    selected_value: selectedValue || '',
    progress_percentage: `${percentage}%`
  }, true);

  // Milestone tracking for Facebook Optimization
  if (stepNumber === 1) {
    trackMetaEvent('ViewContent', {
      content_name: 'Primera Pregunta',
      content_category: 'Quiz Step'
    });
  } else if (stepNumber === 5) {
    trackMetaEvent('QuizMidpoint', {
      step_number: 5,
      progress: '40%'
    }, true);
  } else if (stepData?.type === 'coach') {
    trackMetaEvent('ViewContent', {
      content_name: 'Presentación Coach Luca',
      content_category: 'Coach Authority'
    });
  }
};

/**
 * Event 3: Summary Step (Perfil Analizado)
 */
export const trackSummaryView = (userAnswers = {}) => {
  trackMetaEvent('CustomizeProduct', {
    content_name: 'Plan Personalizado Glúteos 28D',
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
    search_string: 'Análisis Biomecánico IA Glúteos'
  });
};

/**
 * Event 5: Coupon Unlocked (Raspa y Gana)
 */
export const trackCouponUnlocked = () => {
  trackMetaEvent('CouponUnlocked', {
    coupon_code: 'BRASIL990',
    discount_amount: 87.10,
    final_price: 9.90
  }, true);
};

/**
 * Event 6: Offer / Result Page Load (InitiateCheckout & High Intent)
 */
export const trackOfferPage = () => {
  trackMetaEvent('InitiateCheckout', {
    content_name: 'Método Glúteos Brasileños - Coach Luca',
    content_category: 'Programa de Entrenamiento y Nutrición',
    content_ids: ['gluteos_brasil_990'],
    value: 9.90,
    currency: 'USD',
    num_items: 1
  });

  trackMetaEvent('OfferPageView', {
    offer_price: 9.90,
    original_price: 97.00,
    discount_percentage: '90%'
  }, true);
};

/**
 * Event 7: Click Checkout Button (High Converting Outbound Click)
 */
export const trackCheckoutClick = () => {
  trackMetaEvent('AddPaymentInfo', {
    content_name: 'Método Glúteos Brasileños',
    value: 9.90,
    currency: 'USD'
  });

  trackMetaEvent('ClickCheckoutButton', {
    checkout_url: 'https://pay.cakto.com.br/capui7o_1015855',
    value: 9.90,
    currency: 'USD',
    timestamp: new Date().toISOString()
  }, true);
};
