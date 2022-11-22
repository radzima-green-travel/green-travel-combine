import React, {useLayoutEffect, useState} from 'react';
import {View, Animated} from 'react-native';

import {
  ClipboardToast,
  DetailsPageCapture,
  ObjectDescription,
  ObjectDescriptionSource,
  ObjectDetailsPager,
} from 'molecules';
import {ObjectIncludes} from 'organisms';
import {Button, ImageSlider, ZoomableView} from 'atoms';
import {useImageSlider, useTranslation, useUpdateEffect} from 'core/hooks';
import {isEmpty} from 'lodash';
import {styles, IMAGE_HEIGHT, IMAGE_WIDTH, gradientConfig} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useObjectDetailsStatusBar, useObjectDetails} from './hooks';
import {isLocationExist} from 'core/helpers';
import {ObjectDetailsHeader} from 'molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ObjectDetails = () => {
  const {t} = useTranslation('objectDetails');
  const {
    data,
    sendSwitchPhotosEvent,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToObjectsListDebounced,
    toastProps,
    objectId,
    navigation,
  } = useObjectDetails();

  const [animatedValue] = useState(() => new Animated.Value(0));

  const {onScroll, page, pagesAmount} = useImageSlider(
    data?.images?.length || 0,
  );

  const {top} = useSafeAreaInsets();

  const isJustOneImage = pagesAmount < 2;

  const opacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [0, 0, 1],
  });

  const buttonsOpacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [1, 1, 0],
  });

  const defaultPhoto = require('./img/objectDetailsDefaultPhoto.png');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data]);

  useObjectDetailsStatusBar(animatedValue);

  useUpdateEffect(() => {
    sendSwitchPhotosEvent();
  }, [page, sendSwitchPhotosEvent]);

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
        {(data.origins && data.origins.length) || data.url ? (
          <ObjectDescriptionSource origins={data.origins} siteLink={data.url} />
        ) : null}
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
            images={data.images || [defaultPhoto]}
            onScroll={onScroll}
            defaultPhoto={defaultPhoto}
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
