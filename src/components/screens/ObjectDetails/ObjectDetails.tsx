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
import {useTranslation, useObject} from 'core/hooks';
import {debounce, isEmpty} from 'lodash';
import {styles} from './styles';

export const ObjectDetails = memo(({route, navigation}: IProps) => {
  const {
    params: {objectId},
  } = route;

  const {t} = useTranslation('objectDetails');
  const data = useObject(objectId);

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
            coordinates={data.location?.coordinates}
            onCoordinatesPress={copyLocationToClipboard}
          />
          {data.location ? (
            <Button style={styles.button} onPress={navigateToObjectsMap}>
              {t('seeOnTheMap')}
            </Button>
          ) : null}
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
