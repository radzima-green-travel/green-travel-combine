import { type } from 'arktype';

export namespace AddRouteForm {
  export const Schema = type({
    name: 'string < 100',
  });
  export type Schema = typeof Schema.infer;
}
