/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback} from 'react';
import {Portal} from '@gorhom/portal';
import {BottomMenu, SnackBar, useSnackbar} from 'atoms';
import {useMemo} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {useBottomMenu} from 'core/hooks';
import {ObjectAddInfoMenu} from 'molecules';
import {IObjectIncompleteField, TestIDs} from 'core/types';
import {ObjectField} from 'core/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS, selectForPlatform} from 'services/PlatformService';
import {FullWindowOverlay} from 'react-native-screens';

interface IProps {
  currentField: IObjectIncompleteField;
  onHideEnd: () => void;
  addInfoMenuProps: ReturnType<typeof useBottomMenu>;
  onChange: (field: ObjectField, value: string | number) => void;
  value: string | number;
  snackBarProps: ReturnType<typeof useSnackbar>;
}

export const ObjectDetailsAddInfoMenu = ({
  currentField,
  onHideEnd,
  addInfoMenuProps,
  onChange,
  value,
  snackBarProps,
}: IProps) => {
  const {top} = useSafeAreaInsets();
  const menuHeader = useMemo(
    () => ({
      title: currentField?.label ?? '',
    }),
    [currentField],
  );

  const onClose = useCallback(
    (field: ObjectField, value: string | number) => {
      onChange(field, value);
      Keyboard.dismiss();
      addInfoMenuProps.closeMenu();
    },
    [addInfoMenuProps, onChange],
  );

  const renderContent = () => {
    return (
      <>
        <BottomMenu
          withBackdrop
          initialIndex={0}
          onHideEnd={onHideEnd}
          onBackdropPress={Keyboard.dismiss}
          testID={TestIDs.ObjectDetailsAddInfoMenu}
          adjustIOSKeyboardFrameDrops
          header={menuHeader}
          {...addInfoMenuProps}>
          <ObjectAddInfoMenu
            testID={TestIDs.ObjectDetailsAddInfoMenuContent}
            currentField={currentField.id}
            onSubmit={onClose}
            value={value}
          />
        </BottomMenu>

        <SnackBar
          isOnTop
          offset={selectForPlatform(0, -top)}
          {...snackBarProps}
        />
      </>
    );
  };

  return (
    <Portal>
      {isIOS ? (
        <FullWindowOverlay>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {renderContent()}
          </View>
        </FullWindowOverlay>
      ) : (
        renderContent()
      )}
    </Portal>
  );
};
