import {ReactNode} from 'react';
import {ILabelError} from 'core/types';

export type Props = {
  loading?: boolean;
  error?: ILabelError | null;
  darkBackground?: boolean;
  retryCallback?: () => void;
  children: ReactNode;
  cover?: boolean;
};
