import {selectHomePagePlaceOwTheWeek} from 'core/selectors';
import {useSelector} from 'react-redux';

export const usePlaceOfTheWeek = () => {
  const placeOfTheWeek = useSelector(selectHomePagePlaceOwTheWeek);
  return {
    placeOfTheWeek,
  };
};
