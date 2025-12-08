export type OneOf<
  A extends Record<string, any>,
  B extends Record<string, any>,
  C extends Record<string, any> = {},
> =
  | (A & Partial<Record<keyof B | keyof C, never>>)
  | (B & Partial<Record<keyof A | keyof C, never>>)
  | (C extends {}
      ? keyof C extends never
        ? never
        : C & Partial<Record<keyof A | keyof B, never>>
      : never);
