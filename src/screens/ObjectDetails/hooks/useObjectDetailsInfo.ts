import {useMemo, useCallback} from 'react';

import {
  useBottomMenu,
  useObject,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import {ObjectDetailsScreenRouteProps} from '../types';
import {useRoute} from '@react-navigation/native';

import {
  msToHoursAndMinutes,
  sanitizePhoneNumber,
  tryOpenURL,
} from 'core/helpers';
import type {Item} from '../components/ObjectInfoSection/ObjectInfoSection';
import {compact, map} from 'lodash';
import {TestIDs} from 'core/types';
import {themeStyles} from '../styles';
import {useObjectDetailsAnalytics} from './useObjectDetailsAnalytics';
import {CardType} from '../components';

export function useObjectDetailsInfo() {
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();
  const {t} = useTranslation('common');
  const {t: objectDetailsT} = useTranslation('objectDetails');
  const styles = useThemeStyles(themeStyles);
  const {
    sendOfficialSiteUrlClickEvent,
    sendMorePhonesViewEvent,
    sendFullWorkHoursViewEvent,
    sendDescriptionShowLessClickEvent,
    sendDescriptionShowMoreClickEvent,
    sendDescriptionLicksClickEvent,
    sendSleepPlaceMapViewEvent,
    sendSleepPlaceSiteNavigateEvent,
    sendEatPlaceMapViewEvent,
    sendEatPlaceSiteNavigateEvent,
    sendUpcomingEventSiteNavigateEvent,
  } = useObjectDetailsAnalytics();

  const data = useObject(objectId);

  const {
    url: officialWibsiteUrl,
    phoneNumbers,
    attendanceTime,
    workingHours,
    childServices,
    renting,
    accommodationPlace,
    upcomingEvents,
    dinnerPlaces,
  } = data || {};

  const onWebLinkPress = useCallback((url: string | undefined) => {
    if (url) {
      tryOpenURL(url);
    }
  }, []);

  const onOfficialWebLinkPress = useCallback(() => {
    sendOfficialSiteUrlClickEvent();
    onWebLinkPress(officialWibsiteUrl);
  }, [onWebLinkPress, officialWibsiteUrl, sendOfficialSiteUrlClickEvent]);

  const onToggleDescriptionVisibility = useCallback(
    isExpanded => {
      if (isExpanded) {
        sendDescriptionShowMoreClickEvent();
      } else {
        sendDescriptionShowLessClickEvent();
      }
    },
    [sendDescriptionShowLessClickEvent, sendDescriptionShowMoreClickEvent],
  );

  const onTelephonePress = useCallback((phoneNumber: string) => {
    if (phoneNumber) {
      tryOpenURL(`tel:${sanitizePhoneNumber(phoneNumber)}`);
    }
  }, []);

  const onDescriptionLinkPress = useCallback(
    (url: string) => {
      sendDescriptionLicksClickEvent(url);
      tryOpenURL(url);
    },
    [sendDescriptionLicksClickEvent],
  );

  const workingHoursMenuProps = useBottomMenu();
  const phoneNumbersMenuProps = useBottomMenu();

  const {openMenu: openWorkingHoursMenu} = workingHoursMenuProps;
  const {openMenu: openPhoneNumbersMenu} = phoneNumbersMenuProps;

  const areSeveralPhoneNumbers = phoneNumbers && phoneNumbers?.length > 1;
  const amountOfPhoneNumbers = (phoneNumbers && phoneNumbers?.length) || 0;

  const getAttendaceStringTime = (() => {
    if (attendanceTime) {
      const {hours, minutes} = msToHoursAndMinutes(attendanceTime);

      let hoursString = '';
      let minutesString = '';

      if (hours) {
        if (hours === 1) {
          hoursString = objectDetailsT('time.hour', {hours});
        } else if (hours > 1 && hours < 5) {
          hoursString = objectDetailsT('time.hours', {hours});
        } else {
          hoursString = objectDetailsT('time.hoursAfter4', {hours});
        }

        hoursString += ' ';
      }

      if (minutes) {
        minutesString = objectDetailsT('time.minutes', {minutes});
      }

      return `${hoursString}${minutesString}`;
    }

    return null;
  })();

  const mainInfoSection = useMemo(() => {
    return compact([
      officialWibsiteUrl && {
        subtitle: t('objectFieldsLabels.url'),
        title: officialWibsiteUrl,
        onSubtitlePress: onOfficialWebLinkPress,
        leadIcon: 'globe',
        testID: TestIDs.ObjectDetailsOfficialWebsite,
      },
      phoneNumbers?.length && {
        subtitle: t('objectFieldsLabels.phoneNumber'),
        title: phoneNumbers[0],
        leadIcon: 'telephone',
        onSubtitlePress: () => onTelephonePress(phoneNumbers[0]),
        testID: TestIDs.ObjectDetailsPhoneNumber,
        rightLabel: t('objectFieldsLabels.phoneNumberMore', {
          amount: amountOfPhoneNumbers - 1,
        }),
        withDropdown: areSeveralPhoneNumbers,
        hideRightLabelIfTitleTruncated: true,
        onRightLabelPress: () => {
          openPhoneNumbersMenu();
          sendMorePhonesViewEvent();
        },
      },
      getAttendaceStringTime && {
        subtitle: t('objectFieldsLabels.attendanceTime'),
        title: getAttendaceStringTime,
        leadIcon: 'hourglass',
        testID: TestIDs.ObjectDetailsAttendanceTime,
      },
    ] as Item[]);
  }, [
    officialWibsiteUrl,
    t,
    onOfficialWebLinkPress,
    getAttendaceStringTime,
    phoneNumbers,
    amountOfPhoneNumbers,
    areSeveralPhoneNumbers,
    onTelephonePress,
    openPhoneNumbersMenu,
    sendMorePhonesViewEvent,
  ]);

  const phoneNumberMenuItems = useMemo(() => {
    return map(phoneNumbers, (phone, index) => {
      return {
        title: phone,
        leadIcon: 'telephone',
        onSubtitlePress: () => onTelephonePress(phone),
        testID: TestIDs.ObjectDetailsPhoneNumber,
        containerStyle: {paddingVertical: 6},
        titleContainerStyle: {paddingBottom: 16},
        leadIconStyle: styles.listItemIcon,
        position: index === amountOfPhoneNumbers - 1 ? 'bottom' : 'middle',
      } as Item;
    });
  }, [
    onTelephonePress,
    phoneNumbers,
    styles.listItemIcon,
    amountOfPhoneNumbers,
  ]);

  const workingHoursSection = useMemo(() => {
    return compact([
      workingHours && {
        subtitle: t('objectFieldsLabels.workingHours'),
        title: workingHours,
        onPress: () => {
          sendFullWorkHoursViewEvent();
          openWorkingHoursMenu();
        },
        leadIcon: 'globe',
        titleNumberOfLines: 2,
        testID: TestIDs.ObjectDetailsWorkingHours,
        withDropdown: true,
        rightLabel: objectDetailsT('details'),
      },
    ] as Item[]);
  }, [
    workingHours,
    t,
    objectDetailsT,
    sendFullWorkHoursViewEvent,
    openWorkingHoursMenu,
  ]);

  const additionalDetailsSection = useMemo(() => {
    return compact([
      childServices?.length && {
        title: t('objectFieldsLabels.childServices'),
        subtitle: childServices.join(', '),
        leadIcon: 'deck',
        testID: TestIDs.ObjectDetailsOfficialWebsite,
        contentStylingType: 'primary',
        boldTitle: false,
      },
      renting?.length && {
        title: t('objectFieldsLabels.renting'),
        subtitle: renting.join(', '),
        leadIcon: 'sportsTennis',
        testID: TestIDs.ObjectDetailsRenting,
        contentStylingType: 'primary',
        boldTitle: false,
      },
    ] as Item[]);
  }, [t, renting, childServices]);

  const onInfoCardRightButtonPress = useCallback(
    (link: string, type: CardType) => {
      switch (type) {
        case 'accommodation':
          sendSleepPlaceMapViewEvent();
          break;
        case 'placeToEat':
          sendEatPlaceMapViewEvent();
          break;
      }
      tryOpenURL(link);
    },
    [sendEatPlaceMapViewEvent, sendSleepPlaceMapViewEvent],
  );

  const onInfoCardLinkPress = useCallback(
    (url: string, type: CardType) => {
      switch (type) {
        case 'accommodation':
          sendSleepPlaceSiteNavigateEvent();
          break;
        case 'placeToEat':
          sendEatPlaceSiteNavigateEvent();
          break;
        case 'event':
          sendUpcomingEventSiteNavigateEvent();
          break;
      }
      tryOpenURL(url);
    },
    [
      sendEatPlaceSiteNavigateEvent,
      sendSleepPlaceSiteNavigateEvent,
      sendUpcomingEventSiteNavigateEvent,
    ],
  );

  return {
    mainInfoSection,
    workingHoursSection,
    workingHoursMenuProps,
    phoneNumbersMenuProps,
    phoneNumberMenuItems,
    workingHours,
    areSeveralPhoneNumbers,
    additionalDetailsSection,
    accommodationPlace,
    upcomingEvents,
    dinnerPlaces,
    onToggleDescriptionVisibility,
    onDescriptionLinkPress,
    onInfoCardRightButtonPress,
    onInfoCardLinkPress,
  };
}
