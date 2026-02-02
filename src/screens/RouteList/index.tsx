import { useContext } from 'react';
import { Routes } from '@features/routes';

export const RouteListScreen = () => {
  const { RouteListScreen } = useContext(Routes.Context);

  return <RouteListScreen />;
};
