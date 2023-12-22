import {useState} from 'react';
import {View} from 'react-native';
import {AnimatedStar} from 'atoms';
import {map} from 'lodash';
import {createNumericArray} from 'core/helpers';
import {styles} from './srtyles';

export const Ratings = () => {
  const [objectRating, setObjectRating] = useState(0);

  return (
    <View style={styles.container}>
      {map(createNumericArray(5), point => (
        <AnimatedStar
          key={String(point)}
          value={point}
          onPress={setObjectRating}
          showAnimation={objectRating >= point}
        />
      ))}
    </View>
  );
};
