import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { themeStyles } from './styles';
import { useThemeStyles } from 'core/hooks';
import { Icon } from '../Icon';
import { composeTestID, getPlatformsTestID } from 'core/helpers';

interface IProps {
  currentPage: number;
  pagesAmount: number;
  testID: string;
}

export const NumPager = memo(({ currentPage, pagesAmount, testID }: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View
      {...getPlatformsTestID(testID)}
      style={styles.container}
      pointerEvents="none">
      <Icon
        testID={composeTestID(testID, 'photoCameraIcon')}
        style={styles.icon}
        name="photoCamera"
        size={20}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{currentPage}</Text>
        <Text style={styles.text}>/</Text>
        <Text style={styles.text}>{pagesAmount}</Text>
      </View>
    </View>
  );
});
