import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainNavigatorParamsList } from 'core/types';

export type ImagesGalleryScreenNavigationProps = NativeStackNavigationProp<
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
