import {selectObjectsMap, selectCategoriesMap} from 'core/selectors';
import {map} from 'lodash';
import {useSelector} from 'react-redux';

export function useCategoryObjects(categoryId: string) {
  const objectsMap = useSelector(selectObjectsMap);
  const categoriesMap = useSelector(selectCategoriesMap);
  return categoriesMap && objectsMap
    ? map(categoriesMap[categoryId].objects, id => objectsMap[id])
    : [];
}
