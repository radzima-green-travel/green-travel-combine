import type { useBottomMenu } from 'core/hooks';
import { useTranslation } from 'react-i18next';
import { AddRouteForm } from '../../../model';
import type { AnyFormApi } from '@tanstack/react-form';
import { useUpdateRoute } from '../../../api';

export const useRenameRouteForm = ({
  menuProps,
  routeName,
  routeId,
  onSuccess,
}: {
  menuProps: ReturnType<typeof useBottomMenu>;
  routeName: string;
  routeId: string;
  onSuccess?: () => void;
}) => {
  const { t: tRoutes } = useTranslation('routes');

  const { mutate: updateRoute } = useUpdateRoute({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const resetForm = (formApi: AnyFormApi) => {
    formApi.reset();
  };

  const handleSubmit = (name: string, formApi: AnyFormApi) => {
    menuProps.closeMenu();
    updateRoute({ id: routeId, name });
    resetForm(formApi);
  };

  const schema = AddRouteForm.Schema.pick('name');

  const t = (key: string) => tRoutes(`renameRouteForm.${key}`);

  return {
    handleSubmit,
    resetForm,
    defaultValue: routeName,
    schema,
    t,
  };
};
