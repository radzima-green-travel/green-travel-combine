/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text, View} from 'react-native';

import {
  DetailsPageCapture,
  ObjectDescription,
  ObjectDescriptionSource,
  ObjectDetailsPager,
  ObjectDetailsBottomButtons,
  ObjectDetailsCompletenessBlock,
  ObjectDetailsCompletenessSmallBlock,
} from 'molecules';
import {ObjectIncludes} from 'organisms';
import {
  ImageSlider,
  SnackBar,
  SuspenseView,
  Button,
  Icon,
  LottieAnimation,
} from 'atoms';
import {useFavorite, useThemeStyles, useTranslation} from 'core/hooks';
import {isEmpty} from 'lodash';
import {themeStyles, IMAGE_HEIGHT, IMAGE_WIDTH, gradientConfig} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  useObjectDetails,
  useObjectDetailsAnimation,
  useObjectDetailsDeepLinking,
  useVisitedObject,
  useReportInaccuracies,
  useObjectCompletnessData,
} from './hooks';
import {isLocationExist} from 'core/helpers';
import {ObjectDetailsHeader} from 'molecules';
import {ObjectDetailsReportInaccuraciesMenu} from 'organisms';
import {TestIDs} from 'core/types';
import Animated from 'react-native-reanimated';
import {PinchToZoomProvider} from 'atoms/ZoomableViewGlobal';

export const ObjectDetails = () => {
  const {t} = useTranslation('objectDetails');
  const styles = useThemeStyles(themeStyles);
  const {
    data,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToObjectsListDebounced,
    snackBarProps,
    objectId,
    isJustOneImage,
    defaultPhoto,
    onScroll,
    top,
    pagesAmount,
    page,
    goToImageGallery,
    shareObjectLink,
  } = useObjectDetails();

  const {loading, errorTexts, objectNotFoundErrorProps, onTryAgainPress} =
    useObjectDetailsDeepLinking();

  const {favoritesSynchronizing, toggleFavoriteHandler, isFavorite} =
    useFavorite({objectId});

  const {
    isVisited,
    markAsVisited,
    visitedObjectLoading,
    animationRef,
    onButtonLabelLayout,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
  } = useVisitedObject({
    objectId,
  });

  const {scrollHandler, imageSliderContainerAnimatedStyle, translationY} =
    useObjectDetailsAnimation({
      imageHeight: IMAGE_HEIGHT,
      onScrollEndReached: sendScrollEvent,
    });

  const {openInnacurateInfoMenu, ...reportInaccuraciesMenuProps} =
    useReportInaccuracies({
      objectId,
      objectName: data?.name || '',
    });

  const {
    incompleteFields,
    percentage,
    scrollRef,
    elementRef,
    scrollToElement,
    isCompletnessBlockVisible,
  } = useObjectCompletnessData({objectId});

  const locationExist = Boolean(data && isLocationExist(data));

  return (
    <SuspenseView
      retryCallback={onTryAgainPress}
      loading={loading}
      error={errorTexts}
      {...objectNotFoundErrorProps}>
      {data ? (
        <View style={styles.container}>
          <Animated.ScrollView
            scrollEventThrottle={16}
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            contentContainerStyle={styles.listContentContainer}>
            <View style={[styles.contentContainer]}>
              <DetailsPageCapture
                routeLength={data.length}
                title={data.name}
                subtitle={data.address}
                coordinates={
                  locationExist
                    ? [data.location!.lon!, data.location!.lat!]
                    : undefined
                }
                onCoordinatesPress={copyLocationToClipboard}
              />
              <LottieAnimation
                ref={animationRef}
                name={'Confetti'}
                width={200}
                height={200}
                containerStyle={styles.animationContainer}
              />
              <View style={styles.vistedButtonContainer}>
                <Button
                  testID={TestIDs.MarkAsVisitedButton}
                  icon={textStyle =>
                    isVisited ? (
                      <Icon style={textStyle} name={'check'} />
                    ) : (
                      <></>
                    )
                  }
                  onPress={markAsVisited}
                  text={isVisited ? t('visitedObject') : t('markAsVisited')}
                  theme={'secondary'}
                  textStyle={styles.visitedButtonText}
                  loading={visitedObjectLoading}
                  onButtonLabelLayout={onButtonLabelLayout}
                  iconContainerAnimatedStyle={
                    isVisited && iconContainerAnimatedStyle
                  }
                  labelAnimatedStyle={isVisited && labelAnimatedStyle}
                />
              </View>
            </View>
            <Text style={styles.sectionTitle}>About this experience</Text>

            {isCompletnessBlockVisible ? (
              <ObjectDetailsCompletenessSmallBlock
                onPress={scrollToElement}
                percentage={percentage}
                testID={TestIDs.objectDetailsCompletenessBlockSmall}
              />
            ) : null}
            <ObjectDescription description={data.description} />
            <Text style={styles.sectionTitle}>Additional details</Text>
            {isCompletnessBlockVisible ? (
              <View ref={elementRef}>
                <ObjectDetailsCompletenessBlock
                  incompleteFields={incompleteFields}
                  percentage={percentage}
                  testID={TestIDs.ObjectDetailsCompletenessBlock}
                  onAddInformationPress={() => {}}
                />
              </View>
            ) : null}

            {(data.origins && data.origins.length) || data.url ? (
              <ObjectDescriptionSource
                origins={data.origins}
                siteLink={data.url}
              />
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

            <Button
              style={styles.reportInaccuraciesButton}
              onPress={openInnacurateInfoMenu}
              icon={textStyle => <Icon style={textStyle} name="mail" />}
              theme="tertiary"
              text={t('reportInaccuracies')}
              testID={TestIDs.ObjectDetailsReportInaccuraciesButton}
            />
          </Animated.ScrollView>

          <Animated.View
            style={[
              styles.imageSliderContainer,
              imageSliderContainerAnimatedStyle,
            ]}>
            <PinchToZoomProvider scrollYOffsetAnimatedValue={translationY}>
              <ImageSlider
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                images={data.images || [defaultPhoto]}
                onScroll={onScroll}
                imageTestID={TestIDs.ObjectDetailsImage}
                activePage={page}
                onImagePress={goToImageGallery}
              />
            </PinchToZoomProvider>

            {isJustOneImage ? null : (
              <ObjectDetailsPager pagesAmount={pagesAmount} page={page} />
            )}
          </Animated.View>
          <LinearGradient
            pointerEvents={'none'}
            {...gradientConfig}
            style={[styles.gradient, {height: top}]}
          />
          <SnackBar offset={80} {...snackBarProps} />
          <ObjectDetailsHeader
            animatedValue={translationY}
            objectName={data.name}
            pivotHegightToAnimate={IMAGE_HEIGHT}
          />
          <ObjectDetailsBottomButtons
            onBookmarkPress={toggleFavoriteHandler}
            onSharePress={shareObjectLink}
            onShowOnMapPress={navigateToObjectsMap}
            isFavorite={Boolean(isFavorite)}
            isFavoriteLoading={favoritesSynchronizing}
            showOnMapButtonEnabled={locationExist}
          />

          <ObjectDetailsReportInaccuraciesMenu
            {...reportInaccuraciesMenuProps}
          />
        </View>
      ) : null}
    </SuspenseView>
  );
};
