import {
  clearBookmarksInitialObjectsData,
  getBookmarksInitialObjectsDataRequest,
  syncAndGetBookmarksRequest,
} from 'core/actions';
import {serializeRouteParams} from 'core/helpers/routerUtils';
import {
  useBookmarksAnalytics,
  useOnRequestError,
  useRequestLoading,
} from 'core/hooks';
import {selectBookmarksCategories, selectBookmarksIds} from 'core/selectors';
import {IBookmarkItem} from 'core/types';
import {useRouter} from 'expo-router';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useBookmarks = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {sendSelectSavedCategoryEvent} = useBookmarksAnalytics();

  const bookmarksCategories = useSelector(selectBookmarksCategories);

  const bookmarksIds = useSelector(selectBookmarksIds);

  const {loading: bookmarksObjectsLoading} = useRequestLoading(
    getBookmarksInitialObjectsDataRequest,
  );
  const {loading: syncBookmarksLoading} = useRequestLoading(
    syncAndGetBookmarksRequest,
  );
  const {errorTexts} = useOnRequestError(
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
    ({categoryName, categoryId, objectsIds}: IBookmarkItem) => {
      router.navigate({
        pathname: '/bookmarks-list',
        params: serializeRouteParams({
          title: categoryName,
          categoryId,
          objectsIds: objectsIds,
        }),
      });
      sendSelectSavedCategoryEvent(categoryName);
    },
    [router, sendSelectSavedCategoryEvent],
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
