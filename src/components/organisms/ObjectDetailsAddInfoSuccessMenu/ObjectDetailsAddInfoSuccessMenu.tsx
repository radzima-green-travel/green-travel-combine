import {Portal} from '@gorhom/portal';
import {BottomMenu} from 'atoms';
import {ObjectSuccessMenu} from 'molecules';
import {useBottomMenu, useTranslation} from 'core/hooks';
import React from 'react';
import {useColorScheme} from 'react-native';
import {composeTestID} from 'core/helpers';

interface IProps {
  addInfoSuccessMenuProps: ReturnType<typeof useBottomMenu>;
  testID: string;
}

export const ObjectDetailsAddInfoSuccessMenu = ({
  addInfoSuccessMenuProps,
  testID,
}: IProps) => {
  const theme = useColorScheme();
  const {t} = useTranslation('objectDetailsAddInfo');

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
          imageStyle={{width: 240, height: 144}}
        />
      </BottomMenu>
    </Portal>
  );
};
