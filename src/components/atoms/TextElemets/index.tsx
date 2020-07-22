import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONTS} from 'assets';

const styles = StyleSheet.create({
  h1: {
    fontFamily: FONTS.BASE,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 26,
  },
  h2: {
    fontFamily: FONTS.BASE,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
  },
  //   caption: {},
} as {
  [key: string]: any;
});

export const TextElemets = Object.keys(styles).reduce(
  (acc, item) => {
    acc[item.charAt(0).toUpperCase() + item.slice(1)] = React.memo(function ({
      children,
      style,
      ...props
    }: {
      children?: any;
      style?: any;
    }) {
      return (
        <Text style={[styles[item], style]} {...props}>
          {children}
        </Text>
      );
    });

    return acc;
  },
  {} as {
    [key: string]: any;
  },
);
