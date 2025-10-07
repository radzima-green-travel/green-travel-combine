import {useForm} from '@tanstack/react-form';
import {Type} from 'arktype';
import {SnackBar, useSnackbar} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useBottomMenu} from 'core/hooks';
import React, {useCallback, useState} from 'react';
import {TFunction} from 'react-i18next';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FieldEditorSheet, FieldSet, Header, SubmitButton} from './components';
import {styles} from './styles';
import {AnyFormValues} from './types';
import {FormFieldConfig} from 'core/types';

interface ModalFormProps<T extends AnyFormValues> {
  defaultValues: T;
  schema: Type<AnyFormValues>;
  onBackPress?: () => void;
  submitting?: boolean;
  t: TFunction;
  fieldConfigs?: Partial<Record<keyof T, FormFieldConfig>>;
  onSubmit?: (values: T) => void;
  snackBarProps: ReturnType<typeof useSnackbar>;
  testID: string;
  onSelectedField?: (fieldName: keyof T | null) => void;
  onSelectedFieldChange?: (fieldName: keyof T | null) => void;
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
  onSelectedField,
  onSelectedFieldChange,
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

  const {top: topSafeAreaInset, bottom: bottomSafeAreaInset} =
    useSafeAreaInsets();

  const [selectedField, setSelectedField] = useState<FieldName | null>(null);

  const menuProps = useBottomMenu();

  const openFieldEditor = useCallback(
    (fieldName: FieldName) => {
      setSelectedField(fieldName);
      onSelectedField?.(fieldName);
      menuProps.openMenuWithInputAutoFocus();
    },
    [menuProps, onSelectedField],
  );

  const submitField = (value: T[FieldName]) => {
    if (selectedField) {
      form.setFieldValue(selectedField, value);
      onSelectedFieldChange?.(selectedField);
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
