import {SupportedLocales} from 'core/types';

export function msToHoursAndMinutes(ms: number) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return {hours, minutes};
}

export function isDateInThePast(date: string) {
  return new Date(date) < new Date();
}

export function dateToReadableString(
  dateString: string,
  locale: SupportedLocales,
) {
  const date = new Date(dateString);

  let dayAndMonthName = date
    .toLocaleString(locale, {month: 'long', day: '2-digit'})
    .toLowerCase();

  if (locale === 'en') {
    const [monthName, day] = dayAndMonthName.split(' ');
    dayAndMonthName = `${day} ${monthName}`;
  }

  return dayAndMonthName;
}

export function getPartOfTheDay():
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night' {
  const date = new Date();
  const hours = date.getHours();

  if (hours > 5 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 17) {
    return 'afternoon';
  } else if (hours >= 17 && hours < 21) {
    return 'evening';
  }

  return 'night';
}
