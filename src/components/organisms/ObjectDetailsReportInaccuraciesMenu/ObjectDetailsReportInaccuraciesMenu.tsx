import {Portal} from '@gorhom/portal';
import {BottomMenu, SnackBar, useSnackbar} from 'atoms';
import {ObjectReportinaccuraciesMenu, ObjectSuccessMenu} from 'molecules';
import {useBottomMenu, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types/common';
import React, {memo, useMemo, RefObject, useRef} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  innaccuraciesMenuInputRef: RefObject<TextInput>;
  onSendPress: (value: string) => void;
  sendInaccuraciesLoading: boolean;
  reportInaccuraciesSnackBarProps: ReturnType<typeof useSnackbar>;
  reportInnacurateInfoMenuProps: ReturnType<typeof useBottomMenu>;
  reportInnacurateInfoSuccessMenuProps: ReturnType<typeof useBottomMenu>;
}

export const ObjectDetailsReportInaccuraciesMenu = memo(
  ({
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    reportInaccuraciesSnackBarProps,
    onSendPress,
    sendInaccuraciesLoading,
  }: IProps) => {
    const ref = useRef<TextInput>(null);
    const {top} = useSafeAreaInsets();
    const {t} = useTranslation('objectDetails');
    const reportInaccuraciesMenuHeader = useMemo(
      () => ({
        title: t('reportInaccuraciesMenuTitle'),
      }),
      [t],
    );

    return (
      <Portal>
        <BottomMenu
          withBackdrop
          onOpenEnd={() => {
            ref.current?.focus();
          }}
          onBackdropPress={Keyboard.dismiss}
          testID={TestIDs.ObjectReportinaccuraciesMenu}
          header={reportInaccuraciesMenuHeader}
          {...reportInnacurateInfoMenuProps}>
          <ObjectReportinaccuraciesMenu
            ref={ref}
            onSendPress={onSendPress}
            isSendLoading={sendInaccuraciesLoading}
            testID={TestIDs.ObjectReportinaccuraciesMenuContent}
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
          />
        </BottomMenu>
        <SnackBar isOnTop offset={-top} {...reportInaccuraciesSnackBarProps} />
      </Portal>
    );
  },
);
