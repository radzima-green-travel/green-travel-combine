import React, {useEffect, useLayoutEffect, useCallback} from 'react';
import {FlatList, Text} from 'react-native';
import {ObjectCard, SuspenseView} from 'atoms';
import {styles} from './styles';
import {IProps} from './types';
import {selectSavedBookmarks} from 'core/selectors';
import {
  addToBookmarksRequest,
  getObjectsForBookmarkRequest,
  clearBookmarksData,
} from 'core/reducers';
import {useSelector, useDispatch} from 'react-redux';
import {useRequestError, useRequestLoading} from 'core/hooks';

export const BookmarksList = ({route, navigation: {setOptions}}: IProps) => {
  const {
    params: {title, objectIds},
  } = route;

  const loading = useRequestLoading(getObjectsForBookmarkRequest);
  const {error} = useRequestError(getObjectsForBookmarkRequest);

  const dispatch = useDispatch();
  const savedBookmarks = useSelector(selectSavedBookmarks);

  useEffect(() => {
    if (objectIds) {
      dispatch(getObjectsForBookmarkRequest(objectIds));
    }
  }, [dispatch, objectIds]);

  useEffect(() => {
    return () => {
      dispatch(clearBookmarksData());
    };
  }, [dispatch]);

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  const addToFavorite = useCallback(
    (args) => {
      dispatch(addToBookmarksRequest({...args, removeWithAnimation: true}));
    },
    [dispatch],
  );

  return (
    <SuspenseView error={error} loading={loading} cover>
      {savedBookmarks ? (
        <FlatList
          data={savedBookmarks}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={({_id}) => _id}
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
