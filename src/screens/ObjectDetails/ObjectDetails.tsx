/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {Text, View} from 'react-native';

import {
  DetailsPageCapture,
  ObjectDescription,
  ObjectDetailsPager,
  ObjectDetailsBottomButtons,
  ObjectDetailsCompletenessBlock,
  ObjectDetailsCompletenessSmallBlock,
} from 'molecules';
import {
  ObjectDetailsAddInfoSuccessMenu,
  ObjectIncludes,
  ObjectBelongsTo,
  ObjectDetailsShowWorkingHoursInfoMenu,
  ObjectDetailsListItemsMenu,
} from 'organisms';
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
import {LinearGradient} from 'expo-linear-gradient';
import {
  useObjectDetails,
  useObjectDetailsAnimation,
  useObjectDetailsDeepLinking,
  useVisitedObject,
  useReportInaccuracies,
  useObjectCompletnessData,
  useAddInfoSuccessMenu,
  useObjectDetailsInfo,
  useObjectDetailsAnalytics,
} from './hooks';
import {isLocationExist} from 'core/helpers';
import {ObjectDetailsHeader} from 'molecules';
import {ObjectDetailsReportInaccuraciesMenu} from 'organisms';
import {TestIDs} from 'core/types';
import Animated from 'react-native-reanimated';
import {PinchToZoomProvider} from 'atoms/ZoomableViewGlobal';
import {ObjectInfoCardItemsSection, ObjectInfoSection} from './components';

export const ObjectDetails = () => {
  const {t} = useTranslation('objectDetails');
  const {t: tCommon} = useTranslation('common');
  const styles = useThemeStyles(themeStyles);
  const {
    data,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToAddInfo,
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
    navigateToBelongsToObject,
    navigateToIncludesObjectListOrPage,
  } = useObjectDetails();

  const {loading, errorTexts, objectNotFoundErrorProps, onTryAgainPress} =
    useObjectDetailsDeepLinking();

  const {sendBookmarksAddEvent, sendBookmarksRemoveEvent} =
    useObjectDetailsAnalytics();

  const sendToggleFavoriteEvent = useCallback(
    (addingToFavorite: boolean) => {
      if (addingToFavorite) {
        sendBookmarksAddEvent();
      } else {
        sendBookmarksRemoveEvent();
      }
    },
    [sendBookmarksAddEvent, sendBookmarksRemoveEvent],
  );

  const {favoritesSynchronizing, toggleFavoriteHandler, isFavorite} =
    useFavorite({objectId, onFavoriteToggle: sendToggleFavoriteEvent});

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

  const addInfoSuccessMenuProps = useAddInfoSuccessMenu();

  const {
    mainInfoSection,
    workingHoursSection,
    workingHoursMenuProps,
    phoneNumbersMenuProps,
    areSeveralPhoneNumbers,
    phoneNumberMenuItems,
    workingHours,
    additionalDetailsSection,
    accommodationPlace,
    upcomingEvents,
    dinnerPlaces,
    onToggleDescriptionVisibility,
    onDescriptionLinkPress,
    onInfoCardRightButtonPress,
    onInfoCardLinkPress,
  } = useObjectDetailsInfo();

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
                usersRating={data.usersRating}
                googleRating={data.googleRating}
                usersRatingsTotal={data.usersRatingsTotal}
                googleRatingsTotal={data.googleRatingsTotal}
              />
              <LottieAnimation
                ref={animationRef}
                name={'Confetti'}
                width={200}
                height={200}
                containerStyle={styles.animationContainer}
              />
              <View style={styles.visitedButtonContainer}>
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
            <Text style={styles.sectionTitle}>{t('aboutThisExperience')}</Text>
            {isCompletnessBlockVisible ? (
              <ObjectDetailsCompletenessSmallBlock
                onPress={scrollToElement}
                percentage={percentage}
                testID={TestIDs.objectDetailsCompletenessBlockSmall}
              />
            ) : null}

            {mainInfoSection.length ? (
              <ObjectInfoSection items={mainInfoSection} />
            ) : null}
            {workingHoursSection.length ? (
              <ObjectInfoSection items={workingHoursSection} />
            ) : null}
            <ObjectDescription
              testID={TestIDs.ObjectDetailsDescription}
              origins={data.origins}
              description={data.description}
              onToggleDescription={onToggleDescriptionVisibility}
              onLinkPress={onDescriptionLinkPress}
            />
            <Text style={styles.sectionTitle}>{t('additionalDetails')}</Text>

            {additionalDetailsSection.length ? (
              <ObjectInfoSection items={additionalDetailsSection} />
            ) : null}
            {isCompletnessBlockVisible ? (
              <View ref={elementRef}>
                <ObjectDetailsCompletenessBlock
                  incompleteFields={incompleteFields}
                  percentage={percentage}
                  testID={TestIDs.ObjectDetailsCompletenessBlock}
                  onAddInformationPress={navigateToAddInfo}
                />
              </View>
            ) : null}

            {accommodationPlace?.length ? (
              <ObjectInfoCardItemsSection
                testID={TestIDs.ObjectDetailsAccommodationPlace}
                items={accommodationPlace}
                title={tCommon('objectFieldsLabels.accommodationPlace')}
                type="accommodation"
                onRightButtonPress={onInfoCardRightButtonPress}
                onLinkPress={onInfoCardLinkPress}
              />
            ) : null}
            {dinnerPlaces?.length ? (
              <ObjectInfoCardItemsSection
                testID={TestIDs.ObjectDetailsDinnerPlaces}
                items={dinnerPlaces}
                title={tCommon('objectFieldsLabels.dinnerPlaces')}
                type="placeToEat"
                onRightButtonPress={onInfoCardRightButtonPress}
                onLinkPress={onInfoCardLinkPress}
              />
            ) : null}

            {upcomingEvents?.length ? (
              <ObjectInfoCardItemsSection
                testID={TestIDs.ObjectDetailsUpcomingEvents}
                items={upcomingEvents}
                title={tCommon('objectFieldsLabels.upcomingEvents')}
                type="event"
                onRightButtonPress={onInfoCardRightButtonPress}
                onLinkPress={onInfoCardLinkPress}
              />
            ) : null}

            {isEmpty(data.belongsTo) ? null : (
              <ObjectBelongsTo
                title={t('belongs')}
                data={data.belongsTo}
                onBelongsToItemPress={navigateToBelongsToObject}
                testID={TestIDs.ObjectDetailsBelongsTo}
              />
            )}

            {isEmpty(data.include) ? null : (
              <ObjectIncludes
                title={t('includes')}
                data={data.include}
                onIncludePress={navigateToIncludesObjectListOrPage}
                testID={TestIDs.ObjectDetailsIncludes}
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
            pivotHeightToAnimate={IMAGE_HEIGHT}
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

          <ObjectDetailsAddInfoSuccessMenu
            addInfoSuccessMenuProps={addInfoSuccessMenuProps}
          />

          {workingHours ? (
            <ObjectDetailsShowWorkingHoursInfoMenu
              description={workingHours}
              workingHoursMenuProps={workingHoursMenuProps}
            />
          ) : null}

          {areSeveralPhoneNumbers ? (
            <ObjectDetailsListItemsMenu
              menuItems={phoneNumberMenuItems}
              menuProps={phoneNumbersMenuProps}
              testID={TestIDs.ObjectDetailsPhoneNumbersMenu}
            />
          ) : null}
        </View>
      ) : null}
    </SuspenseView>
  );
};
