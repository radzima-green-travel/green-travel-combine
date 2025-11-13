import { selectHomePagePlaceOfTheWeek } from 'core/selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAnalyticsNavigationScreenName } from 'core/helpers';
import { useHomeAnalytics } from './useHomeAnalytics';
import { HomeScreenNavigationProps } from '../types';
import { CardItem } from 'core/types';

export const usePlaceOfTheWeek = () => {
  const placeOfTheWeek = useSelector(selectHomePagePlaceOfTheWeek);
  const { navigate } = useNavigation<HomeScreenNavigationProps>();

  const {
    sendMainScreenWeekObjectViewEvent,
    sendMainScreenWeekObjectBookmarksAddEvent,
    sendMainScreenWeekObjectBookmarksRemoveEvent,
  } = useHomeAnalytics();

  const openPlaceOfTheWeek = useCallback(
    ({ id, name, cover, blurhash, analyticsMetadata }: CardItem) => {
      navigate('ObjectDetails', {
        objectId: id,
        objectCoverImageUrl: cover,
        objcetCoverBlurhash: blurhash,

        analytics: {
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
    ({ analyticsMetadata, name }: CardItem, nextIsFavorite: boolean) => {
      const { objectName, categoryName } = analyticsMetadata;
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
