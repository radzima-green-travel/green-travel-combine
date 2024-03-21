import {useMemo, useCallback} from 'react';

import {useBottomMenu, useObject, useTranslation} from 'core/hooks';
import {ObjectDetailsScreenRouteProps} from '../types';
import {useRoute} from '@react-navigation/native';

import {msToHoursAndMinutes, tryOpenURL} from 'core/helpers';
import type {Item} from '../components/ObjectInfoSection/ObjectInfoSection';
import {compact} from 'lodash';
import {TestIDs} from 'core/types';

export function useObjectDetailsInfo() {
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();
  const {t} = useTranslation('common');
  const {t: objectDetailsT} = useTranslation('objectDetails');

  const data = useObject(objectId);

  const {
    url: officialWibsiteUrl,
    phoneNumber,
    attendanceTime,
    workingHours,
    childServices,
    renting,
  } = data || {};

  const onWebLinkPress = useCallback((url: string | undefined) => {
    if (url) {
      tryOpenURL(url);
    }
  }, []);

  const onOfficialWebLinkPress = useCallback(() => {
    onWebLinkPress(officialWibsiteUrl);
  }, [onWebLinkPress, officialWibsiteUrl]);

  const onTelephonePress = useCallback(() => {
    if (phoneNumber) {
      tryOpenURL(`tel:${phoneNumber}`);
    }
  }, [phoneNumber]);

  const workingHoursMenuProps = useBottomMenu();

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
        icon: 'globe',
        testID: TestIDs.ObjectDetailsOfficialWebsite,
      },
      getAttendaceStringTime && {
        subtitle: t('objectFieldsLabels.attendanceTime'),
        title: getAttendaceStringTime,
        icon: 'hourglass',
        testID: TestIDs.ObjectDetailsAttendanceTime,
      },
      phoneNumber && {
        subtitle: t('objectFieldsLabels.phoneNumber'),
        title: phoneNumber,
        icon: 'telephone',
        onSubtitlePress: onTelephonePress,
        testID: TestIDs.ObjectDetailsPhoneNumber,
      },
    ] as Item[]);
  }, [
    getAttendaceStringTime,
    officialWibsiteUrl,
    onOfficialWebLinkPress,
    onTelephonePress,
    phoneNumber,
    t,
  ]);

  const {openMenu} = workingHoursMenuProps;

  const workingHoursSection = useMemo(() => {
    return compact([
      workingHours && {
        subtitle: t('objectFieldsLabels.workingHours'),
        title: workingHours,
        onPress: openMenu,
        icon: 'globe',
        titleNumberOfLines: 2,
        testID: TestIDs.ObjectDetailsWorkingHours,
        withDropdown: true,
      },
    ] as Item[]);
  }, [workingHours, t, openMenu]);

  const additionalDetailsSection = useMemo(() => {
    return compact([
      childServices?.length && {
        title: t('objectFieldsLabels.childServices'),
        subtitle: childServices.join(', '),
        icon: 'deck',
        testID: TestIDs.ObjectDetailsOfficialWebsite,
        contentStylingType: 'primary',
        boldTitle: false,
      },
      renting?.length && {
        title: t('objectFieldsLabels.renting'),
        subtitle: renting.join(', '),
        icon: 'sportsTennis',
        testID: TestIDs.ObjectDetailsRenting,
        contentStylingType: 'primary',
        boldTitle: false,
      },
    ] as Item[]);
  }, [t, renting, childServices]);

  return {
    mainInfoSection,
    workingHoursSection,
    workingHoursMenuProps,
    workingHours,
    additionalDetailsSection,
  };
}
