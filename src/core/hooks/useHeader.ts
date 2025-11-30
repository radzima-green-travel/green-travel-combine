import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HeaderProps } from 'components/containers/Header/types';
import { DependencyList, useLayoutEffect, useMemo } from 'react';

export type UseHeaderProps = Pick<
  HeaderProps,
  | 'overlaysContent'
  | 'backButtonHidden'
  | 'backButtonIcon'
  | 'backButtonPosition'
  | 'backButtonAction'
  | 'title'
  | 'titleAlign'
  | 'titleSize'
  | 'rightActions'
  | 'statusbarStyle'
  | 'style'
  | 'titleStyle'
>;

/** @description A hook used for quick configuration of header within basic supported options.
 * Use **Header** component if you need highly customized header with custom components */
export const useHeader = (props: UseHeaderProps, deps: DependencyList = []) => {
  const navigation = useNavigation<NavigationProp<any>>();

  // Props are memoized and detached from dependencies on purpose, to simplify common usage
  // This hook should be used mostly for static configurations, because setOptions shouldn't be called frequently, see
  // https://reactnavigation.org/docs/6.x/navigation-prop#setoptions
  // If you need to change the config based on some conditions, please check that these conditions do not change frequently
  // And put them into the deps array
  /*
     Example:
     useHeader({ title: loading ? ' ' : 'My page title' }, [loading])
  */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedProps = useMemo(() => props, deps);

  useLayoutEffect(() => {
    navigation.setOptions({ customOptions: memoizedProps });
  }, [navigation, memoizedProps]);
};
