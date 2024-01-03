import React, {memo} from 'react';
import {BaseListItem} from './BaseListItem';
import {BaseListItemProps} from './types';

export const ListItem = memo<BaseListItemProps>(props => {
  return <BaseListItem {...props} />;
});
