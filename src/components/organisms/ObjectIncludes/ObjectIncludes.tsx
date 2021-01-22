import React, {memo} from 'react';
import {ObjectInlcudesItem} from 'molecules';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

export const ObjectIncludes = memo(() => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Чем заняться</Text>
      <ObjectInlcudesItem
        onPress={() => {}}
        title="Пешие маршруты"
        iconName="strokeFootprint"
      />
      <ObjectInlcudesItem
        onPress={() => {}}
        title="Веломаршруты"
        iconName="strokeBike"
      />
      <ObjectInlcudesItem
        onPress={() => {}}
        title="Исторические места"
        iconName="strokeChurch"
      />
      <ObjectInlcudesItem
        onPress={() => {}}
        title="Экскурсии"
        iconName="strokeFlag"
      />
    </View>
  );
});
