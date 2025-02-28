import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {HomeScreenNavigationProps, IProps} from './types';
import {Icon} from 'atoms/Icon';
import {SearchField} from 'molecules';
import {Button, CustomHeader} from 'atoms';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useNavigation} from '@react-navigation/native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

const HeaderRight = ({navigation, testID}: Omit<IProps, 'route'>) => {
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
        });
      }}
      theme="quarterlyGrey"
    />
  );
};

export function useSearchHeader() {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const styles = useThemeStyles(themeStyles);
  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <CustomHeader
          {...props}
          contentAbove={() => (
            <Text style={styles.headerTitle}>Good morning!</Text>
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
            containerStyle={{}}
            value={''}
            onChange={() => {}}
            onRightButtonPress={() => {}}
          />
        </View>
      ),
    });
  }, [navigation, styles.headerTitle]);
}
