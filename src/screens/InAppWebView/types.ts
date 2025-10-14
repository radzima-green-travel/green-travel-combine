import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type SocialLoginInAppBrowserScreenNavigationProps =
  NativeStackNavigationProp<AuthNavigatorParamsList, 'InAppWebView'>;

export type SocialLoginInAppBrowserScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'InAppWebView'
>;

export interface IProps {
  navigation: SocialLoginInAppBrowserScreenNavigationProps;
  route: SocialLoginInAppBrowserScreenRouteProps;
}
