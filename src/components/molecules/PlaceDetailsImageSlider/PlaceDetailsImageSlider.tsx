import React from 'react';
import {View} from 'react-native';
import {ImageSlider, IconButton, Icon} from 'atoms';
import {styles} from './styles';
import {FavoriteButtonContainer} from '../../containers';
import {COLORS} from 'assets';

interface Props {
  images: Array<string>;
  onMarkerPress: () => void;
  objectId: string;
}

export const PlaceDetailsImageSlider = ({
  images,
  onMarkerPress,
  objectId,
}: Props) => {
  return (
    <View>
      <ImageSlider images={images} />
      <IconButton
        style={styles.leftButton}
        icon={{name: 'marker', width: 18, height: 22, color: '#393939'}}
        onPress={onMarkerPress}
      />

      <FavoriteButtonContainer
        objectId={objectId}
        style={[styles.iconContainer, styles.rightButton]}>
        {(isFavorite) => (
          <Icon
            width={14}
            height={18}
            color={COLORS.logCabin}
            name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
          />
        )}
      </FavoriteButtonContainer>
    </View>
  );
};
