import { GraphQlClient } from '@core/services/graphqlClient';
import type { Public } from 'core/types/utils/common';
import { type } from 'arktype';
import type { ServiceIdentifier } from 'inversify';
import { injectable } from 'inversify';
import { Route } from '../model';
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
          Route.Route.array().assert(routes),
        ),
      });
    }

    async create(input: Route.CreateRouteInput) {
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
        schema: Route.Route,
      });
    }

    async update(input: Route.UpdateRouteInput) {
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
        schema: Route.Route,
      });
    }
  }

  export type Tag = Public<Default>;
  export const Tag: ServiceIdentifier<Tag> = Symbol.for('RoutesService');

  @injectable()
  export class Mock implements Tag {
    private readonly routes: Route.Route[] = [];

    async getList(): Promise<Route.Route[]> {
      await delay(1000);
      return this.routes;
    }

    async create(input: Route.CreateRouteInput): Promise<Route.Route> {
      await delay(1000);
      const route = Route.createOptimisticRoute(input);
      this.routes.push(route);
      return route;
    }

    async update(input: Route.UpdateRouteInput): Promise<Route.Route> {
      throw new Error('Method not implemented.');
    }
  }
}
