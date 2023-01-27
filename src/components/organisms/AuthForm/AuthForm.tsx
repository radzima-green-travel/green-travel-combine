import React, {memo, PropsWithChildren} from 'react';
import {View, Text, Pressable, Keyboard} from 'react-native';
import {Button} from 'atoms';
import {useThemeStyles} from 'core/hooks';

import {themeStyles} from './styles';

interface IProps {
  title: string;
  text: string;
  isSubmitButtonDisabled: boolean;
  onSubmitPress: () => void;
  submitButtonText: string;
  submitButtonLoading?: boolean;
  onSecondaryButtonPress?: () => void;
  secondaryButtonText?: string;
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
  }: PropsWithChildren<IProps>) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <View
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
          return false;
        }}
        style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.formFieldsContainer}>{children}</View>
        <Button
          loading={submitButtonLoading}
          disabled={isSubmitButtonDisabled}
          onPress={onSubmitPress}
          text={submitButtonText}
        />
        {secondaryButtonText ? (
          <Pressable onPress={onSecondaryButtonPress}>
            <Text style={styles.secondaryButtonText}>
              {secondaryButtonText}
            </Text>
          </Pressable>
        ) : null}
      </View>
    );
  },
);
