import {getIn, useFormikContext} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';

interface WithFormikInputProps<TValue> {
  name: string;
  onSelectPress?: (value: TValue) => void;
  onChange?: (value: TValue) => void;
  children: (props: {
    value: TValue;
    onChange: (value: TValue) => void;
    onFocus: () => void;
    onBlur: () => void;
    error: boolean;
    messageText: string | undefined;
    select: () => void;
    onResetValue: () => void;
  }) => React.ReactElement;
  resetOnUnmount?: boolean;
  onFocus?: (fieldName: string) => void;
}

export function WithFormikInput<TValue = string>({
  children,
  name,
  onSelectPress,
  onChange,
  resetOnUnmount,
  onFocus,
}: WithFormikInputProps<TValue>) {
  const {values, setFieldValue, errors, touched, setFieldTouched} =
    useFormikContext<Record<string, TValue>>();

  const [defaultValue] = useState(getIn(values, name));

  const onBlur = useCallback(() => {
    setFieldTouched(name);
  }, [name, setFieldTouched]);

  const onChangeHandler = useCallback(
    (value: TValue) => {
      setFieldValue(name, value);
      if (onChange) {
        onChange(value);
      }
    },
    [name, setFieldValue, onChange],
  );

  const onResetValue = useCallback(() => {
    setFieldValue(name, defaultValue);
  }, [defaultValue, name, setFieldValue]);

  const value = values[name];

  const onSelectPressHandler = useCallback(() => {
    onFocus?.(name);
    if (onSelectPress) {
      onSelectPress(value);
    }
  }, [name, onFocus, onSelectPress, value]);

  const onFocusHandler = useCallback(() => {
    onFocus?.(name);
  }, [onFocus, name]);

  useEffect(() => {
    // Clears value if field is deleted
    return () => {
      if (resetOnUnmount) {
        setFieldValue(name, defaultValue);
      }
    };
  }, [name, setFieldValue, resetOnUnmount, defaultValue]);

  return children({
    value: value,
    onChange: onChangeHandler,
    onBlur: onBlur,
    error: Boolean(touched[name] && errors[name]),
    messageText: touched[name] ? (errors[name] as string) : undefined,
    select: onSelectPressHandler,
    onFocus: onFocusHandler,
    onResetValue: onResetValue,
  });
}
