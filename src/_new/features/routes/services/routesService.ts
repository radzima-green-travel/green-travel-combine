import { GraphQlClient } from '@core/services/graphqlClient';
import type { Public } from 'core/types/utils/common';
import { type } from 'arktype';
import type { ServiceIdentifier } from 'inversify';
import { injectable } from 'inversify';
import { RouteModel } from '../model';
import { delay } from '@core/utils';

export namespace RoutesService {
  @injectable()
  export class Default {
    constructor(private readonly client: GraphQlClient.Tag) {}

    async getList() {
      return this.client.executeQuery({
        query: `
        query GetRoutes {
          routes {
            id
            name
            objectIds
          }
        }
      `,
        schema: type({ routes: 'unknown[]' }).pipe(({ routes }) =>
          RouteModel.Route.array().assert(routes),
        ),
      });
    }

    async create(input: RouteModel.CreateRouteInput) {
      return this.client.executeQuery({
        query: `
        mutation CreateRoute($input: CreateRouteInput!) {
          createRoute(input: $input) {
            id
            name
            objectIds
          }
        }
      `,
        params: { input },
        schema: RouteModel.Route,
      });
    }

    async update(input: RouteModel.UpdateRouteInput) {
      return this.client.executeQuery({
        query: `
        mutation UpdateRoute($input: UpdateRouteInput!) {
          updateRoute(input: $input) {
            id
            name
            objectIds
          }
        }
      `,
        params: { input },
        schema: RouteModel.Route,
      });
    }
  }

  export type Tag = Public<Default>;
  export const Tag: ServiceIdentifier<Tag> = Symbol.for('RoutesService');

  @injectable()
  export class Mock implements Tag {
    private readonly routes: RouteModel.Route[] = [];

    async getList(): Promise<RouteModel.Route[]> {
      await delay(500);
      return [...this.routes];
    }

    async create(
      input: RouteModel.CreateRouteInput,
    ): Promise<RouteModel.Route> {
      await delay(300);

      const route = RouteModel.createOptimisticRoute(input);
      this.routes.unshift(route);
      return route;
    }

    async update(
      input: RouteModel.UpdateRouteInput,
    ): Promise<RouteModel.Route> {
      await delay(500);

      const route = this.routes.find(route => route.id === input.id);

      if (!route) {
        throw new Error('Route not found');
      }

      route.objectIds = input.objectIds || [];

      return route;
    }
  }
}
