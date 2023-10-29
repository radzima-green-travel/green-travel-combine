import {useThemeStyles, useTranslation} from 'core/hooks';
import React, {memo} from 'react';
import HTML, {MixedStyleDeclaration} from 'react-native-render-html';
import {themeStyles, systemFonts} from './styles';
import {useWindowDimensions, View, Text} from 'react-native';
import {getPlatformsTestID, tryOpenURL} from 'core/helpers';
import {TestIDs} from 'core/types';

interface IProps {
  description: string;
  isRoute: boolean;
}

export const ObjectDescription = memo(({description, isRoute}: IProps) => {
  const styles = useThemeStyles(themeStyles, {disableStyleSheet: true});
  const {t} = useTranslation('objectDetails');

  const {width} = useWindowDimensions();
  return (
    <View {...getPlatformsTestID(TestIDs.ObjectDetailsDescription)}>
      <Text style={styles.descrioptionHeadline}>
        {isRoute ? t('aboutRoute') : t('aboutObject')}
      </Text>
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
          em: styles.text as MixedStyleDeclaration,

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
    </View>
  );
});
