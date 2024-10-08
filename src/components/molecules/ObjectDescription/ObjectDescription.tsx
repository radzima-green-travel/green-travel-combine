import {useColorScheme, useThemeStyles, useTranslation} from 'core/hooks';
import React, {memo, useState} from 'react';
import HTML, {MixedStyleDeclaration} from 'react-native-render-html';
import {
  themeStyles,
  gradientConfig,
  gradientColorsLight,
  gradientColorsDark,
  TEXT_COLLAPSE_HEIGHT,
} from './styles';
import {useWindowDimensions, View} from 'react-native';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {LinearGradient} from 'expo-linear-gradient';
import {IOrigins} from 'core/types';
import {Button} from 'atoms';
import {ObjectDescriptionSource} from '../ObjectDescriptionSource';

interface IProps {
  description: string;
  testID: string;
  origins?: IOrigins[];
  onToggleDescription?: (nextIsExpanded: boolean) => void;
  onLinkPress: (url: string) => void;
}

export const ObjectDescription = memo(
  ({
    description,
    testID,
    origins,
    onToggleDescription,
    onLinkPress,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles, {disableStyleSheet: true});
    const {t} = useTranslation('objectDetails');
    const theme = useColorScheme();

    const [fullTextHeight, setFullTextHeight] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const isNoNeedToCollapse = Boolean(
      fullTextHeight && fullTextHeight < TEXT_COLLAPSE_HEIGHT,
    );

    const {width} = useWindowDimensions();
    return (
      <View style={styles.container} {...getPlatformsTestID(testID)}>
        <View
          style={[
            styles.descriptionContainer,
            (isExpanded || isNoNeedToCollapse) && {height: fullTextHeight},
          ]}>
          <View
            onLayout={({nativeEvent}) => {
              setFullTextHeight(nativeEvent.layout.height);
            }}
            style={styles.descriptionContent}>
            <HTML
              contentWidth={width}
              enableCSSInlineProcessing={false}
              baseStyle={styles.text as MixedStyleDeclaration}
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
                  onPress: (_, href) => onLinkPress(href),
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
            {origins?.length ? (
              <ObjectDescriptionSource
                testID={composeTestID(testID, 'source')}
                onLinkPress={onLinkPress}
                origins={origins}
              />
            ) : null}
          </View>

          {isExpanded || isNoNeedToCollapse ? null : (
            <LinearGradient
              pointerEvents={'none'}
              {...gradientConfig}
              colors={
                theme === 'light' ? gradientColorsLight : gradientColorsDark
              }
              style={styles.gradient}
            />
          )}
        </View>

        {isNoNeedToCollapse ? null : (
          <View style={styles.bottomBar}>
            <Button
              onPress={() => {
                setIsExpanded(prev => {
                  const nextValue = !prev;
                  onToggleDescription?.(nextValue);
                  return nextValue;
                });
              }}
              testID={composeTestID(testID, 'showMoreButton')}
              text={isExpanded ? t('showLess') : t('showMore')}
              theme="tertiary"
            />
          </View>
        )}
      </View>
    );
  },
);
