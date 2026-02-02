import 'reflect-metadata';
import { Container } from 'inversify';
import { GraphQlClient } from '../services/graphqlClient';
import { RoutesService } from '@features/routes/services/routesService';

const container = new Container();

container.bind(GraphQlClient.Tag).to(GraphQlClient.Default).inSingletonScope();
container.bind(RoutesService.Tag).to(RoutesService.Mock).inSingletonScope();

export { container };
