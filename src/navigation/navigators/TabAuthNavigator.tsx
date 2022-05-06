import React from 'react';
import {Text} from 'react-native';
import {SignInScreen, SignUpScreen} from 'screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'core/hooks';
import {TabAuthNavigatorParamsList} from 'core/types';
import {COLORS, FONTS_STYLES} from 'assets';

const Tab = createMaterialTopTabNavigator<TabAuthNavigatorParamsList>();

export function TabAuthNavigator() {
  const {t} = useTranslation('authentification');

  return (
    <Tab.Navigator
      initialRouteName="SignUp"
      screenOptions={({route}) => ({
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.03)',
          paddingVertical: 9,
          marginHorizontal: 24,
        },
        tabBarIndicatorStyle: {
          borderBottomWidth: 2,
          borderBottomColor: COLORS.apple,
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={
              focused
                ? {
                    ...FONTS_STYLES.semibold16,
                    color: COLORS.apple,
                  }
                : {
                    ...FONTS_STYLES.regular16,
                    color: COLORS.boulder,
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
