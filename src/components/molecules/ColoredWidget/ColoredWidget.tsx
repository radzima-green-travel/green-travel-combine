import {composeTestID} from 'core/helpers';
import {first, map} from 'lodash';
import React, {memo, ReactNode} from 'react';
import {Pressable, StyleProp, Text, TextStyle, View} from 'react-native';
import {styles} from './styles';
import {useColoredWidgetDynamicStyles} from './useColoredWidgetDynamicStyles';
import {parseTitleLine} from './utils';

export interface ColoredWidgetProps {
  testID: string;
  backdropSlot?: ReactNode;
  title: string;
  titleAlignment?: 'left' | 'right';
  backgroundColor: string;
  titleColor: string;
  titleBadgeColor: string;
  onPress?: () => void;
}

export const ColoredWidget = memo(
  ({
    testID,
    title,
    titleAlignment = 'left',
    backgroundColor,
    titleColor,
    titleBadgeColor,
    backdropSlot,
    onPress,
  }: ColoredWidgetProps) => {
    const titleLines = title.split(/\r?\n/);

    const titleAlignmentStyle = {
      alignItems: titleAlignment === 'left' ? 'flex-start' : 'flex-end',
    } as const;

    const regularTextStyle = [styles.titleText, {color: titleColor}];

    const {fontSizeStyle, cardHeightStyle, maxFontSizeMultiplier} =
      useColoredWidgetDynamicStyles();

    const renderTitleText = (text: string, style?: StyleProp<TextStyle>) => (
      <Text
        testID={composeTestID(testID, 'titleText')}
        style={[regularTextStyle, fontSizeStyle, style]}
        maxFontSizeMultiplier={maxFontSizeMultiplier}>
        {text}
      </Text>
    );

    return (
      <Pressable
        testID={testID}
        style={[styles.container, {backgroundColor}, cardHeightStyle]}
        onPress={onPress}>
        {backdropSlot}
        <View style={[styles.contentWrapper, titleAlignmentStyle]}>
          {map(titleLines, (line, index) => {
            const chunks = parseTitleLine(line);

            if (chunks.length > 1 || first(chunks)?.highlighted) {
              return (
                <View
                  testID={composeTestID(testID, 'titleRow')}
                  key={index}
                  style={styles.titleRow}>
                  {map(chunks, chunk => {
                    if (chunk.highlighted) {
                      return (
                        <View
                          testID={composeTestID(testID, 'titleBadge')}
                          style={[
                            styles.titleBadge,
                            {backgroundColor: titleBadgeColor},
                          ]}>
                          {renderTitleText(chunk.text, styles.titleBadgeText)}
                        </View>
                      );
                    }

                    return renderTitleText(chunk.text);
                  })}
                </View>
              );
            }

            return renderTitleText(line);
          })}
        </View>
      </Pressable>
    );
  },
);
