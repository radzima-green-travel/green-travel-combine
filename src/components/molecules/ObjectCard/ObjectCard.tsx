import {Card} from 'atoms';
import {IObject} from 'core/types';
import React, {memo, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
interface IProps {
  data: IObject;
  onPress: (item: IObject) => void;
  width: number;
  containerStyle?: StyleProp<ViewStyle>;
  removeFavoriteWithAnimation?: boolean;
  onRemoveAnimationEnd?: () => void;
  onFavoriteChanged?: (item: IObject, nextIsFavorite: boolean) => void;
  testID: string;
}

export const ObjectCard = memo(
  ({
    data,
    width,
    onPress,
    containerStyle,
    removeFavoriteWithAnimation,
    onRemoveAnimationEnd,
    onFavoriteChanged,
    testID,
  }: IProps) => {
    const {id, name, cover, blurhash} = data;

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    const onFavoriteChangedHandler = useCallback(
      (nextIsFavorite: boolean) => {
        onFavoriteChanged?.(data, nextIsFavorite);
      },
      [data, onFavoriteChanged],
    );

    return (
      <Card
        isFavoriteBlockVisible
        removeFavoriteWithAnimation={removeFavoriteWithAnimation}
        onRemoveAnimationEnd={onRemoveAnimationEnd}
        width={width}
        id={id}
        onPress={onPressHandler}
        title={name}
        imageUri={cover}
        containerStyle={containerStyle}
        onFavoriteChanged={onFavoriteChangedHandler}
        blurhash={blurhash}
        testID={testID}
      />
    );
  },
);
