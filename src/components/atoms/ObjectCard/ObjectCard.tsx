import React, {memo, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'atoms';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {COLORS} from 'assets';

const ratio = 324 / 144;

interface IProps {
  imageUri?: string;
  name: string;
  id: string;
  isFavorite?: boolean;
  onPress?: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  onIsFavoriteChange?: (data: {objectId: string; needToAdd: boolean}) => void;
  width: number;
}

export const ObjectCard = memo(
  ({
    imageUri,
    name,
    id,
    isFavorite,
    containerStyle,
    onPress,
    onIsFavoriteChange,
    width,
  }: IProps) => {
    const isObjectCard = typeof isFavorite === 'boolean';
    const isImageProvided = Boolean(imageUri);

    const onIsFavoriteChangeHandler = useCallback(() => {
      onIsFavoriteChange?.({
        objectId: id,
        needToAdd: !isFavorite,
      });
    }, [onIsFavoriteChange, id, isFavorite]);

    const dimensions = useMemo(() => {
      return {width, height: width / ratio};
    }, [width]);

    const onPressHander = useCallback(() => {
      onPress?.(id);
    }, [onPress, id]);

    return (
      <TouchableOpacity
        onPress={onPressHander}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle, dimensions]}>
        <FastImage style={styles.image} source={{uri: imageUri}} />
        {isImageProvided ? <View style={styles.cover} /> : null}
        <View style={styles.cardContentContainer}>
          <Text
            style={[styles.title, !isImageProvided && styles.emptyCardTitle]}>
            {name}
          </Text>
          {isObjectCard ? (
            <TouchableOpacity
              onPress={onIsFavoriteChangeHandler}
              hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
              activeOpacity={0.8}>
              <Icon
                name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                width={20}
                height={20}
                color={isImageProvided ? COLORS.white : COLORS.logCabin}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
);
