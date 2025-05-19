import {ReactFormExtendedApi} from '@tanstack/react-form';
import {FormInputProps} from '../../atoms/FormInput/FormInput';

export type FieldConfig = Pick<FormInputProps, 'maxLength' | 'multiline'>;
export type AnyForm<T = any> = ReactFormExtendedApi<
  T,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export type AnyFormValues = Record<string, any>;
