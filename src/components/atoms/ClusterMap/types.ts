import {IBounds} from 'core/types';
import * as React from 'react';

export type Props = {
  onPress: () => void;
  onShapePress: () => void;
  bounds: IBounds | null;
  children: React.ReactNode;
};
