import React, {memo, useCallback} from 'react';
import {Animated, View} from 'react-native';
import {SearchObject} from 'core/types';
import {Icon} from 'atoms';
import {styles} from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface IProps {
  data: SearchObject;
  children: React.ReactNode;
  onDeletePress: (object: SearchObject) => void;
}

export const SwipeToDeleteContainer = memo(
  ({children, data, onDeletePress}: IProps) => {
    const onPressDeleteHandler = useCallback(() => {
      onDeletePress(data);
    }, [onDeletePress, data]);

    const renderRightAction = (progress, dragX) => {
      const opacity = dragX.interpolate({
        inputRange: [-150, -20, 0],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp',
      });

      return (
        <View style={styles.rightDeleteActionBox}>
          <Animated.View style={{opacity: opacity}}>
            <Icon name="delete" size={36} />
          </Animated.View>
        </View>
      );
    };

    return (
      <Swipeable
        friction={1.1}
        renderRightActions={renderRightAction}
        onSwipeableRightOpen={onPressDeleteHandler}>
        {children}
      </Swipeable>
    );
  },
);
