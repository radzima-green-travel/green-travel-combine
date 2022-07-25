import React from 'react';
import {Text} from 'react-native';
import {SignInScreen, SignUpScreen} from 'screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useColorScheme, useTranslation} from 'core/hooks';
import {TabAuthNavigatorParamsList} from 'core/types';
import {COLORS, FONTS_STYLES} from 'assets';

const Tab = createMaterialTopTabNavigator<TabAuthNavigatorParamsList>();

export function TabAuthNavigator() {
  const {t} = useTranslation('authentification');
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor:
            colorScheme === 'light' ? COLORS.white : COLORS.background,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.03)',
          paddingVertical: 9,
          marginHorizontal: 24,
        },
        tabBarIndicatorStyle: {
          borderBottomWidth: 2,
          borderBottomColor:
            colorScheme === 'light' ? COLORS.apple : COLORS.oceanGreen,
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={
              focused
                ? {
                    ...FONTS_STYLES.semibold16,
                    color:
                      colorScheme === 'light'
                        ? COLORS.apple
                        : COLORS.oceanGreen,
                  }
                : {
                    ...FONTS_STYLES.regular16,
                    color:
                      colorScheme === 'light'
                        ? COLORS.boulder
                        : COLORS.altoForDark,
                  }
            }>
            {route.name === 'SignUp' ? t('signUpTab') : t('signInTab')}
          </Text>
        ),
      })}>
      <Tab.Screen name="SignIn" component={SignInScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
