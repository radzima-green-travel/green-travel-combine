import React, { memo, useState } from 'react';
import { View, Text, Image, StyleProp, ImageStyle } from 'react-native';
import { useThemeStyles, useTranslation } from 'core/hooks';
import { themeStyles, calloutBorderRadius } from './styles';
import { composeTestID } from 'core/helpers';
import { ProgressBar } from '../ProgressBar';
import { images } from 'assets/images';

interface IProps {
  percentage: number;
  testID: string;
  size?: 's' | 'm';
}

export const CompletnessIndicator = memo(
  ({ percentage, testID, size = 'm' }: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const { t } = useTranslation('objectDetails');
    const percentageString = `${percentage}%` as `${number}%`;
    const [containerWidth, setContainerWidth] = useState(0);
    const [calloutWidth, setCalloutWidth] = useState(0);
    const isSmall = size === 's';
    const isAlmostCompleted = percentage >= 80;

    const colloutLeftPosition = (() => {
      if (containerWidth && calloutWidth) {
        const percentageWidth = containerWidth * (percentage / 100);
        const translateCorrection = calloutWidth / 2;
        const left = percentageWidth - translateCorrection;

        const maxValue =
          containerWidth - percentageWidth < calloutBorderRadius
            ? containerWidth - calloutWidth + calloutBorderRadius
            : containerWidth - calloutWidth;

        const minValue =
          percentageWidth < calloutBorderRadius
            ? percentageWidth - calloutBorderRadius
            : 0;

        return Math.min(maxValue, Math.max(minValue, left));
      }
      return 0;
    })();

    const renderCallout = () => {
      return (
        <View
          style={[
            styles.calloutContainer,
            isSmall && styles.calloutContainerSmall,
          ]}>
          <View
            testID={composeTestID(testID, 'callout')}
            onLayout={({ nativeEvent }) => {
              setCalloutWidth(nativeEvent.layout.width);
            }}
            style={[
              styles.callout,
              isSmall && styles.calloutSmall,
              { left: colloutLeftPosition },
            ]}>
            <Image
              style={
                (isSmall
                  ? styles.imageSmall
                  : styles.image) as StyleProp<ImageStyle>
              }
              source={
                isAlmostCompleted ? images.imageHappyFace : images.imageSadFace
              }
            />
            <Text
              style={[styles.calloutText, isSmall && styles.calloutTextSmall]}>
              {t('readyOn', { percentage })}
            </Text>
          </View>
          <View
            style={[
              styles.calloutArrow,
              isSmall && styles.calloutArrowSmall,
              { left: percentageString },
            ]}
          />
        </View>
      );
    };

    return (
      <View
        style={[styles.container, isSmall && styles.containerSmall]}
        testID={testID}>
        <View
          style={!isSmall && styles.wrapper}
          onLayout={({ nativeEvent }) => {
            setContainerWidth(nativeEvent.layout.width);
          }}>
          {renderCallout()}
          <ProgressBar
            size={size}
            percentage={percentage}
            testID={composeTestID(testID, 'progressBar')}
          />
        </View>
      </View>
    );
  },
);
