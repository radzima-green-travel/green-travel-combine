import React, {memo} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {Portal} from '@gorhom/portal';
import {BottomMenu} from 'atoms';
import {ListItem} from 'molecules';
import {BaseListItemProps} from 'molecules/ListItem';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

interface IProps {
  menuProps: ReturnType<typeof useBottomMenu>;
  menuItems: BaseListItemProps[];
  containerListStyle?: StyleProp<ViewStyle>;
  testID: string;
}

const MenuItem = memo(
  ({
    title,
    subtitle = '',
    onSubtitlePress,
    leadIcon,
    testID,
    titleNumberOfLines,
    onPress,
    contentStylingType = 'secondary',
    boldTitle,
    label,
    onRightLabelPress,
    containerStyle,
    titleContainerStyle,
    tailIcon,
    position,
    leadIconStyle,
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <ListItem
        containerStyle={[styles.listItemContainer, containerStyle]}
        contentStylingType={contentStylingType}
        title={title}
        subtitle={subtitle}
        onSubtitlePress={onSubtitlePress}
        onPress={onPress}
        onRightLabelPress={onRightLabelPress}
        leadIcon={leadIcon}
        position={position}
        leadIconStyle={leadIconStyle}
        titleContainerStyle={titleContainerStyle}
        testID={testID}
        titleNumberOfLines={titleNumberOfLines}
        tailIcon={tailIcon}
        label={label}
        boldTitle={boldTitle}
      />
    );
  },
);

export const ObjectDetailsListItemsMenu = ({
  menuProps,
  menuItems,
  containerListStyle,
  testID,
}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <Portal>
      <BottomMenu testID={testID} withBackdrop {...menuProps}>
        <View style={[styles.container, containerListStyle]}>
          {menuItems.map(item => (
            <MenuItem key={item.title} {...item} />
          ))}
        </View>
      </BottomMenu>
    </Portal>
  );
};
