import React, {memo, useState} from 'react';
import {View, Text} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {RangePickSlider} from 'atoms';
import {Ratings} from 'molecules';
import {themeStyles} from './styles';
import {useUpdateEffect} from 'react-redux-help-kit';

interface IProps {
  onTimeSpentChange: (hours: number, minutes: number) => void;
}

export const MarkAsVisitedBottomMenu = memo(({onTimeSpentChange}: IProps) => {
  const {t} = useTranslation('objectDetails');
  const styles = useThemeStyles(themeStyles);
  const [rating, setRating] = useState(0);
  const [range, setRange] = useState(0);

  const hours = Math.floor(range);
  const minutes = Math.ceil((range - hours) * 60);

  useUpdateEffect(() => {
    onTimeSpentChange(hours, minutes);
  }, [hours, minutes]);

  const onTimeSpentChangeHanlder = (value: number) => {
    setRange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.rateTitle}>{t('markAsVisitedMenuRatingTitle')}</Text>
      <View style={styles.rateContainer}>
        <Ratings rating={rating} onChange={setRating} />
      </View>
      <Text style={styles.timeSpentTitle}>
        {t('markAsVisitedMenuTimeSpentTitle')}
      </Text>

      <View style={styles.timeSpentContainer}>
        <Text style={[styles.timeText, styles.time]}>{hours}</Text>
        <Text style={styles.timeText}>h</Text>
        <Text style={[styles.timeText, styles.time]}>{minutes}</Text>
        <Text style={styles.timeText}>mins</Text>
      </View>

      <RangePickSlider
        minValue={0}
        maxValue={12}
        steps={72}
        markSteps={12}
        value={range}
        onChangeValue={onTimeSpentChangeHanlder}
      />
    </View>
  );
});
