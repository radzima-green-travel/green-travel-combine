import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Icon} from 'atoms';

interface IProps {
  size?: number;
}

export const AuthSocial = ({size}: IProps) => {
  return (
    <View style={styles.boxContainer}>
      <Icon name={'googleAuth'} size={size} />
      <Icon name={'facebookAuth'} size={size} style={styles.item} />
      <Icon name={'appleAuth'} size={size} />
    </View>
  );
};
