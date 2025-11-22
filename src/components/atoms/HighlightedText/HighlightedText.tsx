import React, { memo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { useThemeStyles } from 'core/hooks';
import { getTextParts } from './utils';
import { themeStyles } from './styles';

interface Props extends TextProps {
  query?: string;
  textWithMarkup?: boolean;
  boldTextStyle?: StyleProp<TextStyle>;
}

export const HighlightedText: React.FC<Props> = memo(
  ({
    textWithMarkup = false,
    query,
    style,
    children,
    boldTextStyle,
    ...props
  }) => {
    const styles = useThemeStyles(themeStyles);

    const textParts = getTextParts({
      textWithMarkup,
      text: children as string,
      query,
    });

    const textStyle = [styles.boldText, boldTextStyle];

    return (
      <Text {...props}>
        {textParts.map(({ isBold, partText }, index) => (
          <Text key={index} style={[style, isBold && textStyle]}>
            {partText}
          </Text>
        ))}
      </Text>
    );
  },
);
