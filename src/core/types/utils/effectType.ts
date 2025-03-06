export type EffectType<T> = T extends (
  ...args: any[]
) => Generator<unknown, infer ReturnType>
  ? ReturnType
  : T extends (...args: any) => Promise<infer Payload>
    ? Payload
    : T extends (...args: any) => infer ReturnType
      ? ReturnType
      : never;
