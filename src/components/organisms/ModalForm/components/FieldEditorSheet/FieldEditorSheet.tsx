import {Portal} from '@gorhom/portal';
import {useForm} from '@tanstack/react-form';
import {Type} from 'arktype';
import {BottomMenu, FormInput} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import React, {RefObject} from 'react';
import {TFunction} from 'react-i18next';
import {Keyboard, TextInput, View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FullWindowOverlay} from 'react-native-screens';
import {isIOS} from 'services/PlatformService';
import {themeStyles} from './styles';
import {SubmitButton} from '../SubmitButton';
import {FormFieldConfig} from 'core/types';

export const FieldEditorSheet = <T extends string>({
  testID,
  fieldName,
  t,
  onSubmit,
  menuProps,
  onHide,
  defaultValue,
  schema,
  fieldConfig,
}: {
  testID: string;
  fieldName: string;
  t: TFunction;
  inputRef?: RefObject<TextInput>;
  onSubmit?: (value: T) => void;
  menuProps: ReturnType<typeof useBottomMenu>;
  onHide?: () => void;
  defaultValue: T;
  schema: Type<Record<string, any>>;
  fieldConfig?: FormFieldConfig;
}) => {
  const {bottom: bottomSafeAreaInset} = useSafeAreaInsets();
  const form = useForm({
    defaultValues: {[fieldName]: defaultValue} as Record<string, any>,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({value}) => {
      onSubmit?.(value[fieldName].trim());
    },
  });

  const styles = useThemeStyles(themeStyles);

  const fieldBlock = (
    <form.Field name={fieldName}>
      {field => {
        const value = field.state.value;
        const hasError = !field.state.meta.isValid;

        const errorMessage = hasError
          ? t(`fieldErrors.${fieldName}`)
          : undefined;

        return (
          <View style={styles.container}>
            <Text
              testID={composeTestID(testID, 'description')}
              style={styles.description}>
              {t(`fieldDescriptions.${fieldName}`)}
            </Text>
            <FormInput
              ref={menuProps.textInputRef}
              testID={composeTestID(testID, 'input')}
              value={value}
              onChange={field.handleChange}
              error={hasError}
              messageText={errorMessage}
              onSubmitEditing={form.handleSubmit}
              blurOnSubmit={false}
              {...fieldConfig}
            />
            <SubmitButton
              onPress={form.handleSubmit}
              testID={composeTestID(testID, 'submitButton')}
              label={t('fieldSubmitLabel')}
              disabled={!value.trim() || hasError}
            />
          </View>
        );
      }}
    </form.Field>
  );

  // TODO: Keyboard height is determined in an inconsistent and obscure way across the app
  // Work with keyboard should be refactored to use a consistent approach
  const keyboardOffset = isIOS
    ? (menuProps.keyboardHeight ?? bottomSafeAreaInset)
    : menuProps.keyboardHeight
      ? menuProps.keyboardHeight + bottomSafeAreaInset
      : bottomSafeAreaInset;

  const menu = (
    <BottomMenu
      testID={composeTestID(testID, 'bottomMenu')}
      withBackdrop
      initialIndex={0}
      onBackdropPress={Keyboard.dismiss}
      adjustIOSKeyboardFrameDrops
      onHideEnd={onHide}
      header={{
        title: t(`fieldTitles.${fieldName}`),
      }}
      {...menuProps}>
      {fieldBlock}
      <View
        style={{
          height: keyboardOffset,
        }}
      />
    </BottomMenu>
  );

  return (
    <Portal>
      {isIOS ? (
        <FullWindowOverlay>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {menu}
          </View>
        </FullWindowOverlay>
      ) : (
        menu
      )}
    </Portal>
  );
};
