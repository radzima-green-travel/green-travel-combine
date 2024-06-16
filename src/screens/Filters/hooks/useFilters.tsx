import {useSelector} from 'react-redux';

import {selectCategories} from 'core/selectors';

export const useFilters = () => {
  const caregoriesData = useSelector(selectCategories);

  return {
    caregoriesData,
  };
};
