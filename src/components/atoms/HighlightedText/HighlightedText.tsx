import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {getTextParts} from './utils';
import {themeStyles} from './styles';

interface Props extends Omit<TextProps, 'style'> {
  text?: string;
  query?: string;
  textWithMarkup?: string;
  boldTextStyle?: TextStyle;
  regularTextStyle?: TextStyle;
}

export const HighlightedText: React.FC<Props> = ({
  textWithMarkup,
  text,
  query,
  boldTextStyle,
  regularTextStyle,
  ...props
}) => {
  const styles = useThemeStyles(themeStyles);

  const textParts = getTextParts({textWithMarkup, text, query});

  const getTextStyle = (isBold: boolean) =>
    isBold
      ? boldTextStyle ?? styles.boldText
      : regularTextStyle ?? styles.regularText;

  return (
    <Text>
      {textParts.map(({isBold, partText}, index) => (
        <Text key={index} style={getTextStyle(isBold)} {...props}>
          {partText}
        </Text>
      ))}
    </Text>
  );
};
