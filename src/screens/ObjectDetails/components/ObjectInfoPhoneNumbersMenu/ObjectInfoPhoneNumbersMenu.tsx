import {Portal} from '@gorhom/portal';
import {BottomMenu} from 'atoms';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import React from 'react';
import {TestIDs} from 'core/types';
import {themeStyles} from './styles';
import type {Item} from '../../components/ObjectInfoSection/ObjectInfoSection';
import {ObjectInfoSection} from '../ObjectInfoSection';

interface IProps {
  phoneNumbersMenuProps: ReturnType<typeof useBottomMenu>;
  phoneNumberMenuItems: Item[];
}

export const ObjectInfoPhoneNumbersMenu = ({
  phoneNumbersMenuProps,
  phoneNumberMenuItems,
}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <Portal>
      <BottomMenu
        testID={TestIDs.ObjectDetailsPhoneNumberssMenu}
        withBackdrop
        {...phoneNumbersMenuProps}>
        <ObjectInfoSection
          items={phoneNumberMenuItems}
          priorityPosition="middle"
          containerListStyle={styles.phoneMenuContainer}
        />
      </BottomMenu>
    </Portal>
  );
};
