import React, {
  memo,
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import { ButtonsGroup } from '../ButtonsGroup';
import { FormInput } from 'atoms';
import { composeTestID } from 'core/helpers';
import {
  useBottomSheetHandleKeyboard,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import { themeStyles } from './styles';
import { PADDING_HORIZONTAL } from 'core/constants';

interface IProps {
  testID: string;
  initialValue?: string;
  onSendPress: (value: string) => void;
  isSendLoading: boolean;
  keyboardHeight?: number | null;
  autoHandleKeyboard?: boolean;
  onInputValueChange?: (value: string) => void;
}

export const ObjectReportinaccuraciesMenu = memo(
  forwardRef<TextInput, IProps>(
    (
      {
        testID,
        onSendPress,
        isSendLoading,
        keyboardHeight,
        autoHandleKeyboard = false,
        onInputValueChange,
      },
      ref,
    ) => {
      const styles = useThemeStyles(themeStyles);
      const { t } = useTranslation('objectDetails');
      const [value, setValue] = useState<string>('');

      const onSendPressHandler = useCallback(() => {
        onSendPress(value);
      }, [onSendPress, value]);

      useEffect(() => {
        onInputValueChange?.(value);
      }, [onInputValueChange, value]);

      const buttons = useMemo(() => {
        return [
          {
            onPress: onSendPressHandler,
            theme: 'primary' as const,
            testID: composeTestID(testID, 'saveButton'),
            text: t('send'),
            loading: isSendLoading,
            disabled: value.length === 0,
          },
        ];
      }, [isSendLoading, onSendPressHandler, t, testID, value.length]);

      const { onFocus, onBlur, bottomInset } = useBottomSheetHandleKeyboard();

      const onFocusHandler = useCallback(() => {
        if (autoHandleKeyboard) {
          onFocus();
        }
      }, [onFocus, autoHandleKeyboard]);

      const onBlurHandler = useCallback(() => {
        if (autoHandleKeyboard) {
          onBlur();
        }
      }, [onBlur, autoHandleKeyboard]);

      return (
        <View testID={testID} style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormInput
              testID={composeTestID(testID, 'formInput')}
              ref={ref}
              value={value}
              onBlur={onBlurHandler}
              onFocus={onFocusHandler}
              onChange={setValue}
              multiline
            />
          </View>
          <ButtonsGroup
            bottomInset={
              bottomInset ||
              Number(keyboardHeight) +
                PADDING_HORIZONTAL +
                Number(StatusBar?.currentHeight)
            }
            containerStyle={styles.buttonsContainer}
            buttons={buttons}
          />
        </View>
      );
    },
  ),
);
