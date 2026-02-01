import { type } from 'arktype';

export namespace RouteModel {
  export const Route = type({
    id: 'string',
    name: 'string',
    objectIds: 'string[]',
  });
  export type Route = typeof Route.infer;

  export interface CreateRouteInput {
    name: string;
    objectIds?: string[];
  }

  export interface UpdateRouteInput {
    id: string;
    name?: string;
    objectIds?: string[];
  }

  export const createOptimisticRoute = (input: CreateRouteInput) => {
    return {
      id: `temp-${Date.now()}`,
      name: input.name,
      objectIds: input.objectIds || [],
    };
  };
}
