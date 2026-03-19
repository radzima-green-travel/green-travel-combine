import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RoutesDependenciesType } from '@features/routes/context';
import { selectUserAuthorized } from 'core/selectors';
import type { MainNavigatorParamsList } from 'core/types';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useRoutesDependencies = (): RoutesDependenciesType => {
  const isAuthenticated = useSelector(selectUserAuthorized);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamsList>>();

  const redirectToSignIn = useCallback<
    RoutesDependenciesType['redirectToSignIn']
  >(
    params => {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
        params: {
          title: params.authPromptMessage,
        },
        onSuccessSignIn: params.onSuccess,
      });
    },
    [navigation],
  );

  return useMemo(
    () => ({ isAuthenticated, redirectToSignIn }),
    [isAuthenticated, redirectToSignIn],
  );
};
