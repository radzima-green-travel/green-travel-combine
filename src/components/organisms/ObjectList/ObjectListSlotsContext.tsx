import { createContext, useContext, ReactNode } from 'react';
import type { ObjectListViewMode } from '../../types';

export interface ObjectListSlots {
  cardActionButtons?: (id: string, viewMode: ObjectListViewMode) => ReactNode;
  floatingFooter?: ReactNode;
}

export const ObjectListSlotsContext = createContext<
  ObjectListSlots | undefined
>(undefined);

export const useObjectListSlots = () =>
  useContext(ObjectListSlotsContext) ?? {};
