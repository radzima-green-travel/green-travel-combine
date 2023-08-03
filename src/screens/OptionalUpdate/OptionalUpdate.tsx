import React from 'react';
import {BottomMenu} from 'atoms';
import {UpdateBottomMenu} from 'molecules';
import {useOptionalUpdate} from './hooks';

export const OptionalUpdate = () => {
  const {onUpdate, onRemindLater, onSkipUpdate, menuProps, bottom} =
    useOptionalUpdate();

  return (
    <BottomMenu
      withBackdrop
      isPanDownEnabled={false}
      showDragIndicator={false}
      {...menuProps}>
      <UpdateBottomMenu
        onUpdate={onUpdate}
        onRemind={onRemindLater}
        onSkip={onSkipUpdate}
        bottomInset={bottom}
      />
    </BottomMenu>
  );
};
