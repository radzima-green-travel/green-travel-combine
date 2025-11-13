import { composeTestID } from 'core/helpers';
import { first, map } from 'lodash';
import React, { memo, ReactNode } from 'react';
import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
import { styles } from './styles';
import { useColoredWidgetDynamicStyles } from './useColoredWidgetDynamicStyles';
import { parseTitleLine } from './utils';

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

    const regularTextStyle = [styles.titleText, { color: titleColor }];

    const { fontSizeStyle, cardHeightStyle, maxFontSizeMultiplier } =
      useColoredWidgetDynamicStyles();

    const renderTitleText = ({
      key,
      text,
      style,
    }: {
      key: number;
      text: string;
      style?: StyleProp<TextStyle>;
    }) => (
      <Text
        key={key}
        testID={composeTestID(testID, 'titleText')}
        style={[regularTextStyle, fontSizeStyle, style]}
        maxFontSizeMultiplier={maxFontSizeMultiplier}>
        {text}
      </Text>
    );

    return (
      <Pressable
        testID={testID}
        style={[styles.container, { backgroundColor }, cardHeightStyle]}
        onPress={onPress}>
        {backdropSlot}
        <View style={[styles.contentWrapper, titleAlignmentStyle]}>
          {map(titleLines, (line, lineIndex) => {
            const chunks = parseTitleLine(line);

            if (chunks.length > 1 || first(chunks)?.highlighted) {
              return (
                <View
                  testID={composeTestID(testID, 'titleRow')}
                  key={lineIndex}
                  style={styles.titleRow}>
                  {map(chunks, (chunk, chunkIndex) => {
                    if (chunk.highlighted) {
                      return (
                        <View
                          key={chunkIndex}
                          testID={composeTestID(testID, 'titleBadge')}
                          style={[
                            styles.titleBadge,
                            { backgroundColor: titleBadgeColor },
                          ]}>
                          {renderTitleText({
                            key: chunkIndex,
                            text: chunk.text,
                            style: styles.titleBadgeText,
                          })}
                        </View>
                      );
                    }

                    return renderTitleText({
                      key: chunkIndex,
                      text: chunk.text,
                    });
                  })}
                </View>
              );
            }

            return renderTitleText({ key: lineIndex, text: line });
          })}
        </View>
      </Pressable>
    );
  },
);
