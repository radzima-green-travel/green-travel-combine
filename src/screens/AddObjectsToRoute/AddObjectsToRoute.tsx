import { useContext } from 'react';
import { SearchScreen } from '../Search/SearchScreen';
import { Routes } from '@features/routes';

export const AddObjectsToRoute = () => {
  const { AddToRouteFlow } = useContext(Routes.Context);

  return (
    <AddToRouteFlow.Provider>
      <SearchScreen
        slots={{
          cardActionButtons: (id, viewMode) => (
            <AddToRouteFlow.AddButton objectId={id} listViewMode={viewMode} />
          ),
          floatingFooter: <AddToRouteFlow.ActionBar />,
        }}
      />
    </AddToRouteFlow.Provider>
  );
};
