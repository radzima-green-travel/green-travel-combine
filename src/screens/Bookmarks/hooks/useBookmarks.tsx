import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRequestLoading,
  useBookmarksAnalytics,
  useOnRequestError,
} from 'core/hooks';
import {
  clearBookmarksInitialObjectsData,
  getBookmarksInitialObjectsDataRequest,
  syncAndGetBookmarksRequest,
} from 'core/actions';
import { IBookmarkItem } from 'core/types';
import { useNavigation } from '@react-navigation/native';
import { ObjectsListScreenNavigationProps } from '../types';
import { selectBookmarksIds, selectBookmarksCategories } from 'core/selectors';

export const useBookmarks = () => {
  const navigation = useNavigation<ObjectsListScreenNavigationProps>();
  const dispatch = useDispatch();
  const { sendSelectSavedCategoryEvent } = useBookmarksAnalytics();

  const bookmarksCategories = useSelector(selectBookmarksCategories);

  const bookmarksIds = useSelector(selectBookmarksIds);

  const { loading: bookmarksObjectsLoading } = useRequestLoading(
    getBookmarksInitialObjectsDataRequest,
  );
  const { loading: syncBookmarksLoading } = useRequestLoading(
    syncAndGetBookmarksRequest,
  );
  const { errorTexts } = useOnRequestError(
    getBookmarksInitialObjectsDataRequest,
    '',
  );

  const loading =
    (!bookmarksCategories.length && bookmarksObjectsLoading) ||
    syncBookmarksLoading;

  const showEmptyView = !bookmarksCategories.length;

  const fetchInitialObjectsData = useCallback(() => {
    if (bookmarksIds.length) {
      dispatch(getBookmarksInitialObjectsDataRequest(bookmarksIds));
    }
  }, [dispatch, bookmarksIds]);

  const navigateToBookmarksList = useCallback(
    ({ categoryName, categoryId, objectsIds }: IBookmarkItem) => {
      navigation.navigate('BookmarksList', {
        title: categoryName,
        categoryId,
        objectsIds,
      });
      sendSelectSavedCategoryEvent(categoryName);
    },
    [navigation, sendSelectSavedCategoryEvent],
  );

  useEffect(() => {
    if (bookmarksCategories.length && !bookmarksIds.length) {
      dispatch(clearBookmarksInitialObjectsData());
    }
  }, [dispatch, bookmarksCategories.length, bookmarksIds.length]);

  useEffect(() => {
    fetchInitialObjectsData();
  }, [fetchInitialObjectsData]);

  return {
    showEmptyView,
    bookmarksCategories,
    fetchInitialObjectsData,
    loading,
    error: errorTexts,
    navigateToBookmarksList,
    syncBookmarksLoading,
  };
};
