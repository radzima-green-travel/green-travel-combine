/**
 * Analytics event types related to object addition functionality
 */

/**
 * Event triggered when the Add Object view is loaded/viewed
 */
export type AddObjectViewEvent = {
  name: 'AddObject_view';
  data?: Record<string, never>;
};

/**
 * Event triggered when a specific object field view is loaded/viewed
 */
export type AddAnyObjectFieldViewEvent = {
  name: 'Add_any_ObjectField_view';
  data: {
    field_name: string;
  };
};

/**
 * Event triggered when a specific object field input is submitted
 */
export type AddAnyObjectFieldInputSubmitEvent = {
  name: 'Add_any_ObjectField_input_submit';
  data: {
    field_name: string;
  };
};

/**
 * Event triggered when all object data is submitted together
 */
export type AddObjectSendAllEvent = {
  name: 'AddObject_send_all';
  data: {
    field_values: string[];
  };
};

/**
 * Event triggered when the Add Object view is closed
 */
export type AddObjectCloseEvent = {
  name: 'AddObject_close';
  data: {
    at_least_one_field_filled: boolean;
  };
};

/**
 * Union type of all Add Object related analytics events
 */
export type AddObjectAnalyticsEvent =
  | AddObjectViewEvent
  | AddAnyObjectFieldViewEvent
  | AddAnyObjectFieldInputSubmitEvent
  | AddObjectSendAllEvent
  | AddObjectCloseEvent;
