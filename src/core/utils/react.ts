import { memoize } from 'lodash';
import React, {
  ComponentProps,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react';

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

export const isElementOfType = <const T extends ComponentType<any>>(
  element: ReactNode,
  type: T,
): element is ReactElement<ComponentProps<T>, T> => {
  if (!React.isValidElement(element)) {
    return false;
  }

  return element.type === type;
};
