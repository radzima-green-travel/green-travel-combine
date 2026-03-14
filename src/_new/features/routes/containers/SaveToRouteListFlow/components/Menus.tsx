import { SnackBar } from 'atoms';
import { useBottomMenu } from 'core/hooks';
import { useContext } from 'react';
import { useCreateRoute } from '../../../api';
import { AddRouteForm } from '../../AddRouteForm';
import { SaveToRouteListFlowContext } from '../context';
import { SaveToRouteListMenu } from './SaveToRouteListMenu';

export const Menus = () => {
  const { objectId, snackbar } = useContext(SaveToRouteListFlowContext);
  const addRouteFormMenuProps = useBottomMenu();
  const { mutate: createRoute } = useCreateRoute({});

  const handleCreateRoute = (name: string) => {
    createRoute({ name, objectIds: [objectId] });
  };

  return (
    <>
      <SaveToRouteListMenu
        onCreateRoute={addRouteFormMenuProps.openMenuWithInputAutoFocus}
      />
      <AddRouteForm
        menuProps={addRouteFormMenuProps}
        onSubmit={handleCreateRoute}
      />
      <SnackBar {...snackbar} testID="saveToRouteListSnackBar" />
    </>
  );
};
