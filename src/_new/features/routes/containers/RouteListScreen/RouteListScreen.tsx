import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomMenu } from 'core/hooks';
import { RoutesNavigatorParamsList } from '../../navigation';
import { AddRouteSheet } from '../AddRouteSheet';
import { RouteList } from '../RouteList';

export function RouteListScreen() {
  const menuProps = useBottomMenu();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RoutesNavigatorParamsList, 'Routes'>
    >();

  return (
    <>
      <RouteList
        addRouteHandler={menuProps.openMenuWithInputAutoFocus}
        onRoutePress={id => navigation.navigate('Route', { id })}
      />
      <AddRouteSheet
        menuProps={menuProps}
        onSubmitName={name =>
          navigation.navigate('AddObjectsToRoute', { name })
        }
      />
    </>
  );
}
