import { useCallback, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUserAuthorized } from 'core/selectors';
import { MainNavigatorParamsList } from 'core/types';
import { useTranslation } from 'core/hooks';
import { RouteListScreen } from '../../screens/RouteList';
import { RouteScreen } from '../../screens/Route';
import { useScreenOptions } from '../hooks/useScreenOptions';
import { Routes } from '@features/routes';
import { AddObjectsToRoute } from '../../screens/AddObjectsToRoute/AddObjectsToRoute';

const Stack = createNativeStackNavigator<Routes.NavigatorParamsList>();

export function RoutesNavigator() {
  const { t } = useTranslation('routes');
  const screenOptions = useScreenOptions();

  const isAuthenticated = useSelector(selectUserAuthorized);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamsList>>();

  const redirectToSignIn = useCallback(
    (params: { onSuccess: () => void; authPromptMessage?: string }) => {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
        params: {
          title: params.authPromptMessage,
        },
        onSuccessSignIn: params.onSuccess,
      });
    },
    [navigation],
  );

  const routesDependencies = useMemo(
    () => ({ isAuthenticated, redirectToSignIn }),
    [isAuthenticated, redirectToSignIn],
  );

  return (
    <Routes.Provider value={routesDependencies}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Routes"
          component={RouteListScreen}
          options={{ title: t('routeList.title') }}
        />
        <Stack.Screen name="Route" component={RouteScreen} />
        <Stack.Screen name="AddObjectsToRoute" component={AddObjectsToRoute} />
      </Stack.Navigator>
    </Routes.Provider>
  );
}
