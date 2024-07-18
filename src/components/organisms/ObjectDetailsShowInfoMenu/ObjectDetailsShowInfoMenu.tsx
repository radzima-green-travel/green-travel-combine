import {Portal} from '@gorhom/portal';
import {BottomMenu} from 'atoms';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import React from 'react';
import {Text} from 'react-native';
import {TestIDs} from 'core/types';
import {themeStyles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  title: string;
  menuProps: ReturnType<typeof useBottomMenu>;
  description: string;
}

export const ObjectDetailsShowInfoMenu = ({
  title,
  menuProps,
  description,
}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {bottom} = useSafeAreaInsets();

  return (
    <Portal>
      <BottomMenu
        testID={TestIDs.ObjectDetailsAddInfoSuccessMenu}
        withBackdrop
        header={{
          title,
        }}
        {...menuProps}>
        <Text style={[styles.text, Boolean(bottom) && {paddingBottom: bottom}]}>
          {description}
        </Text>
      </BottomMenu>
    </Portal>
  );
};
