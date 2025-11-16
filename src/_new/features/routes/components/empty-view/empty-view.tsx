import {useThemeStyles} from 'core/hooks';
import {Image} from 'expo-image';
import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
  StyleSheet,
} from 'react-native';
import {RoutesImage, RoutesImages} from '../../assets/images';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers/common';

interface RoutesEmptyViewProps extends PropsWithChildren {
  testID: string;
  title: string;
  description: string;
  image: RoutesImage;
  style?: StyleProp<ViewStyle>;
}

export const RoutesEmptyView = ({
  testID,
  title,
  description,
  image,
  children,
  style,
}: RoutesEmptyViewProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <View testID={testID} style={StyleSheet.compose(styles.container, style)}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Image
            testID={composeTestID(testID, 'image')}
            source={RoutesImages[image]}
            style={styles.image as ImageStyle}
          />
          <Text testID={composeTestID(testID, 'title')} style={styles.title}>
            {title}
          </Text>
          <Text
            testID={composeTestID(testID, 'description')}
            style={styles.description}>
            {description}
          </Text>
          {children}
        </View>
      </View>
    </View>
  );
};
