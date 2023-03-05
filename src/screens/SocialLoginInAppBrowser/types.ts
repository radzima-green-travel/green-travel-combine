import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type SocialLoginInAppBrowserScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'SocialLoginInAppBrowser'
>;

export type SocialLoginInAppBrowserScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'SocialLoginInAppBrowser'
>;

export interface IProps {
  navigation: SocialLoginInAppBrowserScreenNavigationProps;
  route: SocialLoginInAppBrowserScreenRouteProps;
}
