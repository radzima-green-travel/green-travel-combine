import {Buffer} from 'buffer';
import {isObject} from 'lodash';

export function base64(fromInputString: string | undefined): {
  toString(): string;
  toMaybeObject<OfType extends object>(): OfType | null;
};
export function base64(): {
  from(value: string | object | undefined): string;
};
export function base64(maybeInputValue?: string): any {
  if (arguments.length) {
    const _decode = (value: string | undefined) => {
      return value ? Buffer.from(value, 'base64').toString('utf-8') : '';
    };

    return {
      toString() {
        return _decode(maybeInputValue);
      },
      toMaybeObject() {
        try {
          return JSON.parse(_decode(maybeInputValue));
        } catch {
          return null;
        }
      },
    };
  }

  return {
    from(value: string | object | undefined) {
      if (!value) {
        return '';
      }

      return Buffer.from(
        isObject(value) ? JSON.stringify(value) : value,
      ).toString('base64');
    },
  };
}
