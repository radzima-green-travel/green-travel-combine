import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {
  ProfileNavigatorParamsList,
  MainNavigatorParamsList,
  TabNavigatorParamsList,
} from 'core/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type ProfileDetailsScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileNavigatorParamsList, 'ProfileDetails'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    NativeStackNavigationProp<MainNavigatorParamsList>
  >
>;

export type ProfileDetailsScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'ProfileDetails'
>;

export interface IProps {
  navigation: ProfileDetailsScreenNavigationProps;
  route: ProfileDetailsScreenRouteProps;
}
