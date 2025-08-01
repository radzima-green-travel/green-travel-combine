import React, {memo} from 'react';
import type {Props as ButtonProps} from 'atoms/Button/Button';
import {Button} from 'atoms';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {PADDING, themeStyles} from './styles';

interface IProps {
  buttons: Array<ButtonProps>;
  withShadow?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  bottomInset?: number;
}

export const ButtonsGroup = memo(
  ({buttons, withShadow, containerStyle, bottomInset}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {paddingBottom: bottomInset || PADDING},
        ]}>
        {buttons.map((buttonProps, index) => {
          const style = [
            styles.button,
            index === buttons.length - 1 && styles.lastButton,
            !buttonProps.isIconOnlyButton && styles.nonIconButton,
          ];
          return (
            <Button
              style={style}
              key={index}
              {...buttonProps}
              withShadow={withShadow}
            />
          );
        })}
      </View>
    );
  },
);
