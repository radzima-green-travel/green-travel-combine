import React, { memo, PropsWithChildren } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Button } from 'atoms';
import { useThemeStyles } from 'core/hooks';

import { themeStyles } from './styles';
import { composeTestID } from 'core/helpers';

interface IProps {
  title: string;
  text?: string;
  isSubmitButtonDisabled: boolean;
  onSubmitPress: () => void;
  submitButtonText: string;
  submitButtonLoading?: boolean;
  onSecondaryButtonPress?: () => void;
  secondaryButtonText?: string;
  secondaryButtonLoading?: boolean;
  testID: string;
}

export const AuthForm = memo(
  ({
    title,
    text,
    isSubmitButtonDisabled,
    onSubmitPress,
    submitButtonText,
    onSecondaryButtonPress,
    secondaryButtonText,
    children,
    submitButtonLoading,
    secondaryButtonLoading,
    testID,
  }: PropsWithChildren<IProps>) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <View
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
          return false;
        }}
        style={styles.container}>
        <Text style={text ? styles.title : styles.titleSingle}>{title}</Text>
        {text ? <Text style={styles.text}>{text}</Text> : null}
        <View style={styles.formFieldsContainer}>{children}</View>
        <Button
          testID={composeTestID(testID, 'submitButton')}
          loading={submitButtonLoading}
          disabled={isSubmitButtonDisabled}
          onPress={onSubmitPress}
          text={submitButtonText}
        />
        {secondaryButtonText ? (
          <Button
            testID={composeTestID(testID, 'secondaryButton')}
            loading={secondaryButtonLoading}
            disabled={secondaryButtonLoading}
            onPress={onSecondaryButtonPress}
            text={secondaryButtonText}
            style={styles.secondaryButton}
            theme="tertiary"
          />
        ) : null}
      </View>
    );
  },
);
