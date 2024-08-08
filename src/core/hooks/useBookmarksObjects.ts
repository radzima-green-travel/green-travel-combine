import {selectBookmarksIds} from 'core/selectors';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {selectBookmarksCategories} from 'core/selectors';
import {CardItem} from 'core/types';

export function useBookmarksObjects(listData: CardItem[], categoryId: string) {
  const bookmarksCategories = useSelector(selectBookmarksCategories);
  const bookmarksIds = useSelector(selectBookmarksIds);

  const currentCategory = bookmarksCategories.find(
    category => category.categoryId === categoryId,
  );

  const newBookmarksIds = useMemo(() => {
    if (!listData.length) {
      return [];
    }
    const listDataIds = listData.map(object => object.id);

    return bookmarksIds.filter(
      (id: string) =>
        !listDataIds.includes(id) && currentCategory?.objectsIds?.includes(id),
    );
  }, [bookmarksIds, currentCategory?.objectsIds, listData]);

  const filteredListData = useMemo(
    () =>
      listData
        ? listData.filter(object => bookmarksIds.includes(object.id))
        : [],
    [bookmarksIds, listData],
  );

  return {filteredListData, newBookmarksIds, bookmarksIds};
}
