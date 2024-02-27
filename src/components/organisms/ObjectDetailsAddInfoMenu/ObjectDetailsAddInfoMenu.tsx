/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useRef} from 'react';
import {Portal} from '@gorhom/portal';
import {BottomMenu, SnackBar, useSnackbar} from 'atoms';
import {useMemo} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {useBottomMenu} from 'core/hooks';
import {ObjectAddInfoMenu} from 'molecules';
import {IObjectIncompleteField, TestIDs} from 'core/types';
import {ObjectField} from 'core/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {selectForPlatform} from 'services/PlatformService';

interface IProps {
  currentField: IObjectIncompleteField | null;
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
  const textInputRef = useRef<TextInput>(null);
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

  const onOpenEnd = useCallback(() => {
    textInputRef.current?.focus();
  }, []);

  return (
    <Portal>
      <BottomMenu
        withBackdrop
        onHideEnd={onHideEnd}
        onOpenEnd={onOpenEnd}
        onBackdropPress={Keyboard.dismiss}
        testID={TestIDs.ObjectDetailsAddInfoMenu}
        header={menuHeader}
        {...addInfoMenuProps}>
        {currentField && (
          <ObjectAddInfoMenu
            testID={TestIDs.ObjectDetailsAddInfoMenuContent}
            ref={textInputRef}
            currentField={currentField.id}
            onSubmit={onClose}
            value={value}
          />
        )}
      </BottomMenu>
      <SnackBar
        isOnTop
        offset={selectForPlatform(0, -top)}
        {...snackBarProps}
      />
    </Portal>
  );
};
