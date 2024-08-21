import React, {memo, useCallback} from 'react';
import {Animated, View} from 'react-native';
import {SearchObject} from 'core/types';
import {Icon} from 'atoms';
import {styles} from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: SearchObject;
  children: React.ReactNode;
  onDeletePress: (object: SearchObject) => void;
  testID: string;
}

export const SwipeToDeleteContainer = memo(
  ({children, data, onDeletePress, testID}: IProps) => {
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
        <View
          {...getPlatformsTestID(composeTestID(testID, 'deleteButton'))}
          style={styles.rightDeleteActionBox}>
          <Animated.View style={{opacity: opacity}}>
            <Icon
              testID={composeTestID(testID, 'deleteIcon')}
              name="delete"
              size={36}
            />
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
