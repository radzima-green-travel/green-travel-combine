import { memoize } from 'lodash';
import type { ReactNode } from 'react';

export const indexKeyExtractor = <T>(_: T, index: number) => String(index);

const createKeyExtractorBase =
  <T extends string>(attribute: T) =>
  (item: { [K in T]: string | number }) =>
    String(item?.[attribute] ?? '');

export const createKeyExtractor = memoize(createKeyExtractorBase);

export const idKeyExtractor = createKeyExtractor('id');

export const resolveChildrenWithProps = <Props>(
  children: ReactNode | ((props: Props) => ReactNode),
  props: Props,
): React.ReactNode => {
  if (typeof children === 'function') {
    return children(props);
  }
  return children;
};
