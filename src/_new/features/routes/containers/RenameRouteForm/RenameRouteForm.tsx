import { FieldEditorSheet } from 'components/organisms/ModalForm/components/FieldEditorSheet';
import { useBottomMenu } from 'core/hooks/useBottomMenu';
import { useRenameRouteForm } from './hooks/useRenameRouteForm';

export const RenameRouteForm = ({
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
  const { handleSubmit, resetForm, defaultValue, schema, t } =
    useRenameRouteForm({
      menuProps,
      routeName,
      routeId,
      onSuccess,
    });

  return (
    <FieldEditorSheet
      testID="renameRouteForm"
      fieldName="name"
      t={t}
      onSubmit={handleSubmit}
      menuProps={menuProps}
      onHide={resetForm}
      defaultValue={defaultValue}
      schema={schema}
      shouldShowDescription={false}
      fieldConfig={{
        label: t(`fieldLabel.name`),
      }}
    />
  );
};
