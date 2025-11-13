import React, { memo, useCallback, useState } from 'react';
import { View, Text, ViewStyle, StyleProp } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { thumbSize, themeStyles } from './styles';
import { useThemeStyles } from 'core/hooks';

interface BaseProps {
  minValue: number;
  maxValue: number;
  steps: number;
  value: number;
  onChangeValue: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

interface IBasicProps extends BaseProps {
  type: 'basic';
}

interface IWithMarksProps extends BaseProps {
  type: 'withMarks';
  markSteps: number;
}

type IProps = IBasicProps | IWithMarksProps;

export const CustomSlider = memo((props: IProps) => {
  const {
    type,
    minValue,
    maxValue,
    steps,
    containerStyle,
    value,
    onChangeValue,
    onSlidingComplete,
  } = props;
  const styles = useThemeStyles(themeStyles);

  const [containerWidth, setContainerWidth] = useState(0);

  const renderMarks = () => {
    if (type === 'basic') {
      return null;
    }

    if (!containerWidth) {
      return null;
    }

    const { markSteps } = props;
    const partWidth = (containerWidth - thumbSize) / markSteps;

    return (
      <View style={styles.marksContainer}>
        {Array.from({ length: markSteps + 1 }).map((_, index) => {
          const isEven = index % 2 === 0;
          return (
            <View
              key={index}
              style={[
                styles.markContainer,
                {
                  width: partWidth,
                },
              ]}>
              <View style={styles.mark} />
              {isEven ? <Text style={styles.markText}>{index}</Text> : null}
            </View>
          );
        })}
      </View>
    );
  };

  const onValueChangeHandler = useCallback(
    (values: number[]) => {
      onChangeValue(values[0]);
    },
    [onChangeValue],
  );

  const onSlidingCompleteHandler = useCallback(
    (values: number[]) => {
      if (onSlidingComplete) {
        onSlidingComplete(values[0]);
      }
    },
    [onSlidingComplete],
  );

  return (
    <View
      onLayout={({ nativeEvent }) => {
        setContainerWidth(nativeEvent.layout.width);
      }}
      style={[styles.container, containerStyle]}>
      <View style={styles.sliderWrapper}>
        <Slider
          containerStyle={styles.sliderContainer}
          minimumValue={minValue}
          maximumValue={maxValue}
          minimumTrackTintColor={
            styles.leftTrackStyle.backgroundColor as string
          }
          value={value}
          onValueChange={onValueChangeHandler}
          onSlidingComplete={onSlidingCompleteHandler}
          thumbTouchSize={{ width: thumbSize, height: thumbSize }}
          trackStyle={styles.trackStyle}
          renderThumbComponent={() => <View style={styles.thumbStyle} />}
          step={maxValue / steps}
        />
      </View>
      {renderMarks()}
    </View>
  );
});
