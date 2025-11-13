import React from 'react';
import { CustomSlider } from 'atoms';
import { Text, View } from 'react-native';
import { themeStyles } from './styles';
import { useThemeStyles, useTimeRange } from 'core/hooks';
import { composeTestID } from 'core/helpers';

interface Props {
  prompt: string;
  onChange: (value: number) => void;
  value: number;
  testID: string;
}

export const TimePicker = ({ prompt, onChange, value, testID }: Props) => {
  const { timeString } = useTimeRange(value);
  const styles = useThemeStyles(themeStyles);

  return (
    <View testID={composeTestID(testID, 'timePicker')} style={styles.container}>
      {!!prompt && <Text style={styles.prompt}>{prompt}</Text>}
      <Text style={styles.timeText}>{timeString}</Text>
      <CustomSlider
        type="withMarks"
        markSteps={12}
        minValue={0}
        maxValue={12}
        steps={72}
        value={value}
        containerStyle={styles.rangePicker}
        onChangeValue={onChange}
      />
    </View>
  );
};
