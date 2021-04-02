import {selectTransformedData} from 'core/selectors';
import {useSelector} from 'react-redux';

export function useTransformedData() {
  const transformedData = useSelector(selectTransformedData);

  const getObject = (id: string) => {
    return transformedData?.objectsMap?.[id] || null;
  };

  return {
    getObject,
  };
}
