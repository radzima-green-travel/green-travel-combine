import {ReactFormExtendedApi} from '@tanstack/react-form';

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
