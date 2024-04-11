import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {View, TextInput} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {FormInput} from 'atoms';
import {composeTestID} from 'core/helpers';
import {
  useBottomSheetHandleKeyboard,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import {themeStyles} from './styles';

interface IProps {
  testID: string;
  initialValue?: string;
  onSendPress: (value: string) => void;
  isSendLoading: boolean;
}

export interface ObjectReportinaccuraciesMenuRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export const ObjectReportinaccuraciesMenu = memo(
  forwardRef<ObjectReportinaccuraciesMenuRef, IProps>(
    ({testID, onSendPress, isSendLoading}, ref) => {
      const styles = useThemeStyles(themeStyles);
      const {t} = useTranslation('objectDetails');
      const textInputRef = useRef<TextInput>(null);
      const [value, setValue] = useState<string>('');

      useImperativeHandle(ref, () => ({
        focus: () => {
          textInputRef.current?.focus();
        },
        blur: () => {
          textInputRef.current?.blur();
        },
        clear: () => {
          textInputRef.current?.clear();
        },
      }));

      const onSendPressHandler = useCallback(() => {
        onSendPress(value);
      }, [onSendPress, value]);

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
      const {bottomInset, onFocus, onBlur} = useBottomSheetHandleKeyboard();

      return (
        <View testID={testID} style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormInput
              testID={composeTestID(testID, 'formInput')}
              ref={textInputRef}
              value={value}
              onChange={setValue}
              onFocus={onFocus}
              onBlur={onBlur}
              multiline
            />
          </View>
          <ButtonsGroup
            bottomInset={bottomInset}
            containerStyle={styles.buttonsContainer}
            buttons={buttons}
          />
        </View>
      );
    },
  ),
);
