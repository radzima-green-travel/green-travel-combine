import { FieldEditorSheet } from 'components/organisms/ModalForm/components/FieldEditorSheet';
import { useBottomMenu } from 'core/hooks/useBottomMenu';
import { useAddRouteForm } from './hooks/useAddRouteForm';

export const AddRouteForm = ({
  menuProps,
  onSubmit,
  submitButtonLabel,
}: {
  menuProps: ReturnType<typeof useBottomMenu>;
  onSubmit?: (name: string) => void;
  submitButtonLabel?: string;
}) => {
  const { handleSubmit, resetForm, defaultValue, schema, t } = useAddRouteForm({
    onSubmit,
  });

  return (
    <FieldEditorSheet
      testID="addRouteForm"
      fieldName="name"
      t={t}
      submitLabel={submitButtonLabel}
      onSubmit={handleSubmit}
      menuProps={menuProps}
      onHide={resetForm}
      defaultValue={defaultValue}
      schema={schema}
      withFullWindowOverlay={false}
    />
  );
};
