import {Portal} from '@gorhom/portal';
import {BottomMenu, SnackBar, useSnackbar} from 'atoms';
import {ObjectReportinaccuraciesMenu, ObjectSuccessMenu} from 'molecules';
import {useBottomMenu, useColorScheme, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types/common';
import React, {memo, useMemo} from 'react';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  onSendPress: (value: string) => void;
  sendInaccuraciesLoading: boolean;
  reportInaccuraciesSnackBarProps: ReturnType<typeof useSnackbar>;
  reportInnacurateInfoMenuProps: ReturnType<typeof useBottomMenu>;
  reportInnacurateInfoSuccessMenuProps: ReturnType<typeof useBottomMenu>;
  onInputValueChange?: (value: string) => void;
  onMenuHide?: () => void;
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
  }: IProps) => {
    const theme = useColorScheme();
    const {top} = useSafeAreaInsets();
    const {t} = useTranslation('objectDetails');
    const reportInaccuraciesMenuHeader = useMemo(
      () => ({
        title: t('reportInaccuraciesMenuTitle'),
      }),
      [t],
    );

    const {textInputRef, keyboardHeight} = reportInnacurateInfoMenuProps;

    return (
      <Portal>
        <BottomMenu
          onHideEnd={onMenuHide}
          adjustIOSKeyboardFrameDrops
          withBackdrop
          onBackdropPress={Keyboard.dismiss}
          testID={TestIDs.ObjectReportinaccuraciesMenu}
          header={reportInaccuraciesMenuHeader}
          {...reportInnacurateInfoMenuProps}>
          <ObjectReportinaccuraciesMenu
            ref={textInputRef}
            keyboardHeight={keyboardHeight}
            onSendPress={onSendPress}
            isSendLoading={sendInaccuraciesLoading}
            testID={TestIDs.ObjectReportinaccuraciesMenuContent}
            onInputValueChange={onInputValueChange}
          />
        </BottomMenu>
        <BottomMenu
          withBackdrop
          testID={TestIDs.ObjectShareExperienceSuccessMenu}
          {...reportInnacurateInfoSuccessMenuProps}>
          <ObjectSuccessMenu
            testID={TestIDs.ObjectShareExperienceSuccessMenuContent}
            onPress={reportInnacurateInfoSuccessMenuProps.closeMenu}
            title={t('reportInaccuraciesSuccessTitle')}
            subtitle={t('reportInaccuraciesSuccessSubtitle')}
            buttonText={t('cool')}
            imageAsset={
              theme === 'light' ? 'imageSuccessLight' : 'imageSuccessDark'
            }
          />
        </BottomMenu>
        <SnackBar isOnTop offset={-top} {...reportInaccuraciesSnackBarProps} />
      </Portal>
    );
  },
);
