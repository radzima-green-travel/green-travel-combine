// Abstract base class for ALL errors
export abstract class AppError<Cause = unknown> {
  public readonly tag: `${string}.${string}` = 'AppError.Unknown';
  public readonly timestamp = Date.now();
  public readonly cause?: Cause;

  constructor(cause?: Cause) {
    this.cause = cause;
  }
}

// AppError namespace with Unknown error and factory function
export namespace AppError {
  export class Unknown extends AppError {}

  // Factory function for creating new error namespaces
  export function createNamespace<NS extends string, Cause = unknown>(
    namespace: NS,
  ) {
    // Base class factory - returns a class extending AppError
    class Base<Name extends string = 'Unknown', C = Cause> extends AppError<C> {
      public readonly tag = `${namespace}.Unknown` as `${NS}.${Name}`;
    }

    // Tagged utility - creates specific error classes
    function Tagged<Name extends string = string, C = Cause>(name: Name) {
      return class extends Base<Name, C> {
        public readonly tag = `${namespace}.${name}` as `${NS}.${Name}`;
      };
    }

    return { Base, Tagged };
  }
}
