import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IProps, ScreenOptions} from './types';

import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.9999 20.9999L16.6499 16.6499" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const HeaderRight = ({navigation}: IProps) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Search')}>
      <SvgXml xml={xml} width={24} height={24} />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerRight: () => <HeaderRight {...props} />,
});
