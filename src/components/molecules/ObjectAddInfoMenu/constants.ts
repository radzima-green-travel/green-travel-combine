import {KeyboardType} from 'react-native';
import {ObjectField} from 'core/constants';

export const SINGLE_LINE_FIELDS = new Set([ObjectField.phoneNumber]);
export const PROMPTLESS_FIELDS = new Set([ObjectField.phoneNumber]);

type Prop<T> = {[key in ObjectField]?: T};

export const PLACEHOLDER: Prop<string> = {
  [ObjectField.phoneNumber]: '+375 29 1234567',
};

export const KEYBOARD_TYPE: Prop<KeyboardType> = {
  [ObjectField.phoneNumber]: 'phone-pad',
};
