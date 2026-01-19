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

/**
 * Statically extracts only the public members of a class.
 * This is useful for creating interfaces from classes that have private or protected members,
 * and for mocking classes without having to implement private fields or constructor details.
 */
export type Public<T> = { [P in keyof T]: T[P] };
