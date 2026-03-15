import { useObservable } from '@legendapp/state/react';
import { useSnackbar } from 'atoms';
import { useBottomMenu } from 'core/hooks';
import { createContext } from 'react';

export type SaveToRouteListState = {
  selectedRouteIds: Set<string>;
  initialRouteIds: Set<string>;
  isPending: boolean;
};

export type SaveToRouteListFlowContextValue = {
  state$: ReturnType<typeof useObservable<SaveToRouteListState>>;
  toggle: (routeId: string) => void;
  save: () => Promise<void>;
  showSuccessNotification: (input: {
    addedRouteNames?: string[];
    removedRouteNames?: string[];
  }) => void;
  menuProps: ReturnType<typeof useBottomMenu>;
  snackbar: ReturnType<typeof useSnackbar>;
  objectId: string;
};

export const SaveToRouteListFlowContext =
  createContext<SaveToRouteListFlowContextValue>(null!);
