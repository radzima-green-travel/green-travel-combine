export type EffectType<T> = T extends (
  ...args: any[]
) => Generator<unknown, infer Return>
  ? Return
  : T extends (...args: any) => Promise<infer U>
    ? U
    : T extends (...args: any) => any
      ? ReturnType<T>
      : never;
