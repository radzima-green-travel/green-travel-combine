import React, {useCallback, useEffect} from 'react';
import {FlatList, Keyboard, Text, View} from 'react-native';
import {screenOptions} from './screenOptions';
import {SearchListItem} from 'molecules';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSearchResults,
  selectSearchHistory,
  selectSearchInputValue,
} from 'core/selectors';
import {IExtendedObjectWithCategoryData} from 'core/types';
import {addObjectToSearchHistory, setSearchInputValue} from 'core/reducers';
import {IProps} from './types';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {Icon} from 'atoms';
import {COLORS} from 'assets';

export const Search = ({navigation}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const dispatch = useDispatch();
  const history = useSelector(selectSearchHistory);
  const searchResults = useSelector(selectSearchResults);
  const inputValue = useSelector(selectSearchInputValue);
  const {t} = useTranslation('search');

  const isHistoryVisible = !inputValue;

  const navigateToObjectDetails = useCallback(
    (object: IExtendedObjectWithCategoryData) => {
      const {_id, category} = object;
      dispatch(addObjectToSearchHistory(object));
      navigation.navigate('ObjectDetails', {
        categoryId: category,
        objectId: _id,
      });
    },
    [navigation, dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(setSearchInputValue(''));
    };
  }, [dispatch]);

  const data = isHistoryVisible ? history : searchResults;

  return data.length ? (
    <FlatList
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.contentContainer}
      onScrollBeginDrag={Keyboard.dismiss}
      keyExtractor={(item) => item._id}
      data={data}
      ListHeaderComponent={() =>
        isHistoryVisible ? (
          <Text style={styles.listTitle}>{t('searchTitle')}</Text>
        ) : null
      }
      renderItem={({item}) => {
        return <SearchListItem onPress={navigateToObjectDetails} data={item} />;
      }}
    />
  ) : (
    <View style={styles.emptyListContainer}>
      <Icon name="search" color={COLORS.silver} height={48} width={48} />
      <Text style={styles.emtyListText}>{t('notFound')}</Text>
    </View>
  );
};

Search.screenOptions = screenOptions;
