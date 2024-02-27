import React, {memo} from 'react';
import type {Props as ButtonProps} from 'atoms/Button/Button';
import {Button} from 'atoms';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {PADDING, themeStyles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface IProps {
  buttons: Array<ButtonProps>;
  withShadow?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  withBottomInset?: boolean;
}

export const ButtonsGroup = memo(
  ({buttons, withShadow, containerStyle, withBottomInset}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const {bottom} = useSafeAreaInsets();

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          withBottomInset && {paddingBottom: bottom || PADDING},
        ]}>
        {buttons.map((buttonProps, index) => {
          const style = [
            styles.button,
            withShadow && styles.buttonShadow,
            !buttonProps.isIconOnlyButton && styles.nonIconButton,
          ];
          return <Button style={style} key={index} {...buttonProps} />;
        })}
      </View>
    );
  },
);
