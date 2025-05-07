import {COLORS} from 'assets';
import {useColorScheme, useTranslation} from 'core/hooks';
import {useScreenOptions} from 'core/hooks/navigation';
import {Stack} from 'expo-router';
import {Filters as FiltersScreen} from 'screens/Filters';
import {Settlements as SettlementsScreen} from 'screens/Settlements';
import {DEFAULT_TRANSITION} from 'core/constants';
import {selectUpdatesAvailable, selectUpdatesSkipped} from 'core/selectors';
import {useSelector} from 'react-redux';
import {OptionalUpdateScreen} from 'screens';
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};
export default function MainLayout() {
  const colorScheme = useColorScheme();

  const {t: tFiters} = useTranslation('filters');

  const screenOptions = useScreenOptions({
    animation: DEFAULT_TRANSITION,
  });

  const updateIsAvailable = useSelector(selectUpdatesAvailable);
  const updateIsSkipped = useSelector(selectUpdatesSkipped);
  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
          name="object-details-map/[objectId]"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="filter"
          options={() => ({
            headerStyle: {
              backgroundColor: COLORS[colorScheme].background.primary,
            },
            presentation: 'modal',
            headerShown: true,
            ...FiltersScreen.screenOptions,
          })}
        />
        <Stack.Screen
          name="settlements"
          options={() => ({
            headerStyle: {
              backgroundColor: COLORS[colorScheme].background.primary,
            },
            presentation: 'modal',
            ...SettlementsScreen.screenOptions,
            title: tFiters('settlements.title'),
            headerTintColor: COLORS[colorScheme].text.primary,
          })}
        />
        <Stack.Screen
          name="image-gallery"
          options={{headerShown: false, animation: 'fade'}}
        />
        <Stack.Screen
          name="add-object-info/[objectId]"
          options={{
            ...screenOptions,
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{headerShown: false, presentation: 'modal'}}
        />
        <Stack.Screen
          name="share-experience"
          options={() => ({
            presentation: 'transparentModal',
            animation: 'none',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          })}
        />
      </Stack>
      {updateIsAvailable && !updateIsSkipped && <OptionalUpdateScreen />}
    </>
  );
}
