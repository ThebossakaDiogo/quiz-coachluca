/**
 * Meta (Facebook) Pixel Ultra-Advanced Tracking Helper
 * Pixel ID: 1086760650449299
 */

import { CHECKOUT_URL } from '../data/quizData';

export const META_PIXEL_ID = '1086760650449299';

/**
 * Dispatch Meta Pixel events safely with error handling and fallback log
 */
export const trackMetaEvent = (eventName, params = {}, isCustom = false) => {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.fbq === 'function') {
      if (isCustom) {
        window.fbq('trackCustom', eventName, {
          ...params,
          pixel_id: META_PIXEL_ID,
          timestamp: new Date().toISOString()
        });
      } else {
        window.fbq('track', eventName, {
          ...params,
          pixel_id: META_PIXEL_ID
        });
      }
    }
  } catch (err) {
    console.warn('[Meta Pixel Tracking Warning]:', err);
  }
};

/**
 * Dynamic PageView Trigger for Hash Changes and Step Navigation
 */
export const trackPageView = (pageSlug = '', extraData = {}) => {
  trackMetaEvent('PageView', {
    page_slug: pageSlug,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...extraData
  });
};

/**
 * Event 1: Start Quiz (Bienvenida -> Paso 1)
 */
export const trackQuizStart = () => {
  trackMetaEvent('QuizStart', {
    content_name: 'Protocolo Glúteos Brasileños - Evaluación',
    funnel_stage: 'quiz_start',
    start_time: new Date().toISOString()
  }, true);

  trackMetaEvent('Lead', {
    content_name: 'Inicio del Quiz PGB',
    content_category: 'Quiz Funnel',
    status: 'started'
  });
};

/**
 * Event 2: Step Answered / Step View with Progress Milestones
 */
export const trackQuizStep = (stepNumber, totalSteps, stepData, selectedValue) => {
  const percentage = Math.round((stepNumber / totalSteps) * 100);
  const stepSlug = stepData?.slug || `paso-${stepNumber}`;

  // Custom step specific event
  trackMetaEvent(`QuizStep_${stepNumber}`, {
    step_number: stepNumber,
    step_slug: stepSlug,
    question_title: stepData?.title || '',
    selected_value: selectedValue || '',
    progress_percentage: `${percentage}%`
  }, true);

  trackMetaEvent('QuizStepView', {
    step_number: stepNumber,
    total_steps: totalSteps,
    step_slug: stepSlug,
    progress_percentage: `${percentage}%`
  }, true);

  // Progressive Milestone tracking for Meta Pixel Optimization
  if (stepNumber === 1) {
    trackMetaEvent('ViewContent', {
      content_name: 'Primera Pregunta - Protocolo PGB',
      content_category: 'Quiz Step',
      content_type: 'product'
    });
  } else if (stepNumber === 4) {
    trackMetaEvent('QuizProgress25', {
      step_number: stepNumber,
      progress: '25%'
    }, true);
  } else if (stepNumber === 7) {
    trackMetaEvent('QuizProgress50', {
      step_number: stepNumber,
      progress: '50%'
    }, true);
  } else if (stepNumber === 10) {
    trackMetaEvent('QuizProgress75', {
      step_number: stepNumber,
      progress: '75%'
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
    answers_count: Object.keys(userAnswers).length,
    timestamp: new Date().toISOString()
  }, true);
};

/**
 * Event 4: Analyzing Step (IA Processing)
 */
export const trackAnalyzingStep = () => {
  trackMetaEvent('Search', {
    search_string: 'Análisis Biomecánico IA Glúteos',
    content_category: 'IA Diagnostics'
  });

  trackMetaEvent('DiagnosingProfile', {
    status: 'analyzing_metrics'
  }, true);
};

/**
 * Event 5: Coupon Unlocked (Raspa y Gana)
 */
export const trackCouponUnlocked = () => {
  trackMetaEvent('CouponUnlocked', {
    coupon_code: 'BECA_VIP',
    discount_percentage: '80%',
    status: 'unlocked',
    currency: 'USD'
  }, true);

  trackMetaEvent('ViewContent', {
    content_name: 'Beca y Cupón Misterioso Desbloqueado',
    content_category: 'Promotion Reward',
    content_type: 'product'
  });
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
 * Get final checkout URL preserving any UTM tracking parameters from current page
 */
export const getFinalCheckoutUrl = () => {
  if (typeof window === 'undefined') return CHECKOUT_URL;
  const search = window.location.search;
  if (!search) return CHECKOUT_URL;
  const cleanSearch = search.startsWith('?') ? search.slice(1) : search;
  const separator = CHECKOUT_URL.includes('?') ? '&' : '?';
  return `${CHECKOUT_URL}${separator}${cleanSearch}`;
};

/**
 * Event 7: Click Checkout Button (AddPaymentInfo & Outbound Conversion Click)
 */
export const trackCheckoutClick = () => {
  const destinationUrl = getFinalCheckoutUrl();

  trackMetaEvent('AddPaymentInfo', {
    content_name: 'Protocolo Glúteos Brasileños',
    content_category: 'Checkout Outbound',
    value: 19.90,
    currency: 'USD'
  });

  trackMetaEvent('ClickCheckoutButton', {
    checkout_url: destinationUrl,
    value: 19.90,
    currency: 'USD',
    pixel_id: META_PIXEL_ID,
    timestamp: new Date().toISOString()
  }, true);

  if (typeof window !== 'undefined') {
    window.location.href = destinationUrl;
  }
};

/**
 * Event 8: VSL Video Page View
 */
export const trackVSLView = () => {
  trackMetaEvent('VSLView', {
    content_name: 'Protocolo Glúteos Brasileños - Video VSL',
    content_category: 'VSL Stage'
  }, true);

  trackMetaEvent('ViewContent', {
    content_name: 'Presentación Oficial Video - VSL Glúteos',
    content_type: 'video'
  });
};

/**
 * Event 9: VSL Video Play Started
 */
export const trackVSLPlay = () => {
  trackMetaEvent('VSLPlay', {
    content_name: 'VSL Video Started',
    action: 'play'
  }, true);
};

/**
 * Event 10: VSL Video Completed or Proceed Clicked
 */
export const trackVSLComplete = () => {
  trackMetaEvent('VSLCompleted', {
    content_name: 'VSL Video Concluded / Next Step',
    action: 'proceed_to_coupon'
  }, true);
};
