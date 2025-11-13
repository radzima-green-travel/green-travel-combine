import { COLORS } from 'assets';
import { Icon, LoadingView } from 'atoms';
import { hexWithAlpha } from 'core/helpers';
import { useColorScheme, useThemeStyles } from 'core/hooks';
import React, { memo, ReactNode, useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { themeStyles } from './styles';

interface IProps {
  renderLeftElement?: ReactNode;
  renderRightElement?: ReactNode;
  withChevron?: boolean;
  position?: 'single' | 'top' | 'middle' | 'bottom';
  size?: 'S' | 'M';
  loading?: boolean;
  title: string;
  subtitle?: string;
  red?: boolean;
  disabled?: boolean;
  rightElementContainerStyle?: StyleProp<ViewStyle>;
  rightElementContentContainerStyle?: StyleProp<ViewStyle>;
}

export type onPressProps<TItem> = TItem extends undefined
  ? {
      item?: never;
      onPress: (item: null, event: GestureResponderEvent) => void;
    }
  : {
      item: TItem;
      onPress: (item: TItem, event: GestureResponderEvent) => void;
    };

const GeneralListItemComponent = <T extends unknown = undefined>({
  renderLeftElement,
  renderRightElement,
  withChevron,
  position = 'single',
  size = 'S',
  loading,
  onPress,
  item,
  title,
  subtitle,
  red,
  disabled,
  rightElementContainerStyle,
  rightElementContentContainerStyle,
}: IProps & onPressProps<T>) => {
  const styles = useThemeStyles(themeStyles);
  const theme = useColorScheme();

  const containerStyle = useMemo(() => {
    const style = [styles.container];

    if (size === 'M') {
      style.push(styles.containerM);
    }

    if (position === 'top' || position === 'middle') {
      style.push(styles.topContainer);
    }

    if (position === 'bottom' || position === 'middle') {
      style.push(styles.bottomContainer);
    }

    return style;
  }, [position, styles, size]);

  const renderRightComponent = () => {
    if (renderRightElement || withChevron) {
      return (
        <View
          style={[
            styles.contentContainer,
            loading && styles.hidden,
            rightElementContentContainerStyle,
          ]}>
          {renderRightElement ? renderRightElement : null}
          {withChevron ? (
            <View style={styles.chevronContainer}>
              <Icon
                color={
                  theme === 'light'
                    ? hexWithAlpha(COLORS.tuna, 0.3)
                    : hexWithAlpha(COLORS.altoForDark, 0.3)
                }
                width={7}
                height={12}
                name="chevronRight"
              />
            </View>
          ) : null}
        </View>
      );
    }

    return null;
  };

  const onPressHandler = useCallback(
    (event: GestureResponderEvent) => {
      onPress(item as any, event);
    },
    [item, onPress],
  );

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={containerStyle}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <View style={[styles.contentContainer]}>
            {renderLeftElement ? (
              <View
                style={[
                  styles.leftElementContainer,
                  size === 'M' && styles.leftElementContainerM,
                ]}>
                {renderLeftElement}
              </View>
            ) : null}
            <View>
              <Text
                style={[
                  size === 'S' ? styles.title : styles.titleM,
                  red && styles.titleRed,
                ]}>
                {title}
              </Text>
              {size === 'M' && subtitle ? (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={[styles.rightElementContainer, rightElementContainerStyle]}>
            {renderRightComponent()}
            <LoadingView
              size="small"
              containerStyle={[styles.hidden, loading && styles.visible]}
            />
          </View>
        </View>
        {position === 'top' || position === 'middle' ? (
          <View style={styles.border} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export const GeneralListItem = memo(
  GeneralListItemComponent,
) as typeof GeneralListItemComponent;
