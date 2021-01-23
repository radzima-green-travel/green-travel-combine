import {Card} from 'atoms';
import {ICategoryWithExtendedObjects} from 'core/types';
import React, {memo, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
  data: ICategoryWithExtendedObjects;
  onPress: (item: ICategoryWithExtendedObjects) => void;
  width: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CategoryCard = memo(
  ({data, width, onPress, containerStyle}: IProps) => {
    const {name, icon} = data;

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    return (
      <Card
        containerStyle={containerStyle}
        width={width}
        onPress={onPressHandler}
        title={name}
        imageUri={icon}
      />
    );
  },
);
