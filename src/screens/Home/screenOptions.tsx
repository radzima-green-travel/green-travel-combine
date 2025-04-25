import React, {useLayoutEffect} from 'react';
import {Pressable, Text} from 'react-native';
import {Icon} from 'atoms/Icon';
import {SearchField} from 'molecules';
import {Button, CustomHeader} from 'atoms';
import {getAnalyticsNavigationScreenName, getPartOfTheDay} from 'core/helpers';
import {useNavigation} from '@react-navigation/native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {HEADER_BOTTOM_RADIUS} from 'core/constants';
import {Link} from 'expo-router';

const HeaderRight = () => {
  const testID = 'headerRight';

  return (
    <Link
      asChild
      href={{
        pathname: '/filter',
        params: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      }}>
      <Button
        testID={testID}
        isIconOnlyButton
        renderIcon={textStyle => (
          <Icon name="tune" size={24} style={textStyle} />
        )}
        theme="quarterlyGrey"
      />
    </Link>
  );
};

export function useHomeHeader() {
  const navigation = useNavigation();
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('home');

  const partOfTheDay = getPartOfTheDay();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (
        <CustomHeader
          {...props}
          contentAbove={() => (
            <Text style={styles.headerTitle}>
              {t(`greeting.${partOfTheDay}`)}
            </Text>
          )}
        />
      ),
      headerRight: () => <HeaderRight />,
      headerTitle: () => (
        <Link href="/search" asChild>
          <Pressable pointerEvents="box-only">
            <SearchField testID="headerSearchbar" value={''} />
          </Pressable>
        </Link>
      ),
    });
  }, [navigation, partOfTheDay, styles.headerTitle, t]);

  return {
    pageListContainerProps: {
      contentContainerStyle: {paddingTop: HEADER_BOTTOM_RADIUS},
      showsVerticalScrollIndicator: false,
    },
  };
}
