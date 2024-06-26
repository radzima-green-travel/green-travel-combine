import {useCallback, useMemo} from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {last} from 'lodash';
import {AuthNavigatorParamsList, MainNavigatorParamsList} from 'core/types';
import {StackNavigationProp} from '@react-navigation/stack';

type AuthNavigatorRouteProps = RouteProp<
  MainNavigatorParamsList,
  'AuthNavigator'
>;

export type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthNavigatorParamsList>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export const useOnSuccessSignIn = () => {
  const navigation = useNavigation<NavigationProps>();

  const parentParams = useMemo(() => {
    const parentNavigationState = navigation.getParent()?.getState();
    const currentScreen = last(parentNavigationState?.routes);
    return currentScreen?.params as
      | AuthNavigatorRouteProps['params']
      | undefined;
  }, [navigation]);

  const onSuccessSignIn = useCallback(() => {
    if (parentParams?.onSuccessSignIn) {
      parentParams?.onSuccessSignIn();
    }

    navigation.getParent()?.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onSuccessSignIn,
  };
};
