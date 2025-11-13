// Inspired by
// https://github.com/agiledigital/typed-redux-saga
// The original plugin is not maintained and a lot of issues have been reported
// So it's better to keep a local implementation for frequently used effects

import { EffectType } from '../../types/utils/effectType';
import {
  CallEffect,
  SelectEffect,
  Tail,
  call as callDefault,
  select as selectDefault,
} from 'redux-saga/effects';

export {
  takeEvery,
  takeLatest,
  takeLeading,
  put,
  take,
  fork,
  cancel,
  cancelled,
  delay,
  debounce,
  throttle,
  all,
  race,
  spawn,
  join,
  actionChannel,
  flush,
  getContext,
  setContext,
  // add other exports from 'redux-saga/effects' as needed, except 'call' and 'select'
} from 'redux-saga/effects';

export function call<Args extends any[], Fn extends (...args: Args) => any>(
  fn: Fn,
  ...args: Args
): Generator<CallEffect<EffectType<Fn>>, EffectType<Fn>>;

export function call<
  Ctx extends { [P in Name]: (this: Ctx, ...args: any[]) => any },
  Name extends string,
>(
  ctxAndFnName: [Ctx, Name],
  ...args: Parameters<Ctx[Name]>
): Generator<CallEffect<EffectType<Ctx[Name]>>, EffectType<Ctx[Name]>>;

export function call<
  Ctx extends { [P in Name]: (this: Ctx, ...args: any[]) => any },
  Name extends string,
>(
  ctxAndFnName: { context: Ctx; fn: Name },
  ...args: Parameters<Ctx[Name]>
): Generator<CallEffect<EffectType<Ctx[Name]>>, EffectType<Ctx[Name]>>;

export function call<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
  ctxAndFn: [Ctx, Fn],
  ...args: Parameters<Fn>
): Generator<CallEffect<EffectType<Fn>>, EffectType<Fn>>;

export function call<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
  ctxAndFn: { context: Ctx; fn: Fn },
  ...args: Parameters<Fn>
): Generator<CallEffect<EffectType<Fn>>, EffectType<Fn>>;

export function* call() {
  // @ts-ignore
  return yield callDefault(...arguments);
}

export function select<Fn extends (state: any, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
): Generator<SelectEffect, EffectType<Fn>>;
export function* select() {
  // @ts-ignore
  return yield selectDefault(...arguments);
}
