import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {styles} from './styles';

const elements = [
  'Заповедные территории',
  'Исторические объекты',
  'Веломаршруты',
  'Экскурсии',
  'Пешие маршруты',
  'Авто-пешеходны маршруты',
];

export const Bookmarks = () => {
  const {width} = useWindowDimensions();
  const itemWidth = width / 2.3;
  const itemHeight = itemWidth / 1.5;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Закладки'}</Text>
      <View style={styles.boxContainer}>
        {elements.map((text) => (
          <View style={[styles.box, {width: itemWidth, height: itemHeight}]}>
            <Text style={styles.boxText}>{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
