import React, {memo} from 'react';
import {View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';

interface IProps {
  percentage: number;
  testID: string;
  size: 's' | 'm';
}

export const ProgressBar = memo(({percentage, testID, size = 'm'}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const percentageString = `${percentage}%` as `${number}%`;

  return (
    <View
      style={[
        styles.progressContainer,
        size === 's' && styles.progressContainerSmall,
      ]}>
      <View
        testID={composeTestID(testID, 'progress')}
        style={[styles.progress, {width: percentageString}]}
      />
      <View
        testID={composeTestID(testID, 'thumb')}
        style={[
          styles.thumb,
          size === 's' && styles.thumbSmall,
          {left: percentageString},
        ]}
      />
    </View>
  );
});
