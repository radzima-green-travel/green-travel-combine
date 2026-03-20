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

    async delete(id: string): Promise<void> {
      await this.client.executeQuery({
        query: `
          mutation DeleteRoute($id: String!) {
            deleteRoute(id: $id)
          }
        `,
        params: { id },
        schema: type('unknown').pipe(() => undefined),
      });
    }

    async setObjectRoutes(input: RouteModel.SetObjectRoutesInput) {
      return this.client.executeQuery({
        query: `
        mutation SetObjectRoutes($input: SetObjectRoutesInput!) {
          setObjectRoutes(input: $input) {
            id
            name
            objectIds
          }
        }
      `,
        params: { input },
        schema: type({ setObjectRoutes: 'unknown[]' }).pipe(
          ({ setObjectRoutes }) =>
            RouteModel.Route.array().assert(setObjectRoutes),
        ),
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

      const index = this.routes.findIndex(route => route.id === input.id);

      if (index === -1) {
        throw new Error('Route not found');
      }

      const updatedRoute = {
        ...this.routes[index],
        ...(input.name !== undefined && { name: input.name }),
        ...(input.objectIds !== undefined && { objectIds: input.objectIds }),
      };

      this.routes[index] = updatedRoute;
      return updatedRoute;
    }

    async delete(id: string): Promise<void> {
      await delay(300);
      const index = this.routes.findIndex(r => r.id === id);
      if (index !== -1) {
        this.routes.splice(index, 1);
      }
    }

    async setObjectRoutes(
      input: RouteModel.SetObjectRoutesInput,
    ): Promise<RouteModel.Route[]> {
      await delay(500);

      const selectedRouteIds = new Set(input.routeIds);
      const updatedRoutes: RouteModel.Route[] = [];

      for (const route of this.routes) {
        const hasObject = route.objectIds.includes(input.objectId);
        const shouldHaveObject = selectedRouteIds.has(route.id);

        if (hasObject === shouldHaveObject) {
          continue;
        }

        route.objectIds = shouldHaveObject
          ? [...route.objectIds, input.objectId]
          : route.objectIds.filter(id => id !== input.objectId);

        updatedRoutes.push(route);
      }

      return updatedRoutes;
    }
  }
}
