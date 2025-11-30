import React, {
  ComponentProps,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react';

export const isElementOfType = <const T extends ComponentType<any>>(
  element: ReactNode,
  type: T,
): element is ReactElement<ComponentProps<T>, T> => {
  if (!React.isValidElement(element)) {
    return false;
  }
  return element.type === type || (element.type as any).name === type.name;
};
