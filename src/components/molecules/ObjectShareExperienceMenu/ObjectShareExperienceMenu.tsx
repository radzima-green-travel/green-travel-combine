import React, {memo, useMemo} from 'react';
import {View, Text} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {RangePickSlider} from 'atoms';
import {ListItem, Ratings} from 'molecules';
import {themeStyles} from './styles';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';

interface IProps {
  onSubmitPress: () => void;
  onSkipPress: () => void;
  rating: number;
  onRatingChange: (rating: number) => void;
  timeRange: number;
  onTimeRangeChange: (timeRange: number) => void;
  timeString: string;
  isSubmitButtonDisabled: boolean;
  isSubmitButtonLoading: boolean;
  onReportInformationPress: () => void;
  testID: string;
  isReportSent: boolean;
  isReportSending: boolean;
  onMissedDetailsPress: () => void;
}

export const ObjectShareExperienceMenu = memo(
  ({
    onSubmitPress,
    onSkipPress,
    rating,
    onRatingChange,
    timeRange,
    onTimeRangeChange,
    timeString,
    isSubmitButtonDisabled,
    isSubmitButtonLoading,
    onReportInformationPress,
    testID,
    isReportSent,
    isReportSending,
    onMissedDetailsPress,
  }: IProps) => {
    const {t} = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);

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
          onPress: onSubmitPress,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'submitButton'),
          text: t('submit'),
          loading: isSubmitButtonLoading,
          disabled: isSubmitButtonDisabled,
        },
      ];
    }, [
      testID,
      t,
      onSubmitPress,
      isSubmitButtonLoading,
      isSubmitButtonDisabled,
      onSkipPress,
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
          value={timeRange}
          containerStyle={styles.rangePicker}
          onChangeValue={onTimeRangeChange}
        />
        <ListItem
          testID={composeTestID(testID, 'reportInnacurateInfoButton')}
          containerStyle={styles.listItem}
          withNavigationIcon
          disabled={isReportSent || isReportSending}
          title={t('anyInnacurateInfo')}
          onPress={onReportInformationPress}
          label={isReportSent ? t('sent') : undefined}
        />
        <ListItem
          testID={composeTestID(testID, 'missedDetailsButton')}
          containerStyle={styles.listItem}
          withNavigationIcon
          title={t('missedDetails')}
          onPress={onMissedDetailsPress}
        />
        <ButtonsGroup
          withBottomInset
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
