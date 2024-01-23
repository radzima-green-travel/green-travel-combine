import React, {memo, useCallback, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {RangePickSlider} from 'atoms';
import {ListItem, Ratings} from 'molecules';
import {themeStyles} from './styles';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';
import {useUpdateEffect} from 'react-redux-help-kit';

interface IProps {
  onSubmitPress: (data: {
    rating: number;
    hours: number;
    minutes: number;
  }) => void;
  onSkipPress: () => void;
  rating: number;
  onRatingChange: (rating: number) => void;
  isSubmitButtonLoading: boolean;
  onReportInformationPress: () => void;
  testID: string;
  isReportSent: boolean;
  isReportSending: boolean;
  onMissedDetailsPress?: () => void;
  onTimeChange: (hours: number, minutes: number) => void;
}

export const ObjectShareExperienceMenu = memo(
  ({
    onSubmitPress,
    onSkipPress,
    rating,
    onRatingChange,
    isSubmitButtonLoading,
    onReportInformationPress,
    testID,
    isReportSent,
    isReportSending,
    onTimeChange,
  }: IProps) => {
    const {t} = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);
    const [range, setRange] = useState(0);

    const hours = Math.floor(range);
    const minutes = Math.ceil((range - hours) * 60);

    const timeString = `${hours} ${t('hours')} ${minutes} ${t('minutes')}`;

    useUpdateEffect(() => {
      onTimeChange(hours, minutes);
    }, [minutes, hours, onTimeChange]);

    const onSubmitPressHandler = useCallback(() => {
      onSubmitPress({minutes, hours, rating});
    }, [hours, minutes, onSubmitPress, rating]);

    const isSubmitButtonDisabled = !rating && !range;

    const buttons = useMemo(() => {
      return [
        {
          onPress: onSkipPress,
          theme: 'secondary' as const,
          testID: composeTestID(testID, 'skipButton'),
          text: t('skip'),
          disabled: false,
        },
        {
          onPress: onSubmitPressHandler,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'submitButton'),
          text: t('submit'),
          loading: isSubmitButtonLoading,
          disabled: isSubmitButtonDisabled,
        },
      ];
    }, [
      onSkipPress,
      testID,
      t,
      onSubmitPressHandler,
      isSubmitButtonLoading,
      isSubmitButtonDisabled,
    ]);

    return (
      <View style={styles.container}>
        <Text style={styles.rateTitle}>
          {t('markAsVisitedMenuRatingTitle')}
        </Text>
        <View style={styles.rateContainer}>
          <Ratings rating={rating} onChange={onRatingChange} />
        </View>
        <Text style={styles.timeSpentTitle}>
          {t('markAsVisitedMenuTimeSpentTitle')}
        </Text>

        <Text style={styles.timeText}>{timeString}</Text>

        <RangePickSlider
          minValue={0}
          maxValue={12}
          steps={72}
          markSteps={12}
          value={range}
          containerStyle={styles.rangePicker}
          onChangeValue={setRange}
        />
        <ListItem
          testID={composeTestID(testID, 'reportInnacurateInfoButton')}
          containerStyle={styles.listItem}
          withNavigationIcon={!isReportSent}
          disabled={isReportSent || isReportSending}
          title={t('anyInnacurateInfo')}
          onPress={onReportInformationPress}
          label={isReportSent ? t('sent') : undefined}
        />
        {/* <ListItem
          testID={composeTestID(testID, 'missedDetailsButton')}
          containerStyle={styles.listItem}
          withNavigationIcon
          title={t('missedDetails')}
          onPress={onMissedDetailsPress}
        /> */}
        <ButtonsGroup
          withBottomInset
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
