import * as React from 'react';

export const navigationRef: React.MutableRefObject<null> = React.createRef();

export function navigate(name: string, params?: Object) {
  // @ts-ignore
  navigationRef.current?.navigate(name, params);
}
