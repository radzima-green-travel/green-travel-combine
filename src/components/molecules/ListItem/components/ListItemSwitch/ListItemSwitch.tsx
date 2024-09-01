import React, {memo} from 'react';
import {BaseListItem} from '../../BaseListItem';
import {ListItemSwitchProps} from '../../types';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {Switch} from 'react-native';
import {composeTestID} from 'core/helpers';

export const ListItemSwitchComponent = ({
  testID,
  switchProps,
  ...props
}: ListItemSwitchProps) => {
  const styles = useThemeStyles(themeStyles);

  const renderSwicth = () => {
    return <Switch testID={composeTestID(testID, 'switch')} {...switchProps} />;
  };

  return (
    <BaseListItem
      boldTitle={false}
      testID={testID}
      rightElement={renderSwicth()}
      containerStyle={styles.container}
      titleContainerStyle={styles.titleContainer}
      {...props}
    />
  );
};

export const ListItemSwitch = memo(
  ListItemSwitchComponent,
) as typeof ListItemSwitchComponent;
