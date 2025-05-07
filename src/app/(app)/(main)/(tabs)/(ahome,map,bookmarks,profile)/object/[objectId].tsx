import {Stack} from 'expo-router';
import {ObjectDetailsScreen} from 'screens';

export default function ObjectDetails() {
  return (
    <>
      <Stack.Screen
        getId={({params}) => params?.objectId}
        initialParams={{fromScreenName: 'DeepLink'}}
        options={{headerShown: false}}
      />

      <ObjectDetailsScreen />
    </>
  );
}
