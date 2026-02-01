import { useBottomMenu } from 'core/hooks/useBottomMenu';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddRouteForm } from '../../../model';
import { useCreateRoute } from '../../../api';
import { useSnackbar } from 'atoms';
import type { RouteModel } from '../../../model';

export const useAddRouteSheet = ({
  menuProps,
  onRouteCreated,
}: {
  onRouteCreated?: (routeId: RouteModel.Route['id']) => void;
  menuProps: ReturnType<typeof useBottomMenu>;
}) => {
  const { t: tRoutes } = useTranslation('routes');

  const snackbar = useSnackbar();

  const { mutate: createRoute } = useCreateRoute({
    onSuccess: data => {
      onRouteCreated?.(data.id);
    },
    onError: () => {
      snackbar.show({
        type: 'error',
        title: tRoutes('addRouteForm.error'),
      });
    },
  });

  const handleSubmit = (name: AddRouteForm.Schema['name']) => {
    menuProps.closeMenu();
    createRoute({ name: name });
  };

  const [{ defaultValue, schema }] = useState(() => ({
    defaultValue: AddRouteForm.Schema.from({ name: '' }).name,
    schema: AddRouteForm.Schema.pick('name'),
  }));

  // keyPrefix is not working as expected, so we need to use this wrapper function to get the translation
  const t = (key: string) => tRoutes(`addRouteForm.${key}`);

  return {
    handleSubmit,
    defaultValue,
    schema,
    t,
    snackbar,
  };
};
