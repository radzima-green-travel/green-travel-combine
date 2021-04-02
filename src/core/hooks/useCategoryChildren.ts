import {selectCategoriesMap} from 'core/selectors';
import {map} from 'lodash';
import {useSelector} from 'react-redux';

export function useCategoryChildren(categoryId: string) {
  const categoriesMap = useSelector(selectCategoriesMap);
  return categoriesMap
    ? map(categoriesMap[categoryId].children, id => categoriesMap[id])
    : [];
}
