import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {TabNavigatorParamsList, MainNavigatorParamsList} from 'core/types';

export type FiltersNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<MainNavigatorParamsList, 'Filter'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    NativeStackNavigationProp<MainNavigatorParamsList>
  >
>;

export type FiltersRouteProps = RouteProp<MainNavigatorParamsList, 'Filter'>;

export interface IProps {
  navigation: FiltersNavigationProps;
  route: FiltersRouteProps;
  testID: string;
}

export type ScreenOptions = (
  props: Omit<IProps, 'testID'>,
) => NativeStackNavigationOptions;
