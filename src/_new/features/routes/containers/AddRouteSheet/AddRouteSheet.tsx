import { FieldEditorSheet } from 'components/organisms/ModalForm/components/FieldEditorSheet';
import { useBottomMenu } from 'core/hooks/useBottomMenu';
import { SnackBar } from 'atoms';
import { useAddRouteSheet } from './hooks/useAddRouteSheet';
import type { Route } from '../../model';

export const AddRouteSheet = ({
  menuProps,
  onRouteCreated,
}: {
  menuProps: ReturnType<typeof useBottomMenu>;
  onRouteCreated?: (routeId: Route.Route['id']) => void;
}) => {
  const { handleSubmit, defaultValue, schema, t, snackbar } = useAddRouteSheet({
    menuProps,
    onRouteCreated,
  });

  return (
    <>
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
      <SnackBar testID="addRouteFormSnackBar" {...snackbar} />
    </>
  );
};
