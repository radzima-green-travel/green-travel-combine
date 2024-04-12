import {useSnackbar} from 'atoms';
import {
  useBottomMenu,
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {sendInaccuraciesEmailRequest} from 'core/reducers';
import {useCallback} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';

const entityIdObjectDetails = 'objectDetails';

export function useReportInaccuracies({
  objectId,
  objectName,
}: {
  objectId: string;
  objectName: string;
}) {
  const dispatch = useDispatch();
  const {t} = useTranslation('objectDetails');
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();
  const snackBarProps = useSnackbar();

  const openInnacurateInfoMenu = useCallback(() => {
    reportInnacurateInfoMenuProps.openMenuWithInputAutoFocus();
  }, [reportInnacurateInfoMenuProps]);

  const openInnacurateInfoSuccessMenu = useCallback(() => {
    Keyboard.dismiss();
    reportInnacurateInfoMenuProps.closeMenu();
    reportInnacurateInfoSuccessMenuProps.openMenu();
  }, [reportInnacurateInfoMenuProps, reportInnacurateInfoSuccessMenuProps]);

  const onSendPress = useCallback(
    (message: string) => {
      if (objectId) {
        dispatch(
          sendInaccuraciesEmailRequest(
            {
              subject: t('inaccuraciesEmailSubject', {objectName}),
              message: message,
              objectId,
            },
            {entityId: entityIdObjectDetails},
          ),
        );
      }
    },
    [dispatch, objectId, objectName, t],
  );

  const {show} = snackBarProps;

  useOnRequestError(
    sendInaccuraciesEmailRequest,
    'objectDetails',
    (errorLabel, entityId) => {
      if (entityId !== entityIdObjectDetails) {
        return;
      }
      show({
        type: 'error',
        title: errorLabel.text,
      });
    },
  );

  useOnRequestSuccess(sendInaccuraciesEmailRequest, (_, entityId) => {
    if (entityId !== entityIdObjectDetails) {
      return;
    }
    openInnacurateInfoSuccessMenu();
  });

  const {loading: sendInaccuraciesLoading} = useRequestLoading(
    sendInaccuraciesEmailRequest,
  );

  return {
    openInnacurateInfoMenu,

    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    reportInaccuraciesSnackBarProps: snackBarProps,
    onSendPress,
    sendInaccuraciesLoading,
  };
}
