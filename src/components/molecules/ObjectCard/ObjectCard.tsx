import {Card} from 'atoms';
import {IExtendedObject} from 'core/types';
import React, {memo, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
  data: IExtendedObject;
  onIsFavoritePress: (data: {objectId: string; needToAdd: boolean}) => void;
  onPress: (item: IExtendedObject) => void;
  width: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ObjectCard = memo(
  ({data, width, onIsFavoritePress, onPress, containerStyle}: IProps) => {
    const {_id, name, cover, isFavorite} = data;

    const onIsFavoritePressHandler = useCallback(() => {
      onIsFavoritePress({
        objectId: _id,
        needToAdd: !isFavorite,
      });
    }, [_id, isFavorite, onIsFavoritePress]);

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    return (
      <Card
        width={width}
        onIsFavoritePress={onIsFavoritePressHandler}
        isFavorite={isFavorite}
        onPress={onPressHandler}
        title={name}
        imageUri={cover}
        containerStyle={containerStyle}
      />
    );
  },
);
