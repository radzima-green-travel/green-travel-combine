import {SupportedLocales} from 'core/types';

export function msToHoursAndMinutes(ms: number) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return {hours, minutes};
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

  const time = date.toLocaleString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dayAndMonthName} ${time}`;
}
