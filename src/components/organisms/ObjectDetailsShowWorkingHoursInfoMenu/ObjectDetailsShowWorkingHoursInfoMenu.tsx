import {Portal} from '@gorhom/portal';
import {BottomMenu} from 'atoms';
import {ObjectSuccessMenu} from 'molecules';
import {useBottomMenu, useThemeStyles, useTranslation} from 'core/hooks';
import React from 'react';
import {Text, useColorScheme} from 'react-native';
import {TestIDs} from 'core/types';
import {themeStyles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  workingHoursMenuProps: ReturnType<typeof useBottomMenu>;
  description: string;
}

export const ObjectDetailsShowWorkingHoursInfoMenu = ({
  workingHoursMenuProps,
  description,
}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {bottom} = useSafeAreaInsets();
  const {t} = useTranslation('objectDetails');

  return (
    <Portal>
      <BottomMenu
        testID={TestIDs.ObjectDetailsAddInfoSuccessMenu}
        withBackdrop
        header={{
          title: t('workHours'),
        }}
        {...workingHoursMenuProps}>
        <Text style={[styles.text, Boolean(bottom) && {paddingBottom: bottom}]}>
          {description}
        </Text>
      </BottomMenu>
    </Portal>
  );
};
