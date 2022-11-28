import {COLORS} from 'assets';
import {Icon, LoadingView} from 'atoms';
import {hexWithAlpha} from 'core/helpers';
import {useColorScheme, useThemeStyles} from 'core/hooks';
import React, {memo, ReactNode, useCallback, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {themeStyles} from './styles';

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
}

export type onPressProps<TItem> = TItem extends undefined
  ? {onPress: () => void}
  : {
      item: TItem;
      onPress: (item: TItem) => void;
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
    if (renderRightElement) {
      return renderRightElement;
    }
    if (withChevron) {
      return (
        <View>
          <Icon
            style={loading && styles.loading}
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
      );
    }

    return null;
  };

  const onPressHandler = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      disabled={loading}
      style={containerStyle}
      activeOpacity={0.8}>
      {renderLeftElement ? (
        <View
          style={[
            styles.leftElementContainer,
            size === 'M' && styles.leftElementContainerM,
          ]}>
          {renderLeftElement}
        </View>
      ) : null}
      <View
        style={[
          styles.contentWrapper,
          (position === 'top' || position === 'middle') &&
            styles.withContentBorder,
        ]}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text
              style={[
                size === 'S' ? styles.title : styles.titleM,
                red && styles.titleRed,
              ]}>
              {title}
            </Text>
            {size === 'M' && subtitle ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}
          </View>
          {renderRightComponent()}
          {loading ? <LoadingView size="small" /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const GeneralListItem = memo(
  GeneralListItemComponent,
) as typeof GeneralListItemComponent;
