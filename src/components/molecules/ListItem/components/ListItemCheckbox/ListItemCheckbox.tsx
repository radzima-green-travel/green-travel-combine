import React, { memo, useCallback } from 'react';
import { BaseListItem } from '../../BaseListItem';
import { ListItemCheckboxProps } from '../../types';
import { Checkbox } from 'atoms';
import { useThemeStyles } from 'core/hooks';
import { themeStyles } from './styles';
import { composeTestID } from 'core/helpers';

export const ListItemCheckboxComponent = <T extends any = undefined>({
  checked,
  testID,
  onPress,
  item,
  ...props
}: ListItemCheckboxProps<any>) => {
  const styles = useThemeStyles(themeStyles);

  const onPressHandler = useCallback(() => {
    onPress?.(item as T);
  }, [item, onPress]);

  const renderCheckbox = () => {
    return (
      <Checkbox
        style={styles.checkbox}
        checked={checked}
        testID={composeTestID(testID, 'checkbox')}
      />
    );
  };

  return (
    <BaseListItem
      boldTitle={false}
      testID={testID}
      leftElement={renderCheckbox()}
      containerStyle={styles.container}
      titleContainerStyle={styles.titleContainer}
      onPress={onPressHandler}
      {...props}
    />
  );
};

export const ListItemCheckbox = memo(
  ListItemCheckboxComponent,
) as typeof ListItemCheckboxComponent;
