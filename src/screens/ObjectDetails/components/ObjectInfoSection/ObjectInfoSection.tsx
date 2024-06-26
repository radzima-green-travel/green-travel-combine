import React, {ComponentProps, memo, useState} from 'react';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {View} from 'react-native';
import {IconsNames} from 'atoms/Icon';
import {ListItem} from 'molecules';
import {StyleProp, ViewStyle} from 'react-native';

export type Item = {
  title: string;
  subtitle?: string;
  onSubtitlePress?: () => void;
  testID: string;
  leadIcon: IconsNames;
  titleNumberOfLines?: number;
  withDropdown?: boolean;
  onPress?: () => void;
  contentStylingType?: 'primary' | 'secondary';
  isTitleBold?: boolean;
  boldTitle?: boolean;
  rightLabel?: string;
  hideRightLabelIfTitleTruncated?: boolean;
  onRightLabelPress?: () => void;
  titleContainerStyle?: StyleProp<ViewStyle>;
};

interface IProps {
  items: Item[];
}

export const ObjectInfoSection = memo(({items}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const [isTitleTrunctated, setIsTitleTruncated] = useState(false);

  const renderSectionItem = (item: Item, index: number) => {
    const {
      title,
      subtitle = '',
      onSubtitlePress,
      leadIcon,
      testID,
      titleNumberOfLines,
      withDropdown,
      onPress,
      contentStylingType = 'secondary',
      boldTitle,
      rightLabel,
      hideRightLabelIfTitleTruncated = false,
      onRightLabelPress,
      titleContainerStyle,
    } = item;

    const isNeedToTruncate =
      isTitleTrunctated || hideRightLabelIfTitleTruncated;

    let position: ComponentProps<typeof ListItem>['position'] = 'single';

    if (items.length - 1 !== 0) {
      if (index === 0) {
        position = 'top';
      } else if (index === items.length - 1) {
        position = 'bottom';
      } else {
        position = 'middle';
      }
    }

    return (
      <ListItem
        containerStyle={styles.listItemContainer}
        contentStylingType={contentStylingType}
        title={title}
        subtitle={subtitle}
        onSubtitlePress={onSubtitlePress}
        onRightLabelPress={onRightLabelPress}
        leadIcon={leadIcon}
        position={position}
        leadIconStyle={styles.listItemIcon}
        titleContainerStyle={titleContainerStyle}
        testID={testID}
        titleNumberOfLines={titleNumberOfLines}
        tailIconStyle={withDropdown ? styles.dropdownTextStyle : undefined}
        labelStyle={withDropdown ? styles.dropdownTextStyle : undefined}
        tailIcon={
          withDropdown && isNeedToTruncate ? 'chevronShortDown' : undefined
        }
        label={withDropdown && isNeedToTruncate ? rightLabel : undefined}
        onPress={
          withDropdown ? (isNeedToTruncate ? onPress : undefined) : onPress
        }
        boldTitle={boldTitle}
        onTitleTruncate={withDropdown ? setIsTitleTruncated : undefined}
      />
    );
  };

  return <View style={[styles.container]}>{items.map(renderSectionItem)}</View>;
});
