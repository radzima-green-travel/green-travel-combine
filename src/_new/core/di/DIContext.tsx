import React, { createContext, useContext, ReactNode } from 'react';
import { Container, ServiceIdentifier } from 'inversify';

const InversifyContext = createContext<{ container: Container | null }>({
  container: null,
});

type Props = {
  container: Container;
  children: ReactNode;
};

export const DIProvider: React.FC<Props> = ({ container, children }) => {
  return (
    <InversifyContext.Provider value={{ container }}>
      {children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(identifier: ServiceIdentifier<T>): T {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error('DI Container not found! Wrap your app in <DIProvider>');
  }
  return container.get<T>(identifier);
}
