import {Card} from 'atoms';
import {ITransformedCategory} from 'core/types';
import React, {memo, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
  data: ITransformedCategory;
  onPress: (item: ITransformedCategory) => void;
  width: number;
  testID: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CategoryCard = memo(
  ({data, width, onPress, containerStyle, testID}: IProps) => {
    const {name, cover, blurhash} = data;

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    return (
      <Card
        containerStyle={containerStyle}
        width={width}
        onPress={onPressHandler}
        title={name}
        imageUri={cover || undefined}
        blurhash={blurhash}
        testID={testID}
      />
    );
  },
);
