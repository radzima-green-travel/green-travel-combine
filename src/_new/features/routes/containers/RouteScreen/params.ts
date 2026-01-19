import { type } from 'arktype';

export const RouteScreenParams = type({
  id: 'string',
});

export type RouteScreenParams = typeof RouteScreenParams.infer;
