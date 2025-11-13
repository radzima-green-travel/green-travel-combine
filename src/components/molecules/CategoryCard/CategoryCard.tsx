import { CardItem } from 'core/types';
import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { InteractiveCard } from '../InteractiveCard';

interface IProps {
  data: CardItem;
  onPress: (item: CardItem) => void;
  width: number;
  testID: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CategoryCard = memo(
  ({ data, width, onPress, containerStyle, testID }: IProps) => {
    const { name, cover, blurhash } = data;

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    return (
      <InteractiveCard
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
