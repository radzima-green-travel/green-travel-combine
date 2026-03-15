import { resolveErrorMessage } from '@core/utils/resolveErrorMessage';
import { SnackBar } from 'atoms';
import { useBottomMenu } from 'core/hooks';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateRoute } from '../../../api';
import { AddRouteForm } from '../../AddRouteForm';
import { SaveToRouteListFlowContext } from '../context';
import { SaveToRouteListMenu } from './SaveToRouteListMenu';

export const Menus = () => {
  const { objectId, snackbar, showSuccessNotification } = useContext(
    SaveToRouteListFlowContext,
  );

  const addRouteFormMenuProps = useBottomMenu();

  const { t } = useTranslation('routes');

  const { mutate: createRoute } = useCreateRoute({
    onSuccess: route => {
      showSuccessNotification({
        addedRouteNames: [route.name],
      });
    },
    onError: error => {
      snackbar.show({
        type: 'error',
        ...resolveErrorMessage(error, t),
      });
    },
  });

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
