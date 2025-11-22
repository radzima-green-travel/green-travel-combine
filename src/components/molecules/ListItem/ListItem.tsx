import React, { memo } from 'react';
import {
  ListItemPrimary,
  ListItemSwitch,
  ListItemCheckbox,
} from './components';
import {
  ListItemCheckboxProps,
  ListItemPrimaryProps,
  ListItemSwitchProps,
} from './types';

type ListItemProps<T = undefined> =
  | ({ type: 'checkbox' } & ListItemCheckboxProps<T>)
  | ({ type: 'switch' } & ListItemSwitchProps)
  | ({ type: 'primary' } & ListItemPrimaryProps);

const ListItemComponent = <T extends any = undefined>(
  props: ListItemProps<T>,
) => {
  if (props.type === 'checkbox') {
    return <ListItemCheckbox {...props} />;
  } else if (props.type === 'switch') {
    return <ListItemSwitch {...props} />;
  } else if (props.type === 'primary') {
    return <ListItemPrimary {...props} />;
  }
};

export const ListItem = memo(ListItemComponent) as typeof ListItemComponent;
