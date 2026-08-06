/**
 * Meta (Facebook) Pixel Ultra-Advanced Tracking Helper
 * Pixel ID: 826614323775176
 */

export const META_PIXEL_ID = '826614323775176';

/**
 * Dispatch Meta Pixel events safely with error handling and fallback log
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
    content_name: 'Protocolo Glúteos Brasileños - Evaluación',
    start_time: new Date().toISOString()
  }, true);

  trackMetaEvent('Lead', {
    content_name: 'Inicio del Quiz PGB',
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
      content_name: 'Primera Pregunta - Protocolo PGB',
      content_category: 'Quiz Step',
      content_type: 'product'
    });
  } else if (stepNumber === 5) {
    trackMetaEvent('QuizMidpoint', {
      step_number: 5,
      progress: '40%'
    }, true);
  } else if (stepData?.type === 'coach') {
    trackMetaEvent('ViewContent', {
      content_name: 'Presentación Coach Luca',
      content_category: 'Coach Authority',
      content_type: 'product'
    });
  }
};

/**
 * Event 3: Summary Step (Perfil Analizado)
 */
export const trackSummaryView = (userAnswers = {}) => {
  trackMetaEvent('CustomizeProduct', {
    content_name: 'Plan Personalizado Glúteos 28D',
    user_answers_count: Object.keys(userAnswers).length,
    value: 19.90,
    currency: 'USD'
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
    coupon_code: 'PGB1990',
    discount_amount: 77.10,
    final_price: 19.90,
    currency: 'USD'
  }, true);
};

/**
 * Event 6: Offer / Result Page Load (AddToCart & InitiateCheckout)
 */
export const trackOfferPage = () => {
  trackMetaEvent('AddToCart', {
    content_name: 'Protocolo Glúteos Brasileños by Coach Luca',
    content_category: 'Programa de Entrenamiento y Nutrición',
    content_type: 'product',
    content_ids: ['pgb_1990'],
    value: 19.90,
    currency: 'USD'
  });

  trackMetaEvent('InitiateCheckout', {
    content_name: 'Protocolo Glúteos Brasileños by Coach Luca',
    content_category: 'Programa de Entrenamiento y Nutrición',
    content_type: 'product',
    content_ids: ['pgb_1990'],
    value: 19.90,
    currency: 'USD',
    num_items: 1
  });

  trackMetaEvent('OfferPageView', {
    offer_price: 19.90,
    original_price: 97.00,
    discount_percentage: '80%',
    pixel_id: META_PIXEL_ID
  }, true);
};

/**
 * Event 7: Click Checkout Button (AddPaymentInfo & Outbound Conversion Click)
 */
export const trackCheckoutClick = () => {
  trackMetaEvent('AddPaymentInfo', {
    content_name: 'Protocolo Glúteos Brasileños',
    content_category: 'Checkout Outbound',
    value: 19.90,
    currency: 'USD'
  });

  trackMetaEvent('ClickCheckoutButton', {
    checkout_url: 'https://go.centerpag.com/PPU38CQERJL',
    value: 19.90,
    currency: 'USD',
    pixel_id: META_PIXEL_ID,
    timestamp: new Date().toISOString()
  }, true);
};
