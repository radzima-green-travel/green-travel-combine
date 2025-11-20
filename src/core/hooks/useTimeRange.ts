import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { hapticFeedbackService } from 'services/HapticFeedbackService';
import { useUpdateEffect } from 'react-redux-help-kit';

export function useTimeRange(range: number) {
  const { t } = useTranslation('common');
  const hours = Math.floor(range);
  const minutes = Math.ceil((range - hours) * 60);
  const timeString = `${hours} ${t('hours')} ${minutes} ${t('minutes')}`;
  const startTime = useRef(Date.now());

  const onTimeChange = useCallback(() => {
    const currentTime = Date.now();
    const timeGap = currentTime - startTime.current;

    if (minutes % 30 === 0 || timeGap > 50) {
      hapticFeedbackService.select();
    }

    startTime.current = Date.now();
  }, [minutes]);

  useUpdateEffect(() => {
    onTimeChange();
  }, [minutes, hours, onTimeChange]);

  return { timeString, hours, minutes };
}
