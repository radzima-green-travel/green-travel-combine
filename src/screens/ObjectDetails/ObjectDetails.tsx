import React, {useCallback} from 'react';
import {Text, View} from 'react-native';

import {
  DetailsPageCapture,
  ObjectDescription,
  ObjectDetailsPager,
  ObjectDetailsBottomButtons,
  ObjectDetailsCompletenessBlock,
  ObjectDetailsCompletenessSmallBlock,
  SuspenseView,
} from 'molecules';
import {
  ObjectDetailsAddInfoSuccessMenu,
  ObjectIncludes,
  ObjectBelongsTo,
  ObjectDetailsShowInfoMenu,
  ObjectDetailsListItemsMenu,
} from 'organisms';
import {ImageSlider, SnackBar, Button, Icon, LottieAnimation} from 'atoms';
import {useFavorite, useThemeStyles, useTranslation} from 'core/hooks';
import {isEmpty} from 'lodash';
import {themeStyles, IMAGE_HEIGHT, IMAGE_WIDTH, gradientConfig} from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import {
  useObjectDetails,
  useObjectDetailsAnimation,
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
import Animated, {FadeInDown} from 'react-native-reanimated';
import {PinchToZoomProvider} from 'atoms/ZoomableViewGlobal';
import {ObjectInfoCardItemsSection, ObjectInfoSection} from './components';

export const ObjectDetails = () => {
  const {t} = useTranslation('objectDetails');
  const {t: tCommon} = useTranslation('common');
  const styles = useThemeStyles(themeStyles);
  const {
    data,
    loading,
    errorTexts,
    onTryAgainPress,
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
    objectCoverImageUrl,

    objcetCoverBlurhash,
  } = useObjectDetails();

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
  } = useObjectCompletnessData();

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
    childServicesMenuProps,
    childServices,
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
      testID="suspenseView"
      error={errorTexts}
      retryCallback={onTryAgainPress}>
      <Animated.View style={styles.container}>
        {data ? (
          <Animated.ScrollView
            scrollEventThrottle={16}
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            contentContainerStyle={styles.listContentContainer}>
            <Animated.View
              entering={FadeInDown}
              style={[styles.contentContainer]}>
              <DetailsPageCapture
                testID="pageCapture"
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
                  testID={'markAsVisitedButton'}
                  renderIcon={textStyle =>
                    isVisited ? (
                      <Icon style={textStyle} name={'check'} />
                    ) : (
                      <></>
                    )
                  }
                  onPress={markAsVisited}
                  text={isVisited ? t('visitedObject') : t('markAsVisited')}
                  theme={'secondary'}
                  style={styles.visitedButton}
                  textStyle={styles.visitedButtonText}
                  loading={visitedObjectLoading}
                  onButtonLabelLayout={onButtonLabelLayout}
                  iconContainerAnimatedStyle={
                    isVisited && iconContainerAnimatedStyle
                  }
                  labelAnimatedStyle={isVisited && labelAnimatedStyle}
                />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200)}>
              <Text style={styles.sectionTitle}>
                {t('aboutThisExperience')}
              </Text>
              {isCompletnessBlockVisible ? (
                <ObjectDetailsCompletenessSmallBlock
                  onPress={scrollToElement}
                  percentage={percentage}
                  testID={'completenessBlockSmall'}
                />
              ) : null}

              {mainInfoSection.length ? (
                <ObjectInfoSection items={mainInfoSection} />
              ) : null}
              {workingHoursSection.length ? (
                <ObjectInfoSection items={workingHoursSection} />
              ) : null}
              <ObjectDescription
                testID={'description'}
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
                    testID={'completenessBlock'}
                    onAddInformationPress={navigateToAddInfo}
                  />
                </View>
              ) : null}

              {accommodationPlace?.length ? (
                <ObjectInfoCardItemsSection
                  testID={'accommodationPlace'}
                  items={accommodationPlace}
                  title={tCommon('objectFieldsLabels.accommodationPlace')}
                  type="accommodation"
                  onRightButtonPress={onInfoCardRightButtonPress}
                  onLinkPress={onInfoCardLinkPress}
                />
              ) : null}
              {dinnerPlaces?.length ? (
                <ObjectInfoCardItemsSection
                  testID={'dinnerPlaces'}
                  items={dinnerPlaces}
                  title={tCommon('objectFieldsLabels.dinnerPlaces')}
                  type="placeToEat"
                  onRightButtonPress={onInfoCardRightButtonPress}
                  onLinkPress={onInfoCardLinkPress}
                />
              ) : null}

              {upcomingEvents?.length ? (
                <ObjectInfoCardItemsSection
                  testID={'upcomingEvents'}
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
                  testID={'belongsTo'}
                />
              )}

              {isEmpty(data.include) ? null : (
                <ObjectIncludes
                  title={t('includes')}
                  data={data.include}
                  onIncludePress={navigateToIncludesObjectListOrPage}
                  testID={'includes'}
                />
              )}

              <Button
                style={styles.reportInaccuraciesButton}
                onPress={openInnacurateInfoMenu}
                renderIcon={textStyle => <Icon style={textStyle} name="mail" />}
                theme="tertiary"
                text={t('reportInaccuracies')}
                testID={'reportInaccuraciesButton'}
              />
            </Animated.View>
          </Animated.ScrollView>
        ) : null}

        {loading ? (
          <View style={styles.loader}>
            <SuspenseView
              testID="loadingSupsenseView"
              loading={true}
              loadingDelay={1000}
            />
          </View>
        ) : null}

        <Animated.View
          style={[
            styles.imageSliderContainer,
            imageSliderContainerAnimatedStyle,
          ]}>
          <PinchToZoomProvider scrollYOffsetAnimatedValue={translationY}>
            <ImageSlider
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              images={
                data?.images ||
                (objectCoverImageUrl ? [objectCoverImageUrl] : [defaultPhoto])
              }
              onScroll={onScroll}
              testID="imageSlider"
              activePage={page}
              previewImageBlurhash={objcetCoverBlurhash}
              onImagePress={goToImageGallery}
            />
          </PinchToZoomProvider>

          {isJustOneImage ? null : (
            <ObjectDetailsPager
              testID="imagePager"
              pagesAmount={pagesAmount}
              page={page}
            />
          )}
        </Animated.View>

        <LinearGradient
          pointerEvents={'none'}
          {...gradientConfig}
          style={[styles.gradient, {height: top}]}
        />
        <SnackBar testID={'snackBar'} offset={80} {...snackBarProps} />
        <ObjectDetailsHeader
          testID="header"
          animatedValue={translationY}
          objectName={data?.name || ''}
          pivotHeightToAnimate={IMAGE_HEIGHT}
        />
        {/* <Animated.View entering={FadeInDown.delay(250)}> */}
        <ObjectDetailsBottomButtons
          testID="bottomButtons"
          onBookmarkPress={toggleFavoriteHandler}
          onSharePress={shareObjectLink}
          onShowOnMapPress={navigateToObjectsMap}
          isFavorite={Boolean(isFavorite)}
          isFavoriteLoading={favoritesSynchronizing}
          showOnMapButtonEnabled={locationExist}
        />
        {/* </Animated.View> */}

        <ObjectDetailsReportInaccuraciesMenu
          testID="reportInaccuraciesMenu"
          {...reportInaccuraciesMenuProps}
        />

        <ObjectDetailsAddInfoSuccessMenu
          testID="addInfoSuccessMenu"
          addInfoSuccessMenuProps={addInfoSuccessMenuProps}
        />

        {workingHours ? (
          <ObjectDetailsShowInfoMenu
            testID="workingHoursMenu"
            title={t('workHours')}
            description={workingHours}
            menuProps={workingHoursMenuProps}
          />
        ) : null}

        {areSeveralPhoneNumbers ? (
          <ObjectDetailsListItemsMenu
            menuItems={phoneNumberMenuItems}
            menuProps={phoneNumbersMenuProps}
            testID={'phoneNumbersMenu'}
          />
        ) : null}

        {childServices ? (
          <ObjectDetailsShowInfoMenu
            testID="childServicesMenu"
            title={tCommon('objectFieldsLabels.childServices')}
            description={childServices}
            menuProps={childServicesMenuProps}
          />
        ) : null}
      </Animated.View>
    </SuspenseView>
  );
};
