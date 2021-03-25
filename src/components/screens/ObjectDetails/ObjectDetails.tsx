import React, {memo, useMemo, useLayoutEffect, useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {
  PlaceDetailsImageSlider,
  ClipboardToast,
  DetailsPageCapture,
  ObjectDescription,
} from 'molecules';
import {ObjectIncludes} from 'organisms';
import {useToast, Button, ObjectDetailsSiteLink} from 'atoms';
import {IProps} from './types';
import {selectAllCategoriesWithObjects} from 'core/selectors';
import {useTranslation} from 'core/hooks';
import {findObject} from 'core/helpers';
import {useSelector} from 'react-redux';
import {debounce, isEmpty} from 'lodash';
import {styles} from './styles';

export const ObjectDetails = memo(({route, navigation}: IProps) => {
  const {
    params: {categoryId, objectId},
  } = route;

  const {t} = useTranslation('objectDetails');

  const categories = useSelector(selectAllCategoriesWithObjects);

  const data = useMemo(() => {
    return categories ? findObject(categories, categoryId, objectId) : null;
  }, [categoryId, objectId, categories]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data]);

  const {show: showToast, ...toastProps} = useToast();

  const onMarkerPress = useCallback(() => {}, []);

  const copyLocationToClipboard = useCallback(
    (location: string) => {
      Clipboard.setString(location);
      showToast();
    },
    [showToast],
  );

  const navigateToObjectsList = useCallback(
    ({_id, name, objects}: {_id: string; name: string; objects: string[]}) => {
      navigation.push('ObjectsList', {
        categoryId: _id,
        title: name,
        objectsIds: objects,
      });
    },
    [navigation],
  );

  const navigateToObjectsMap = useCallback(() => {
    if (data) {
      navigation.navigate('ObjectDetailsMap', {
        categoryId: data.category,
        objectId: data._id,
      });
    }
  }, [data, navigation]);

  const navigateToObjectsListDebounced = useMemo(
    () =>
      debounce(navigateToObjectsList, 300, {leading: true, trailing: false}),
    [navigateToObjectsList],
  );

  return data ? (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContentContainer}>
        <PlaceDetailsImageSlider
          onMarkerPress={onMarkerPress}
          objectId={data._id}
          images={data.images}
        />
        <View style={styles.contentContainer}>
          <DetailsPageCapture
            title={data.name}
            subtitle={data.address}
            coordinates={data.location.coordinates}
            onCoordinatesPress={copyLocationToClipboard}
          />
          <Button onPress={navigateToObjectsMap}>{t('seeOnTheMap')}</Button>
        </View>
        <ObjectDescription description={data.description} />
        {data.url ? <ObjectDetailsSiteLink url={data.url} /> : null}
        {isEmpty(data.include) ? null : (
          <ObjectIncludes
            data={data.include}
            onIncludePress={navigateToObjectsListDebounced}
          />
        )}
      </ScrollView>
      <ClipboardToast {...toastProps} />
    </View>
  ) : null;
});
