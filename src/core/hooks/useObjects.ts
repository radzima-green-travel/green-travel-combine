import {selectObjectsMap} from 'core/selectors';
import {map} from 'lodash';
import {useSelector} from 'react-redux';

export function useObjects(ids: string[]) {
  const objectsMap = useSelector(selectObjectsMap);
  return objectsMap ? map(ids, id => objectsMap[id]) : [];
}
