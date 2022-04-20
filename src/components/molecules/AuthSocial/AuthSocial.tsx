import React from 'react';
import {Pressable, View} from 'react-native';
import {styles} from './styles';
import {Icon} from 'atoms';

interface IProps {
  size?: number;
}

export const AuthSocial = ({size}: IProps) => {
  return (
    <View style={styles.boxContainer}>
      <Pressable>
        <Icon name={'googleAuth'} size={size} />
      </Pressable>
      <Pressable>
        <Icon name={'facebookAuth'} size={size} style={styles.item} />
      </Pressable>
      <Pressable>
        <Icon name={'appleAuth'} size={size} />
      </Pressable>
    </View>
  );
};
