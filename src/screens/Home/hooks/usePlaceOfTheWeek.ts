import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {selectHomePagePlaceOfTheWeek} from 'core/selectors';
import {CardItem} from 'core/types';
import {useRouter} from 'expo-router';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useHomeAnalytics} from './useHomeAnalytics';

export const usePlaceOfTheWeek = () => {
  const placeOfTheWeek = useSelector(selectHomePagePlaceOfTheWeek);

  const {navigate} = useRouter();

  const {
    sendMainScreenWeekObjectViewEvent,
    sendMainScreenWeekObjectBookmarksAddEvent,
    sendMainScreenWeekObjectBookmarksRemoveEvent,
  } = useHomeAnalytics();

  const openPlaceOfTheWeek = useCallback(
    ({id, name, cover, blurhash, analyticsMetadata}: CardItem) => {
      navigate({
        pathname: '/object/[objectId]',
        params: {
          objectId: id,
          objectCoverImageUrl: cover,
          objcetCoverBlurhash: blurhash,
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
      sendMainScreenWeekObjectViewEvent(
        analyticsMetadata.objectName || name,
        analyticsMetadata.categoryName,
      );
    },
    [navigate, sendMainScreenWeekObjectViewEvent],
  );

  const onFavoriteChanged = useCallback(
    ({analyticsMetadata, name}: CardItem, nextIsFavorite: boolean) => {
      const {objectName, categoryName} = analyticsMetadata;
      if (nextIsFavorite) {
        sendMainScreenWeekObjectBookmarksAddEvent(
          objectName || name,
          categoryName,
        );
      } else {
        sendMainScreenWeekObjectBookmarksRemoveEvent(
          objectName || name,
          categoryName,
        );
      }
    },
    [
      sendMainScreenWeekObjectBookmarksAddEvent,
      sendMainScreenWeekObjectBookmarksRemoveEvent,
    ],
  );
  return {
    placeOfTheWeek,
    openPlaceOfTheWeek,
    onFavoriteChanged,
  };
};
