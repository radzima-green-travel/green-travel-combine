import {selectObjectsMap} from 'core/selectors';
import {useSelector} from 'react-redux';

export function useObject(id: string) {
  const objectsMap = useSelector(selectObjectsMap);
  return objectsMap?.[id] || null;
}
