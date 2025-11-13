import { useSnackbar } from 'atoms';
import {
  useBottomMenu,
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import { sendInaccuraciesEmailRequest } from 'core/actions';
import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { useObjectDetailsAnalytics } from './useObjectDetailsAnalytics';

const entityIdObjectDetails = 'objectDetails';

export function useReportInaccuracies({
  objectId,
  objectName,
}: {
  objectId: string;
  objectName: string;
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation('objectDetails');
  const {
    onReportInnacuranceFieldValueChange,
    sendReportInaccuranceCloseEvent,
    sendReportInaccuranceSendEvent,
    sendReportInaccuranceViewEvent,
  } = useObjectDetailsAnalytics();
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();
  const snackBarProps = useSnackbar();

  const openInnacurateInfoMenu = useCallback(() => {
    sendReportInaccuranceViewEvent();
    reportInnacurateInfoMenuProps.openMenuWithInputAutoFocus();
  }, [reportInnacurateInfoMenuProps, sendReportInaccuranceViewEvent]);

  const openInnacurateInfoSuccessMenu = useCallback(() => {
    Keyboard.dismiss();
    reportInnacurateInfoMenuProps.closeMenu();
    reportInnacurateInfoSuccessMenuProps.openMenu();
  }, [reportInnacurateInfoMenuProps, reportInnacurateInfoSuccessMenuProps]);

  const onSendPress = useCallback(
    (message: string) => {
      if (objectId) {
        sendReportInaccuranceSendEvent();
        dispatch(
          sendInaccuraciesEmailRequest(
            {
              subject: t('inaccuraciesEmailSubject', { objectName }),
              message: message,
              objectId,
            },
            { entityId: entityIdObjectDetails },
          ),
        );
      }
    },
    [dispatch, objectId, objectName, sendReportInaccuranceSendEvent, t],
  );

  const { show } = snackBarProps;

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

  const { loading: sendInaccuraciesLoading } = useRequestLoading(
    sendInaccuraciesEmailRequest,
  );

  const onMenuHide = useCallback(() => {
    sendReportInaccuranceCloseEvent();
  }, [sendReportInaccuranceCloseEvent]);

  return {
    openInnacurateInfoMenu,
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    reportInaccuraciesSnackBarProps: snackBarProps,
    onSendPress,
    sendInaccuraciesLoading,
    onInputValueChange: onReportInnacuranceFieldValueChange,
    onMenuHide,
  };
}
