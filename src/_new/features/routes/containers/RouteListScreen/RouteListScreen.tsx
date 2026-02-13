import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomMenu } from 'core/hooks';
import { RoutesNavigatorParamsList } from '../../navigation';
import { AddRouteForm } from '../AddRouteForm';
import { RouteList } from '../RouteList';

export function RouteListScreen() {
  const menuProps = useBottomMenu();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RoutesNavigatorParamsList, 'Routes'>
    >();

  const openAddObjectsScreen = (name: string) =>
    navigation.navigate('AddObjectsToRoute', { name });

  return (
    <>
      <RouteList
        onAddRoute={menuProps.openMenuWithInputAutoFocus}
        onSelectRoute={id => navigation.navigate('Route', { id })}
      />
      <AddRouteForm menuProps={menuProps} onSubmit={openAddObjectsScreen} />
    </>
  );
}
