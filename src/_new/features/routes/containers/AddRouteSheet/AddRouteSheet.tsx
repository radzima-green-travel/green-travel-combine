import { FieldEditorSheet } from 'components/organisms/ModalForm/components/FieldEditorSheet';
import { useBottomMenu } from 'core/hooks/useBottomMenu';
import { useAddRouteSheet } from './hooks/useAddRouteSheet';

export const AddRouteSheet = ({
  menuProps,
  onSubmitName,
}: {
  menuProps: ReturnType<typeof useBottomMenu>;
  onSubmitName?: (name: string) => void;
}) => {
  const { handleSubmit, defaultValue, schema, t } = useAddRouteSheet({
    menuProps,
    onSubmitName,
  });

  return (
    <FieldEditorSheet
      testID="addRouteForm"
      fieldName="name"
      t={t}
      onSubmit={handleSubmit}
      menuProps={menuProps}
      onHide={() => {}}
      defaultValue={defaultValue}
      schema={schema}
    />
  );
};
