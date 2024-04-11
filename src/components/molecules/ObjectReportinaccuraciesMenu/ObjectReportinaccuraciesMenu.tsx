import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {View, TextInput, Keyboard} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {FormInput} from 'atoms';
import {composeTestID} from 'core/helpers';
import {
  useBottomSheetHandleKeyboard,
  useStaticCallback,
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
    ({testID, onSendPress, isSendLoading, openMenu}, ref) => {
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
      // const {bottomInset, onFocus, onBlur} = useBottomSheetHandleKeyboard();

      const [keyboardHeight, setKeyboardHeight] = useState(0);

      useEffect(() => {
        Keyboard.addListener('keyboardWillShow', event => {
          setKeyboardHeight(event.endCoordinates.height + 16);
        });
      }, []);

      const timer = useRef(null);

      const onLayout = useStaticCallback(() => {
        if (timer.current) {
          clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
          if (keyboardHeight) {
            // console.log('here');
            openMenu();
          }
        }, 10);
      }, [keyboardHeight, openMenu]);

      return (
        <View testID={testID} onLayout={onLayout} style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormInput
              testID={composeTestID(testID, 'formInput')}
              ref={textInputRef}
              value={value}
              onChange={setValue}
              // onFocus={onFocus}
              // onBlur={onBlur}
              multiline
            />
          </View>
          <ButtonsGroup
            bottomInset={keyboardHeight}
            containerStyle={styles.buttonsContainer}
            buttons={buttons}
          />
        </View>
      );
    },
  ),
);
