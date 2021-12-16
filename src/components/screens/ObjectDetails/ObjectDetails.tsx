import React, {useMemo, useLayoutEffect, useCallback, useState} from 'react';
import {View, Animated} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {
  ClipboardToast,
  DetailsPageCapture,
  ObjectDescription,
  ObjectDescriptionSource,
  ObjectDetailsPager,
} from 'molecules';
import {ObjectIncludes} from 'organisms';
import {
  useToast,
  Button,
  ObjectDetailsSiteLink,
  ImageSlider,
  ZoomableView,
} from 'atoms';
import {IProps} from './types';
import {
  useTranslation,
  useObject,
  useImageSlider,
  useDetailsPageAnalytics,
  useUpdateEffect,
} from 'core/hooks';
import {debounce, isEmpty} from 'lodash';
import {styles, IMAGE_HEIGHT, IMAGE_WIDTH, gradientConfig} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useObjectDetailsStatusBar} from './hooks';
import {isLocationExist} from 'core/helpers';
import {ObjectDetailsHeader} from 'molecules';

export const ObjectDetails = ({route, navigation}: IProps) => {
  const {
    params: {objectId},
  } = route;

  const [animatedValue] = useState(() => new Animated.Value(0));

  const {t} = useTranslation('objectDetails');
  const data = useObject(objectId)!;

  const {sendOpenMapEvent, sendSwitchPhotosEvent, sendScrollEvent} =
    useDetailsPageAnalytics({
      name: data.name,
      category: data.category.name,
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data]);

  const {show: showToast, ...toastProps} = useToast();

  const copyLocationToClipboard = useCallback(
    (location: string) => {
      Clipboard.setString(location);
      showToast();
    },
    [showToast],
  );

  const navigateToObjectsList = useCallback(
    ({id, name, objects}: {id: string; name: string; objects: string[]}) => {
      if (objects.length === 1) {
        navigation.push('ObjectDetails', {
          objectId: objects[0],
        });
      } else {
        navigation.push('ObjectsList', {
          categoryId: id,
          title: name,
          objectsIds: objects,
        });
      }
    },
    [navigation],
  );

  const navigateToObjectsMap = useCallback(() => {
    if (data) {
      navigation.navigate('ObjectDetailsMap', {
        categoryId: data.category.id,
        objectId: data.id,
      });

      sendOpenMapEvent();
    }
  }, [data, navigation, sendOpenMapEvent]);

  const navigateToObjectsListDebounced = useMemo(
    () =>
      debounce(navigateToObjectsList, 300, {leading: true, trailing: false}),
    [navigateToObjectsList],
  );

  useObjectDetailsStatusBar(animatedValue);

  const {onScroll, page, pagesAmount} = useImageSlider(
    data?.images?.length || 0,
  );

  const {top} = useSafeAreaInsets();

  const isJustOneImage = pagesAmount < 2;

  useUpdateEffect(() => {
    sendSwitchPhotosEvent();
  }, [page, sendSwitchPhotosEvent]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [0, 0, 1],
  });

  const buttonsOpacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [1, 1, 0],
  });

  return data ? (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: animatedValue}},
            },
          ],
          {
            useNativeDriver: true,
            listener: sendScrollEvent,
          },
        )}
        contentContainerStyle={styles.listContentContainer}>
        {isJustOneImage ? null : (
          <ObjectDetailsPager pagesAmount={pagesAmount} page={page} />
        )}

        <View
          style={[
            styles.contentContainer,
            isJustOneImage && styles.withoutPagerContentContainer,
          ]}>
          <DetailsPageCapture
            routeLength={data.length}
            title={data.name}
            subtitle={data.address}
            coordinates={
              isLocationExist(data)
                ? [data.location!.lon!, data.location!.lat!]
                : undefined
            }
            onCoordinatesPress={copyLocationToClipboard}
          />
          {isLocationExist(data) ? (
            <Button style={styles.button} onPress={navigateToObjectsMap}>
              {t('seeOnTheMap')}
            </Button>
          ) : null}
        </View>
        <ObjectDescription description={data.description} />
        <ObjectDescriptionSource origins={data.origins} />
        {data.url ? <ObjectDetailsSiteLink url={data.url} /> : null}
        {isEmpty(data.include) ? null : (
          <ObjectIncludes
            title={t('includes')}
            data={data.include}
            onIncludePress={navigateToObjectsListDebounced}
          />
        )}

        {isEmpty(data.belongsTo) ? null : (
          <ObjectIncludes
            title={t('belongs')}
            data={data.belongsTo}
            onIncludePress={navigateToObjectsListDebounced}
          />
        )}
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.imageSliderContainer,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [0, -IMAGE_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT * 2, 0],
                  outputRange: [5, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <ZoomableView width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
          <ImageSlider
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            images={data.images}
            onScroll={onScroll}
          />
        </ZoomableView>
      </Animated.View>
      <LinearGradient
        pointerEvents={'none'}
        {...gradientConfig}
        style={[styles.gradient, {height: top}]}
      />
      <ClipboardToast {...toastProps} />
      <ObjectDetailsHeader
        buttonsOpacity={buttonsOpacity}
        opacity={opacity}
        objecId={objectId}
      />
    </View>
  ) : null;
};
