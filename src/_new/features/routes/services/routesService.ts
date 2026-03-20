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
  }
}
