/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback} from 'react';
import {Portal} from '@gorhom/portal';
import {BottomMenu, SnackBar, useSnackbar} from 'atoms';
import {useMemo} from 'react';
import {Keyboard, Platform, StyleSheet, View} from 'react-native';
import {useBottomMenu} from 'core/hooks';
import {ObjectAddInfoMenu} from 'molecules';
import {IObjectIncompleteField} from 'core/types';
import {ObjectField} from 'core/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from 'services/PlatformService';
import {FullWindowOverlay} from 'react-native-screens';
import {composeTestID} from 'core/helpers';

interface IProps {
  currentField: IObjectIncompleteField;
  onHideEnd: () => void;
  addInfoMenuProps: ReturnType<typeof useBottomMenu>;
  onChange: (field: ObjectField, value: string | number) => void;
  value: string | number;
  snackBarProps: ReturnType<typeof useSnackbar>;
  onInputValueChange?: (field: ObjectField, value: string | number) => void;
  testID: string;
}

export const ObjectDetailsAddInfoMenu = ({
  currentField,
  onHideEnd,
  addInfoMenuProps,
  onChange,
  value,
  snackBarProps,
  onInputValueChange,
  testID,
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

  const {textInputRef, keyboardHeight} = addInfoMenuProps;
  const renderContent = () => {
    return (
      <>
        <BottomMenu
          withBackdrop
          initialIndex={0}
          onHideEnd={onHideEnd}
          onBackdropPress={Keyboard.dismiss}
          testID={composeTestID(testID, 'bottomMenu')}
          adjustIOSKeyboardFrameDrops
          header={menuHeader}
          {...addInfoMenuProps}>
          <ObjectAddInfoMenu
            ref={textInputRef}
            testID={composeTestID(testID, 'addInfoMenu')}
            keyboardHeight={keyboardHeight}
            currentField={currentField.id}
            onSubmit={onClose}
            onInputValueChange={onInputValueChange}
            value={value}
          />
        </BottomMenu>
        <SnackBar
          testID={composeTestID(testID, 'snackBar')}
          isOnTop
          offset={Platform.select({ios: 0, android: -top})}
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
