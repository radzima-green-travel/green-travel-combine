import React, {ComponentProps, memo, useState} from 'react';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {View} from 'react-native';
import {IconsNames} from 'atoms/Icon';
import {ListItem} from 'molecules';

export type Item = {
  title: string;
  subtitle: string;
  onSubtitlePress?: () => void;
  testID: string;
  icon: IconsNames;
  titleNumberOfLines?: number;
  withDropdown?: boolean;
  onPress?: () => void;
  contentStylingType?: 'primary' | 'secondary';
  isTitleBold?: boolean;
  boldTitle?: boolean;
};

interface IProps {
  items: Item[];
}

export const ObjectInfoSection = memo(({items}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('objectDetails');
  const [isTitleTrunctated, setIsTitleTruncated] = useState(false);

  const renderSectionItem = (item: Item, index: number) => {
    const {
      title,
      subtitle,
      onSubtitlePress,
      icon,
      testID,
      titleNumberOfLines,
      withDropdown,
      onPress,
      contentStylingType = 'secondary',
      boldTitle,
    } = item;

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
        leadIcon={icon}
        position={position}
        leadIconStyle={styles.listItemIcon}
        testID={testID}
        titleNumberOfLines={titleNumberOfLines}
        tailIconStyle={withDropdown ? styles.dropdownTextStyle : undefined}
        labelStyle={withDropdown ? styles.dropdownTextStyle : undefined}
        tailIcon={
          withDropdown && isTitleTrunctated ? 'chevronShortDown' : undefined
        }
        label={withDropdown && isTitleTrunctated ? t('details') : undefined}
        onPress={
          withDropdown ? (isTitleTrunctated ? onPress : undefined) : onPress
        }
        boldTitle={boldTitle}
        onTitleTruncate={withDropdown ? setIsTitleTruncated : undefined}
      />
    );
  };

  return <View style={styles.container}>{items.map(renderSectionItem)}</View>;
});
