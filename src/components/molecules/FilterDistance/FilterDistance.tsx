import {CustomSlider} from 'atoms';
import React, {memo, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {themeStyles} from './styles';
import {ListItem} from '../ListItem';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {Location} from 'core/types';

interface Props {
  isOn: boolean;
  distance: number;
  location: Location | null;
  onChangeSwitcherState: (isOn: boolean) => void;
  onChangeDistance: (value: number) => void;
}

export const FilterDistance = memo(
  ({
    isOn,
    distance,
    onChangeSwitcherState,
    onChangeDistance,
    location,
  }: Props) => {
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('filters');
    const [distanceValue, setDistanceValue] = useState(distance);

    useEffect(() => {
      setDistanceValue(distance);
    }, [distance]);

    return (
      <View>
        <ListItem
          titleContainerStyle={styles.subFilterName}
          type="switch"
          boldTitle={true}
          title={t('distance.considerDistance')}
          testID={'considerDistance'}
          switchProps={{
            value: isOn,
            onValueChange: onChangeSwitcherState,
          }}
        />
        {isOn && location && (
          <View>
            <Text style={styles.distanceStyle}>
              {t('distance.upTo', {distance: distanceValue})}
            </Text>
            <CustomSlider
              type="basic"
              minValue={1}
              maxValue={100}
              steps={100}
              value={distanceValue}
              onChangeValue={setDistanceValue}
              onSlidingComplete={onChangeDistance}
            />
          </View>
        )}
      </View>
    );
  },
);
