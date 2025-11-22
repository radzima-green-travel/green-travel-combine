import { useMemo, useCallback } from 'react';

import {
  useBottomMenu,
  useThemeStyles,
  useTranslation,
  useObjectDetailsSelector,
} from 'core/hooks';
import { selectObjectDetails } from 'core/selectors';
import {
  msToHoursAndMinutes,
  sanitizePhoneNumber,
  tryOpenURL,
} from 'core/helpers';
import type { Item } from '../components/ObjectInfoSection/ObjectInfoSection';
import { compact, join, map } from 'lodash';
import { themeStyles } from '../styles';
import { useObjectDetailsAnalytics } from './useObjectDetailsAnalytics';
import { CardType } from '../components';

export function useObjectDetailsInfo() {
  const { t } = useTranslation('common');
  const { t: objectDetailsT } = useTranslation('objectDetails');
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

  const data = useObjectDetailsSelector(selectObjectDetails);

  const {
    url: officialWibsiteUrl,
    phoneNumbers,
    attendanceTime,
    workingHours,
    childServices: childServicesData,
    renting: rentingData,
    accommodationPlace,
    upcomingEvents,
    dinnerPlaces,
  } = data || {};

  const childServices = join(childServicesData, ', ');
  const renting = join(rentingData, ', ');

  const onWebLinkPress = useCallback((url: string | undefined) => {
    if (url) {
      tryOpenURL(url);
    }
  }, []);

  const onOfficialWebLinkPress = useCallback(() => {
    sendOfficialSiteUrlClickEvent();
    if (officialWibsiteUrl) {
      onWebLinkPress(officialWibsiteUrl);
    }
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
  const childServicesMenuProps = useBottomMenu();

  const { openMenu: openWorkingHoursMenu } = workingHoursMenuProps;
  const { openMenu: openPhoneNumbersMenu } = phoneNumbersMenuProps;
  const { openMenu: openChildServicesMenu } = childServicesMenuProps;

  const areSeveralPhoneNumbers = phoneNumbers && phoneNumbers?.length > 1;
  const amountOfPhoneNumbers = (phoneNumbers && phoneNumbers?.length) || 0;

  const getAttendaceStringTime = (() => {
    if (attendanceTime) {
      const { hours, minutes } = msToHoursAndMinutes(attendanceTime);

      let hoursString = '';
      let minutesString = '';

      if (hours) {
        if (hours === 1) {
          hoursString = objectDetailsT('time.hour', { hours });
        } else if (hours > 1 && hours < 5) {
          hoursString = objectDetailsT('time.hours', { hours });
        } else {
          hoursString = objectDetailsT('time.hoursAfter4', { hours });
        }

        hoursString += ' ';
      }

      if (minutes) {
        minutesString = objectDetailsT('time.minutes', { minutes });
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
        testID: 'ObjectDetailsOfficialWebsite',
      },
      phoneNumbers?.length && {
        subtitle: t('objectFieldsLabels.phoneNumber'),
        title: phoneNumbers[0],
        leadIcon: 'telephone',
        onSubtitlePress: () => onTelephonePress(phoneNumbers[0]),
        testID: 'ObjectDetailsPhoneNumber',
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
        testID: 'ObjectDetailsAttendanceTime',
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
        testID: 'ObjectDetailsPhoneNumber',
        containerStyle: { paddingVertical: 6 },
        titleContainerStyle: { paddingBottom: 16 },
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
        testID: 'ObjectDetailsWorkingHours',
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
      childServices && {
        title: t('objectFieldsLabels.childServices'),
        subtitle: childServices,
        subtitleNumberOfLines: 2,
        leadIcon: 'deck',
        testID: 'ObjectDetailsOfficialWebsite',
        contentStylingType: 'primary',
        boldTitle: false,
        withDropdown: true,
        onRightLabelPress: openChildServicesMenu,
        rightLabel: objectDetailsT('details'),
      },
      renting && {
        title: t('objectFieldsLabels.renting'),
        subtitle: renting,
        leadIcon: 'sportsTennis',
        testID: 'ObjectDetailsRenting',
        contentStylingType: 'primary',
        boldTitle: false,
      },
    ] as Item[]);
  }, [childServices, objectDetailsT, openChildServicesMenu, renting, t]);

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
    childServicesMenuProps,
    childServices,
    accommodationPlace,
    upcomingEvents,
    dinnerPlaces,
    onToggleDescriptionVisibility,
    onDescriptionLinkPress,
    onInfoCardRightButtonPress,
    onInfoCardLinkPress,
  };
}
