import { Portal } from '@gorhom/portal';
import { BottomMenu, SnackBar, useSnackbar } from 'atoms';
import { ObjectReportinaccuraciesMenu, ObjectSuccessMenu } from 'molecules';
import { useBottomMenu, useColorScheme, useTranslation } from 'core/hooks';
import React, { memo, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { composeTestID } from 'core/helpers';

interface IProps {
  onSendPress: (value: string) => void;
  sendInaccuraciesLoading: boolean;
  reportInaccuraciesSnackBarProps: ReturnType<typeof useSnackbar>;
  reportInnacurateInfoMenuProps: ReturnType<typeof useBottomMenu>;
  reportInnacurateInfoSuccessMenuProps: ReturnType<typeof useBottomMenu>;
  onInputValueChange?: (value: string) => void;
  onMenuHide?: () => void;
  testID: string;
}

export const ObjectDetailsReportInaccuraciesMenu = memo(
  ({
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    reportInaccuraciesSnackBarProps,
    onSendPress,
    sendInaccuraciesLoading,
    onInputValueChange,
    onMenuHide,
    testID,
  }: IProps) => {
    const theme = useColorScheme();
    const { top } = useSafeAreaInsets();
    const { t } = useTranslation('objectDetails');
    const reportInaccuraciesMenuHeader = useMemo(
      () => ({
        title: t('reportInaccuraciesMenuTitle'),
      }),
      [t],
    );

    const { textInputRef, keyboardHeight } = reportInnacurateInfoMenuProps;

    return (
      <Portal>
        <BottomMenu
          onHideEnd={onMenuHide}
          adjustIOSKeyboardFrameDrops
          withBackdrop
          onBackdropPress={Keyboard.dismiss}
          testID={testID}
          header={reportInaccuraciesMenuHeader}
          {...reportInnacurateInfoMenuProps}>
          <ObjectReportinaccuraciesMenu
            ref={textInputRef}
            keyboardHeight={keyboardHeight}
            onSendPress={onSendPress}
            isSendLoading={sendInaccuraciesLoading}
            testID={composeTestID(testID, 'reportInaccuraciesMenu')}
            onInputValueChange={onInputValueChange}
          />
        </BottomMenu>
        <BottomMenu
          withBackdrop
          testID={testID}
          {...reportInnacurateInfoSuccessMenuProps}>
          <ObjectSuccessMenu
            testID={composeTestID(testID, 'reportInaccuraciesSuccessMenu')}
            onPress={reportInnacurateInfoSuccessMenuProps.closeMenu}
            title={t('reportInaccuraciesSuccessTitle')}
            subtitle={t('reportInaccuraciesSuccessSubtitle')}
            buttonText={t('cool')}
            imageAsset={
              theme === 'light' ? 'imageSuccessLight' : 'imageSuccessDark'
            }
          />
        </BottomMenu>
        <SnackBar
          testID={composeTestID(testID, 'snackBar')}
          isOnTop
          offset={-top}
          {...reportInaccuraciesSnackBarProps}
        />
      </Portal>
    );
  },
);
