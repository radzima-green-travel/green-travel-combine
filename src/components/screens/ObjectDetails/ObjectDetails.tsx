import React, {memo, useMemo, useLayoutEffect, useCallback} from 'react';
import {View, Animated} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {
  PlaceDetailsImageSliderButtons,
  ClipboardToast,
  DetailsPageCapture,
  ObjectDescription,
  ObjectDetailsPager,
} from 'molecules';
import {ObjectIncludes} from 'organisms';
import {useToast, Button, ObjectDetailsSiteLink, ImageSlider} from 'atoms';
import {IProps} from './types';
import {
  useTranslation,
  useObject,
  useImageSlider,
  useLightStatusBar,
} from 'core/hooks';
import {debounce, isEmpty} from 'lodash';
import {styles, IMAGE_HEIGHT, IMAGE_WIDTH, gradientConfig} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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

  const onBackPress = useMemo(
    () =>
      debounce(() => navigation.goBack(), 300, {
        leading: true,
        trailing: false,
      }),
    [navigation],
  );

  const copyLocationToClipboard = useCallback(
    (location: string) => {
      Clipboard.setString(location);
      showToast();
    },
    [showToast],
  );

  const navigateToObjectsList = useCallback(
    ({id, name, objects}: {id: string; name: string; objects: string[]}) => {
      navigation.push('ObjectsList', {
        categoryId: id,
        title: name,
        objectsIds: objects,
      });
    },
    [navigation],
  );

  const navigateToObjectsMap = useCallback(() => {
    if (data) {
      navigation.navigate('ObjectDetailsMap', {
        categoryId: data.category.id,
        objectId: data.id,
      });
    }
  }, [data, navigation]);

  const navigateToObjectsListDebounced = useMemo(
    () =>
      debounce(navigateToObjectsList, 300, {leading: true, trailing: false}),
    [navigateToObjectsList],
  );

  useLightStatusBar();

  const {onScroll, page, pagesAmount} = useImageSlider(
    data?.images?.length || 0,
  );

  const animatedValue = useMemo(() => new Animated.Value(0), []);
  const {top} = useSafeAreaInsets();

  const isJustOneImage = pagesAmount < 2;

  return data ? (
    <View style={styles.container}>
      {/* <View style={styles.emptyContatiner}>
        <Icon color={COLORS.boulder} name="camera" width={70} height={70} />
      </View> */}

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
            title={data.name}
            subtitle={data.address}
            coordinates={
              data.location ? [data.location.lon, data.location.lat] : undefined
            }
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
        <ImageSlider
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          images={data.images}
          onScroll={onScroll}
        />
      </Animated.View>
      <LinearGradient
        pointerEvents={'none'}
        {...gradientConfig}
        style={[styles.gradient, {height: top}]}
      />
      <PlaceDetailsImageSliderButtons
        onBackPress={onBackPress}
        objectId={data.id}
        imageHeight={IMAGE_HEIGHT}
        imageWidth={IMAGE_WIDTH}
        style={{
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, IMAGE_HEIGHT],
                outputRange: [0, -IMAGE_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      />
      <ClipboardToast {...toastProps} />
    </View>
  ) : null;
});
