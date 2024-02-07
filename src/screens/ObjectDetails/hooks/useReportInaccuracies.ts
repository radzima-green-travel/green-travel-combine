import {useSnackbar} from 'atoms';
import {
  useBottomMenu,
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {sendInaccuraciesEmailRequest} from 'core/reducers';
import {useCallback, useRef} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';

export function useReportInaccuracies({
  objectId,
  objectName,
}: {
  objectId: string;
  objectName: string;
}) {
  const dispatch = useDispatch();
  const {t} = useTranslation('objectDetails');
  const innaccuraciesMenuInputRef = useRef<TextInput>(null);
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();
  const snackBarProps = useSnackbar();

  const openInnacurateInfoMenu = useCallback(() => {
    innaccuraciesMenuInputRef.current?.focus();
    reportInnacurateInfoMenuProps.openMenu();
  }, [reportInnacurateInfoMenuProps]);

  const openInnacurateInfoSuccessMenu = useCallback(() => {
    Keyboard.dismiss();
    reportInnacurateInfoMenuProps.closeMenu();
    reportInnacurateInfoSuccessMenuProps.openMenu();
  }, [reportInnacurateInfoMenuProps, reportInnacurateInfoSuccessMenuProps]);

  const onSendPress = useCallback(
    (message: string) => {
      if (objectId) {
        console.log('objectId', objectId, message, objectName);
        dispatch(
          sendInaccuraciesEmailRequest({
            subject: t('inaccuraciesEmailSubject', {objectName}),
            message: message,
            objectId,
          }),
        );
      }
    },
    [dispatch, objectId, objectName, t],
  );

  const {show} = snackBarProps;

  useOnRequestError(
    sendInaccuraciesEmailRequest,
    'objectDetails',
    errorLabel => {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    },
  );

  useOnRequestSuccess(
    sendInaccuraciesEmailRequest,
    openInnacurateInfoSuccessMenu,
  );

  const {loading: sendInaccuraciesLoading} = useRequestLoading(
    sendInaccuraciesEmailRequest,
  );

  return {
    openInnacurateInfoMenu,

    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    reportInaccuraciesSnackBarProps: snackBarProps,
    innaccuraciesMenuInputRef,
    onSendPress,
    sendInaccuraciesLoading,
  };
}
