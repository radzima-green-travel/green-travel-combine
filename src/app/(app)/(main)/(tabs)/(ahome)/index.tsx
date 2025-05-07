import {DEFAULT_TRANSITION} from 'core/constants';
import {useTranslation} from 'core/hooks';
import {useNewScreenOptions} from 'core/hooks/navigation';
import {Stack} from 'expo-router';
import {Home as HomeScreen} from 'screens/Home';

export default function Home() {
  const {t} = useTranslation('common');

  const newScreenOptions = useNewScreenOptions({
    title: t('headerTitle'),
    animation: DEFAULT_TRANSITION,
  });

  return (
    <>
      <Stack.Screen options={newScreenOptions} />
      <HomeScreen />
    </>
  );
}
