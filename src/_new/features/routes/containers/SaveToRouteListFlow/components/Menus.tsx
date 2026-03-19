import { resolveErrorMessage } from '@core/utils/resolveErrorMessage';
import { SnackBar } from 'atoms';
import { useBottomMenu } from 'core/hooks';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateRoute } from '../../../api';
import { RoutesDependencies } from '../../../context';
import { AddRouteForm } from '../../AddRouteForm';
import { SaveToRouteListFlowContext } from '../context';
import { SaveToRouteListMenu } from './SaveToRouteListMenu';

export const Menus = () => {
  const { objectId, snackbar, showSuccessNotification } = useContext(
    SaveToRouteListFlowContext,
  );

  const addRouteFormMenuProps = useBottomMenu();

  const { t } = useTranslation('routes');
  const { isAuthenticated, redirectToSignIn } = useContext(RoutesDependencies);

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

  const requestSignIn = (params: { onSuccess: () => void }) => {
    if (isAuthenticated) {
      params.onSuccess();

      return;
    }

    redirectToSignIn({
      onSuccess: params.onSuccess,
      authPromptMessage: t('addToRouteFlow.authPromptMessage'),
    });
  };

  const handleCreateRoute = (name: string) => {
    requestSignIn({
      onSuccess: () => {
        {
          addRouteFormMenuProps.closeMenu();
          createRoute({ name, objectIds: [objectId] });
        }
      },
    });
  };

  return (
    <>
      <SaveToRouteListMenu
        onCreateRoute={addRouteFormMenuProps.openMenuWithInputAutoFocus}
      />
      <AddRouteForm
        menuProps={addRouteFormMenuProps}
        onSubmit={handleCreateRoute}
        submitButtonLabel={t('saveToRouteList.saveRouteButtonLabel')}
      />
      <SnackBar {...snackbar} testID="saveToRouteListSnackBar" />
    </>
  );
};
