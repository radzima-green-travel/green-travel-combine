import React, {ComponentProps, memo} from 'react';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {View} from 'react-native';
import {IconsNames} from 'atoms/Icon';
import {ListItem} from 'molecules';

export type Item = {
  title: string;
  subtitle: string;
  onSubtitlePress?: () => void;
  testID: string;
  icon: IconsNames;
};

interface IProps {
  items: Item[];
}

export const ObjectInfoSection = memo(({items}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  const renderSectionItem = (item: Item, index: number) => {
    const {title, subtitle, onSubtitlePress, icon, testID} = item;
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
        contentStylingType="secondary"
        title={title}
        subtitle={subtitle}
        onSubtitlePress={onSubtitlePress}
        leadIcon={icon}
        position={position}
        leadIconStyle={styles.listItemIcon}
        testID={testID}
      />
    );
  };

  return <View style={styles.container}>{items.map(renderSectionItem)}</View>;
});
