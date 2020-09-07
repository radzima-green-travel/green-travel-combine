import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'atoms';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {IObject} from 'core/types';

interface IProps {
  data: IObject;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ObjectCard = memo(({data, containerStyle, onPress}: IProps) => {
  const {cover, name} = data;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.cardContainer, containerStyle]}>
      <FastImage style={styles.image} source={{uri: cover}} />
      <View style={styles.cardContentContainer}>
        <Text style={styles.title}>{name}</Text>
        <Icon name="bookmark" width={20} height={20} color={'white'} />
      </View>
    </TouchableOpacity>
  );
});
