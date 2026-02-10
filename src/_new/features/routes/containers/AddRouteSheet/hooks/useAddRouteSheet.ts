import type { useBottomMenu } from 'core/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddRouteForm } from '../../../model';

export const useAddRouteSheet = ({
  menuProps,
  onSubmitName,
}: {
  onSubmitName?: (name: string) => void;
  menuProps: ReturnType<typeof useBottomMenu>;
}) => {
  const { t: tRoutes } = useTranslation('routes');

  const handleSubmit = (name: AddRouteForm.Schema['name']) => {
    menuProps.closeMenu();
    onSubmitName?.(name);
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
  };
};
