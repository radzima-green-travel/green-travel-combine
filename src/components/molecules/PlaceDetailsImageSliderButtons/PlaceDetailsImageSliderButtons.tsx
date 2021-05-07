import React, {ComponentProps} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles, TOP_RATIO, RIGHT_RATIO} from './styles';
import {FavoriteButtonContainer} from '../../containers';
import {COLORS} from 'assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStyles} from 'core/hooks';

interface Props {
  onBackPress: () => void;
  objectId: string;
  imageWidth: number;
  imageHeight: number;
  style?: ComponentProps<typeof Animated.View>['style'];
}

export const PlaceDetailsImageSliderButtons = ({
  onBackPress,
  objectId,
  imageWidth,
  imageHeight,
  style,
}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const buttonTop = TOP_RATIO * imageHeight;
  const horizontalOffset = RIGHT_RATIO * imageWidth;
  const {top} = useSafeAreaInsets();
  return (
    <Animated.View
      style={[
        styles.container,
        {top: buttonTop + top, paddingHorizontal: horizontalOffset},
        style,
      ]}>
      <TouchableOpacity
        onPress={onBackPress}
        activeOpacity={0.8}
        style={[styles.iconContainer]}>
        <Icon
          style={styles.icon}
          size={24}
          color={COLORS.logCabin}
          name="chevron"
        />
      </TouchableOpacity>
      <FavoriteButtonContainer
        objectId={objectId}
        style={[styles.iconContainer]}>
        {isFavorite => (
          <Icon
            style={styles.icon}
            width={14}
            height={18}
            color={COLORS.logCabin}
            name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
          />
        )}
      </FavoriteButtonContainer>
    </Animated.View>
  );
};
