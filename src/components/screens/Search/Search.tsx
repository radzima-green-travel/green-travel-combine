import React, {useCallback, useEffect} from 'react';
import {FlatList, Keyboard, Text} from 'react-native';
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

  return (
    <FlatList
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.contentContainer}
      onScrollBeginDrag={Keyboard.dismiss}
      keyExtractor={(item) => item._id}
      data={isHistoryVisible ? history : searchResults}
      ListHeaderComponent={() =>
        isHistoryVisible ? (
          <Text style={styles.listTitle}>{t('searchTitle')}</Text>
        ) : null
      }
      renderItem={({item}) => {
        return <SearchListItem onPress={navigateToObjectDetails} data={item} />;
      }}
    />
  );
};

Search.screenOptions = screenOptions;
