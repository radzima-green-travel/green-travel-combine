import { Routes } from '@features/routes';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'core/hooks';
import { selectUserAuthorized } from 'core/selectors';
import { MainNavigatorParamsList, ObjectDetailsParams } from 'core/types';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ObjectDetailsScreen } from '../../screens';
import { AddObjectsToRoute } from '../../screens/AddObjectsToRoute/AddObjectsToRoute';
import { RouteScreen } from '../../screens/Route';
import { RouteListScreen } from '../../screens/RouteList';
import { useScreenOptions } from '../hooks/useScreenOptions';

const Stack = createNativeStackNavigator<
  Routes.NavigatorParamsList & { ObjectDetails: ObjectDetailsParams }
>();

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
        <Stack.Screen
          getId={({ params }) => params.objectId}
          name="ObjectDetails"
          component={ObjectDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Routes.Provider>
  );
}
