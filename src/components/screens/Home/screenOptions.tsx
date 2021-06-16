import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IProps, ScreenOptions} from './types';

import {Icon} from 'atoms';
import {COLORS} from 'assets';

const HeaderRight = ({navigation}: IProps) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Search')}>
      <Icon name={'search'} color={COLORS.white} size={24} />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerRight: () => <HeaderRight {...props} />,
});
