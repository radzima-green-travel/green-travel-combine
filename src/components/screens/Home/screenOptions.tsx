import {Icon} from 'atoms';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IProps, ScreenOptions} from './types';

const HeaderRight = ({navigation}: IProps) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Search')}>
      <Icon name="searchLight" width={24} height={24} />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerRight: () => <HeaderRight {...props} />,
});
