import {
  selectObjectsMap,
  selectBookmarksIdsFromFavorites,
} from 'core/selectors';
import {IObject} from 'core/types';
import {reduce} from 'lodash';
import {useSelector} from 'react-redux';

export function useBookmarksObjects(categoryId: string) {
  const bookmarksIds = useSelector(selectBookmarksIdsFromFavorites);
  const objectsMap = useSelector(selectObjectsMap);
  return objectsMap
    ? reduce(
        bookmarksIds,
        (acc, objectId) => {
          const object = objectsMap[objectId];
          if (object?.category?.id === categoryId) {
            return [...acc, object];
          }
          return acc;
        },
        [] as IObject[],
      )
    : [];
}
