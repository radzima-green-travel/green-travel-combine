import React, {memo} from 'react';
import {Text} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

interface IProps {
  messageText?: string;
  error?: boolean;
}

export const HelperText = memo(({messageText, error}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return messageText ? (
    <Text style={[styles.messageText, error && styles.messageErrorText]}>
      {messageText}
    </Text>
  ) : null;
});
