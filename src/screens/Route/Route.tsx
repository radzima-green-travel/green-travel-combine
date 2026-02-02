import React, { useContext } from 'react';
import { Routes } from '@features/routes';

export function RouteScreen() {
  const { RouteScreen } = useContext(Routes.Context);

  return <RouteScreen />;
}
