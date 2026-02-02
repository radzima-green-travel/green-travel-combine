import { createContext } from 'react';

export interface RoutesDependenciesType {
  // Add external dependencies here when needed
}

export const RoutesDependencies = createContext<RoutesDependenciesType>(null!);
