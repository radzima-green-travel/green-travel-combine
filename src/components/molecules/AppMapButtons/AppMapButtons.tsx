import React, {memo} from 'react';
import {View} from 'react-native';
import {MapButtonContainer, Icon} from 'atoms';
import {styles} from './styles';
import {COLORS} from 'assets';

interface IProps {
  onSearchPress: () => void;
  onShowLocationPress: () => void;
}

export const AppMapButtons = memo(
  ({onSearchPress, onShowLocationPress}: IProps) => {
    return (
      <View style={styles.container}>
        <MapButtonContainer onPress={onSearchPress}>
          <Icon name="search" width={20} height={20} color={COLORS.logCabin} />
        </MapButtonContainer>
        <MapButtonContainer
          style={styles.showLocationButton}
          onPress={onShowLocationPress}>
          <Icon
            name="showLocation"
            width={19.5}
            height={19}
            color={COLORS.logCabin}
          />
        </MapButtonContainer>
      </View>
    );
  },
);
