import {selectHomePagePlaceOfTheWeek} from 'core/selectors';
import {useSelector} from 'react-redux';

export const usePlaceOfTheWeek = () => {
  const placeOfTheWeek = useSelector(selectHomePagePlaceOfTheWeek);
  return {
    placeOfTheWeek,
  };
};
