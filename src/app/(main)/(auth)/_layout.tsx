import {HeaderCancelButton} from 'components/atoms';
import {Link, Stack} from 'expo-router';
import {useScreenOptions} from 'core/hooks/navigation';
import {DEFAULT_TRANSITION} from 'core/constants';
import {useTranslation} from 'react-i18next';
import {AuthMethodSelectionScreen, ChangePasswordScreen} from 'screens';

export default function AuthLayout() {
  const {t} = useTranslation('authentification');

  const getHeaderRight = () => (
    <Link href="../" asChild>
      <HeaderCancelButton />
    </Link>
  );

  const screenOptions = useScreenOptions({
    withBottomInset: true,
    title: '',
    animation: DEFAULT_TRANSITION,
    headerRight: getHeaderRight,
    orientation: 'portrait',
  });

  return (
    <Stack
      screenOptions={screenOptions}
      initialRouteName="auth-method-selection">
      <Stack.Screen
        name="auth-method-selection"
        options={AuthMethodSelectionScreen.screenOptions}
      />
      <Stack.Screen
        name="restore-password"
        options={{title: t('restorePassword', {ns: 'authentification'})}}
      />
      <Stack.Screen
        name="new-password"
        options={{title: t('restorePassword', {ns: 'authentification'})}}
      />
      <Stack.Screen
        name="change-password"
        options={ChangePasswordScreen.screenOptions}
      />
    </Stack>
  );
}
