import {selectObjectsMap, selectBookmarksIds} from 'core/selectors';
import {IObject} from 'core/types';
import {reduce} from 'lodash';
import {useSelector} from 'react-redux';

export function useBookmarksObjects(categoryId: string) {
  const bookmarksIds = useSelector(selectBookmarksIds);
  const objectsMap = useSelector(selectObjectsMap);
  return objectsMap
    ? reduce(
        bookmarksIds,
        (acc, objectId) => {
          const object = objectsMap[objectId];
          if (object?.category === categoryId) {
            return [...acc, object];
          }
          return acc;
        },
        [] as IObject[],
      )
    : [];
}
