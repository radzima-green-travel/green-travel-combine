import { IconName } from 'components/atoms/Icon/types';
import { KeyboardEventName, Platform } from 'react-native';
import {} from './types/analytics';
import {
  NavigationRoutes,
  AnalyticsNavigationScreenNames,
  AnalyticsAddInfoFieldsNames,
  SearchFilters,
} from './types';

export const enum ACTIONS {
  BOOTSTRAP = 'BOOTSTRAP',
  SHOW_OBJECT_DETAILS_MAP_DIRECTION = 'SHOW_OBJECT_DETAILS_MAP_DIRECTION',
  CLEAR_OBJECT_DETAILS_MAP_DIRECTION = 'CLEAR_OBJECT_DETAILS_MAP_DIRECTION',
  SET_OBJECT_DETAILS_MAP_OBJECTS = 'SET_OBJECT_DETAILS_MAP_OBJECTS',
  CLEAR_USER_DATA = 'CLEAR_USER_DATA',
  SIGNUP = 'SIGNUP',
  CONFIRM_SIGNUP = 'CONFIRM_SIGNUP',
  CONFIRM_SIGNUP_CANCEL = 'CONFIRM_SIGNUP_CANCEL',
  SIGNIN = 'SIGNIN',
  SIGNOUT = 'SIGNOUT',
  DELETE_USER = 'DELETE_USER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CONFIRM_NEW_PASSWORD = 'CONFIRM_NEW_PASSWORD',
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
  CLEAR_CACHE = 'CLEAR_CACHE',
  SET_THEME = 'SET_THEME',
  SET_LANGUAGE = 'SET_LANGUAGE',
  IN_APP_BROWSER_SUCCESS_OPERATION = 'IN_APP_BROWSER_SUCCESS_OPERATION',
  IN_APP_BROWSER_CANCEL_OPERATION = 'IN_APP_BROWSER_CANCEL_OPERATION',
  SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  FORGOT_PASSWORD_CODE_SUBMIT = 'FORGOT_PASSWORD_CODE_SUBMIT',
  CHECK_USER_EMAIL = 'CHECK_USER_EMAIL',
  RESEND_SIGNUP_CODE = 'RESEND_SIGNUP_CODE',
  RESET_USER_AUTH_DATA = 'RESET_USER_AUTH_DATA',
  GET_VISITED_OBJECTS = 'GET_VISITED_OBJECTS',
  ADD_VISITED_OBJECT = 'ADD_VISITED_OBJECT',
  DELETE_VISITED_OBJECT = 'DELETE_VISITED_OBJECT',
  CLEAR_VISITED_OBJECTS = 'CLEAR_VISITED_OBJECTS',
  SCHEDULE_OPEN_SHARE_EXPERIENCE_MENU = 'SCHEDULE_OPEN_SHARE_EXPERIENCE_MENU',
  SET_SHARE_EXPERIENCE_DATA = 'SET_SHARE_EXPERIENCE_DATA',
  CLEAR_SHARE_EXPERIENCE_DATA = 'CLEAR_SHARE_EXPERIENCE_DATA',
  UPDATE_VISITED_OBJECT = 'UPDATE_VISITED_OBJECT',
  SEND_INACCURACIES_EMAIL = 'SEND_INACCURACIES_EMAIL',
  SEND_ADD_INFO_EMAIL = 'SEND_ADD_INFO_EMAIL',
}

export const DEFAULT_BOUNDS = {
  ne: [110.07385416701771, 85.05112862791776],
  sw: [-110.07385416703308, -85.05112862791907],
  paddingLeft: 30,
  paddingRight: 30,
};

export const enum MAP_PINS {
  BICYCLE_ROUTE = 'bicycle-route',
  CAR_ROUTE = 'car-route',
  OBJECT = 'object',
  HISTORICAL_PLACE = 'historical-place',
  EXCURSION_PIN = 'excursion-pin',
  WALKING_ROUTES = 'walking-routes',
  WATER_ROUTE = 'water-route',
  CASTLES = 'castles',
  MUSEUMS = 'museums',
  NATURE_MONUMENTS = 'nature-monuments',
  OTHER_MONUMENTS = 'other-monuments',
  WAR_MONUMENTS = 'war-monuments',
  EMPTY_BIG = 'empty-big',
  EMPTY = 'empty',
  SELECTED_POSTFIX = '-black',
}

export const PADDING_HORIZONTAL = 16;
export const HEADER_OVERLAY_OFFSET = 20;

