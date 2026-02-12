import { FieldEditorSheet } from 'components/organisms/ModalForm/components/FieldEditorSheet';
import { useBottomMenu } from 'core/hooks/useBottomMenu';
import { useAddRouteForm } from './hooks/useAddRouteForm';

export const AddRouteForm = ({
  menuProps,
  onSubmit,
}: {
  menuProps: ReturnType<typeof useBottomMenu>;
  onSubmit?: (name: string) => void;
}) => {
  const { handleSubmit, resetForm, defaultValue, schema, t } = useAddRouteForm({
    menuProps,
    onSubmit,
  });

  return (
    <FieldEditorSheet
      testID="addRouteForm"
      fieldName="name"
      t={t}
      onSubmit={handleSubmit}
      menuProps={menuProps}
      onHide={resetForm}
      defaultValue={defaultValue}
      schema={schema}
    />
  );
};
