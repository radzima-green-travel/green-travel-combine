import type { useBottomMenu } from 'core/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddRouteForm } from '../../../model';
import type { AnyFormApi } from '@tanstack/react-form';

export const useAddRouteForm = ({
  menuProps,
  onSubmit,
}: {
  onSubmit?: (name: string) => void;
  menuProps: ReturnType<typeof useBottomMenu>;
}) => {
  const { t: tRoutes } = useTranslation('routes');

  const resetForm = (formApi: AnyFormApi) => {
    formApi.reset();
  };

  const handleSubmit = (
    name: AddRouteForm.Schema['name'],
    formApi: AnyFormApi,
  ) => {
    menuProps.closeMenu();
    onSubmit?.(name);
    resetForm(formApi);
  };

  const [{ defaultValue, schema }] = useState(() => ({
    defaultValue: AddRouteForm.Schema.from({ name: '' }).name,
    schema: AddRouteForm.Schema.pick('name'),
  }));

  // keyPrefix is not working as expected, so we need to use this wrapper function to get the translation
  const t = (key: string) => tRoutes(`addRouteForm.${key}`);

  return {
    handleSubmit,
    resetForm,
    defaultValue,
    schema,
    t,
  };
};
