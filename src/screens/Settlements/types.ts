import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {TabNavigatorParamsList, MainNavigatorParamsList} from 'core/types';

export type HomeScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<MainNavigatorParamsList, 'Settlements'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    StackNavigationProp<MainNavigatorParamsList>
  >
>;

export type SettlementsScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'Settlements'
>;

export interface IProps {
  navigation: HomeScreenNavigationProps;
  route: SettlementsScreenRouteProps;
  testID: string;
}

export type ScreenOptions = (
  props: Omit<IProps, 'testID'>,
) => NativeStackNavigationOptions;
