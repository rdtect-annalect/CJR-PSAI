/**
 * Constants used throughout the application
 */

export const Constants = {
  // Common CSS class names
  CSS_CLASSES: {
    HIDDEN: "hidden",
    ACTIVE: "active",
    VISIBLE: "visible",
    FADE_IN: "fade-in",
    HAS_SELECTIONS: "has-selections",
    ANIMATED: "animated",
    PULSE: "pulse",
  },

  // Animation settings
  ANIMATION: {
    COUNTER_DURATION: 2000,
    COUNTER_STEP_TIME: 50,
    COUNTER_THRESHOLD: 0.3,
    FADE_THRESHOLD: 0.15,
    FADE_ROOT_MARGIN: "0px 0px -50px 0px",
    LOGO_PULSE_DURATION: 800,
    MAX_CARD_ROTATION: 1.5,
    TRANSITION_DELAY_BASE: 150,
  },

  // Text templates
  TEXT: {
    NO_ROLES_SELECTED: "No roles selected",
    ROLES_PREFIX: "I'm interested in discussing leadership roles",
    ROLES_DETAIL_TEMPLATE:
      "I'm interested in discussing leadership roles, particularly {{roles}}. Please provide information on your search process for these positions.",
    SCHEDULE_CALL_BUTTON_TEXT: "Schedule a Call",
    SCHEDULE_CALL_BUTTON_ACTIVE_TEXT: "Call Scheduled",
    FORM_SUBMIT_MESSAGE: "Form will be submitted to connect@kansearch.com",
  },

  // Timing settings
  TIMING: {
    SCROLL_ANIMATION_DELAY: 700,
    MESSAGE_FOCUS_DELAY: 500,
  },

  // DOM attributes
  ATTRIBUTES: {
    DATA_ROLE: "data-role",
    DATA_COUNT: "data-count",
  },
};
