import {Portal} from '@gorhom/portal';
import {ReactFormExtendedApi, useForm} from '@tanstack/react-form';
import {Type} from 'arktype/out/type';
import {BottomMenu, Button, FormInput, SnackBar, useSnackbar} from 'atoms';
import {FormInputProps} from 'atoms/FormInput/FormInput';
import {composeTestID} from 'core/helpers';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import {map} from 'lodash';
import {AnimatedCircleButton, ListItem} from 'molecules';
import React, {ReactNode, RefObject, memo, useCallback, useState} from 'react';
import {TFunction} from 'react-i18next';
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FullWindowOverlay} from 'react-native-screens';
import {isIOS} from 'services/PlatformService';
import {headerGap, themeStyles} from './styles';

export type FieldConfig = Pick<FormInputProps, 'maxLength' | 'multiline'>;
type AnyForm<T = any> = ReactFormExtendedApi<
  T,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

type AnyFormValues = Record<string, any>;

interface ModalFormProps<T extends AnyFormValues> {
  defaultValues: T;
  schema: Type<AnyFormValues>;
  onBackPress?: () => void;
  submitting?: boolean;
  t: TFunction;
  fieldConfigs?: Partial<Record<keyof T, FieldConfig>>;
  onSubmit?: (values: T) => void;
  snackBarProps: ReturnType<typeof useSnackbar>;
  testID: string;
}

export const ModalForm = <T extends AnyFormValues>({
  schema,
  defaultValues,
  t,
  onBackPress,
  submitting,
  fieldConfigs: fieldConfig,
  onSubmit,
  snackBarProps,
  testID,
}: ModalFormProps<T>) => {
  type FieldName = Extract<keyof T, string>;

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    canSubmitWhenInvalid: true,
    onSubmit: ({value}) => {
      onSubmit?.(schema.assert(value) as T);
    },
    onSubmitInvalid: ({formApi}) => {
      if (formApi.state.errorMap.onSubmit) {
        const firstInvalidFieldName = Object.keys(
          formApi.state.errorMap.onSubmit,
        )[0];

        snackBarProps.show({
          type: 'error',
          title: t(`fieldErrors.${firstInvalidFieldName}`),
        });
      }
    },
  });

  const styles = useThemeStyles(themeStyles);

  const {top: topSafeAreaInset, bottom: bottomSafeAreaInset} =
    useSafeAreaInsets();

  const [selectedField, setSelectedField] = useState<FieldName | null>(null);

  const menuProps = useBottomMenu();

  const openFieldEditor = useCallback(
    (fieldName: FieldName) => {
      setSelectedField(fieldName);
      menuProps.openMenuWithInputAutoFocus();
    },
    [menuProps],
  );

  const submitField = (value: T[FieldName]) => {
    if (selectedField) {
      form.setFieldValue(selectedField, value);
      setSelectedField(null);
    }
  };

  const hideFieldEditor = () => {
    setSelectedField(null);
  };

  return (
    <View
      style={[styles.container, {paddingBottom: bottomSafeAreaInset + 16}]}
      pointerEvents={submitting ? 'none' : 'auto'}>
      <Header
        testID={composeTestID(testID, 'header')}
        title={t('title')}
        onBackPress={onBackPress}
      />
      <FieldSet
        testID={testID}
        form={form}
        onFieldPress={openFieldEditor}
        t={t}
      />
      <form.Subscribe selector={state => state.isTouched && state.canSubmit}>
        {canSubmit => (
          <SubmitButton
            testID={composeTestID(testID, 'submitButton')}
            onPress={form.handleSubmit}
            label={t('formSubmitLabel')}
            disabled={!canSubmit}
            submitting={submitting}
          />
        )}
      </form.Subscribe>
      {selectedField && (
        <FieldEditorSheet
          testID={composeTestID(testID, 'fieldEditor')}
          fieldName={selectedField}
          onSubmit={submitField}
          menuProps={menuProps}
          onHide={hideFieldEditor}
          defaultValue={form.state.values[selectedField]}
          schema={schema.pick(selectedField)}
          t={t}
          fieldConfig={fieldConfig?.[selectedField]}
        />
      )}
      <SnackBar
        testID={composeTestID(testID, 'snackBar')}
        isOnTop
        offset={Platform.select({ios: 0, android: -topSafeAreaInset})}
        {...snackBarProps}
      />
    </View>
  );
};

const Header = ({
  title,
  onBackPress,
  testID,
}: {
  title: ReactNode;
  onBackPress?: () => void;
  testID: string;
}) => {
  const styles = useThemeStyles(themeStyles);

  const {top: topSafeAreaInset} = useSafeAreaInsets();

  return (
    <View
      testID={testID}
      style={[
        styles.header,
        Platform.select({
          ios: {marginTop: headerGap},
          android: {marginTop: Math.max(topSafeAreaInset, headerGap * 2)},
        }),
      ]}>
      <AnimatedCircleButton
        icon={{name: 'chevronMediumLeft'}}
        testID={composeTestID(testID, 'backButton')}
        onPress={onBackPress}
      />
      <Text testID={composeTestID(testID, 'title')} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

interface SubmitButtonProps {
  label: string;
  submitting?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  testID: string;
}

const SubmitButton = ({
  onPress: onSubmit,
  label,
  submitting,
  disabled,
  testID,
}: SubmitButtonProps) => {
  return (
    <Button
      onPress={onSubmit}
      theme="primary"
      testID={testID}
      text={label}
      loading={submitting}
      disabled={disabled}
    />
  );
};

const FieldSetComponent = <T extends AnyForm>({
  testID,
  onFieldPress,
  form,
  t,
}: {
  testID: string;
  onFieldPress?: (key: Extract<keyof T['state']['values'], string>) => void;
  form: T;
  t: TFunction;
}) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      contentContainerStyle={styles.list}>
      {map(Object.keys(form.state.values), key => {
        const valueSelector = (state: typeof form.state) => state.values[key];

        return (
          <form.Subscribe key={key} selector={valueSelector}>
            {fieldValue => {
              return (
                <ListItem
                  type="primary"
                  testID={composeTestID(testID, 'field')}
                  subtitle={fieldValue}
                  title={t(`fieldTitles.${key}`)}
                  onPress={() => onFieldPress?.(key as any)}
                />
              );
            }}
          </form.Subscribe>
        );
      })}
    </ScrollView>
  );
};

const FieldSet = memo(FieldSetComponent) as typeof FieldSetComponent;

const FieldEditorSheet = <T extends string>({
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
  fieldConfig?: FieldConfig;
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
          <View style={styles.fieldContainer}>
            <Text
              testID={composeTestID(testID, 'description')}
              style={styles.fieldDescription}>
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
      <View style={{height: menuProps.keyboardHeight ?? bottomSafeAreaInset}} />
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
