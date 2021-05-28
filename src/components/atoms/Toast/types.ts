import {PropsWithChildren} from 'react';

export type toastRef = {
  show: () => void;
  hide: () => void;
};

export type Props = PropsWithChildren<{
  ref: React.Ref<toastRef>;
  isOnTop?: boolean;
  safeArea?: boolean;
}>;
