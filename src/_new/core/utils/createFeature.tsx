import {
  createContext,
  type Context,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

type FeatureDefinitionWithDependencies<TDependencies, TExports> = {
  Provider: (props: PropsWithChildren<{ value: TDependencies }>) => ReactNode;
  Context: Context<TExports>;
};

type FeatureDefinitionWithoutDependencies<TExports> = {
  Provider: (props: PropsWithChildren) => ReactNode;
  Context: Context<TExports>;
};

// Overload for features with dependencies
export function createFeature<TDependencies, TExports>(params: {
  dependencies: Context<TDependencies>;
  exports: TExports;
}): FeatureDefinitionWithDependencies<TDependencies, TExports>;

// Overload for features without dependencies
export function createFeature<TExports>(params: {
  exports: TExports;
  dependencies?: never;
}): FeatureDefinitionWithoutDependencies<TExports>;

// Implementation
export function createFeature<TDependencies, TExports>({
  dependencies,
  exports,
}: {
  dependencies?: Context<TDependencies>;
  exports: TExports;
}):
  | FeatureDefinitionWithDependencies<TDependencies, TExports>
  | FeatureDefinitionWithoutDependencies<TExports> {
  const ExportsContext = createContext<TExports>(null!);

  if (dependencies) {
    const Provider = ({
      children,
      value,
    }: PropsWithChildren<{ value: TDependencies }>) => (
      <dependencies.Provider value={value}>
        <ExportsContext.Provider value={exports}>
          {children}
        </ExportsContext.Provider>
      </dependencies.Provider>
    );

    return {
      Provider,
      Context: ExportsContext,
    } as FeatureDefinitionWithDependencies<TDependencies, TExports>;
  }

  const Provider = ({ children }: PropsWithChildren) => (
    <ExportsContext.Provider value={exports}>
      {children}
    </ExportsContext.Provider>
  );

  return {
    Provider,
    Context: ExportsContext,
  } as FeatureDefinitionWithoutDependencies<TExports>;
}
