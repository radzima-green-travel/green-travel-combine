import { createContext } from 'react';

export interface RoutesDependenciesType {
  isAuthenticated: boolean;
  redirectToSignIn: (params: {
    onSuccess: () => void;
    authPromptMessage?: string;
  }) => void;
}

export const RoutesDependencies = createContext<RoutesDependenciesType>(null!);
