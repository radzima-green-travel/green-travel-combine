import {Stack} from 'expo-router';
import {AppMapScreen} from 'screens/index';

export default function Map() {
  return (
    <>
      <Stack.Screen options={{headerShown: false}} />
      <AppMapScreen />
    </>
  );
}
