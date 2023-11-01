import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList} from 'core/types';

export type ImagesGalleryScreenNavigationProps = StackNavigationProp<
  MainNavigatorParamsList,
  'ImagesGallery'
>;

export type ImagesGalleryScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'ImagesGallery'
>;

export interface IProps {
  navigation: ImagesGalleryScreenNavigationProps;
  route: ImagesGalleryScreenRouteProps;
}
