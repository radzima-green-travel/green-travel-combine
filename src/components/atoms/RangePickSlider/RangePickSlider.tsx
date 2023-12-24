import React, {memo, useCallback, useState} from 'react';
import {View, Text, ViewStyle, StyleProp} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {thumbSize, themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  minValue: number;
  maxValue: number;
  steps: number;
  markSteps: number;
  value: number;
  onChangeValue: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const RangePickSlider = memo(
  ({
    minValue,
    maxValue,
    steps,
    markSteps,
    containerStyle,
    value,
    onChangeValue,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const [containerWidth, setContainerWidth] = useState(0);

    const partWidth = (containerWidth - thumbSize) / markSteps;

    const renderMarks = () => {
      return (
        <View style={styles.marksContainer}>
          {Array.from({length: markSteps + 1}).map((_, index) => {
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

    return (
      <View
        onLayout={({nativeEvent}) => {
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
            thumbTouchSize={{width: thumbSize, height: thumbSize}}
            trackStyle={styles.trackStyle}
            renderThumbComponent={() => <View style={styles.thumbStyle} />}
            step={maxValue / steps}
          />
        </View>
        {containerWidth ? renderMarks() : null}
      </View>
    );
  },
);
