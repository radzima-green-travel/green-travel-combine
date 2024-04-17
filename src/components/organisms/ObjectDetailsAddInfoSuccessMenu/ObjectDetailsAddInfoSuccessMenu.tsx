import {Portal} from '@gorhom/portal';
import {BottomMenu} from 'atoms';
import {ObjectSuccessMenu} from 'molecules';
import {useBottomMenu, useTranslation} from 'core/hooks';
import React from 'react';
import {useColorScheme} from 'react-native';
import {TestIDs} from 'core/types';

interface IProps {
  addInfoSuccessMenuProps: ReturnType<typeof useBottomMenu>;
}

export const ObjectDetailsAddInfoSuccessMenu = ({
  addInfoSuccessMenuProps,
}: IProps) => {
  const theme = useColorScheme();
  const {t} = useTranslation('objectDetailsAddInfo');

  return (
    <Portal>
      <BottomMenu
        testID={TestIDs.ObjectDetailsAddInfoSuccessMenu}
        withBackdrop
        {...addInfoSuccessMenuProps}>
        <ObjectSuccessMenu
          testID={TestIDs.ObjectDetailsAddInfoSuccessMenuContent}
          onPress={addInfoSuccessMenuProps.closeMenu}
          title={t('addInfoSuccessTitle')}
          subtitle={t('addInfoSuccessSubtitle')}
          buttonText={t('cool')}
          imageAsset={theme === 'light' ? 'handshakeLight' : 'handshakeLight'}
          imageStyle={{width: 240, height: 144}}
        />
      </BottomMenu>
    </Portal>
  );
};
