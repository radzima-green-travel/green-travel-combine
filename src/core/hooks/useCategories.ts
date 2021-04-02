import {selectCategoriesMap} from 'core/selectors';
import {map} from 'lodash';
import {useSelector} from 'react-redux';

export function useCategories(ids: string[]) {
  const categoriesMap = useSelector(selectCategoriesMap);
  return categoriesMap ? map(ids, id => categoriesMap[id]) : [];
}
