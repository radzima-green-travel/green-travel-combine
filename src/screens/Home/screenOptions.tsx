import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { HomeScreenNavigationProps, IProps } from './types';
import { Icon } from 'atoms/Icon';
import { SearchField } from 'molecules';
import { Button, CustomHeader } from 'atoms';
import {
  getAnalyticsNavigationScreenName,
  getPartOfTheDay,
} from 'core/helpers';
import { useNavigation } from '@react-navigation/native';
import { useThemeStyles, useTranslation } from 'core/hooks';
import { themeStyles } from './styles';
import { HEADER_BOTTOM_RADIUS } from 'core/constants';

const HeaderRight = ({ navigation, testID }: Omit<IProps, 'route'>) => {
  return (
    <Button
      testID={testID}
      isIconOnlyButton
      renderIcon={textStyle => <Icon name="tune" size={24} style={textStyle} />}
      onPress={() => {
        navigation.navigate('Filter', {
          initialFilters: undefined,
          initialQuery: '',
          searchOptions: undefined,
          analytics: {
            fromScreenName: getAnalyticsNavigationScreenName(),
          },
          onApply: appliedFilters => {
            navigation.navigate('Search', {
              appliedFilters,
            });

            return { redirectHandled: true };
          },
        });
      }}
      theme="quarterlyGrey"
    />
  );
};

export function useHomeHeader() {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const styles = useThemeStyles(themeStyles);
  const { t } = useTranslation('home');

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
      headerRight: () => (
        <HeaderRight testID="headerRight" navigation={navigation} />
      ),
      headerTitle: () => (
        <View
          pointerEvents="box-only"
          onStartShouldSetResponder={() => {
            navigation.navigate('Search');
            return false;
          }}>
          <SearchField
            testID="headerSearchbar"
            value={''}
            onChange={() => {}}
            onRightButtonPress={() => {}}
          />
        </View>
      ),
    });
  }, [navigation, partOfTheDay, styles.headerTitle, t]);

  return {
    pageListContainerProps: {
      contentContainerStyle: { paddingTop: HEADER_BOTTOM_RADIUS },
      showsVerticalScrollIndicator: false,
    },
  };
}
