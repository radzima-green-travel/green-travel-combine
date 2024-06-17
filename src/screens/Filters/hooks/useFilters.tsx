import {useSelector} from 'react-redux';

import {selectCategories} from 'core/selectors';

export const useFilters = () => {
  const caregoriesData = useSelector(selectCategories);
  const ratingGoogle = ['Any', '3,5+', '4+', '4,5+'];

  return {
    caregoriesData,
    ratingGoogle,
  };
};
