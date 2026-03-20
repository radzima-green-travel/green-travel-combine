import { Routes } from '@features/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'core/hooks';
import { ObjectDetailsParams } from 'core/types';
import { ObjectDetailsScreen } from '../../screens';
import { AddObjectsToRoute } from '../../screens/AddObjectsToRoute/AddObjectsToRoute';
import { RouteScreen } from '../../screens/Route';
import { EditRouteScreen } from '../../screens/EditRoute';
import { RouteListScreen } from '../../screens/RouteList';
import { useScreenOptions } from '../hooks/useScreenOptions';

const Stack = createNativeStackNavigator<
  Routes.NavigatorParamsList & { ObjectDetails: ObjectDetailsParams }
>();

export function RoutesNavigator() {
  const { t } = useTranslation('routes');
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Routes"
        component={RouteListScreen}
        options={{ title: t('routeList.title') }}
      />
      <Stack.Screen name="Route" component={RouteScreen} />
      <Stack.Screen name="EditRoute" component={EditRouteScreen} />
      <Stack.Screen name="AddObjectsToRoute" component={AddObjectsToRoute} />
      <Stack.Screen
        getId={({ params }) => params.objectId}
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
