import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {TextInput, View} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {Input, TimePicker} from './components';
import {
  KEYBOARD_TYPE,
  PLACEHOLDER,
  PROMPTLESS_FIELDS,
  SINGLE_LINE_FIELDS,
} from './constants';
import {ObjectField, TIME_PICKER_FIELDS} from 'core/constants';
import {composeTestID} from 'core/helpers';

interface IProps {
  currentField: ObjectField;
  onSubmit: (field: ObjectField, value: string | number) => void;
  value: string | number;
  testID: string;
}

export const ObjectAddInfoMenu = forwardRef<TextInput, IProps>(
  ({currentField, onSubmit, value: formValue, testID}, ref) => {
    const {t} = useTranslation('objectDetailsAddInfo');
    const styles = useThemeStyles(themeStyles);
    const isTimePickerField = TIME_PICKER_FIELDS.has(currentField);
    const [withBottomInset, setWithBottomInset] = useState(isTimePickerField);
    const [value, setValue] = useState(formValue);

    useEffect(() => {
      setValue(formValue);
    }, [formValue]);

    const onFocus = useCallback(() => {
      setWithBottomInset(false);
    }, []);

    const onBlur = useCallback(() => {
      setWithBottomInset(true);
    }, []);

    const renderContent = () => {
      if (!currentField) {
        return null;
      }

      const sharedProps = {
        prompt: PROMPTLESS_FIELDS.has(currentField)
          ? ''
          : t(`prompts.${currentField}`),
        onChange: setValue,
        testID,
      };

      if (isTimePickerField) {
        return <TimePicker {...sharedProps} value={value as number} />;
      }

      return (
        <Input
          ref={ref}
          {...sharedProps}
          value={value as string}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={KEYBOARD_TYPE[currentField] ?? 'default'}
          multiline={!SINGLE_LINE_FIELDS.has(currentField)}
          placeholder={PLACEHOLDER[currentField]}
        />
      );
    };

    const onSubmitForm = useCallback(() => {
      onSubmit(currentField, value);
    }, [currentField, value, onSubmit]);

    const buttons = useMemo(() => {
      return [
        {
          onPress: onSubmitForm,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'submitButton'),
          text: t('ready'),
        },
      ];
    }, [onSubmitForm, t, testID]);

    return (
      <View testID={testID} style={styles.container}>
        {renderContent()}
        <ButtonsGroup
          withBottomInset={withBottomInset}
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
