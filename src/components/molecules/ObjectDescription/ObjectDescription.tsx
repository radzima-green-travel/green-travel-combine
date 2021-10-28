import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import HTML, {MixedStyleDeclaration} from 'react-native-render-html';
import {themeStyles, systemFonts} from './styles';
import {useWindowDimensions} from 'react-native';
import {tryOpenURL} from 'core/helpers';
interface IProps {
  description: string;
}

export const ObjectDescription = memo(({description}: IProps) => {
  const styles = useThemeStyles(themeStyles, {disableStyleSheet: true});

  const {width} = useWindowDimensions();
  return (
    <HTML
      contentWidth={width}
      systemFonts={systemFonts}
      enableCSSInlineProcessing={false}
      baseStyle={styles.container as MixedStyleDeclaration}
      source={{html: description}}
      tagsStyles={{
        h1: styles.headline as MixedStyleDeclaration,
        h2: styles.headline as MixedStyleDeclaration,
        p: styles.text as MixedStyleDeclaration,

        span: styles.text as MixedStyleDeclaration,
        strong: styles.text as MixedStyleDeclaration,
        ins: styles.text as MixedStyleDeclaration,
        li: styles.text as MixedStyleDeclaration,
        a: styles.link as MixedStyleDeclaration,
      }}
      renderersProps={{
        a: {
          onPress: (_, href) => tryOpenURL(href),
        },
        ol: {
          markerTextStyle: {
            ...styles.text,
            paddingRight: 5,
          },
        },
        ul: {
          markerTextStyle: {
            ...styles.text,
            paddingRight: 5,
          },
        },
      }}
    />
  );
});
