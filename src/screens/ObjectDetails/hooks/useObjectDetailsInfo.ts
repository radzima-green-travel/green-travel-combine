import {useMemo, useCallback} from 'react';

import {useObject, useTranslation} from 'core/hooks';
import {ObjectDetailsScreenRouteProps} from '../types';
import {useRoute} from '@react-navigation/native';

import {msToHoursAndMinutes, tryOpenURL} from 'core/helpers';
import type {Item} from '../components/ObjectInfoSection/ObjectInfoSection';
import {compact} from 'lodash';

export function useObjectDetailsInfo() {
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();
  const {t} = useTranslation('common');
  const {t: objectDetailsT} = useTranslation('objectDetails');

  const data = useObject(objectId);

  const {url: officialWibsiteUrl, phoneNumber, attendanceTime} = data || {};

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

  const mainInfoSections = useMemo(() => {
    return compact([
      officialWibsiteUrl && {
        subtitle: t('objectFieldsLabels.url'),
        title: officialWibsiteUrl,
        onSubtitlePress: onOfficialWebLinkPress,
        icon: 'globe',
      },
      getAttendaceStringTime && {
        subtitle: t('objectFieldsLabels.attendanceTime'),
        title: getAttendaceStringTime,
        icon: 'hourglass',
      },
      phoneNumber && {
        subtitle: t('objectFieldsLabels.phoneNumber'),
        title: phoneNumber,
        icon: 'telephone',
        onSubtitlePress: onTelephonePress,
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

  return {
    mainInfoSections,
  };
}
