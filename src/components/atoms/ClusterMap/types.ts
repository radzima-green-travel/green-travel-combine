import {IBounds, IObject} from 'core/types';
import * as React from 'react';

export type Props = {
  onPress?: () => void;
  onShapePress?: (data: IObject, curretZoom: number) => void;
  bounds: IBounds | null;
  children: React.ReactNode;
};
