import React from 'react';
import {ColorSchemeName} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Header} from '@react-navigation/elements';
import {PADDING_HORIZONTAL} from 'core/constants';
import {styles} from './styles';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

export const CustomNavigationHeader = ({
  options,
  back,
}: NativeStackHeaderProps) => {
  const {top} = useSafeAreaInsets();

  const headerLeft = () =>
    options.headerLeft?.({
      canGoBack: Boolean(back),
      label: '',
      tintColor: '',
    });

  const headerRight = () =>
    options.headerRight?.({
      canGoBack: Boolean(back),
      label: '',
      tintColor: '',
    } as any);

  return (
    <Header
      {...options}
      title={options.title || ''}
      headerStatusBarHeight={top}
      headerTitleContainerStyle={styles.headerTitleContainerStyle}
      headerStyle={{
        ...(options.headerStyle as Object),
        // @ts-ignore
        height: options.headerStyle?.height
          ? // @ts-ignore
            options.headerStyle?.height + top
          : undefined,
      }}
      headerLeft={headerLeft}
      headerRight={headerRight}
      headerLeftContainerStyle={{
        paddingLeft: PADDING_HORIZONTAL,
      }}
      headerRightContainerStyle={{
        paddingRight: PADDING_HORIZONTAL,
      }}
    />
  );
};
