import { Portal } from '@gorhom/portal';
import { BottomMenu } from 'atoms';
import { ObjectSuccessMenu } from 'molecules';
import { useBottomMenu, useTranslation, useThemeStyles } from 'core/hooks';
import React from 'react';
import { StyleProp, ImageStyle, useColorScheme } from 'react-native';
import { composeTestID } from 'core/helpers';
import { themeStyles } from './styles';

interface IProps {
  addInfoSuccessMenuProps: ReturnType<typeof useBottomMenu>;
  testID: string;
}

export const ObjectDetailsAddInfoSuccessMenu = ({
  addInfoSuccessMenuProps,
  testID,
}: IProps) => {
  const theme = useColorScheme();
  const { t } = useTranslation('objectDetailsAddInfo');
  const styles = useThemeStyles(themeStyles);

  return (
    <Portal>
      <BottomMenu testID={testID} withBackdrop {...addInfoSuccessMenuProps}>
        <ObjectSuccessMenu
          testID={composeTestID(testID, 'objectSuccessMenu')}
          onPress={addInfoSuccessMenuProps.closeMenu}
          title={t('addInfoSuccessTitle')}
          subtitle={t('addInfoSuccessSubtitle')}
          buttonText={t('cool')}
          imageAsset={theme === 'light' ? 'handshakeLight' : 'handshakeLight'}
          imageStyle={styles.imageStyle as StyleProp<ImageStyle>}
        />
      </BottomMenu>
    </Portal>
  );
};
