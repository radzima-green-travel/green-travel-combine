import React, {memo, useMemo, useLayoutEffect, useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {find} from 'lodash';
import Clipboard from '@react-native-community/clipboard';

import {
  PlaceDetailsImageSlider,
  ClipboardToast,
  DetailsPageCapture,
} from 'molecules';
import {useToast, Button} from 'atoms';
import {IProps} from './types';
import {selectAllCategoriesWithObjects} from 'core/selectors';
import {useToggleFavorite, useTranslation} from 'core/hooks';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const ObjectDetails = memo(({route, navigation}: IProps) => {
  const {
    params: {categoryId, objectId},
  } = route;

  const {t} = useTranslation('objectDetails');

  const categories = useSelector(selectAllCategoriesWithObjects);

  const data = useMemo(() => {
    const {objects} = find(categories, ({_id}) => _id === categoryId) || {};
    return find(objects, ({_id}) => _id === objectId);
  }, [categoryId, objectId, categories]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data]);

  const {show: showToast, ...toastProps} = useToast();

  const toggleFavorite = useToggleFavorite();

  const onBookmarkPress = useCallback(() => {
    if (data) {
      toggleFavorite({objectId: data._id, needToAdd: !data.isFavorite});
    }
  }, [data, toggleFavorite]);

  const onMarkerPress = useCallback(() => {}, []);

  const copyLocationToClipboard = useCallback(
    (location: string) => {
      Clipboard.setString(location);
      showToast();
    },
    [showToast],
  );

  return data ? (
    <View style={styles.container}>
      <ScrollView>
        <PlaceDetailsImageSlider
          onMarkerPress={onMarkerPress}
          isFavorite={data.isFavorite}
          onBookmarkPress={onBookmarkPress}
          images={data.images}
        />
        <View style={styles.contentContainer}>
          <DetailsPageCapture
            title={data.name}
            subtitle={data.address}
            coordinates={data.location.coordinates}
            onCoordinatesPress={copyLocationToClipboard}
          />
          <Button>{t('seeOnTheMap')}</Button>
        </View>
      </ScrollView>
      <ClipboardToast {...toastProps} />
    </View>
  ) : null;
});
