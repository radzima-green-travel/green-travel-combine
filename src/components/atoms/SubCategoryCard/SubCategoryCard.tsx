import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {} from 'atoms';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {IChildren} from 'core/types';

interface IProps {
  data: IChildren;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SubCategoryCard = memo(
  ({data, containerStyle, onPress}: IProps) => {
    const {icon, name} = data;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle]}>
        <FastImage style={styles.image} source={{uri: icon}} />
        <View style={styles.cardContentContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);
