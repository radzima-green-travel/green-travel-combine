import {useTranslation} from 'core/hooks';
import {useNewScreenOptions} from 'core/hooks/navigation';
import {Stack} from 'expo-router';
import {merge} from 'lodash';
import {Search as SearchScreen} from 'screens/Search';

export default function Search() {
  const {t} = useTranslation('common');

  const newScreenOptions = useNewScreenOptions({
    title: t('headerTitle'),
    animation: 'fade_from_bottom',
  });
  const commonScreenOptions = newScreenOptions;
  const searchSpecificScreenOptions = SearchScreen.screenOptions;
  return (
    <>
      <Stack.Screen
        options={{
          ...commonScreenOptions,
          ...searchSpecificScreenOptions,
          headerStyle: merge(
            commonScreenOptions.headerStyle,
            searchSpecificScreenOptions.headerStyle,
          ),
        }}
      />
      <SearchScreen />
    </>
  );
}
