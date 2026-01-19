import { useContext } from 'react';
import { SearchScreen } from '../Search/SearchScreen';
import { Routes } from '@features/routes';

export const AddObjectsToRoute = () => {
  const { useAddToRoute } = useContext(Routes.Context);

  const { AddToRouteButton } = useAddToRoute();

  return (
    <SearchScreen
      slots={{ actionButtons: id => <AddToRouteButton objectId={id} /> }}
    />
  );
};
