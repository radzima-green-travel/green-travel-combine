import React, {useEffect, useLayoutEffect, useCallback} from 'react';
import {FlatList, Text} from 'react-native';
import {ObjectCard, SuspenseView} from 'atoms';
import {styles} from './styles';
import {IProps} from './types';

import {
  selectSavedBookmarks,
  selectAllCategoriesWithObjects,
} from 'core/selectors';
import {
  addToBookmarksRequest,
  getObjectsForBookmarkRequest,
} from 'core/reducers';
import {useSelector, useDispatch} from 'react-redux';
import {useRequestError, useRequestLoading} from 'core/hooks';

export const ObjectsList = ({route, navigation: {setOptions}}: IProps) => {
  const {
    params: {categoryId, title, objectIds},
  } = route;

  const loading = useRequestLoading(getObjectsForBookmarkRequest);
  const {error} = useRequestError(getObjectsForBookmarkRequest);

  const dispatch = useDispatch();
  const savedBookmarks = useSelector(selectSavedBookmarks);
  const categoriesWithObjects = useSelector(selectAllCategoriesWithObjects);

  const listData = categoryId
    ? categoriesWithObjects?.[categoryId]?.items
    : savedBookmarks;

  useEffect(() => {
    if (objectIds) {
      dispatch(getObjectsForBookmarkRequest(objectIds));
    }
  }, [dispatch, objectIds]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  const addToFavorite = useCallback(
    (args) => {
      dispatch(addToBookmarksRequest(args));
    },
    [dispatch],
  );

  return (
    <SuspenseView error={error} loading={loading}>
      {listData ? (
        <FlatList
          data={listData}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={<Text style={styles.listTitle}>{title}</Text>}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <ObjectCard
              onIsFavoriteChange={addToFavorite}
              containerStyle={styles.cardContainer}
              data={item}
            />
          )}
        />
      ) : null}
    </SuspenseView>
  );
};