export const ICONS_MATCHER = {
  [MAP_PINS.BICYCLE_ROUTE]: 'bike' as IconName,
  [MAP_PINS.HISTORICAL_PLACE]: 'church' as IconName,
  [MAP_PINS.WALKING_ROUTES]: 'footprints' as IconName,
  [MAP_PINS.EXCURSION_PIN]: 'flag' as IconName,
  [MAP_PINS.OBJECT]: 'forest' as IconName,
  [MAP_PINS.WATER_ROUTE]: 'wave' as IconName,
  [MAP_PINS.CASTLES]: 'castles' as IconName,
  [MAP_PINS.MUSEUMS]: 'museums' as IconName,
  [MAP_PINS.NATURE_MONUMENTS]: 'natureMonuments' as IconName,
  [MAP_PINS.OTHER_MONUMENTS]: 'otherMonuments' as IconName,
  [MAP_PINS.WAR_MONUMENTS]: 'warMonuments' as IconName,
  [MAP_PINS.CAR_ROUTE]: 'car' as IconName,
};

export const MAP_BOTTOM_MENU_HEIGHT = 185;

export const DEFAULT_LOCALE = 'ru';

export type THEME_TYPE = 'light' | 'dark';

export const RADZIMA_URL = 'https://radzima.app';

export const EPAM_PRIVACY_POLICY_URL = 'https://www.epam.com/privacy-policy';

export const KEYBOARD_SHOW_EVENT: KeyboardEventName =
  Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
export const KEYBOARD_HIDE_EVENT: KeyboardEventName =
  Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
export const KEYBOARD_FRAME_CHANGE_EVENT: KeyboardEventName =
  Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidChangeFrame';

export enum ObjectField {
  upcomingEvents = 'upcomingEvents',
  phoneNumber = 'phoneNumber',
  address = 'address',
  name = 'name',
  location = 'location',
  dinnerPlaces = 'dinnerPlaces',
  accommodationPlace = 'accommodationPlace',
  url = 'url',
  length = 'length',
  duration = 'duration',
  workingHours = 'workingHours',
  permissions = 'permissions',
  childServices = 'childServices',
  renting = 'renting',
  notes = 'note',
  author = 'author',
  description = 'description',
  belongsTo = 'belongsTo',
  include = 'include',
  area = 'area',
  origins = 'origins',
  attendanceTime = 'attendanceTime',
  googlePlaceId = 'googlePlaceId ',
  googleRating = 'googleRating',
  googleRatingsTotal = 'googleRatingsTotal',
  routes = 'routes',
}

export const OBJECT_ALLOWED_EDIT_FIELDS = [
  ObjectField.phoneNumber,
  ObjectField.accommodationPlace,
  ObjectField.attendanceTime,
  ObjectField.childServices,
  ObjectField.dinnerPlaces,
  ObjectField.renting,
  ObjectField.upcomingEvents,
  ObjectField.workingHours,
] as const;

// export const OBJECT_ALLOWED_EDIT_FIELDS = new Set(
//   OBJECT_ALLOWED_EDIT_FIELDS_ARRAY,
// );

export const AnalyticScreensNames: Partial<
  Record<NavigationRoutes, AnalyticsNavigationScreenNames>
> = {
  ObjectDetails: 'ObjectScreen',
  Home: 'HomeScreen',
  BookmarksList: 'BookmarksListScreen',
  ObjectsList: 'ObjectListScreen',
  Search: 'SearchAndFiltersScreen',
  Explore: 'ExploreScreen',
};

export const AnalyticsAllowedEditFields: Record<
  (typeof OBJECT_ALLOWED_EDIT_FIELDS)[number],
  AnalyticsAddInfoFieldsNames
> = {
  [ObjectField.phoneNumber]: 'phone',
  [ObjectField.accommodationPlace]: 'sleep_place',
  [ObjectField.attendanceTime]: 'avg_visit_time',
  [ObjectField.childServices]: 'child_service',
  [ObjectField.dinnerPlaces]: 'eat_place',
  [ObjectField.renting]: 'rent_service',
  [ObjectField.upcomingEvents]: 'upcoming_events',
  [ObjectField.workingHours]: 'work_hours',
};

export const TIME_PICKER_FIELDS = new Set([ObjectField.attendanceTime]);

export const DEFAULT_DISTANCE_FILTER_VALUE = 5;
export const INITIAL_FILTERS: SearchFilters = {
  googleRating: '',
  categories: [],
  regions: [],
  municipalities: [],
  distance: {
    isOn: false,
    value: DEFAULT_DISTANCE_FILTER_VALUE,
    location: null,
  },
  excludeVisited: false,
};
export const FILTERS_NAMES_ANAYLITICS_MAP = {
  categories: 'category',
  regions: 'region',
  municipalities: 'settlement',
  distance: 'distance',
  googleRating: 'google_rating',
  excludeVisited: 'hide_visited',
};

export const INTERACTIVE_CARD_RATIO = 324 / 144;
