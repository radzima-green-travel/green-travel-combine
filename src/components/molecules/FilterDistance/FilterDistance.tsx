import {CustomSlider} from 'components/atoms';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {themeStyles} from './styles';
import {ListItem} from 'components/molecules';
import {useThemeStyles, useTranslation} from 'core/hooks';

interface Props {
  enabled: boolean;
  distance: number;
  onChange: (value: number) => void;
}

export const FilterDistance = ({enabled, distance, onChange}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');
  const [filerEnabled, setFilterEnabled] = useState(enabled);

  return (
    <View>
      <ListItem
        titleContainerStyle={styles.subFilterName}
        type="switch"
        boldTitle={true}
        title={t('distance.considerDistance')}
        testID={'considerDistance'}
        switchProps={{value: filerEnabled, onValueChange: setFilterEnabled}}
      />
      {filerEnabled && (
        <View>
          <Text style={styles.distanceStyle}>
            {t('distance.upTo', {distance: distance})}
          </Text>
          <CustomSlider
            type="basic"
            minValue={1}
            maxValue={40}
            steps={40}
            value={distance}
            onChangeValue={onChange}
          />
        </View>
      )}
    </View>
  );
};
